// Generates Casebook app icons (no external libs): a dark navy tile with a
// white magnifying glass — the Bureau's emblem. Writes 180/192/512 PNGs.
const fs = require('fs'), zlib = require('zlib');

function png(size, draw) {
  const buf = Buffer.alloc(size * size * 4);
  const set = (x, y, r, g, b, a = 255) => {
    if (x < 0 || y < 0 || x >= size || y >= size) return;
    const i = (y * size + x) * 4; buf[i] = r; buf[i+1] = g; buf[i+2] = b; buf[i+3] = a;
  };
  draw(set, size);
  // raw scanlines with filter byte 0
  const raw = Buffer.alloc(size * (size * 4 + 1));
  for (let y = 0; y < size; y++) {
    raw[y * (size * 4 + 1)] = 0;
    buf.copy(raw, y * (size * 4 + 1) + 1, y * size * 4, (y + 1) * size * 4);
  }
  const idat = zlib.deflateSync(raw, { level: 9 });
  const crcTable = (() => { const t = []; for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
  const crc = b => { let c = 0xffffffff; for (let i = 0; i < b.length; i++) c = crcTable[(c ^ b[i]) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
  const chunk = (type, data) => {
    const len = Buffer.alloc(4); len.writeUInt32BE(data.length, 0);
    const td = Buffer.concat([Buffer.from(type), data]);
    const c = Buffer.alloc(4); c.writeUInt32BE(crc(td), 0);
    return Buffer.concat([len, td, c]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; ihdr[9] = 6; // 8-bit, RGBA
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([sig, chunk('IHDR', ihdr), chunk('IDAT', idat), chunk('IEND', Buffer.alloc(0))]);
}

function draw(set, S) {
  const bg = [22, 49, 73];       // #163149 blueprint navy
  const ink = [238, 242, 248];   // near-white
  const accent = [201, 154, 63]; // warm gold ring — subtle
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) set(x, y, bg[0], bg[1], bg[2]);
  // magnifier: ring centered up-left, handle to lower-right
  const cx = S * 0.44, cy = S * 0.42, rOuter = S * 0.26, rInner = S * 0.185, thick = (rOuter - rInner);
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
    const d = Math.hypot(x - cx, y - cy);
    if (d <= rOuter && d >= rInner) set(x, y, ink[0], ink[1], ink[2]);
    // thin gold outer edge
    if (d <= rOuter && d > rOuter - Math.max(1, S * 0.012)) set(x, y, accent[0], accent[1], accent[2]);
  }
  // handle: thick line from ring edge to bottom-right
  const a = Math.PI * 0.25;
  const hx0 = cx + Math.cos(a) * rOuter, hy0 = cy + Math.sin(a) * rOuter;
  const hx1 = cx + Math.cos(a) * (rOuter + S * 0.22), hy1 = cy + Math.sin(a) * (rOuter + S * 0.22);
  const hw = S * 0.055;
  const steps = S;
  for (let t = 0; t <= steps; t++) {
    const px = hx0 + (hx1 - hx0) * t / steps, py = hy0 + (hy1 - hy0) * t / steps;
    for (let oy = -hw; oy <= hw; oy++) for (let ox = -hw; ox <= hw; ox++)
      if (ox*ox + oy*oy <= hw*hw) set(Math.round(px+ox), Math.round(py+oy), ink[0], ink[1], ink[2]);
  }
}

for (const s of [180, 192, 512]) {
  fs.writeFileSync(__dirname + `/icon-${s}.png`, png(s, draw));
  console.log('wrote icon-' + s + '.png');
}
