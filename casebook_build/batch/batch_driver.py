#!/usr/bin/env python3
"""
Casebook batch authoring driver — unattended, idempotent, resumable.

WHAT IT DOES
  Reads manifest.json (a list of game specs). For each game whose status is not
  "passed", it:
    1. verifies the starter pack_<id>.js exists (you create structure+roster once
       via generate_more.js; this driver only fills PROSE).
    2. authors the prose with a headless `claude -p` invocation using the chunked
       one-Edit-per-topic method (the only method that survived long files).
    3. runs the deterministic Node gates (parity + structure) — FREE, zero tokens.
    4. if parity/structure fails, re-invokes the agent with a targeted fix prompt
       (bounded retries).
    5. records status in manifest.json and appends to batch.log.

WHY IT BEATS THE INTERACTIVE GRIND
  * Uses ANTHROPIC_API_KEY -> token-bucket limits (429 + retry), NOT the
    interactive "resets at 7am" wall. On a limit it backs off and continues.
  * State lives in manifest.json + the pack files. Kill it anytime; re-run and it
    resumes, skipping "passed" games and picking up partial per-topic edits.
  * Validation is deterministic Node, so only AUTHORING costs tokens.
  * Concurrency capped low (3 was the safe ceiling in practice).

SETUP
  export ANTHROPIC_API_KEY=sk-ant-...
  # (structure/rosters must already exist: `node generate_more.js` once)

RUN
  python3 batch_driver.py             # loop until all pass or MAX_ROUNDS hit
  python3 batch_driver.py --once      # a single pass, then exit
  python3 batch_driver.py --status    # print the manifest status table and exit

UNATTENDED
  Load com.casebook.batch.plist into launchd (see that file's header). Do NOT use
  nohup — it dies on laptop sleep.
"""

import json, os, subprocess, sys, time, threading
from concurrent.futures import ThreadPoolExecutor, as_completed

# ---------------------------------------------------------------- config
BUILD_DIR   = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
MANIFEST    = os.path.join(os.path.dirname(__file__), "manifest.json")
LOG         = os.path.join(os.path.dirname(__file__), "batch.log")
REFERENCE   = "pack_aircrash.js"     # a passing pack the author reads as the tone/length example
SPEC        = "SPEC.md"
CONCURRENCY = 3                       # parallel games; keep low or you just hit limits faster
PARITY_MAX  = 38                      # % of questions where the expert may be the longest option
FIX_RETRIES = 2                       # re-invoke the agent this many times if gates fail
MAX_ROUNDS  = 8                       # full passes over the manifest before giving up
BACKOFF_0   = 30                      # seconds; doubles on each consecutive limit/error, capped
BACKOFF_MAX = 1800
AUTH_BUDGET = "4"                     # --max-budget-usd per author invocation (hard ceiling)
EDITOR_BUDGET = "3"                   # --max-budget-usd for the line-editor polish pass
STYLE_GATE  = os.path.join(os.path.dirname(__file__), "style_gate.js")  # anti-staleness, 0 tokens

_manifest_lock = threading.Lock()

def log(msg):
    line = f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] {msg}"
    print(line, flush=True)
    with _manifest_lock:
        with open(LOG, "a") as f:
            f.write(line + "\n")

# ---------------------------------------------------------------- manifest io (atomic)
def load_manifest():
    with open(MANIFEST) as f:
        return json.load(f)

def save_manifest(data):
    with _manifest_lock:
        tmp = MANIFEST + ".tmp"
        with open(tmp, "w") as f:
            json.dump(data, f, indent=2)
        os.replace(tmp, MANIFEST)

def set_status(gid, status, note=""):
    data = load_manifest()
    for g in data["games"]:
        if g["id"] == gid:
            g["status"] = status
            if note:
                g["note"] = note
    save_manifest(data)

