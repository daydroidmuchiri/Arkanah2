# Nomad Towers — Marketing Site

A fast, polished one-page marketing site for a luxury residential development in
Westlands, Nairobi. Built as a modern take on sites like Montbleu Westlands and
Grosvenor Residences — but engineered to be dramatically faster.

## Why it's fast

The reference sites ship a ~1&nbsp;MB JavaScript framework bundle and render
everything client-side, which is why they feel slow. This site takes the
opposite approach:

| Technique | Effect |
| --- | --- |
| **Zero frameworks** — plain HTML/CSS/JS | ~8 KB of deferred JS vs ~1 MB; instant first paint |
| **Self-hosted fonts** (3 woff2 files, latin subset, preloaded, `font-display: swap`) | no third-party font request, no invisible text |
| **SVG artwork** (~2–5 KB each) instead of hero JPEGs | entire image set is smaller than one photo |
| `loading="lazy"` + explicit `width`/`height` on every image | no layout shift (CLS ≈ 0), below-fold images deferred |
| `content-visibility: auto` on below-fold sections | browser skips rendering work until sections approach the viewport |
| **Click-to-load map facade** | no third-party iframe cost unless the visitor asks for it |
| `prefers-reduced-motion` respected everywhere | animations disabled for users who opt out |
| One CSS file, one JS file, no build step | two cacheable requests; deploy anywhere static |

Total page weight (fonts included): **≈ 110 KB** — versus multiple megabytes
for the reference sites.

## Structure

```
index.html          single page: hero → about → residences → amenities
                    → gallery → location → invest → enquire
css/main.css        design system + all styles
js/main.js          nav, scroll reveals, counters, gallery, lightbox,
                    map facade, enquiry form (all progressive enhancement)
assets/*.svg        artwork, floor plans, favicon
fonts/*.woff2       Fraunces (display) + Manrope (body), self-hosted
```

## Placeholder content to replace before launch

- **Phone/WhatsApp** `+254 700 000 000` — in `index.html` (3 places) and `js/main.js`
- **Email** `sales@nomadtowers.co.ke` — in `index.html` and `js/main.js`
- **Prices, unit sizes, floor counts, completion date** — currently plausible
  placeholders in the hero, stats, and residence cards
- **SVG artwork** — swap for client photography/renders when available.
  Keep the same filenames (or update `index.html`), export as WebP/AVIF at
  ~1600 px wide, and keep the `width`/`height` attributes to preserve zero CLS.
- **Map coordinates** — `js/main.js` (`data-load-map` handler) currently points
  at central Westlands
- The enquiry form is backend-free by design (hands off to email/WhatsApp).
  If the client wants submissions stored, wire the form to Formspree/Basin or
  a small serverless endpoint.

## Development

No build step. Open `index.html` directly, or serve locally:

```
npx serve .
```

## Deployment

Any static host (GitHub Pages, Cloudflare Pages, Netlify). For GitHub Pages:
Settings → Pages → deploy from `main` branch, root folder.
