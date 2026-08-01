/* Hero contrast audit — internal tooling, not served (lives outside docs/).
   Paste into the console on a served copy of the site. See hero-scrim.md.

   Measures the hero copy against the render as it is actually composited:
   the real image, through the real CSS filter, under the real scrim, sampled
   only where the glyphs are. */
(async () => {
  const hero = document.querySelector('.hero');
  const art = document.querySelector('.hero-art');
  const hb = hero.getBoundingClientRect();

  const lin = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  const L = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  const ratio = (a, b) => { const [x, y] = [L(a), L(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };

  /* --- the scrim, read off the live ::after so it can never drift from CSS --- */
  const pos = (tok, axis) => {
    const cm = /calc\(\s*([\d.]+)%\s*([+-])\s*([\d.]+)px\s*\)/.exec(tok);
    if (cm) return +cm[1] / 100 + (cm[2] === '-' ? -1 : 1) * +cm[3] / axis;
    if (tok.endsWith('%')) return parseFloat(tok) / 100;
    return parseFloat(tok) / axis;
  };
  const layers = getComputedStyle(hero, '::after').backgroundImage
    .split(/,\s*(?=linear-gradient\()/).map(g => {
      const m = /^linear-gradient\(\s*(?:(\d+)deg,)?/.exec(g);
      const deg = m && m[1] ? +m[1] : 180;
      const axis = (deg === 90 || deg === 270) ? hb.width : hb.height;
      return {
        deg,
        stops: [...g.matchAll(/rgba?\(([\d.\s,]+?)\)\s*(calc\([^)]*\)|-?[\d.]+(?:px|%)?)/g)]
          .map(s => ({ a: +(s[1].split(',')[3] ?? 1), p: pos(s[2], axis) })),
      };
    });
  const alphaAt = (x, y, w, h) => layers.reduce((acc, g) => {
    const u = g.deg === 180 ? y / h : g.deg === 0 ? 1 - y / h : g.deg === 90 ? x / w : 1 - x / w;
    const s = g.stops;
    let a = s[s.length - 1].a;
    if (u <= s[0].p) a = s[0].a;
    else for (let i = 0; i < s.length - 1; i++) {
      if (u >= s[i].p && u <= s[i + 1].p) {
        a = s[i].a + (s[i + 1].a - s[i].a) * ((u - s[i].p) / (s[i + 1].p - s[i].p));
        break;
      }
    }
    return 1 - (1 - acc) * (1 - a);
  }, 0);

  /* --- the render, at the same cover-crop and through the same filter --- */
  const img = new Image();
  img.src = art.currentSrc;
  await img.decode();
  const c = document.createElement('canvas');
  c.width = Math.round(hb.width);
  c.height = Math.round(hb.height);
  const ctx = c.getContext('2d', { willReadFrequently: true });
  ctx.filter = getComputedStyle(art).filter;
  const s = Math.max(c.width / img.naturalWidth, c.height / img.naturalHeight);
  ctx.drawImage(img, (c.width - img.naturalWidth * s) / 2, (c.height - img.naturalHeight * s) / 2,
                img.naturalWidth * s, img.naturalHeight * s);

  /* Sample the text runs, NOT the element box: these are grid items stretched
     to the full wrap, and averaging in sky the glyphs never cover understates
     the result badly (4.11 vs 6.50 for the eyebrow at 2560). */
  const textRects = el => {
    const out = [];
    const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = w.nextNode())) {
      if (!n.nodeValue.trim()) continue;
      const rg = document.createRange();
      rg.selectNodeContents(n);
      out.push(...rg.getClientRects());
    }
    return out.length ? out : [el.getBoundingClientRect()];
  };

  const check = sel => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const cs = getComputedStyle(el);
    const fg = cs.color.match(/[\d.]+/g).slice(0, 3).map(Number);
    const px = parseFloat(cs.fontSize), wt = +cs.fontWeight || 400;
    const req = (px >= 24 || (px >= 18.66 && wt >= 700)) ? 3 : 4.5;
    let sum = [0, 0, 0], n = 0, worst = null, wl = -1;
    for (const r of textRects(el)) {
      const x0 = Math.max(0, Math.round(r.left)), x1 = Math.min(c.width, Math.round(r.right));
      const y0 = Math.max(0, Math.round(r.top - hb.top)), y1 = Math.min(c.height, Math.round(r.bottom - hb.top));
      if (x1 <= x0 || y1 <= y0) continue;
      const w = x1 - x0;
      const d = ctx.getImageData(x0, y0, w, y1 - y0).data;
      for (let i = 0; i < d.length; i += 4) {
        const p = i / 4;
        const a = alphaAt((p % w) + x0, Math.floor(p / w) + y0, c.width, c.height);
        const comp = [d[i], d[i + 1], d[i + 2]].map((v, k) => v * (1 - a) + [18, 22, 30][k] * a);
        sum = sum.map((v, k) => v + comp[k]);
        n++;
        const l = L(comp);
        if (l > wl) { wl = l; worst = comp; }
      }
    }
    if (!n) return null;
    const mean = ratio(fg, sum.map(v => v / n));
    return { line: sel, px: +px.toFixed(1), needs: req, mean: +mean.toFixed(2),
             worstPx: +ratio(fg, worst).toFixed(2), verdict: mean >= req ? 'PASS' : 'FAIL' };
  };

  /* The header brand is an image since 2026-08-01, so it is not in this list —
     it is a graphic under WCAG 1.4.11 (3:1), measured by sampling the render
     behind its box rather than by reading a text colour. Last measured at
     390x844: cream type 5.65:1, gold rules 4.5:1. */
  const rows = ['.hero .eyebrow', '.hero h1', '.hero .serif-accent', '.hero .lede',
                '.hero-ctas .btn--ghost', '.hero-meta dt', '.hero-meta dd'].map(check).filter(Boolean);
  console.log(`hero contrast @ ${innerWidth}×${innerHeight}`);
  console.table(rows);
  const fails = rows.filter(r => r.verdict === 'FAIL');
  console.log(fails.length ? `${fails.length} FAILING` : `all pass — lowest ${Math.min(...rows.map(r => r.mean))}`);
})();