# ---------------------------------------------------------------- deterministic gates (0 tokens)
GATE_JS = r'''
try {
  const P = require('./pack_%s.js').PACK;
  const problems = [];
  let L = 0, t = 0;
  Object.entries(P.TOPICS).forEach(([id, x]) => {
    if (!/\(/.test(x.sci || '')) problems.push(id + ' sci');
    const wc = (x.profile || '').split(/\s+/).length;
    if (wc < 200 || wc > 360) problems.push(id + ' ' + wc + 'w');
    if (!x.lede || !x.frame) problems.push(id + ' lede/frame');
    if (!x.q || x.q.length !== 3) { problems.push(id + ' qs'); return; }
    x.q.forEach((q, i) => {
      if (!q.o || q.o.length !== 4) problems.push(id + '.q' + i + ' opts');
      else {
        if (q.o.filter(o => o.v === 'expert').length !== 1) problems.push(id + '.q' + i + ' expert');
        q.o.forEach(o => { if (!o.t || !o.fb) problems.push(id + '.q' + i + ' t/fb'); });
        t++; const m = Math.max(...q.o.map(o => o.t.length));
        if (q.o.find(o => o.v === 'expert').t.length === m) L++;
      }
    });
  });
  const storiesOk = Object.values(P.STORIES).every(o => Object.values(o).every(v => v && v.length > 10));
  const storyOk = (P.story || []).length === 4 && P.story.every(p => p && p.length > 20);
  const e = P.endings || {};
  const endOk = !!(e.win && e.win.expert && e.win.expert[0] && e.win.expert[0].length > 20
                   && e.overclaim && e.overclaim.body && e.overclaim.body[0]
                   && e.dismissal && e.dismissal.body && e.dismissal.body[0]
                   && e.wrongNames && e.wrongNames.body && e.wrongNames.body[0]);
  if (!storiesOk) problems.push('STORIES');
  if (!storyOk) problems.push('story');
  if (!endOk) problems.push('endings');
  const parity = t ? Math.round(100 * L / t) : 100;
  console.log(JSON.stringify({ parity, problems }));
} catch (err) { console.log(JSON.stringify({ parity: 100, problems: ['LOAD:' + err.message] })); }
'''

def check_gates(gid):
    """Return (ok:bool, parity:int, problems:list). Pure Node, no tokens."""
    r = subprocess.run(["node", "-e", GATE_JS % gid], cwd=BUILD_DIR,
                       capture_output=True, text=True)
    try:
        out = json.loads(r.stdout.strip().splitlines()[-1])
    except Exception:
        return (False, 100, ["gate-parse:" + (r.stderr or r.stdout)[:200]])
    problems = out["problems"]
    parity = out["parity"]
    ok = (len(problems) == 0) and (parity <= PARITY_MAX)
    return (ok, parity, problems)

def check_style(gid):
    """Anti-staleness gate: banned phrases + cross-game echoes. Pure Node, no tokens.
    Fails OPEN (returns ok) if the checker itself errors, so it never wedges the batch."""
    r = subprocess.run(["node", STYLE_GATE, gid], cwd=BUILD_DIR, capture_output=True, text=True)
    try:
        out = json.loads(r.stdout.strip().splitlines()[-1])
    except Exception:
        return (True, [])
    return (out.get("ok", True), out.get("problems", []))

def all_ok(gid):
    """Combined verdict: correctness+parity gates AND the style gate."""
    gok, parity, gp = check_gates(gid)
    sok, sp = check_style(gid)
    return (gok and sok, parity, gp + sp)

