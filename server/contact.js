/* The contact form: validate, store, then try to send.
 *
 * Two things it is built around.
 *
 * THE ADDRESS NEVER REACHES THE BROWSER. A `mailto:` on the shelf is the whole
 * inbox published as plain text on the one page of this app that is outside the
 * sign-in gate, which is a page a scraper reads. The form posts to this file and
 * this file reads the address out of the environment, so the only copy on the
 * public side is the word "Contact".
 *
 * A MESSAGE IS WRITTEN DOWN BEFORE IT IS SENT, and the send is allowed to fail.
 * SMTP credentials expire, Gmail locks an app password, the host drops port 465
 * — every one of those is invisible from the outside, and the failure mode that
 * matters is the one where somebody reports a broken question and nobody ever
 * learns they did. The row in contact_messages is the record; the email is a
 * notification about it. So the route answers 200 the moment the row is in, and
 * says whether the notification also went (`emailed`), rather than telling the
 * sender their message failed when it is safely stored.
 *
 * Inert with no credentials, deliberately, in the same way cloudSave.js is inert
 * with no account: a local checkout with no SMTP secrets stores messages and
 * logs a line, rather than throwing at boot or answering 500 to every submit.
 */
/* The pool is reached through a function rather than required at the top,
 * because server/db.js throws at load when DATABASE_URL is unset — which is
 * every checkout with no database, including the one scripts/test-contact.js
 * runs in. The validation and the rate limit are the part worth testing and
 * neither touches Postgres; requiring the pool to read them would make the test
 * need a database to assert that a two-word message is refused.
 */
function db() { return require("./db").pool; }

// Where a message goes, and who it is sent as. Both come from the environment;
// there is no default address in this file, because a default is how a message
// ends up quietly delivered to an address nobody reads.
const TO = process.env.CONTACT_TO || process.env.CONTACT_SMTP_USER || "";
const SMTP_USER = process.env.CONTACT_SMTP_USER || "";
/* Whitespace stripped, and that is not tidiness. Google shows an app password
 * as four blocks of four — "abcd efgh ijkl mnop" — and says the spaces do not
 * matter, which is true of its own web forms and false of SMTP AUTH, where the
 * string is taken literally and a space in it is simply a wrong password. What
 * Gmail then answers is "535-5.7.8 Username and Password not accepted", the
 * same refusal it gives for a password that was never valid, so the error reads
 * as "your credential is wrong" when the credential is right and the copy and
 * paste was ordinary. Nobody pasting from that page has any reason to know.
 */
function cleanSecret(v) { return String(v || "").replace(/\s+/g, ""); }
const SMTP_PASS = cleanSecret(process.env.CONTACT_SMTP_PASS);
const SMTP_HOST = process.env.CONTACT_SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = Number(process.env.CONTACT_SMTP_PORT || 465);

const MAX = { name: 120, email: 200, message: 4000, course: 80 };

// What a message can be about. The value is stored and put in the subject line,
// so it is a closed list rather than free text — an inbox sorts on it.
const TOPICS = new Map([
  ["request", "A game or subject you would like"],
  ["question", "A problem with a question or a place"],
  ["teaching", "Using this with a class"],
  ["other", "Something else"],
]);

/* Validation, as a pure function so scripts/test-contact.js can put every case
 * to it with no server and no database.
 *
 * The email is optional and that is a decision, not an oversight: somebody
 * reporting a wrong answer on day 9 of Blackout is doing us a favour, and a
 * required field they have to fill in to do it is a reason not to bother. What
 * they lose is a reply, which the form says on the field itself.
 */
function validate(body) {
  const b = body && typeof body === "object" ? body : {};
  const str = (v, cap) => (typeof v === "string" ? v.trim().slice(0, cap) : "");

  /* The honeypot. A field no human sees and no human fills in; a bot fills in
   * everything it finds. Accepted rather than refused — a 400 tells the bot to
   * try a different shape, and a 200 that quietly drops it does not.
   *
   * The field is NOT called "website", which is what it was called for exactly
   * one afternoon. That is a name Chrome's autofill and every password manager
   * recognise, so the first real person to use the form had it filled in for
   * them and their message was dropped as spam — with a Sent card, because the
   * whole design of the trap is that its victim cannot tell. A honeypot has to
   * be a name no autofill heuristic knows, and it is `readonly` on the page for
   * the same reason: Chrome will not fill a readonly field, and a bot posting
   * JSON never sees the attribute.
   *
   * `website` is deliberately not checked any more, rather than checked as
   * well. A page cached on somebody's device still posts it, still autofilled,
   * and treating it as a trap would go on silently eating their messages until
   * the cache turned over.
   */
  if (str(b.contact_ref, 200)) return { drop: true };

  const message = str(b.message, MAX.message);
  if (message.length < 10) {
    return { error: "Tell us a little more than that — a sentence or two is plenty." };
  }

  const email = str(b.email, MAX.email);
  // Deliberately loose. The point is to catch a typed-in mistake, not to decide
  // what an address may look like — every strict version of this rejects
  // somebody's real address, and the only cost of a wrong one is a reply that
  // does not arrive.
  if (email && !/^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(email)) {
    return { error: "That email address does not look right. Leave it blank if you would rather not." };
  }

  const topic = TOPICS.has(b.topic) ? b.topic : "other";

  return {
    value: {
      name: str(b.name, MAX.name),
      email,
      topic,
      course: str(b.course, MAX.course),
      message,
    },
  };
}

/* The mail transport, built once and only where there is something to build it
 * from. Required lazily so a checkout that never sends mail does not pay for
 * loading it, and so a missing dependency cannot stop the server booting.
 */
