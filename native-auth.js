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
        return c.load({ standardBrowser: false }).then(function () { return c; });
      })
      .then(function (c) {
        clerk = c;
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