# ---------------------------------------------------------------- authoring (costs tokens)
def author_prompt(game, fix=None):
    m = game["mystery"]
    base = f"""Author ALL prose for /Users/scolnic/code/Nuclear/casebook_build/pack_{game['id']}.js ("{game['title']}", {game['discipline']}).

CRITICAL METHOD: never write the whole file at once (the connection drops on ~90KB). The stub already has all structure. Fill it with MANY SMALL Edit calls — ONE Edit per TOPIC (18), keeping each sci/topic/no verbatim, then separate Edits for STORIES, story, overclaimTease, and endings. Work sequentially; small edits survive interruptions.

READ FIRST (in full): {SPEC} ; the stub pack_{game['id']}.js ; and passing reference {REFERENCE} (match its tone, length, and TIGHT length-parity).

Mystery (use the truth ids already in CATS): OVERCLAIM (sensational, wrong) = {m['overclaim']}. DISMISSAL (do-nothing, wrong) = {m['dismissal']}. TRUTH (the concealed, systemic, provable answer) = {m['truth']}. Guilty WHO = who:"{m['guilty_who']}". WHERE it culminates = where:"{m['true_where']}".

For EACH of the 18 TOPICS: lede (1 vivid sentence); profile (250-330 words, person-centered, FACTUALLY ACCURATE about that real figure and concept, ending by arming the player to reject both traps in favor of the concealed truth; \\n\\n between paragraphs); frame (1-3 sentences in the informant's VOICE per the // cell comment); q = 3 questions, each {{q, o:[4 options {{t, v, fb}}]}}, exactly ONE v:"expert", others partial/wrong/danger, a one-sentence teaching fb on every option.
STORIES: 9 informant x place scenes (a quote each, in voice). story: 4 short HTML paragraphs (scene / name the 3 informants / the 3 suspects neutrally + the two traps + stakes / clock) — NO SPOILER: never name/paraphrase the true WHAT or finger the guilty suspect; tease the truth as "quieter and graver." overclaimTease: 1 italic sentence, no spoiler. endings: win{{expertTitle,expert:[2],soundTitle,sound:[2],namedTitle,named:[2]}}, overclaim{{title,body:[2]}}, dismissal{{title,body:[2]}}, wrongNames{{title,body:[1 para that flows into a follow-up]}} — reference the true who/where/what. Leave overclaimWhat/dismissalWhat as set.

GATES you must self-check before finishing: length parity <= {PARITY_MAX}% (expert must NOT usually be the longest option; keep all four within ~12 chars; wrong answers as specific/confident as the right one); all 18 profiles 250-330 words; 3 questions x 4 options; exactly one expert; fb on every option; real accurate people only.
Do NOT run build_casebook.js. Preserve valid JavaScript."""
    if fix:
        base += f"\n\nThis file was already partly authored but FAILED the gates: {fix}. Continue with small Edits to fix ONLY those, then re-verify. Do not rewrite passing topics."
    return base

def run_author(game, fix=None):
    """Invoke headless Claude Code to author/fix one pack. Returns exit code."""
    cmd = ["claude", "-p", author_prompt(game, fix),
           "--allowedTools", "Read,Edit,Bash",
           "--max-budget-usd", AUTH_BUDGET]
    r = subprocess.run(cmd, cwd=BUILD_DIR, capture_output=True, text=True)
    if r.returncode != 0:
        tail = (r.stderr or r.stdout or "")[-300:]
        # surface likely rate-limit so the caller can back off
        if "limit" in tail.lower() or "429" in tail or "rate" in tail.lower():
            raise RuntimeError("RATE_LIMIT: " + tail)
        log(f"  {game['id']}: author exit {r.returncode}: {tail}")
    return r.returncode

EDITOR_PROMPT = """You are a ruthless LINE EDITOR polishing the prose of /Users/scolnic/code/Nuclear/casebook_build/pack_%s.js. Use MANY SMALL Edit calls. Change ONLY wording — never any id, sci name, structure, verdict (v:), the correctness of any answer, or any fact.

Kill the AI tells and stock phrases: "the truth is quieter than the first and graver than the second", "Three people (inside) will help you", "each carrying a piece", "none the whole", "hides a tempting wrong answer", "it's important to note", "plays a crucial role", "a testament to", "rich tapestry", "delve", and any final sentence that merely restates the paragraph. Vary cadence and paragraph length so profiles don't all open/close alike; give a couple a distinct register (one wry, one grave). Make the informant frames and the story read like different human voices, not one narrator.

HARD CONSTRAINTS you must NOT break: every profile stays 250-330 words; each question keeps exactly one expert and 4 options each with fb; length parity stays <=38%% (do NOT make the expert option the longest — keep all four within ~12 chars); the story and overclaimTease must still NOT name the true WHAT or finger the guilty suspect. Do NOT run build_casebook.js. Preserve valid JavaScript."""

def run_editor(game):
    """Second-pass line editor (kills AI tells, varies voice). Gates are re-checked after."""
    cmd = ["claude", "-p", EDITOR_PROMPT % game["id"],
           "--allowedTools", "Read,Edit,Bash", "--max-budget-usd", EDITOR_BUDGET]
    r = subprocess.run(cmd, cwd=BUILD_DIR, capture_output=True, text=True)
    if r.returncode != 0:
        tail = (r.stderr or r.stdout or "")[-300:]
        if "limit" in tail.lower() or "429" in tail or "rate" in tail.lower():
            raise RuntimeError("RATE_LIMIT: " + tail)
        log(f"  {game['id']}: editor exit {r.returncode}: {tail}")
    return r.returncode

