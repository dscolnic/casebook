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

### 1. Hosting — done

A reviewer opens your live URL, and a sleeping instance is a rejection.

1. A custom domain. **firstpersonlearn.com.**
2. A Replit **Reserved VM** deployment — not Autoscale, which kills the
   WebSockets `server/rooms.js` needs for co-op rooms.
3. A Clerk **production** instance on that domain, with production Google OAuth
   credentials. Development keys are rate-limited and bound to the dev domain.

### 1b. The two public pages — done

`privacy.html` and `support.html`, sharing `legal.css`. App Store Connect
requires a privacy policy URL and a support URL, and **both are opened by a
reviewer who has no account and will not make one.**

Which is the whole difficulty: every path on this app is behind a gate that
answers 302 to `/sign-in.html`, so behind it the privacy URL serves a sign-in
form and the submission is rejected under Guideline 5.1.1 — while the URL works
perfectly in every browser you would test it in, because you are signed in.

So the gate's exemption list came out of `server/index.js` into
**`server/publicPaths.js`**, one pure `isPublic(path)` with no database and no
Clerk keys behind it, and `scripts/test-public.js` puts 73 cases to it in Node.
Everything on that list fails silently behind the gate and that is what the
entries have in common: a manifest fetched without credentials that then does not
parse, so Add to Home Screen makes a bookmark instead of an app; a worker script
delivered as HTML, so registration fails; a `fetch()` whose JSON parser is handed
a sign-in page; a reviewer who sees a sign-in form where the policy should be.

Three things in that test worth keeping:

- **The ordering is asserted directly.** A gate that checks `getUserId()` first
  and the public list second redirects every page on the list while containing a
  correct and complete copy of it, and both halves read fine in review.
- **Each trap is diffed against a correct reference implementation, not against
  the live `isPublic`.** Diffing against the live one looks equivalent and is
  not: one real bug then fails every trap at once, and nine failures naming nine
  unrelated regexes is how a gate stops being read. The drift between reference
  and module is asserted once, on its own, and names the paths that moved.
- **The file has to exist.** A path can be perfectly public and simply not be
  there, and from App Store Connect the two are the same report.

The prose is written against `server/db.js` and the routes in `server/index.js`,
so **the policy is part of any change to either** — a policy describing last
month's columns is worse than none, because it is a statement of fact that is no
longer one. The test asserts the one claim that is a promise about code: that
`DELETE /api/account` still exists.

**Outstanding: the contact address.** Both pages carry
`support@firstpersonlearn.com`, which has to be a mailbox somebody reads — Apple
checks that the support URL works, and a policy with a dead address is worse than
no address.

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

**The part that is not a scaffold: every API path in this app is relative.** The
shelf calls `/api/auth/user`, `/api/saves` and `/api/account`, and the engine's
`cloudSave.js` calls `/api/save` and `/api/results`. In a Capacitor web view the
origin is `capacitor://localhost`, so all five resolve to the bundle and there is
no server there. Two halves to it:

- **Where.** An API base the pages read — absolute at `https://firstpersonlearn.com`
  in the app, empty on the web — set in one place, because five call sites each
  deciding is five chances to ship one that only fails on device.
- **How it authenticates.** The session cookie is not sent from
  `capacitor://localhost` to that origin, so the app has to send Clerk's token in
  an `Authorization: Bearer` header instead. **The server needs no change for
  this**: `clerkMiddleware()` reads headers as well as cookies, so `getUserId()`
  answers the same either way. Worth knowing before anybody rewrites
  `server/clerkAuth.js` for it.

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

- **Xcode.** Not installed — this Mac has Command Line Tools only
  (`xcode-select -p` gives `/Library/Developer/CommandLineTools`). It is ~10 GB
  from the Mac App Store and nothing native starts without it, so begin the
  download before anything else on this list.
- **Google sign-in is blocked inside a WKWebView** — Google answers
  `disallowed_useragent`. It must open through `ASWebAuthenticationSession`
  (Capacitor: `@capacitor/browser` with Clerk's redirect flow). This works in
  Safari and fails on device, so test it on real hardware early.
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
