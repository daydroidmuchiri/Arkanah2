/* Regenerates every logo-derived asset from the client's official lockup.
   Internal tooling — lives outside docs/, is not served.

   Source: reference/logo-official-2026-08-01.jpeg, supplied by the client on
   2026-08-01. It is a JPEG of the horizontal lockup on white, which is why this
   script exists: the site needs the mark knocked out of that white and recoloured
   for dark backgrounds, and the favicon needs the towers device cut out of the
   middle of the wordmark. Ask the client for the vector original if the chance
   comes up — a trace would beat any of this — but the raster below is clean.

   Run from anywhere:
     node logo-assets.mjs

   Writes:
     docs/assets/logo-lockup-light.png   header + footer, cream type / gold rules
     docs/assets/favicon-48|96|192.png   towers device, navy on cream, square
     docs/assets/apple-touch-icon.png    same, 180x180
     docs/favicon.ico                    same, 16/32/48 packed
*/
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
/* sharp belongs to packages/pipeline, and a bare import here would resolve
   from this file's own directory and miss it. Resolve against that package
   instead, then import the resolved path so this works whichever cwd you run
   it from. */
const fromPipeline = createRequire(path.join(ROOT, '../../packages/pipeline/package.json'));
const sharp = (await import(pathToFileURL(fromPipeline.resolve('sharp')).href)).default;
const SRC = path.join(ROOT, 'reference/logo-official-2026-08-01.jpeg');
const ASSETS = path.join(ROOT, 'docs/assets');

/* Geometry, measured off the source once (see brief.md 2026-08-01). The
   artwork sits in a wide white margin; the towers device is the "A" of NOMAD,
   spire tips at the very top of the artwork down to the wordmark baseline. */
const ART = { left: 135, top: 157, width: 1330, height: 548 };
const DEVICE = { left: 948, top: 157, width: 302, height: 447 };

const CREAM_UI = [233, 230, 222];   /* --text-on-dark */
/* --gold-soft, not --gold. The two rules flanking TWIN TOWERS are thin, and
   sitting over the hero render --gold measured 3.13:1 (2.29 on the worst pixel)
   — the same problem the hero eyebrow had. The lighter champagne takes them to
   ~4.5:1 and reads the same at this size. */
const GOLD_UI = [237, 201, 137];
const CREAM_BG = { r: 244, g: 240, b: 231, alpha: 1 };  /* --cream */

const { data, info } = await sharp(SRC).raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: CH } = info;
const at = (x, y) => { const i = (y * W + x) * CH; return [data[i], data[i + 1], data[i + 2]]; };
const isWhite = ([r, g, b]) => r > 238 && g > 238 && b > 238;
const hue = ([r, g, b]) => {
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
  if (!d) return -1;
  const h = mx === r ? 60 * (((g - b) / d) % 6) : mx === g ? 60 * ((b - r) / d + 2) : 60 * ((r - g) / d + 4);
  return (h + 360) % 360;
};
/* The two rules under TWIN TOWERS are the only warm hue in the artwork. */
const isGold = c => { const h = hue(c); return h >= 20 && h <= 60 && Math.max(...c) - Math.min(...c) > 40; };

/* Sample the real ink, as the MODAL colour of each cluster — the value the
   solid fills actually are. Taking the darkest/most saturated pixel instead
   picks a JPEG ringing artefact (it returned rgb(0,0,30) against a true navy
   nearer rgb(16,26,79)), and since the alpha solve divides by 255 - ink, an
   ink that is too dark makes every solid pixel come out ~90% opaque: a logo
   that is subtly see-through everywhere. */
const modal = (predicate) => {
  const bins = new Map();
  for (let y = ART.top; y < ART.top + ART.height; y++) {
    for (let x = ART.left; x < ART.left + ART.width; x++) {
      const c = at(x, y);
      if (isWhite(c) || !predicate(c)) continue;
      const k = c.map(v => v >> 2).join(',');            /* 4-level tolerance */
      const b = bins.get(k) || { n: 0, sum: [0, 0, 0] };
      b.n++; b.sum = b.sum.map((v, i) => v + c[i]);
      bins.set(k, b);
    }
  }
  const top = [...bins.values()].sort((a, b) => b.n - a.n)[0];
  return top.sum.map(v => Math.round(v / top.n));
};
const navy = modal(c => !isGold(c));
const gold = modal(isGold);
console.log('sampled ink — navy rgb(%s)  gold rgb(%s)', navy, gold);

/* A pixel of antialiased art on white is white*(1-a) + ink*a, so
   a = (255 - pixel) / (255 - ink) on whichever channel has the most range.
   Solving it back keeps the edges smooth; a plain threshold would alias them. */
