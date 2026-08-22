#!/usr/bin/env python3
"""readbook.py <book.yml> [section] — print a book with the repeated
format-boilerplate background paragraphs collapsed to one line."""
import sys, re, pathlib

BOILER = [
 'Why the order is graded whole', 'Why the ends are the place to start',
 'What the rail can be ordered on', 'Why this is a matching board',
 'How to use the one-each rule', 'Why you cannot be wrong about exactly one',
 'Why the wrong options are the interesting ones',
 'Why the shape of an option tells you nothing', 'What the verdict adds',
 'Why the unremarkable readings decide it', 'How to work the candidates',
 'Why only one candidate survives', 'Why an estimate rather than a calculation',
 'Why the tiles carry labels', 'Why first is a different question',
 'What to look for in the options', 'Why only one answer is marked',
]
src = pathlib.Path(sys.argv[1]).read_text().split('\n')
out, i, dropped = [], 0, 0
while i < len(src):
    L = src[i]
    m = re.match(r'^(\s*)- (?:>-\s*)?"?(.{0,60})', L)
    if m and any(b in L for b in BOILER):
        ind = len(m.group(1)); i += 1
        while i < len(src) and (not src[i].strip() or len(src[i]) - len(src[i].lstrip()) > ind):
            i += 1
        dropped += 1
        out.append(f'{m.group(1)}- [boilerplate: {m.group(2)[:40].strip()}…]')
        continue
    # single-line boilerplate under a `- >-` on its own line
    if re.match(r'^\s*- >-\s*$', L) and i+1 < len(src) and any(b in src[i+1] for b in BOILER):
        ind = len(L) - len(L.lstrip()); i += 1
        head = src[i].strip()[:40]
        while i < len(src) and (not src[i].strip() or len(src[i]) - len(src[i].lstrip()) > ind):
            i += 1
        dropped += 1
        out.append(' ' * ind + f'- [boilerplate: {head}…]')
        continue
    out.append(L); i += 1
txt = '\n'.join(out)
if len(sys.argv) > 2:
    a = txt.index('\n' + sys.argv[2] + ':')
    txt = txt[a:]
print(txt)
print(f'\n### readbook: collapsed {dropped} boilerplate paragraphs', file=sys.stderr)
