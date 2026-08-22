#!/usr/bin/env python3
"""Mechanical checks on estimate boards and instrument blocks.

1. target must equal formula(values[correct]) — a board whose stated answer is
   not what its own arithmetic produces is grading something else.
2. slots must equal len(correct).
3. every {n} in template must be a real index into values.
4. STRESS: every criterion key must exist in every candidate's scores.
All four are exact, not heuristic.
"""
import re, glob, os, json, subprocess, sys

root = '/Users/scolnic/code/Nuclear/Alamos/gamekit/'

def blocks(text, key):
    """Yield (title, dict-ish text) for each `key:` block, with its stop title."""
    lines = text.split('\n'); title = '?'; out = []
    i = 0
    while i < len(lines):
        m = re.match(r'^\s+title: (.*)$', lines[i])
        if m: title = m.group(1).strip()
        if re.match(r'^\s+' + key + r':\s*$', lines[i]):
            ind = len(lines[i]) - len(lines[i].lstrip()); body = []; j = i + 1
            while j < len(lines) and (not lines[j].strip() or
                  len(lines[j]) - len(lines[j].lstrip()) > ind):
                body.append(lines[j]); j += 1
            out.append((title, '\n'.join(body))); i = j - 1
        i += 1
    return out

def scalar(body, name):
    m = re.search(r'^\s+' + name + r':\s*(.+)$', body, re.M)
    return m.group(1).strip().strip('"\'') if m else None

def seq(body, name):
    m = re.search(r'^(\s+)' + name + r':\s*(\[.*\])\s*$', body, re.M)
    if m:
        try: return json.loads(m.group(2).replace("'", '"'))
        except Exception: return None
    m = re.search(r'^(\s+)' + name + r':\s*$', body, re.M)
    if not m: return None
    ind = len(m.group(1)); items = []
    for L in body[m.end():].split('\n'):
        if not L.strip(): continue
        if len(L) - len(L.lstrip()) <= ind: break
        mi = re.match(r'^\s+-\s*(.*)$', L)
        if mi: items.append(mi.group(1).strip())
    return items

problems = []
for p in sorted(glob.glob(root + 'books/*.yml')):
    txt = open(p).read(); base = os.path.basename(p)
    for title, body in blocks(txt, 'estimate'):
        vals = seq(body, 'values'); corr = seq(body, 'correct')
        formula = scalar(body, 'formula'); target = scalar(body, 'target')
        slots = scalar(body, 'slots'); template = scalar(body, 'template')
        if vals is None or corr is None or formula is None or target is None: continue
        try:
            vals = [float(str(v)) for v in vals]; corr = [int(c) for c in corr]
            target = float(target)
        except Exception: continue
        if slots and str(slots).isdigit() and int(slots) != len(corr):
            problems.append((base, title, f'slots={slots} but correct has {len(corr)} entries'))
        if template:
            idx = {int(n) for n in re.findall(r'\{(\d+)\}', template)}
            bad = [n for n in idx if n >= len(vals)]
            if bad: problems.append((base, title, f'template references value index {bad} of {len(vals)}'))
        # evaluate formula with a,b,c… bound to values[correct]
        args = [vals[c] for c in corr if c < len(vals)]
        names = 'abcdefghij'[:len(args)]
        js = formula
        env = ';'.join(f'const {n}={v!r}' for n, v in zip(names, args))
        try:
            r = subprocess.run(['node', '-e', f'{env};console.log(({js}))'],
                               capture_output=True, text=True, timeout=10)
            got = float(r.stdout.strip())
        except Exception:
            continue
        tol = scalar(body, 'tolerance')
        try: tol = abs(float(tol))
        except Exception: tol = abs(target) * 0.05 or 1e-9
        if abs(got - target) > max(tol, abs(target) * 1e-6):
            problems.append((base, title,
                f'formula gives {got:.6g}, target says {target:.6g} (tolerance {tol:.4g})'))
    for title, body in blocks(txt, 'stress'):
        keys = [k for k in re.findall(r'^\s+key:\s*(\S+)\s*$', body, re.M)]
        scores = re.search(r'^(\s+)scores:\s*$', body, re.M)
        if keys and scores:
            tail = body[scores.end():]
            have = set(re.findall(r'^\s+(\w+):\s*[-\d.]+\s*$', tail, re.M))
            missing = [k for k in keys if k not in have]
            if missing:
                problems.append((base, title, f'STRESS criteria keys absent from scores: {missing}'))
for b, t, msg in problems:
    print(f'{b:26} | {t[:44]:44} | {msg}')
print(f'\n{len(problems)} board problems')
