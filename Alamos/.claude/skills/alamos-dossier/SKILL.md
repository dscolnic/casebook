---
name: alamos-dossier
description: The cream-on-dark reading dossier — cover, curriculum page, every phase's warm-up/level/question/closing cards, appendix, ending — as a published Artifact for any campaign. Built by tools/make-dossier.mjs from the theme's own normalized content, nothing hand-authored. Read when the user asks for "the dossier", "the nice book with the cards", or to publish/update/refresh one for a campaign.
---

# The dossier

A dossier is the whole campaign laid out as one long reading page: cover, a
curriculum page (equations and concepts, with tier tags and links down to the
card that teaches each), every phase's warm-up card, level card and question
cards, a closing card off each phase's own `segue`, an appendix for any lesson
the day walk never reaches, and the ending. First built by hand for Planetary
Defense; `gamekit/tools/make-dossier.mjs` now builds one for any registered
theme from its own already-normalized content — nothing in it is hand-typed
prose, so it never drifts from the game.

## Make one

```sh
cd gamekit
npm run dossier <theme>          # or: node tools/make-dossier.mjs <theme>
```

Writes `books/dossier/<theme>-dossier.html` (gitignored — regenerate, don't
commit, same as `books/print/`). The command's own output line says the stop
count and, if this campaign uses a format the tool has no bespoke renderer
for, names it — the card still renders (see "New formats" below), so this is
informational, not a failure.

## Publish it

1. **Find whether one already exists for this campaign.** `Artifact` with
   `action: "list"` and look for a title `"<Campaign Title> Dossier"`. If
   found, republish to *that* `url` so the link stays stable. If not, this is
   a new artifact.
2. **Load `artifact-design`** before the first publish of a new campaign's
   dossier (required by the Artifact tool) — but the visual system here is
   already a settled, deliberate choice the user asked to keep exact across
   campaigns. Do not redesign it; the skill load is a formality, not an
   invitation to vary the palette per game.
3. **Publish**, `file_path` = the generated HTML, `title` = `"<Campaign
   Title> Dossier"` (matches the in-page cover title), `description` = one
   sentence naming what changed if this is an update, or what the dossier
   covers if new, `favicon` = **the same emoji every time for that campaign**
   — pick one on first publish (thematic: `☄️` asteroid, `🦠` outbreak, `⚡`
   electrical, whatever fits) and keep it stable on every later republish, the
   same rule as any other artifact.
4. If the publish is refused as "identical to an already-refused newer
   version" after you've already read that version in full and confirmed via
   `action: "read"` that it's just this same tool's own earlier output (not a
   person's manual edit sitting in the artifact) — `force: true` is
   appropriate. If a comment thread or an edit inside the artifact shows real
   human changes, merge those in before republishing instead.

## When to regenerate

Any time the underlying book changes — a story-spine pass, a `why`/blurb
rewrite, a scene edit, a new mission — the dossier is stale until re-run. It
reads `theme.js` + the generated `content/` files, the same output
`node tools/import-book.mjs books/<theme>.yml <theme> --verify` produces, so
**rebuild the theme first** if you just edited the book, then re-run the
dossier command, then republish.

## New formats

`RENDERERS` in `make-dossier.mjs` has a bespoke panel for 18 formats, built up
two campaigns at a time (DIAGNOSIS/CHAIN/CONTROL/ALLOCATE for Outbreak:
Riverton; CLOUD/DEGENERACY/INJECT/VERIFY for Planetary Defense). Anything else
falls through to `genericHTML`, which looks for a `.hint` and the first array
of labelled items in the format's own payload — safe, never renders
`undefined` or `[object Object]`, but plainer than a bespoke one. Verified
clean (no bespoke renderer needed to avoid garbage output) across Quantum,
The Trial, Sightline, Ground Truth, Safety Factor and Ghost Light — between
them every one of the 35 catalogued formats has been exercised at least once.

Worth writing a bespoke renderer when the generic one is visibly worse than
the game deserves: read the actual field shape first —

```sh
node --input-type=module -e "
const theme = (await import('./themes/<theme>/theme.js')).default;
const { normalizeContent } = await import('./engine/content/normalize.js');
normalizeContent(theme.content);
const C = theme.content.CURRICULUM;
for (const g of Object.keys(C)) C[g].forEach((l, i) => {
  if ((l.game?.type || '').toUpperCase() === '<FORMAT>') console.log(JSON.stringify(l.game, null, 1));
});
"
```

then add one function beside the others in `make-dossier.mjs`, matching the
existing card language — `.chanList` for a dependency/claim/link list,
`.dataTable` for rows of numbers, `.tiles` for a pool of costed options,
`<div class="est">…<p class="estSolution">` as the outer wrapper unless the
format already renders its own container (VALUE's `.valBox`, BELT's
`.beltBox`, CHOICE/SEQUENCE/PROTOCOL/DIAGNOSIS render bare) — then add the
format to the `RENDERERS` map and, if it needs its own box class, to `BOXED`/
`BOX_CLASS`.
