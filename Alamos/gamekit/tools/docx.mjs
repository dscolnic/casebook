// docx.mjs — read a .docx into ordered blocks. No dependencies.
//
// Word documents are a zip with an XML part; we shell out to `unzip -p` rather
// than take a zip dependency. Returns the document in reading order, because
// the design books encode meaning in sequence: a Heading2 labels the paragraph
// that follows it.
import { execFileSync } from 'node:child_process';

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };

function unescapeXml(s){
  return s
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&(\w+);/g, (m, n) => ENTITIES[n] ?? m);
}
const strip = (s) => unescapeXml(s.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();

/** Raw XML of the main document part. */
export function readDocumentXml(path){
  try{
    return execFileSync('unzip', ['-p', path, 'word/document.xml'],
      { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  }catch(e){
    throw new Error(`could not read ${path} as a .docx (needs \`unzip\` on PATH): ${e.message}`);
  }
}

/**
 * Ordered blocks. Each is one of:
 *   { type:'p',     style:'Heading1'|'Heading2'|'ListBullet'|'KidCallout'|'Normal', text }
 *   { type:'table', rows: string[][], cells: string[], text }
 *
 * `cells` is the flattened cell list, which is what single-cell callout boxes
 * need; `rows` is what data tables need.
 */
export function parseBlocks(xml){
  const blocks = [];
  const re = /(<w:p[ >][\s\S]*?<\/w:p>|<w:tbl>[\s\S]*?<\/w:tbl>)/g;
  let m;
  while((m = re.exec(xml))){
    const raw = m[1];
    if(raw.startsWith('<w:tbl')){
      const rows = [];
      for(const r of raw.match(/<w:tr[ >][\s\S]*?<\/w:tr>/g) || []){
        rows.push((r.match(/<w:tc>[\s\S]*?<\/w:tc>/g) || []).map(strip));
      }
      const cells = rows.flat();
      blocks.push({ type: 'table', rows, cells, text: cells.join(' ') });
    } else {
      const st = /<w:pStyle w:val="([^"]+)"/.exec(raw);
      blocks.push({ type: 'p', style: st ? st[1] : 'Normal', text: strip(raw) });
    }
  }
  return blocks;
}

export function loadDocx(path){
  return parseBlocks(readDocumentXml(path));
}

/** Convenience: the first table whose header row matches every given label. */
export function findTableByHeader(blocks, labels){
  const want = labels.map(l => l.toLowerCase());
  return blocks.find(b =>
    b.type === 'table' && b.rows.length > 1 &&
    want.every((l, i) => (b.rows[0][i] || '').toLowerCase().includes(l)));
}

/**
 * Callout boxes are single-cell tables whose text runs a heading straight into
 * the body ("SCENEThree patients arrive…"). Split on the first lower-case
 * letter following two or more upper-case ones.
 */
export function splitCallout(text){
  // The body may begin with a lower-case word ("SCENEThree patients…") or with a
  // single capital that starts a sentence ("SCENEA heart model…"), so both forms
  // have to be recognised — matching only the first silently dropped scenes.
  const m = /^([A-Z][A-Z0-9 '’\-/&]{2,40}?)(?=[A-Z][a-z]|[A-Z]\s[a-z])/.exec(text);
  if(!m) return { label: null, body: text };
  return { label: m[1].trim(), body: text.slice(m[1].length).trim() };
}
