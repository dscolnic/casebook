# Play Casebook on your iPhone

`casebook.html` is a single, fully self-contained, offline game. There are two
ways to run it as an iPhone app — pick one.

---

## Option A — Add to Home Screen (fastest, no Xcode)

This turns the game into a real full-screen icon on your home screen using the
PWA setup already wired into `casebook.html` (manifest, icons, offline service
worker).

You need the file served over the web (iOS won't install a home-screen app from
a raw `file://`). Easiest paths:

1. **Quick host:** drag the folder onto [app.netlify.com/drop](https://app.netlify.com/drop)
   (or push to GitHub Pages). Serve these files together from one folder:
   `casebook.html`, `manifest.webmanifest`, `sw.js`, `icon-180.png`,
   `icon-192.png`, `icon-512.png`.
2. On your iPhone, open the hosted `casebook.html` in **Safari**.
3. Tap **Share → Add to Home Screen → Add**.
4. Launch it from the new **Casebook** icon — it runs full-screen, no browser
   chrome, and works offline after the first load.

**Local test on your Mac (same-Wi-Fi):**
```
cd /Users/scolnic/code/Nuclear
python3 -m http.server 8000
```
Then browse from the iPhone to `http://<your-mac-LAN-ip>:8000/casebook.html`.
(Over plain LAN http the offline service worker won't register — the game still
runs online. Full offline needs https, i.e. a real host as above.)

---

## Option B — A real native app (Xcode, installs to your device)

Produces an actual `.app` you can run on your iPhone. A minimal SwiftUI +
WKWebView wrapper is in `casebook_ios/`.

1. Open **Xcode → New → Project → iOS → App**. Name it `Casebook`,
   Interface **SwiftUI**, Language **Swift**.
2. Delete the generated `ContentView.swift`/`<Name>App.swift` and drag in
   `casebook_ios/CasebookApp.swift` instead (it contains the App + the WebView).
3. Drag these into the project (check **"Copy items if needed"** and add to the
   app target so they're bundled as resources):
   `casebook.html`, `manifest.webmanifest`, `sw.js`,
   `icon-180.png`, `icon-192.png`, `icon-512.png`.
4. Select the project → **Signing & Capabilities** → pick your personal Apple ID
   team (free provisioning is fine for running on your own device).
5. Plug in your iPhone, select it as the run target, press **Run (⌘R)**.
   First run: on the phone, trust the developer profile under
   *Settings → General → VPN & Device Management*.

The app loads the bundled `casebook.html` straight from local storage, so it's
fully offline and needs no server. To ship new game content later, just replace
the bundled `casebook.html` and re-run.

---

## Regenerating the icons
```
cd casebook_pwa && node make_icons.js && cp icon-*.png ..
```
Emblem: a white magnifying glass on Bureau navy (`#163149`).
