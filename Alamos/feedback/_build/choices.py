#!/usr/bin/env python3
"""Print every plain CHOICE-style stop compactly: question, options with the
keyed one marked, and the rebuttals. For solving by reading."""
import re, glob, os, sys
exec(open('/Users/scolnic/code/Nuclear/Alamos/feedback/_build/answerkey.py').read().split("if __name__")[0])

def rebuttals(text, title):
    pass

root = '/Users/scolnic/code/Nuclear/Alamos/gamekit/'
want = sys.argv[1:] or None
for p in sorted(glob.glob(root + 'books/*.yml')):
    base = os.path.basename(p)[:-4]
    if want and base not in want: continue
    txt = open(p).read()
    # re-parse with rebuttals
    lines = txt.split('\n'); cur = {}; stops = []
    i = 0
    while i < len(lines):
        L = lines[i]
        if re.match(r'^\s+- (group|task):', L):
            if cur.get('choices') and cur.get('answer'): stops.append(dict(cur))
            cur = {}
        for k in ('title', 'answer', 'question', 'takeaway'):
            m = re.match(r'^\s+' + k + r':\s*(.*)$', L)
            if m and k not in cur:
                v = m.group(1).strip()
                if v in ('>-', '>', '|-', '|', ''):
                    ind = len(L) - len(L.lstrip()); parts = []; j = i + 1
                    while j < len(lines) and (not lines[j].strip() or
                          len(lines[j]) - len(lines[j].lstrip()) > ind):
                        parts.append(lines[j].strip()); j += 1
                    v = ' '.join(parts)
                cur[k] = v.strip('"\'')
        for k in ('choices', 'rebuttals'):
            if re.match(r'^\s+' + k + r':\s*$', L):
                ind = len(L) - len(L.lstrip()); items = []; j = i + 1
                while j < len(lines):
                    LL = lines[j]
                    if not LL.strip(): j += 1; continue
                    if len(LL) - len(LL.lstrip()) <= ind: break
                    mi = re.match(r'^\s+- (.*)$', LL)
                    if mi: items.append(mi.group(1).strip().strip('"\''))
                    elif items: items[-1] += ' ' + LL.strip()
                    j += 1
                cur[k] = items; i = j - 1
        i += 1
    if cur.get('choices') and cur.get('answer'): stops.append(dict(cur))
    printed = 0
    for s in stops:
        ch, ans = s['choices'], s['answer']
        if any(c.startswith('label:') for c in ch): continue
        k = next((i for i, c in enumerate(ch) if ans[:45] in c or c[:45] in ans), None)
        if printed == 0: print(f'\n########## {base}')
        printed += 1
        q = (s.get('question') or s.get('title') or '?')[:150]
        print(f'\n[{s.get("title","?")[:60]}] {q}')
        for i, c in enumerate(ch):
            print(f'  {"**" if i == k else "  "}{c[:170]}')
        if k is None: print('   !! KEY MATCHES NO OPTION:', ans[:90])
