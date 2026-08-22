#!/usr/bin/env python3
"""Check each stop's `guide` against the board it sits on.

Guides open with a count — "Five numbers, and two of them…", "Four options, and…".
Two exact tests:
  1. a guide naming N numbers/tiles must sit on an estimate with N labels;
  2. a guide naming options must sit on a stop that has choices.
Both are verifiable from the book alone.
"""
import re, glob, os
WORD = {'two':2,'three':3,'four':4,'five':5,'six':6,'seven':7,'eight':8,'nine':9,'ten':10}
root = '/Users/scolnic/code/Nuclear/Alamos/gamekit/'

def stops(text):
    lines = text.split('\n'); cur = None; out = []
    for i, L in enumerate(lines):
        if re.match(r'^ {6,8}- \w+:', L):   # a new item in the stops list, whatever key it opens with
            if cur: out.append(cur)
            cur = {'start': i, 'title': '?'}
        if cur is None: continue
        m = re.match(r'^\s+title: (.*)$', L)
        if m and cur['title'] == '?': cur['title'] = m.group(1).strip()
        m = re.match(r'^\s+format: (.*)$', L)
        if m: cur['format'] = m.group(1).strip()
        if re.match(r'^\s+guide:', L):
            ind = len(L) - len(L.lstrip()); parts = [L.split('guide:', 1)[1].strip()]
            j = i + 1
            while j < len(lines) and (not lines[j].strip() or
                  len(lines[j]) - len(lines[j].lstrip()) > ind):
                parts.append(lines[j].strip()); j += 1
            cur['guide'] = ' '.join(p for p in parts if p not in ('>-', '>', '|-', '|'))
        if re.match(r'^\s+choices:\s*$', L): cur['haschoices'] = True
        if re.match(r'^\s+labels:\s*$', L):
            ind = len(L) - len(L.lstrip()); n = 0; j = i + 1
            while j < len(lines):
                if not lines[j].strip(): j += 1; continue
                if len(lines[j]) - len(lines[j].lstrip()) <= ind: break
                if re.match(r'^\s+- ', lines[j]): n += 1
                j += 1
            cur['nlabels'] = n
    if cur: out.append(cur)
    return out

bad = []
for p in sorted(glob.glob(root + 'books/*.yml')):
    base = os.path.basename(p)
    for s in stops(open(p).read()):
        g = (s.get('guide') or '').lower()
        if not g: continue
        m = re.match(r'^\W*(two|three|four|five|six|seven|eight|nine|ten)\s+(numbers|tiles)\b', g)
        if m and 'nlabels' in s:
            want = WORD[m.group(1)]
            if want != s['nlabels']:
                bad.append((base, s['title'], f"guide says {m.group(1)} {m.group(2)} but the board has {s['nlabels']} labels"))
        m2 = re.match(r'^\W*(two|three|four|five|six)\s+(options|explanations|candidates)\b', g)
        if m2 and not s.get('haschoices'):
            bad.append((base, s['title'], f"guide says '{m2.group(1)} {m2.group(2)}' but the stop has no choices (format {s.get('format','?')})"))
for b in bad: print(f'{b[0]:26} | {b[1][:42]:42} | {b[2]}')
print(f'\n{len(bad)} guide/board mismatches')
