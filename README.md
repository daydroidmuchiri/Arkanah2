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
| **Prepped renders** (1600 px JPEG, q80, ~200–410 KB) + SVG floor plans | source renders were 6–23 MB each; below-fold images lazy-load |
| `loading="lazy"` + explicit `width`/`height` on every image | no layout shift (CLS ≈ 0), below-fold images deferred |
| `content-visibility: auto` on below-fold sections | browser skips rendering work until sections approach the viewport |
| **Click-to-load map facade** | no third-party iframe cost unless the visitor asks for it |
| `prefers-reduced-motion` respected everywhere | animations disabled for users who opt out |
| One CSS file, one JS file, no build step | two cacheable requests; deploy anywhere static |

Total page weight excluding photography (fonts included): **≈ 110 KB**. The
hero render adds ~380 KB up front; the remaining five renders lazy-load below
the fold — still a fraction of the reference sites.

## Structure

```
index.html          single page: hero → about → residences → amenities
                    → gallery → location → invest → enquire
css/main.css        design system + all styles
js/main.js          nav, scroll reveals, counters, gallery, lightbox,
                    map facade, enquiry form (all progressive enhancement)
assets/*.jpg        client renders, prepped to 1600 px / q80 via
                    packages/pipeline/src/prep-images.mjs
assets/*.svg        floor plans, favicon, retired artwork placeholders
images/*.png        source renders from the client (001–006, full size)
fonts/*.woff2       Fraunces (display) + Manrope (body), self-hosted
```

## Placeholder content to replace before launch

- **Phone/WhatsApp** `+254 700 000 000` — in `index.html` (3 places) and `js/main.js`
- **Email** `sales@nomadtowers.co.ke` — in `index.html` and `js/main.js`
- **Prices, unit sizes, floor counts, completion date** — currently plausible
  placeholders in the hero, stats, and residence cards
- **Exterior/lifestyle renders** are in place (hero, about, gallery — from
  `images/001–006.png`). Interior shots (lounge, gym, bedroom, lobby) are
  still missing; when the client sends them, prep with
  `node packages/pipeline/src/prep-images.mjs` and add to the gallery with
  correct `width`/`height` attributes to preserve zero CLS.
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
