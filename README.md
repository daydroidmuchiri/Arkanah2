# Nomad Twin Towers — Marketing Site

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
| **Responsive renders** — 800/1200/1600 px JPEG + WebP via `srcset`/`<picture>` | phones fetch ~90–110 KB instead of 400 KB per render; source renders were 6–23 MB each |
| `loading="lazy"` + explicit `width`/`height` on every image | no layout shift (CLS ≈ 0), below-fold images deferred |
| `content-visibility: auto` on below-fold sections | browser skips rendering work until sections approach the viewport |
| **Click-to-load map facade** | no third-party iframe cost unless the visitor asks for it |
| `prefers-reduced-motion` respected everywhere | animations disabled for users who opt out |
| One CSS file, one JS file, no build step | two cacheable requests; deploy anywhere static |

Total page weight excluding photography (fonts included): **≈ 110 KB**. The
hero render adds ~90 KB (phone) to ~290 KB (desktop, WebP) up front; the
remaining renders lazy-load below the fold at the same responsive sizes —
still a fraction of the reference sites.

## Structure

```
index.html          single page: hero → about → residences → amenities
                    → gallery → location → invest → enquire
css/main.css        design system + all styles
js/main.js          nav, scroll reveals, counters, gallery, lightbox,
                    map facade, enquiry form (all progressive enhancement)
assets/*.jpg|webp   client renders, prepped to 800/1200/1600 px via
                    packages/pipeline/src/prep-images.mjs (--widths/--webp)
assets/*.svg|png    floor plans (1BR/2BR only — no penthouse), favicon
images/batch-2026-07-27/*.png  source renders from the client, full size
                    (12 of 20 used on the page; 8 near-duplicates kept
                    in assets/ but unused — see brief.md)
robots.txt          + sitemap.xml — placeholder domain, see brief.md
fonts/*.woff2       Fraunces (display) + Manrope (body), self-hosted
```

## Placeholder content to replace before launch

- **Phone/WhatsApp** `+254 700 000 000` — in `index.html` only (`js/main.js`
  derives it from the floating WhatsApp button's href)
- **Email** `sales@nomadtwintowers.co.ke` — in `index.html` only (`js/main.js`
  derives it from the contact mailto link)
- **Domain** `https://nomadtwintowers.co.ke/` — placeholder in the canonical link,
  Open Graph tags, JSON-LD, `robots.txt` and `sitemap.xml`
- **Prices, unit sizes, floor counts, completion date** — currently plausible
  placeholders in the hero, stats, and residence cards
- **Exterior, amenity and interior renders** are all in place (hero, about,
  amenities, residences, gallery — from `images/batch-2026-07-27/`). To add
  more later, prep with
  `node packages/pipeline/src/prep-images.mjs <src> <dest> --widths=800,1200 --webp`
  and wire in with correct `width`/`height` attributes to preserve zero CLS.
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
