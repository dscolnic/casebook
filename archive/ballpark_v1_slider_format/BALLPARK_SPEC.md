# Ballpark — authoring spec (ChatGPT handoff)

**How to use:** open ChatGPT, **attach `ballpark_prototype.html`** (it's the engine *and* three worked
examples), paste everything under the line, ask for new questions. Each new question is one object added to the
`QUESTIONS` array. Save, reload the file, play.

---

## What Ballpark is

An estimation game. Skill: **decompose a hard "how many / how much" question into factors, estimate it several
*independent* ways, and trust the number when the ways converge.** One screen:

- The player **drags factor tiles into three equations**, each `[ factor ] [op] [ factor ] = result`, choosing
  the operator **× / ÷ / +** themselves. An equation is valid **iff its units cancel to the target unit** (so
  the correctness rule teaches *dimensional analysis*, and the player has to reason ×-vs-÷ and numerator order).
- Each placed factor gets a **log-scale slider**; the player dials an estimate, and all three answers update
  live with a **convergence readout** ("your three span 4.2× — nudge them together").
- Two tiles are **decoys** whose units can't reach the target. `+` is available and, for these questions, always
  wrong (you can only add *like* units) — a free lesson.
- **Reveal:** each method scores by closeness to truth (within 2× / 5× / 10×) **plus a convergence bonus** when
  the three agree; minus a hint penalty. A **hint** names one factor that's off and says slide it higher/lower.

## The question schema (one entry in `QUESTIONS`)

```js
{ id:'pyramid',
  q:"How many stone blocks are in the Great Pyramid of Giza?",
  target:'block',                  // the unit the answer is counted in
  unitName:'blocks',               // plural word shown to the player
  trueVal:2.3e6, trueLabel:"≈ 2.3 million blocks",
  cd:"history · volume · mass · courses",     // picker subtitle: name the 3 independent handles
  blocks:[                         // 8 tiles = 3 methods × 2 factors (6) + 2 decoys
    // unit is a fraction of unit TOKENS; lo/hi are log-slider bounds (broad; truth reachable inside)
    {id:'vol', lb:'Volume of the pyramid', un:'cubic meters', unit:{n:['m3'],d:[]},        exp:2.6e6, lo:1e5, hi:1e8},
    {id:'vpb', lb:'Volume per block',      un:'m³ / block',   unit:{n:['m3'],d:['block']}, exp:1.1,   lo:0.1, hi:1e2},
    // …mass/mpb, courses/bpc…  then two decoys (also give them lo/hi in case they're dragged in):
    {id:'yrs', lb:'Years to build',        un:'years',        unit:{n:['year'],d:[]},      exp:20,    lo:1, hi:1e3}   // decoy
  ],
  methods:[['vol','vpb'],['mass','mpb'],['courses','bpc']]  // the 3 intended pairings — for the VERIFY step only
}
```

- **The operator and numerator order are chosen by the *player* at runtime** — you do **not** specify them. The
  engine tries ×, A÷B, B÷A and validates by units. You only supply each factor's `unit`.
- `unit` tokens: e.g. "volume per block" = `m³/block` → `{n:['m3'],d:['block']}`.
- `exp` = expert/reference value (drives the reveal's "expert ≈ …" **and** the hint's too-high/too-low). Must be
  genuinely accurate — order-of-magnitude right is enough, but don't invent precise fictions.
- `lo` / `hi` = log-slider bounds for that factor (see below). Needed on all six method factors; give decoys
  bounds too so a mistaken drag still renders a slider.

## Log-slider bounds (`lo`/`hi`)

- Span **~3–4 orders of magnitude** of plausible values — wide enough that setting the slider takes real
  judgment, narrow enough to be usable.
- The true/expert value must sit **inside** `[lo,hi]` but **not dead-center** (geometric midpoint = giveaway).
  Use round powers of ten. Example: population `lo:1e6, hi:1e9` (expert 3.4e8 sits high, not centered).

## HARD RULES (verify every question)

1. **Exactly the 3 intended pairs cancel to the target — no more, no fewer.** No accidental valid pairs (incl.
   decoy+real or cross-method), under *any* operator/order. The verify snippet enumerates all pairs.
