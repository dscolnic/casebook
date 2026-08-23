// native-auth.js — signing in from inside the iOS app.
//
// On the web this file is never loaded: sign-in.html mounts Clerk's own card on
// our own origin and the session is a cookie. Inside the app neither of those is
// available. The pages are loaded out of the app bundle, so the origin is
// capacitor://localhost and a cookie for firstpersonlearn.com cannot be set from
// it — and Google refuses to render its consent screen inside a web view at all,
// answering `disallowed_useragent`. So the provider is opened in the system
// browser and the result is handed back to the app through a custom URL scheme.
//
// THE FLOW, and why it is not the obvious one. The obvious one is Clerk's own
// native SSO sequence — signIn.create, open the provider, catch a
// rotating_token_nonce on a custom scheme, signIn.reload. It was written, and it
// does not work here: Google authenticates perfectly and then Clerk refuses its
// OWN callback with
//
//   {"errors":[{"message":"Unauthorized request","code":"authorization_invalid"}]}
//
// with capacitor://localhost in the instance's allowed_origins and
// com.firstpersonlearn.app://sso-callback in its redirect_urls, and with the
// browser holding a Clerk client for the domain. Three attempts, three trace
// ids, and nothing else to read.
//
// So the session is made where Clerk already works, and then transferred:
//
//   1. open https://firstpersonlearn.com/native-signin.html in the SYSTEM
//      browser — our own origin, ordinary cookies, Clerk's own sign-in card
//   2. that page signs the person in, then asks the server for a ticket:
//      POST /api/native/ticket, behind requireUser, minted with the secret key
//   3. it redirects to com.firstpersonlearn.app://sso-callback?ticket=… and iOS
//      hands that URL to this app
//   4. signIn.create({ strategy: 'ticket', ticket }) redeems it and setActive
//      signs in, after which Clerk holds the session as it would anywhere
//
// The ticket is single-use and lives about a minute — the window between the
// browser redirecting and this redeeming. Google is never opened by us at all,
// so `disallowed_useragent` cannot arise either.
//
// WHY clerk.native.js AND standardBrowser:false. clerk-js assumes it can set a
// cookie on the page's own domain. It cannot here, so it is loaded in the mode
// Clerk ships for native platforms, where the client is kept as a token instead.
// It is served from our own Clerk instance rather than bundled: signing in needs
// the network by definition, and a bundled copy is a second version of Clerk to
// keep up to date. localStorage is what makes the session survive a relaunch — a
// web view has it, which is why no token cache of the kind @clerk/expo needs is
// wired up here.
//
// WHAT IS NOT HERE: the provider. This file knows nothing about Google or Apple
// now. The browser page owns that, which is also why adding a provider is a
// change to one page and not to the app.
(function (root) {
  'use strict';

  // The one fact this file holds. The Clerk host is DERIVED from it — a
  // publishable key is base64 of the instance's own frontend host with a "$" on
  // the end — so the key and the host cannot disagree. scripts/set-clerk-key.mjs
  // rewrites this line along with the two HTML pages; the same script's --check
  // reports all three.
  var PUBLISHABLE_KEY = 'pk_live_Y2xlcmsuZmlyc3RwZXJzb25sZWFybi5jb20k';

  // Registered in ios/App/App/Info.plist as CFBundleURLTypes. Change it in one
  // place and the sign-in silently never returns: iOS hands the redirect to
  // nobody and the browser sheet just sits there.
  var SCHEME = 'com.firstpersonlearn.app';
  var REDIRECT = SCHEME + '://sso-callback';

  // v6, because clerk.native.js does not exist in v5 — the web pages are still
  // on 5 and that is a real difference between the two surfaces, not an
  // oversight. Both are served by the same instance.
  var CLERK_MAJOR = 6;

  function hostFromKey(key) {
    var body = key.replace(/^pk_(test|live)_/, '');
    var decoded = atob(body);
    if (decoded.charAt(decoded.length - 1) !== '$') {
      throw new Error('publishable key does not decode to a Clerk host');
    }
    return decoded.slice(0, -1);
  }

  var clerk = null;
  var loading = null;

  function plugin(name) {
    var C = root.Capacitor;
    return (C && C.Plugins && C.Plugins[name]) || null;
  }

  function scriptURL() {
    return 'https://' + hostFromKey(PUBLISHABLE_KEY)
      + '/npm/@clerk/clerk-js@' + CLERK_MAJOR + '/dist/clerk.native.js';
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var el = document.createElement('script');
      el.src = src;
      el.async = true;
      el.onload = resolve;
      el.onerror = function () { reject(new Error('Clerk could not be reached')); };
      document.head.appendChild(el);
    });
  }

  // Where the client lives between page loads. One key, and it is Clerk's own
  // name for it so that anything else reading the same web view agrees.
  var JWT_KEY = '__clerk_client_jwt';

  function readJWT() {
    try { return root.localStorage.getItem(JWT_KEY) || ''; } catch (e) { return ''; }
  }
  function writeJWT(v) {
    // Wrapped because a web view with site data blocked throws on both, and a
    // session that cannot be remembered is still a session that works right now.
    try {
      if (v) root.localStorage.setItem(JWT_KEY, v);
      else root.localStorage.removeItem(JWT_KEY);
    } catch (e) { /* not fatal: this load stays signed in, the next will not */ }
  }

  // Attach the stored client on the way out, keep the returned one on the way
  // back. Both hooks are best-effort: a throw in either would take down every
  // Clerk request, and the worst honest outcome of failing here is being signed
  // out, not being broken.
  // The two hook names, newest first. clerk-js renamed them from __unstable__ to
  // __internal_ in v6 — same signatures, same job — and a build carrying only
  // one of the two names is how "the sign-in works and never survives a reload"
  // arrives with nothing in the log to say why. Named rather than assumed, so
  // the next rename is one entry rather than a rewrite.
  var HOOKS = [
    { before: '__internal_onBeforeRequest', after: '__internal_onAfterResponse' },
    { before: '__unstable__onBeforeRequest', after: '__unstable__onAfterResponse' },
  ];

  function hookNames(c) {
    for (var i = 0; i < HOOKS.length; i++) {
      if (typeof c[HOOKS[i].before] === 'function' && typeof c[HOOKS[i].after] === 'function') {
        return HOOKS[i];
      }
    }
    return null;
  }

  function cacheHooks(c) {
    var h = hookNames(c);
    if (!h) {
      // Say what IS there. "No hooks" is a dead end on its own — the names moved
      // between clerk-js majors, and the whole question is which name this build
      // uses. Prototype as well as own properties, because a class instance
      // carries its methods on the prototype and Object.keys sees none of them.
      var names = [];
      try {
        var o = c;
        while (o && o !== Object.prototype) {
          Object.getOwnPropertyNames(o).forEach(function (k) {
            if (k.indexOf('__') === 0 && names.indexOf(k) === -1) names.push(k);
          });
          o = Object.getPrototypeOf(o);
        }
      } catch (e) { names.push('(could not enumerate: ' + e.message + ')'); }
      console.warn('[auth] no request hooks under any known name. version='
        + (c.version || (root.Clerk && root.Clerk.version) || '?')
        + ' internals=' + names.join(','));
      return;
    }
    c[h.before](function (requestInit) {
      try {
        requestInit.credentials = 'omit';
        if (requestInit.url && requestInit.url.searchParams) {
          requestInit.url.searchParams.append('_is_native', '1');
        }
        var jwt = readJWT();
        if (requestInit.headers && jwt) requestInit.headers.set('authorization', jwt);
      } catch (e) { /* leave the request as it was */ }
    });
    c[h.after](function (_req, response) {
      try {
        // WHERE THE CLIENT COMES BACK. The header first, because that is what
        // clerk-expo reads and it is the one place the value is guaranteed to
        // be — the body carries it only on some responses, and reading only the
        // body is why the first version of this stored nothing at all while
        // every hook fired correctly.
        var jwt = '';
        var from = '';
        if (response && response.headers && typeof response.headers.get === 'function') {
          jwt = response.headers.get('authorization') || '';
          if (jwt) from = 'header';
        }
        if (!jwt) {
          var payload = response && (response.payload || response);
          jwt = (payload && payload.client && payload.client.jwt)
             || (payload && payload.jwt) || '';
          if (jwt) from = 'payload';
        }
        if (!jwt) return;
        writeJWT(jwt);
        // Once per page load, and only the first time: this fires on every
        // Clerk request, and a log line per request is a log nobody reads.
        if (!cacheHooks.said) {
          cacheHooks.said = true;
          console.log('[auth] client stored from ' + from
            + ', readback=' + (readJWT() ? 'ok' : 'FAILED'));
        }
      } catch (e) {
        if (!cacheHooks.said) {
          cacheHooks.said = true;
          console.warn('[auth] could not keep the client: ' + e.message);
        }
      }
    });
  }

  // Load Clerk once. Resolves with null rather than throwing when there is no
  // network: a player who opened the app on a train is playing offline, and the
  // shelf has to draw for them.
  function load() {
    if (clerk) return Promise.resolve(clerk);
    if (loading) return loading;
    loading = loadScript(scriptURL())
      .then(function () {
        var Ctor = root.Clerk && root.Clerk.Clerk ? root.Clerk.Clerk : root.Clerk;
        if (typeof Ctor !== 'function') throw new Error('Clerk did not load');
        var c = new Ctor(PUBLISHABLE_KEY);
        // The whole reason for the native build: cookies cannot be set here.
        //
        // AND THE HALF THAT COOKIES WERE ALSO DOING. In standardBrowser mode a
        // cookie carries the client between page loads without anybody writing
        // code. Turning it off does not move that job to localStorage by itself
        // — clerk-js hands the client JWT back on every response and expects the
        // host to keep it and send it up again, which is what @clerk/expo's
        // token cache does. Without these two hooks the sign-in works perfectly,
        // the session is active, and the very next page load starts signed out:
        // the browser opens, closes, the page reloads, and there is a Sign in
        // button again, which reads as a sign-in that did nothing.
        //
        // `_is_native=1` is what makes Clerk put the client JWT in the response
        // body at all, and `credentials: omit` stops the browser attaching a
        // cookie that cannot be set from capacitor://localhost anyway.
        cacheHooks(c);
        return c.load({ standardBrowser: false }).then(function () { return c; });
      })
      .then(function (c) {
        clerk = c;
        // One line, at boot, saying whether the session survived the last page
        // load and whether the machinery that should make it survive is even
        // present. Capacitor forwards this into the Xcode console, which is the
        // only log anybody can read on a device without attaching Safari — and
        // Safari's inspector drops its target on every relaunch, which is every
        // time you would want it. Cheap enough to keep: one line per boot, no
        // secret in it, and the three facts that separate "not signed in" from
        // "signed in and not remembered" from "this build cannot remember".
        var found = hookNames(c);
        var canStore = 'no';
        try {
          root.localStorage.setItem('__fpl_probe', '1');
          canStore = root.localStorage.getItem('__fpl_probe') === '1' ? 'yes' : 'no';
          root.localStorage.removeItem('__fpl_probe');
        } catch (e) { canStore = 'threw:' + e.name; }
        console.log('[auth] storage=' + canStore
          + ' hooks=' + (found ? found.before : 'none')
          + ' storedClient=' + (readJWT() ? 'yes' : 'no')
          + ' session=' + (c.session ? 'yes' : 'no')
          + ' user=' + (c.user ? 'yes' : 'no'));
        // Every request asks for a token rather than being given one, because a
        // Clerk session token lives about a minute. getToken() serves a cached
        // one and refreshes it near expiry.
        root.FPL_API.setTokenProvider(function () {
          return clerk && clerk.session ? clerk.session.getToken() : null;
        });
        return c;
      })
      .catch(function (e) {
        loading = null;
        console.warn('sign-in unavailable:', e.message);
        return null;
      });
    return loading;
  }

  // The deep link. iOS delivers it to the app, not to the browser sheet, so this
  // listener is the only way the flow can finish — and it is registered before
  // the browser is opened, because a fast provider can come back first.
  function waitForCallback() {
    return new Promise(function (resolve, reject) {
      var App = plugin('App');
      if (!App) return reject(new Error('no App plugin: cannot receive the redirect'));
      var done = false;
      var handle = App.addListener('appUrlOpen', function (ev) {
        if (done || !ev || !ev.url || ev.url.indexOf(SCHEME + '://') !== 0) return;
        done = true;
        remove();
        resolve(ev.url);
      });
      // A player who cancels in the browser sends nothing at all, so the wait
      // has to end on its own or the promise is held for the session.
      var timer = setTimeout(function () {
        if (done) return;
        done = true;
        remove();
        reject(new Error('sign-in was not completed'));
      }, 5 * 60 * 1000);
      function remove() {
        clearTimeout(timer);
        Promise.resolve(handle).then(function (h) { if (h && h.remove) h.remove(); });
      }
    });
  }

  function ticketFrom(url) {
    var q = url.indexOf('?');
    if (q < 0) return '';
    return new URLSearchParams(url.slice(q + 1)).get('ticket') || '';
  }

  // Where the browser signs in. An absolute URL on the deployment, because the
  // page has to be on an origin Clerk trusts — a bundled copy would be
  // capacitor://localhost again, which is the whole problem.
  function signInURL() {
    return (root.FPL_API.base || 'https://firstpersonlearn.com') + '/native-signin.html';
  }

  /* Sign in. Resolves with the signed-in user, or rejects with something worth
   * showing. Takes no provider: which providers exist is the browser page's
   * business, so adding one is a change there and not here. */
  function signIn() {
    var Browser = plugin('Browser');
    return load().then(function (c) {
      if (!c) throw new Error('no connection to the sign-in service');
      // The listener goes on FIRST. Opening the browser and then listening is a
      // race the redirect can win, and somebody already signed in in Safari
      // comes straight back — the common case rather than the rare one.
      var back = waitForCallback();
      var opened = Browser
        ? Browser.open({ url: signInURL(), presentationStyle: 'popover' })
        : Promise.resolve(root.open(signInURL(), '_blank'));
      return opened
        .then(function () { return back; })
        .then(function (url) {
          if (Browser) Browser.close().catch(function () {});
          var ticket = ticketFrom(url);
          if (!ticket) throw new Error('the browser came back with no ticket');
          // A ticket is a sign-in strategy like any other, so this is the same
          // call an email code would make.
          return c.client.signIn.create({ strategy: 'ticket', ticket: ticket });
        })
        .then(function (si) {
          var session = si && si.createdSessionId;
          if (!session) throw new Error('the ticket did not produce a session');
          return c.setActive({ session: session });
        })
        // Resolving with `c.user` was wrong, and wrong in the way that is hardest
        // to see: setActive does not populate `clerk.user` synchronously, so a
        // sign-in that had entirely succeeded resolved `null`, the caller read
        // null as failure, put the button back, and logged nothing — because
        // nothing had thrown. From the phone it looks like the browser opens,
        // closes, and nothing happens.
        //
        // Getting here at all means the ticket was redeemed and a session was
        // made active. That IS the success condition, so it is what is returned.
        // The user object follows on its own and the caller reloads anyway.
        .then(function () { return c.user || (c.session && c.session.user) || true; });
    });
  }

  function signOut() {
    // The stored client is cleared FIRST. If signOut succeeds and this throws,
    // the next page load restores the session somebody just ended — and the
    // reverse order is how that happens.
    writeJWT(null);
    return load().then(function (c) { return c ? c.signOut() : null; });
  }

  // Called at boot. Answers who is signed in, or null — never throws, because
  // the shelf draws either way.
  function restore() {
    return load().then(function (c) { return (c && c.user) || null; });
  }

  /* ---------------------------------------------------------------- the bar
   *
   * The app needs one control the web does not: something to press to sign in,
   * and something to press to sign out. It is injected from here rather than
   * written into games/index.html because it exists only inside the app — a
   * button on the web shelf that did nothing would be worse than no button, and
   * the shelf already has Clerk's own pages for this.
   *
   * It is put on the SHELF ONLY, found by the account element the shelf owns. A
   * game page must not carry it: signing out halfway through a campaign, from a
   * bar over the world, is not a control anybody asked for.
   */
  function shelfHost() {
    return document.getElementById('account') ? document.body : null;
  }

  function bar() {
    var el = document.getElementById('nativeAuthBar');
    if (el) return el;
    var host = shelfHost();
    if (!host) return null;
    el = document.createElement('div');
    el.id = 'nativeAuthBar';
    el.setAttribute('style', [
      'position:fixed',
      'z-index:60',
      'right:calc(14px + env(safe-area-inset-right))',
      'top:calc(12px + env(safe-area-inset-top))',
      'display:flex',
      'gap:8px',
      'align-items:center',
      'font:600 13px/1 Inter,ui-sans-serif,system-ui,-apple-system,sans-serif'
    ].join(';'));
    host.appendChild(el);
    return el;
  }

  function button(label, onTap) {
    var b = document.createElement('button');
    b.type = 'button';
    b.textContent = label;
    b.setAttribute('style', [
      'appearance:none',
      'border:1px solid rgba(255,255,255,.22)',
      'border-radius:999px',
      'padding:9px 15px',
      'background:rgba(255,255,255,.10)',
      'color:#fff',
      'font:inherit',
      'backdrop-filter:blur(8px)'
    ].join(';'));
    b.addEventListener('click', onTap);
    return b;
  }

  function draw() {
    var el = bar();
    if (!el) return;
    el.textContent = '';
    var user = (clerk && clerk.user) || null;
    if (user) {
      // The shelf draws the account header itself once /api/auth/user answers,
      // so this side only needs the way out.
      el.appendChild(button('Sign out', function () {
        signOut().then(function () { location.reload(); });
      }));
      return;
    }
    var b = button('Sign in', function () {
      b.disabled = true;
      b.textContent = 'Signing in…';
      signIn()
        // A resolve is a session. There is no third outcome to branch on: every
        // way of not being signed in throws, and the old `if (u)` turned the
        // commonest success into a silent no-op.
        .then(function () { location.reload(); })
        .catch(function (e) {
          // On a phone a console warning is nothing at all. Whoever pressed this
          // watched a browser open and close, and has to be told what happened
          // or the only thing they learn is not to press it again.
          console.warn('sign-in failed:', e.message);
          reset(e.message || 'that did not work');
        });
      function reset(why) {
        b.disabled = false;
        b.textContent = 'Sign in';
        if (why && b.parentNode) {
          var note = b.parentNode.querySelector('.signInNote');
          if (!note) {
            note = document.createElement('p');
            note.className = 'signInNote';
            note.style.cssText = 'margin:8px 0 0;font-size:13px;color:#e8737f';
            b.parentNode.appendChild(note);
          }
          note.textContent = 'Sign-in failed: ' + why;
        }
      }
    });
    el.appendChild(b);
  }

  // Boot. The restore is held in front of the first API request rather than
  // raced with it: the shelf asks /api/auth/user immediately, and without the
  // gate that request leaves before the token exists, answers 401, and the app
  // reads as having forgotten who was signed in.
  function boot() {
    if (!root.FPL_API || !root.FPL_API.bundled) return;
    var restored = restore();
    root.FPL_API.waitFor(restored);
    restored.then(draw, draw);
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', boot);
    } else {
      boot();
    }
  }

  root.FPL_AUTH = {
    // Only the app needs any of this; on the web the cookie has already done it.
    needed: function () { return !!(root.FPL_API && root.FPL_API.bundled); },
    load: load,
    restore: restore,
    signIn: signIn,
    signOut: signOut,
    get user() { return (clerk && clerk.user) || null; },
    draw: draw,
    redirectUrl: REDIRECT,
    scheme: SCHEME,
    publishableKey: PUBLISHABLE_KEY,
    // Exposed for scripts/test-native-auth.js. Reading the ticket off the
    // callback URL is the one step of the flow that is pure, and getting it
    // wrong produces a sign-in that completes and grants nothing.
    ticketFrom: ticketFrom,
    signInURL: signInURL,
    hostFromKey: hostFromKey
  };
})(typeof window !== 'undefined' ? window : globalThis);
