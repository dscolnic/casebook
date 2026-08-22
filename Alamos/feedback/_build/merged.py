#!/usr/bin/env python3
"""Find stops that have merged because a list item is missing its `- `.

Each stop is a YAML list item under `stops:`. Split the file on stop openers
(`^        - key:`) and count `title:` keys inside each item. Two titles in one
item means two stops collapsed into one mapping, and one of them is gone.
"""
import re, glob, os
root = '/Users/scolnic/code/Nuclear/Alamos/gamekit/'
bad = []
for p in sorted(glob.glob(root + 'books/*.yml')):
    lines = open(p).read().split('\n')
    item, titles, start = None, [], 0
    def close():
        if item is not None and len(titles) > 1:
            bad.append((os.path.basename(p), start + 1, list(titles)))
    for i, L in enumerate(lines):
        if re.match(r'^ {6}- \w+:', L):
            close(); item, titles, start = i, [], i
        elif re.match(r'^ {0,4}\S', L) or re.match(r'^ {2,4}- ', L):
            close(); item, titles = None, []
        if item is not None:
            m = re.match(r'^ {8}title: (.*)$', L)
            if m: titles.append(m.group(1).strip())
    close()
for b in bad:
    print(f'{b[0]:26} line {b[1]:5}  {len(b[2])} stops merged into one mapping:')
    for t in b[2]: print(f'{"":32} - {t[:70]}')
print(f'\n{len(bad)} merged-stop sites')