const alphaFor = (c, ink) => {
  let a = 0;
  for (let k = 0; k < 3; k++) {
    const den = 255 - ink[k];
    if (den >= 24) a = Math.max(a, (255 - c[k]) / den);
  }
  return Math.max(0, Math.min(1, a));
};

/* Knock the artwork out of the white, recolouring each ink to a UI colour. */
const knockout = (navyTarget, goldTarget) => {
  const out = Buffer.alloc(W * H * 4);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const c = at(x, y), o = (y * W + x) * 4;
      if (isWhite(c)) continue;               /* alpha stays 0 */
      const g = isGold(c);
      const t = g ? goldTarget : navyTarget;
      out[o] = t[0]; out[o + 1] = t[1]; out[o + 2] = t[2];
      out[o + 3] = Math.round(alphaFor(c, g ? gold : navy) * 255);
    }
  }
  return sharp(out, { raw: { width: W, height: H, channels: 4 } });
};

/* ---- 1. the lockup, for the dark header and footer ---- */
/* 560px is ~3x its 180px display size, past any DPR that matters. The art is
   two flat inks plus their antialiasing, so a 64-colour palette is lossless to
   the eye and roughly halves the file against a full-colour PNG. This ships on
   every page load — it is worth the minute of tuning. */
const lockup = await knockout(CREAM_UI, GOLD_UI)
  .extract(ART).resize({ width: 560 })
  .png({ palette: true, colours: 64, effort: 10 })
  .toFile(path.join(ASSETS, 'logo-lockup-light.png'));
console.log('logo-lockup-light.png %dx%d  %d bytes', lockup.width, lockup.height, lockup.size);

/* ---- 2. the favicon set, from the towers device ---- */
/* Navy on cream, opaque: it has to hold up on both light and dark browser
   chrome, and a transparent icon disappears into one of them. Square is
   non-negotiable — Google ignores non-square icons and falls back to its globe
   (which is exactly what happened here on 2026-07-30, see brief.md). */
const devicePng = await knockout(navy, gold).extract(DEVICE).png().toBuffer();
const squareIcon = async (size) => {
  /* The device is a portrait 0.68 mark, so a square always leaves side margin;
     at 16px, 18% padding on top of that left about 9px of ink and it read as a
     sliver. Tab-sized icons get almost none, the large ones keep it. */
  const inner = Math.round(size * (size <= 48 ? 0.94 : 0.82));
  const scaled = await sharp(devicePng).resize({ height: inner }).toBuffer();
  const m = await sharp(scaled).metadata();
  return sharp({ create: { width: size, height: size, channels: 4, background: CREAM_BG } })
    .composite([{ input: scaled, top: Math.round((size - m.height) / 2), left: Math.round((size - m.width) / 2) }])
    .png({ palette: true, effort: 10 })
    .toBuffer();
};

for (const size of [48, 96, 192]) {
  const buf = await squareIcon(size);
  fs.writeFileSync(path.join(ASSETS, `favicon-${size}.png`), buf);
  console.log('favicon-%d.png  %d bytes', size, buf.length);
}
const apple = await squareIcon(180);
fs.writeFileSync(path.join(ASSETS, 'apple-touch-icon.png'), apple);
console.log('apple-touch-icon.png  %d bytes', apple.length);

/* ---- 3. favicon.ico (16/32/48) ---- */
/* sharp cannot write .ico, so pack it here. An ICO is a 6-byte header, one
   16-byte directory entry per image, then the images; PNG payloads are legal
   and universally supported by browsers. */
const icoSizes = [16, 32, 48];
const images = await Promise.all(icoSizes.map(squareIcon));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);                  /* reserved */
header.writeUInt16LE(1, 2);                  /* type: icon */
header.writeUInt16LE(images.length, 4);
let offset = 6 + 16 * images.length;
const entries = images.map((img, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(icoSizes[i] === 256 ? 0 : icoSizes[i], 0);
  e.writeUInt8(icoSizes[i] === 256 ? 0 : icoSizes[i], 1);
  e.writeUInt8(0, 2);                         /* palette count */
  e.writeUInt8(0, 3);                         /* reserved */
  e.writeUInt16LE(1, 4);                      /* colour planes */
  e.writeUInt16LE(32, 6);                     /* bits per pixel */
  e.writeUInt32LE(img.length, 8);
  e.writeUInt32LE(offset, 12);
  offset += img.length;
  return e;
});
const ico = Buffer.concat([header, ...entries, ...images]);
fs.writeFileSync(path.join(ROOT, 'docs/favicon.ico'), ico);
console.log('favicon.ico  %s  %d bytes', icoSizes.join('/'), ico.length);