def _mark_edited(gid):
    data = load_manifest()
    for g in data["games"]:
        if g["id"] == gid:
            g["edited"] = True
    save_manifest(data)

def process_game(game):
    gid = game["id"]
    if game.get("status") == "passed" and game.get("edited"):
        return
    if not os.path.exists(os.path.join(BUILD_DIR, f"pack_{gid}.js")):
        set_status(gid, "failed", "no stub — run generate_more.js")
        log(f"  {gid}: SKIP — stub missing")
        return

    # --- stage 1: author until correctness + parity + style gates all pass ---
    ok, parity, problems = all_ok(gid)
    if not ok:
        set_status(gid, "authoring")
        log(f"  {gid}: authoring (parity {parity}%, {len(problems)} problems)")
        run_author(game)                               # may raise RATE_LIMIT -> worker backs off
        for attempt in range(FIX_RETRIES + 1):
            ok, parity, problems = all_ok(gid)
            if ok:
                break
            if attempt == FIX_RETRIES:
                set_status(gid, "failed", f"parity {parity}%; " + "; ".join(problems[:8]))
                log(f"  {gid}: FAILED after retries — {problems[:8]}")
                return
            log(f"  {gid}: fixing — {'; '.join(problems[:10])}")
            run_author(game, fix="fix these gate failures only: " + "; ".join(problems[:12]))

    # --- stage 2: one editor polish pass, then re-verify (editor must not break gates) ---
    log(f"  {gid}: editor polish pass")
    run_editor(game)
    ok, parity, problems = all_ok(gid)
    if not ok:
        log(f"  {gid}: editor nicked a gate — correcting ({'; '.join(problems[:6])})")
        run_author(game, fix="restore gate compliance WITHOUT undoing the edit: " + "; ".join(problems[:10]))
        ok, parity, problems = all_ok(gid)

    if ok:
        set_status(gid, "passed", f"parity {parity}%, edited")
        _mark_edited(gid)
        log(f"  {gid}: PASSED (parity {parity}%, edited)")
    else:
        set_status(gid, "failed", "post-edit: " + "; ".join(problems[:8]))
        log(f"  {gid}: FAILED post-edit — {problems[:8]}")

# ---------------------------------------------------------------- driver loop
def worker(game, backoff_state):
    while True:
        try:
            process_game(game)
            return
        except RuntimeError as e:
            if "RATE_LIMIT" not in str(e):
                set_status(game["id"], "failed", str(e)[:120]); return
            with backoff_state["lock"]:
                wait = backoff_state["v"]
                backoff_state["v"] = min(wait * 2, BACKOFF_MAX)
            log(f"  {game['id']}: rate limit — backing off {wait}s")
            time.sleep(wait)

def one_pass():
    data = load_manifest()
    todo = [g for g in data["games"] if g.get("status") != "passed"]
    if not todo:
        return 0
    backoff_state = {"v": BACKOFF_0, "lock": threading.Lock()}
    with ThreadPoolExecutor(max_workers=CONCURRENCY) as ex:
        futs = [ex.submit(worker, g, backoff_state) for g in todo]
        for _ in as_completed(futs):
            pass
    return len(todo)

def print_status():
    data = load_manifest()
    from collections import Counter
    c = Counter(g.get("status", "pending") for g in data["games"])
    print(f"manifest: {len(data['games'])} games — " + ", ".join(f"{k}:{v}" for k, v in c.items()))
    for g in data["games"]:
        print(f"  [{g.get('status','pending'):>9}] {g['id']:<10} {g.get('note','')}")

def main():
    if "--status" in sys.argv:
        print_status(); return
    once = "--once" in sys.argv
    log(f"=== batch start (concurrency={CONCURRENCY}, once={once}) ===")
    for rnd in range(1, MAX_ROUNDS + 1):
        remaining = one_pass()
        log(f"round {rnd}: {remaining} games needed work")
        if remaining == 0:
            log("all games passed."); break
        if once:
            break
    print_status()

if __name__ == "__main__":
    main()
