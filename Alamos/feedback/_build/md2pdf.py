#!/usr/bin/env python3
"""md2pdf.py <report.md> — writes <report>.html and <report>.pdf beside it.
Tiny markdown subset: h1-h4, bold, italic, inline code, ul/ol, tables, hr,
blockquote, paragraphs. Chrome headless does the PDF."""
import sys, re, html, subprocess, pathlib

CSS = """
@page { margin: 18mm 16mm; }
body { font: 10.5pt/1.55 'Helvetica Neue', Helvetica, Arial, sans-serif; color:#1a1a1a; max-width:760px; margin:0 auto; }
h1 { font-size:20pt; margin:0 0 2pt; letter-spacing:-0.3pt; }
h1 + p.meta { color:#666; margin-top:0; font-size:9.5pt; }
h2 { font-size:13.5pt; margin:22pt 0 6pt; border-bottom:1.5pt solid #1a1a1a; padding-bottom:3pt; }
h3 { font-size:11.5pt; margin:14pt 0 4pt; }
h4 { font-size:10.5pt; margin:10pt 0 3pt; }
p { margin:5pt 0; }
code { font:9pt 'SF Mono', Menlo, monospace; background:#f2f2f0; padding:0.5pt 3pt; border-radius:2pt; }
blockquote { margin:6pt 0 6pt 10pt; padding-left:10pt; border-left:2.5pt solid #bbb; color:#444; font-style:italic; }
ul,ol { margin:5pt 0 5pt 4pt; padding-left:16pt; }
li { margin:2.5pt 0; }
table { border-collapse:collapse; width:100%; margin:8pt 0; font-size:9.5pt; }
th { text-align:left; border-bottom:1.5pt solid #1a1a1a; padding:3pt 6pt 3pt 0; vertical-align:bottom; }
td { border-bottom:0.5pt solid #ccc; padding:3.5pt 6pt 3.5pt 0; vertical-align:top; }
hr { border:none; border-top:0.5pt solid #999; margin:14pt 0; }
.sev-fix { color:#a4232a; font-weight:600; } .sev-worth { color:#8a6d00; font-weight:600; } .sev-taste { color:#556; }
strong { font-weight:600; }
"""

def inline(s):
    s = html.escape(s, quote=False)
    s = re.sub(r'`([^`]+)`', r'<code>\1</code>', s)
    s = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', s)
    s = re.sub(r'(?<![\w*])\*([^*\n]+)\*(?![\w*])', r'<em>\1</em>', s)
    s = s.replace('FIX</strong>', 'FIX</strong>')
    for sev, cls in (('FIX','sev-fix'),('WORTH','sev-worth'),('TASTE','sev-taste')):
        s = re.sub(r'\b'+sev+r'\b', f'<span class="{cls}">{sev}</span>', s)
    return s

def convert(md):
    out, lines, i = [], md.split('\n'), 0
    while i < len(lines):
        L = lines[i]
        if not L.strip(): i += 1; continue
        if L.startswith('#'):
            m = re.match(r'(#{1,4}) (.*)', L); n = len(m.group(1))
            out.append(f'<h{n}>{inline(m.group(2))}</h{n}>'); i += 1; continue
        if re.match(r'^---+\s*$', L): out.append('<hr>'); i += 1; continue
        if L.startswith('|'):
            rows = []
            while i < len(lines) and lines[i].startswith('|'):
                rows.append([c.strip() for c in lines[i].strip().strip('|').split('|')]); i += 1
            hdr = rows[0]; body = [r for r in rows[1:] if not all(re.match(r'^:?-+:?$', c) for c in r)]
            t = ['<table><tr>' + ''.join(f'<th>{inline(c)}</th>' for c in hdr) + '</tr>']
            for r in body: t.append('<tr>' + ''.join(f'<td>{inline(c)}</td>' for c in r) + '</tr>')
            out.append(''.join(t) + '</table>'); continue
        if L.startswith('>'):
            q = []
            while i < len(lines) and lines[i].startswith('>'): q.append(lines[i][1:].strip()); i += 1
            out.append('<blockquote><p>' + '</p><p>'.join(inline(x) for x in q if x) + '</p></blockquote>'); continue
        m = re.match(r'^(\s*)([-*]|\d+\.) ', L)
        if m:
            tag = 'ol' if m.group(2)[0].isdigit() else 'ul'; items = []
            while i < len(lines) and (re.match(r'^(\s*)([-*]|\d+\.) ', lines[i]) or (lines[i].startswith('  ') and lines[i].strip())):
                if re.match(r'^(\s*)([-*]|\d+\.) ', lines[i]):
                    items.append(re.sub(r'^(\s*)([-*]|\d+\.) ', '', lines[i]))
                else: items[-1] += ' ' + lines[i].strip()
                i += 1
            out.append(f'<{tag}>' + ''.join(f'<li>{inline(x)}</li>' for x in items) + f'</{tag}>'); continue
        para = []
        while i < len(lines) and lines[i].strip() and not re.match(r'^(#|\||>|---|(\s*)([-*]|\d+\.) )', lines[i]):
            para.append(lines[i].strip()); i += 1
        cls = ' class="meta"' if para and para[0].startswith('*Theme') else ''
        out.append(f'<p{cls}>' + inline(' '.join(para)) + '</p>')
    return '\n'.join(out)

src = pathlib.Path(sys.argv[1])
md = src.read_text()
title = re.search(r'^# (.*)$', md, re.M).group(1)
doc = f'<!doctype html><meta charset="utf-8"><title>{html.escape(title)}</title><style>{CSS}</style><body>{convert(md)}</body>'
h = src.with_suffix('.html'); h.write_text(doc)
pdf = src.with_suffix('.pdf')
subprocess.run(['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome','--headless','--disable-gpu',
                f'--print-to-pdf={pdf}','--no-pdf-header-footer', f'file://{h.resolve()}'], check=True, capture_output=True)
print(f'wrote {pdf} ({pdf.stat().st_size} bytes)')