let transport = null;
let transportTried = false;
function mailer() {
  if (transportTried) return transport;
  transportTried = true;
  if (!SMTP_USER || !SMTP_PASS || !TO) {
    console.log("[contact] no SMTP credentials — messages are stored, not emailed.");
    return null;
  }
  try {
    const nodemailer = require("nodemailer");
    transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
  } catch (err) {
    console.error("[contact] could not build the mail transport:", err.message);
    transport = null;
  }
  return transport;
}

function compose(msg, meta) {
  const topic = TOPICS.get(msg.topic) || TOPICS.get("other");
  const who = msg.name || "somebody";
  const lines = [
    `Topic: ${topic}`,
    `Name: ${msg.name || "(not given)"}`,
    `Email: ${msg.email || "(not given — no reply is possible)"}`,
    msg.course ? `Course: ${msg.course}` : null,
    meta.userId ? `Signed in as: ${meta.userId}` : "Signed in: no",
    `Received: ${new Date().toISOString()}`,
    "",
    msg.message,
  ].filter(Boolean);
  return {
    subject: `[First Person Learning] ${topic} — ${who}`,
    text: lines.join("\n"),
  };
}

async function store(msg, meta) {
  const { rows } = await db().query(
    `INSERT INTO contact_messages (name, email, topic, course, message, user_id, user_agent)
     VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id`,
    [msg.name || null, msg.email || null, msg.topic, msg.course || null,
     msg.message, meta.userId || null, meta.userAgent || null],
  );
  return rows[0].id;
}

async function send(msg, meta) {
  const t = mailer();
  if (!t) return false;
  const { subject, text } = compose(msg, meta);
  await t.sendMail({
    from: `First Person Learning <${SMTP_USER}>`,
    to: TO,
    // So hitting Reply in the inbox answers the person who wrote, rather than
    // the app's own mailbox. Only when there is an address to reply to.
    replyTo: msg.email || undefined,
    subject,
    text,
  });
  return true;
}

/* A very small rate limit, per IP, in memory.
 *
 * In memory because the thing it defends against is a script hammering one
 * route for an hour, and losing the counters on a restart costs nothing. It is
 * not a security control — it is what stops one bad afternoon filling the table.
 */
const WINDOW_MS = 60 * 60 * 1000;
const PER_WINDOW = 8;
const seen = new Map();
function overLimit(ip, now = Date.now()) {
  const hits = (seen.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= PER_WINDOW) { seen.set(ip, hits); return true; }
  hits.push(now);
  seen.set(ip, hits);
  // Cheap sweep, so a long-running process does not hold an entry per IP for
  // ever. Bounded work: only when the map has grown past anything plausible.
  if (seen.size > 5000) {
    for (const [k, v] of seen) if (!v.some((t) => now - t < WINDOW_MS)) seen.delete(k);
  }
  return false;
}

/* Who to count the submissions against.
 *
 * `req.ip` is the socket's peer, and on Replit that peer is the platform's own
 * proxy — so every visitor in the world shares one bucket and the ninth message
 * of the day from anybody is refused. The app does not set `trust proxy`
 * (Clerk's middleware reads the same request), so the forwarded chain is read
 * here rather than globally. First hop is the client; the rest are proxies.
 */
function clientIp(req) {
  const fwd = String(req.get("x-forwarded-for") || "").split(",")[0].trim();
  return fwd || req.ip || req.socket?.remoteAddress || "unknown";
}

async function handle(req, res) {
  const ip = clientIp(req);
  if (overLimit(ip)) {
    return res.status(429).json({ message: "That is a lot of messages. Try again a bit later." });
  }

  const { drop, error, value } = validate(req.body);
  // A dropped honeypot submission looks to its SENDER exactly like a delivered
  // one, which is the point — and looked exactly like one to us too, which was
  // not. A trap nobody can see firing is a trap you cannot tell from a broken
  // route: both are a Sent card and no row. Logged without the message, so the
  // log says how often it fires without becoming a copy of the spam.
  if (drop) {
    console.log(`[contact] honeypot dropped a submission from ${ip}`);
    return res.json({ ok: true, emailed: false });
  }
  if (error) return res.status(400).json({ message: error });

  const meta = {
    userId: (typeof req.userId === "string" && req.userId) || null,
    userAgent: String(req.get("user-agent") || "").slice(0, 300) || null,
  };

  let id = null;
  try {
    id = await store(value, meta);
  } catch (err) {
    // Nothing is written down, so this is the one case where the sender has to
    // be told, and told a way to reach us that does not depend on this route.
    console.error("[contact] could not store a message:", err.message);
    return res.status(500).json({
      message: "Something went wrong storing that. Write to support@firstpersonlearn.com instead.",
    });
  }

  let emailed = false;
  try {
    emailed = await send(value, meta);
    // Stamped on the row rather than only logged, so "which messages never
    // reached the inbox" is a query rather than a search through the console.
    if (emailed) {
      await db().query(`UPDATE contact_messages SET emailed = true WHERE id = $1`, [id])
        .catch((e) => console.error(`[contact] could not stamp message ${id}:`, e.message));
    }
  } catch (err) {
    // Stored but not notified. Logged with the row id, because that is the
    // thread back to the message once somebody notices the mail is not arriving.
    console.error(`[contact] message ${id} stored but not emailed:`, err.message);
  }

  res.json({ ok: true, emailed });
}

module.exports = { handle, validate, overLimit, compose, clientIp, cleanSecret, TOPICS };
