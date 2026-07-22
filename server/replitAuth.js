// Replit Auth: OpenID Connect login backed by Replit's own identity
// provider. Uses openid-client's classic (v5) Issuer/Strategy API plus
// passport + a Postgres-backed session store.
const session = require("express-session");
const passport = require("passport");
const memoize = require("memoizee");
const { Issuer, Strategy } = require("openid-client");
const pgSession = require("connect-pg-simple")(session);

const { pool } = require("./db");
const { upsertUser } = require("./storage");

if (!process.env.REPLIT_DOMAINS) {
  throw new Error("REPLIT_DOMAINS must be set for Replit Auth to work.");
}

const getOidcIssuer = memoize(
  async () => {
    return Issuer.discover(process.env.ISSUER_URL || "https://replit.com/oidc");
  },
  { maxAge: 3600 * 1000 }
);

function getSession() {
  const sessionTtlMs = 7 * 24 * 60 * 60 * 1000; // 1 week
  const store = new pgSession({
    pool,
    tableName: "sessions",
    createTableIfMissing: true,
  });
  return session({
    secret: process.env.SESSION_SECRET,
    store,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: sessionTtlMs,
    },
  });
}

function updateUserSession(user, tokenset) {
  user.claims = tokenset.claims();
  user.access_token = tokenset.access_token;
  user.refresh_token = tokenset.refresh_token;
  user.expires_at = user.claims["exp"];
}

async function setupAuth(app) {
  app.set("trust proxy", 1);
  app.use(getSession());
  app.use(passport.initialize());
  app.use(passport.session());

  const issuer = await getOidcIssuer();

  const verify = async (tokenset, done) => {
    try {
      const user = {};
      updateUserSession(user, tokenset);
      await upsertUser(tokenset.claims());
      done(null, user);
    } catch (err) {
      done(err);
    }
  };

  const domains = process.env.REPLIT_DOMAINS.split(",").map((d) => d.trim());
  for (const domain of domains) {
    const client = new issuer.Client({
      client_id: process.env.REPL_ID,
      redirect_uris: [`https://${domain}/api/callback`],
      response_types: ["code"],
      token_endpoint_auth_method: "none",
    });
    const strategy = new Strategy(
      {
        client,
        params: { scope: "openid email profile offline_access" },
      },
      verify
    );
    strategy.name = `replitauth:${domain}`;
    passport.use(strategy);
  }

  passport.serializeUser((user, cb) => cb(null, user));
  passport.deserializeUser((user, cb) => cb(null, user));

  // Requests can arrive with a hostname that isn't one of REPLIT_DOMAINS
  // (e.g. direct 127.0.0.1 access during local debugging) — fall back to
  // the first configured domain's strategy rather than 500ing.
  const strategyNameFor = (req) =>
    passport._strategy(`replitauth:${req.hostname}`)
      ? `replitauth:${req.hostname}`
      : `replitauth:${domains[0]}`;

  app.get("/api/login", (req, res, next) => {
    passport.authenticate(strategyNameFor(req))(req, res, next);
  });

  app.get("/api/callback", (req, res, next) => {
    passport.authenticate(strategyNameFor(req), {
      successReturnToOrRedirect: "/",
      failureRedirect: "/api/login",
    })(req, res, next);
  });

  app.get("/api/logout", (req, res) => {
    req.logout(() => {
      res.redirect(
        issuer.metadata.end_session_endpoint
          ? `${issuer.metadata.end_session_endpoint}?client_id=${process.env.REPL_ID}&post_logout_redirect_uri=${encodeURIComponent(
              `${req.protocol}://${req.hostname}`
            )}`
          : "/"
      );
    });
  });
}

async function refreshUserToken(client, refreshToken) {
  return client.refresh(refreshToken);
}

const isAuthenticated = async (req, res, next) => {
  const user = req.user;
  if (!req.isAuthenticated() || !user?.expires_at) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const now = Math.floor(Date.now() / 1000);
  if (now <= user.expires_at) {
    return next();
  }
  const refreshToken = user.refresh_token;
  if (!refreshToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const issuer = await getOidcIssuer();
    const client = new issuer.Client({
      client_id: process.env.REPL_ID,
      response_types: ["code"],
      token_endpoint_auth_method: "none",
    });
    const tokenset = await refreshUserToken(client, refreshToken);
    updateUserSession(user, tokenset);
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { setupAuth, isAuthenticated };