2. **The two decoys never cancel** to the target with anything.
3. **The 3 methods are genuinely independent** — different *handles* on the quantity (population vs geography vs
   a count; words vs verses vs pages; volume vs mass vs courses). Not one decomposition relabeled.
4. **Expert values converge:** all three land within ~**3×** of each other and near `trueVal`.
5. **`lo`/`hi` on every method factor**, ~3–4 orders wide, truth inside but off-center.
6. **Distinct unit tokens.** ⚠️ The units rule is necessary but **not sufficient when two factors share a
   dimension.** In finance, "earnings" and "dividends" are both `$/year`, so the engine can't tell them apart and
   would accept a wrong pairing. Fix: choose 3 methods whose factors use **distinct** unit tokens (we used
   companies / earnings / shares, not earnings + dividends). Avoid two flows measured in the same unit.
7. **Accurate `exp` and `trueVal`.** Facts real; it powers both the reveal and the hint.

## Difficulty knobs (optional)

- A factor that **legitimately fits two methods** (shares a token) — forces real thought (keep the intended
  pairing unique per rule 1).
- A decoy whose units **almost** cancel (off by one token).
- Tighter truth band / a 4th method.

## Output format

For each requested question return **one `QUESTIONS` object** in a code block, then a self-check line:
`<id>: 3 methods [pairs] · decoys reject · expert spread N.Nx · true ≈ V · lo/hi ok`.
One question per reply; span disciplines (history, science, finance, language, sports, arts, everyday).

## Verify snippet (run on every question)

```js
function net(n,d){n=n.slice();d=d.slice();for(let i=n.length-1;i>=0;i--){const j=d.indexOf(n[i]);if(j>=0){n.splice(i,1);d.splice(j,1);}}return{n,d};}
const isT=(r,t)=>r.n.length===1&&r.n[0]===t&&!r.d.length;
function tp(A,B,t){const c=[{k:'mul',n:A.unit.n.concat(B.unit.n),d:A.unit.d.concat(B.unit.d)},
 {k:'ab',a:A,b:B,n:A.unit.n.concat(B.unit.d),d:A.unit.d.concat(B.unit.n)},
 {k:'ab',a:B,b:A,n:B.unit.n.concat(A.unit.d),d:B.unit.d.concat(A.unit.n)}];
 for(const o of c) if(isT(net(o.n,o.d),t)) return o; return null;}
function check(Q){const bl=Q.blocks,hits=[];
 for(let i=0;i<bl.length;i++)for(let j=i+1;j<bl.length;j++)if(tp(bl[i],bl[j],Q.target))hits.push(bl[i].id+'+'+bl[j].id);
 const res=Q.methods.map(([a,b])=>{const A=bl.find(x=>x.id===a),B=bl.find(x=>x.id===b),o=tp(A,B,Q.target);
   return o.k==='mul'?A.exp*B.exp:(o.a.id===a?A.exp/B.exp:B.exp/A.exp);});
 const spread=Math.max(...res)/Math.min(...res);
 const bounds=Q.methods.flat().every(id=>{const f=bl.find(x=>x.id===id);return f.lo!=null&&f.hi!=null&&f.exp>=f.lo&&f.exp<=f.hi;});
 return {exactlyThree:hits.length===3, validPairs:hits, spread, convergent:spread<3,
         nearTruth:Math.max(...res.map(r=>Math.max(r/Q.trueVal,Q.trueVal/r)))<3, boundsOk:bounds};}
```
Good ⇔ `exactlyThree && convergent && nearTruth && boundsOk` all true.

## Gold examples

`ballpark_prototype.html` ships three, deliberately different in *shape*:
**gas stations** (everyday, count ÷ intensity), **letters in the Bible** (text, count × per-unit),
**Great Pyramid blocks** (history, total ÷ per-unit). A prior build also had **S&P 500 total value** (finance —
teaches "a P/E ratio has units of *years*"); reuse it, but heed rule 6. Copy the structure; keep the
**disciplines** varied.
