# gamekit

**Bringing a new design document? Read `NEW_GAME.md` — it has the exact
sentence to say and the steps.**

One engine, many games. Read `THEME_CONTRACT.md` first — it is short, and it
documents the interface plus the five graphics rules that each cost real time
to learn twice.

```
engine/core     loop, player, interactions, state, save, simulation, question UI
engine/people   rig + crowd; only clothing changes per theme
engine/world    interiorSite, outdoorSite, materials, kit
engine/dev      audit (runtime), validateContent (content), shots (screenshots)
themes/         one directory per game
```

## Run it

```sh
npm install
THEME=contamcity npm run dev
```

`THEME` picks the theme; `vite.config.js` turns it into the `@theme` and
`@world` aliases the engine imports through. `themes/contamcity` (The
Contaminated City — college chemistry in a river city, outdoor) is the worked
example.

## Import content from a design document

The design books have a regular structure, so content is generated rather than
retyped:

There are two book shapes and one importer each. Run both with `--dry`; the one
that reports missions and activities is the right one.

```sh
# MISSION n / Activity n.m / SELECTED FORMAT
node tools/import-missionbook.mjs book.docx <theme> --dry
node tools/import-missionbook.mjs book.docx <theme> --map tools/<theme>-map.json

# SHIFT n • CASE m • FORMAT, with separate answer pages
node tools/import-designbook.mjs book.docx <theme> --map tools/my-shift-map.json
```

Which mission belongs to which area of study is a design decision, so the map is
supplied explicitly; the mission-book importer refuses to write without one.

It emits `content/missions.js`, `content/curriculum.js` and an
`import-report.json` listing anything it could not place. On the hospital design
book it extracts all 15 sessions and 45 activities — 28 multiple-choice with the
correct option matched, 17 step-ordering with the steps in order — plus scene
text, objectives, prompts, per-distractor rebuttals, takeaways and teacher
prompts. `tools/hospital-shift-map.json` is a worked example of a map file.

Nothing is guessed: the shift/case/format comes from the document's own
`SHIFT n • CASE m • FORMAT` marker lines, and unmatched sections are reported
rather than invented.

## Start a new game

```sh
cp -r themes/_template themes/airport
node tools/import-designbook.mjs airport-book.docx airport --map tools/airport-map.json
node engine/dev/validateContent.mjs airport     # content agrees with itself
node engine/dev/smokeCampaign.mjs  airport      # every stop is reachable
THEME=airport npm run dev
```

Group ids must agree across three files — `content/groups.js`, the `group:`
fields in `plan.js`, and the map you passed to the importer. The validator
catches every mismatch, so let it, rather than checking by hand.

Both exit non-zero, so either can gate a build, and they catch different things.
`smokeCampaign` plays all 15 missions headlessly through the real engine — it
exists because the first new theme had entirely valid content and two thirds of
its campaign unreachable. `validateContent` catches the class of bug that
actually shipped: a mission pointing at a renamed group, a lesson
index that does not exist, a group with no room to reach it, and a roster
truncated below the number of characters the missions name.

In the browser, call `reportAudit(scene, renderer, { people })` from
`engine/dev/audit.js` and fix what it prints before judging how a theme looks.

## Provenance

Extracted from two working games — `../project-y-fps` (Los Alamos, outdoor) and
`../Hospital/hospital-fps` (interior). Both still run from their own forked
copies and are untouched; migrate them when convenient. Files named `_ref_*.js`
under `engine/world` and `engine/people` are the originals kept for reference
while the generalisation is finished.
