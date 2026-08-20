# First Person Learning on a phone or tablet

Two products, different cost, and the first one is worth having whatever you
decide about the second:

| | What it is | Cost | Review |
| --- | --- | --- | --- |
| **PWA** | Add to Home Screen from Safari. Full screen, offline, its own icon | nothing | none |
| **App Store** | A real listing, installable from the store | $99/yr + a Mac | days to weeks |

School iPads very often block App Store installs outright, so for classroom use
the PWA is not the consolation prize — it is frequently the only route that
works. Ship it regardless.

*This file used to describe putting `casebook.html` on a phone. That game is
retired — `server/index.js` redirects it to the shelf — so everything below is
about the app: the shelf at `/games/` and the campaigns under it.*

---

## The PWA

Already wired up, nothing to build:

- `manifest.webmanifest` — name, icons, `start_url: /games/`, scope `/`
- `sw.js` + `sw-policy.js` — the offline worker and its rules
- `offline.html` — what a page that was never opened online falls back to
- `icon-180.png`, `icon-192.png`, `icon-512.png`
- `games/index.html` links the manifest and registers the worker

To install: open the deployed site in **Safari** on the device, **Share → Add to
Home Screen → Add**. It launches full screen with no browser chrome.

**It must be https.** A service worker needs a secure context, so the Replit
deployment URL or a custom domain works and a plain LAN address does not. The
shelf checks for this and simply does not register a worker otherwise, which is
why `python3 -m http.server` over Wi-Fi looks fine and has no offline.

### What is held offline, and what is not

- **The shelf, the catalogue, the icons and the offline card** are precached the
  first time the shelf is opened.
- **A game is saved when you open it**, in full — its HTML and every asset. All
  twenty-nine builds come to 37 MB, and precaching the lot before showing
  anything is a first visit nobody waits out, so it is deliberately per game.
- **Nothing is served stale while online.** Pages, the catalogue and hero shots
  go to the network first; only Vite's content-hashed asset files are read from
  the cache without asking, and those are immutable — the hash in the filename
  *is* the version. This is the rule the worker before this one broke, which is
  why it was replaced by one that deleted every cache and unregistered itself.
- **Signing in and saving need the network.** The engine keeps campaigns in
  localStorage and syncs them through `/api/save` when it can, so a game played
  offline is not lost — but it is on that device until it next reaches the
  server.

### Testing it

```sh
npm run test:sw     # 23 cases and 10 traps over sw-policy.js
```

Each trap puts one specific bug back and asserts it breaks exactly the cases it
claims. The one that matters: **every path on this app is behind a sign-in gate
that answers 302 to `/sign-in.html`**, and a service worker fetch follows that
redirect and hands back a perfectly good 200 whose body is the sign-in form.
Store it under a game's URL and the player who next opens that game offline gets
a sign-in page for ever, with nothing to tell them that is what happened. It
looks exactly like the cache working.

A checker cannot see whether the worker is *wired up*, so the browser half was
driven by hand: register from the shelf, open a game, stop the server, and
confirm the visited game still boots to its HUD while an unvisited one gets
`offline.html`. Two things to know if you repeat it — CDP's
`Network.emulateNetworkConditions` applies to the page target and **not** to the
service worker's own fetches, so "offline" under it is not offline and a game
that never was cached will appear to load; and probing `/games/games.json` to
check the server is down measures the worker's own cache. Stop the server, and
probe an `/api/` path.

---

## The App Store

The PWA is the fallback while this is in progress.

### 1. Hosting first

A reviewer opens your live URL, and a sleeping instance is a rejection.

1. A custom domain.
2. A Replit **Reserved VM** deployment — not Autoscale, which kills the
   WebSockets `server/rooms.js` needs for co-op rooms.
3. A Clerk **production** instance on that domain, with production Google OAuth
   credentials. Development keys are rate-limited and bound to the dev domain.

### 2. The two likely rejections, both already addressed in code

**Guideline 4.2, minimum functionality.** A web view pointing at the site gets
rejected as a thin wrapper. The fix is to bundle `games/` *into* the app and use
the network only for auth and saves — offline play is the native capability that
clears it. Use Capacitor rather than hand-rolled Swift; `webDir` points at the
static bundle and `npx cap add ios` produces the Xcode project.

```sh
npm i @capacitor/core @capacitor/cli @capacitor/ios
npx cap init && npx cap add ios
```

`casebook_ios/CasebookApp.swift` is a minimal SwiftUI + WKWebView shell that
bundles the one retired game. Keep it as a Mac-side dev toy; it is not the
shipping shell.

**Guideline 5.1.1(v), account deletion.** An app that lets somebody create an
account must let them delete it *inside the app*; a link to a support address
does not satisfy it. Done: **Delete account** in the shelf header, behind a typed
confirmation, calling `DELETE /api/account`.

What that route erases, and why it is safe to have:

- One `DELETE FROM users`, cascading to saves, results, streaks, the classes the
  user teaches and their rosters, and their own class memberships.
- The Clerk account itself, which invalidates every session.
- Live sockets and unspent room tickets, via `forgetUser` — a foreign key cannot
  see those, so a deleted account with a tab open would otherwise keep playing.
- Every cache on the device, so campaigns are not left readable there.
- **Postgres before Clerk**, deliberately: that failure is recoverable because
  the session is still live and the caller can retry. The other order leaves rows
  nobody can ever reach, because the account that owned them cannot sign in.
- **Rooms are left standing.** `rooms.owner_id` is `ON DELETE SET NULL`: a room
  is one campaign several people share, and deleting the account that created it
  would take away everybody else's game. The row holds no personal data of the
  leaver.

### 3. Still to do

- **Google sign-in is blocked inside a WKWebView** — Google answers
  `disallowed_useragent`. It must open through `ASWebAuthenticationSession`
  (Capacitor: `@capacitor/browser` with Clerk's redirect flow). This works in
  Safari and fails on device, so test it on real hardware early.
- **A public privacy policy URL.** Required; there is no submission without one.
- **Age rating.** Rate 4+ but do **not** enter the Kids Category, which bans
  third-party analytics, requires a parental gate on every external link, and
  pulls COPPA in hard — none of which sits well with Google sign-in. If under-13
  accounts are real, teacher-provisioned accounts through `server/classes.js` are
  the cleaner path: the school supplies consent and no child email is collected.
- **App Privacy questionnaire**: email (Clerk), user content (game saves),
  identifiers.
- **Device fitness on a real iPad**: WKWebView's memory ceiling against three.js
  (Red Sand is the worst case at ~1,500 draw calls a frame), landscape lock in
  the plist, rubber-band scroll off, safe-area insets.
- **Apple Developer Program**, $99/yr. Individual enrolment takes about a day;
  Organization needs a D-U-N-S number and takes weeks.
- **Assets**: 1024px icon with no alpha, iPhone 6.9" and iPad 13" screenshots,
  description, keywords, support URL, category Education.
- **TestFlight before submitting.** It is where the Google sign-in failure shows
  up.

## Regenerating the icons

```sh
cd casebook_pwa && node make_icons.js && cp icon-*.png ..
```
