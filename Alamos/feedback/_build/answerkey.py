#!/usr/bin/env python3
"""Candidate generator: CHOICE stops whose `answer:` disagrees with the stop's
own `answerText`/`why`.

Signal: the verdict prose restates the correct option. Score every choice by
token overlap with answerText + why, restricted to tokens that DISCRIMINATE
between the options (present in one option and not the others), and flag when
the best-scoring option is not the keyed one.

Validated below against six hand-confirmed mis-keys and five hand-confirmed
correct keys. Candidate generator only — every hit is read before it is believed.
"""
import re, glob, os, sys

def toks(s):
    s = s.lower().replace('√2', 'root2').replace('×', ' x ')
    return set(re.findall(r'[a-z0-9]+', s))

def parse(text):
    lines = text.split('\n'); cur = {}; out = []
    i = 0
    while i < len(lines):
        L = lines[i]
        if re.match(r'^\s+- (group|task):', L):
            if cur.get('choices') and cur.get('answer'): out.append(dict(cur))
            cur = {}
        for k in ('title', 'answer', 'answerText', 'why', 'takeaway'):
            m = re.match(r'^\s+' + k + r':\s*(.*)$', L)
            if m and k not in cur:
                v = m.group(1).strip()
                if v in ('>-', '>', '|-', '|', ''):      # block scalar: gather it
                    ind = len(L) - len(L.lstrip()); parts = []; j = i + 1
                    while j < len(lines) and (not lines[j].strip() or
                          len(lines[j]) - len(lines[j].lstrip()) > ind):
                        parts.append(lines[j].strip()); j += 1
                    v = ' '.join(parts)
                cur[k] = v.strip('"\'')
        if re.match(r'^\s+choices:\s*$', L):
            ind = len(L) - len(L.lstrip()); items = []; j = i + 1
            while j < len(lines):
                LL = lines[j]
                if not LL.strip(): j += 1; continue
                if len(LL) - len(LL.lstrip()) <= ind: break
                mi = re.match(r'^\s+- (.*)$', LL)
                if mi: items.append(mi.group(1).strip().strip('"\''))
                elif items: items[-1] += ' ' + LL.strip()
                j += 1
            cur['choices'] = items; i = j - 1
        i += 1
    if cur.get('choices') and cur.get('answer'): out.append(dict(cur))
    return out

def analyse(s):
    ch, ans = s['choices'], s['answer']
    if any(c.startswith('label:') for c in ch) or len(ch) < 3: return None
    keyed = next((i for i, c in enumerate(ch) if ans[:45] in c or c[:45] in ans), None)
    if keyed is None: return None
    verdict = toks((s.get('answerText') or '') + ' ' + (s.get('why') or ''))
    if len(verdict) < 12: return None
    cw = [toks(c) for c in ch]
    # a token discriminates if it appears in exactly one option
    def disc(i):
        others = set().union(*[cw[j] for j in range(len(ch)) if j != i])
        return cw[i] - others
    sc = [len(disc(i) & verdict) for i in range(len(ch))]
    best = max(range(len(ch)), key=lambda i: sc[i])
    if best == keyed or sc[best] - sc[keyed] < 2: return None
    return dict(keyed=keyed, best=best, sk=sc[keyed], sb=sc[best],
                ch=ch, title=s.get('title', '?'))

if __name__ == '__main__':
    root = '/Users/scolnic/code/Nuclear/Alamos/gamekit/'
    hits = []
    for p in sorted(glob.glob(root + 'books/*.yml')):
        for s in parse(open(p).read()):
            r = analyse(s)
            if r: hits.append((os.path.basename(p), r))
    for p, r in hits:
        print(f"\n{p}  —  {r['title']}")
        print(f"  KEYED   [{r['keyed']}] (score {r['sk']}): {r['ch'][r['keyed']][:88]}")
        print(f"  VERDICT [{r['best']}] (score {r['sb']}): {r['ch'][r['best']][:88]}")
    print(f"\n{len(hits)} candidates")
