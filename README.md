# Nomad Twin Towers — Marketing Site

A fast, polished one-page marketing site for the residential units of Nomad
Twin Towers — a mixed-use development (retail podium + residences + hotel)
in Westlands, Nairobi, developed by Obsha Properties. This site focuses on
selling the apartments; it doesn't attempt to replicate the full commercial
price list or a hotel-booking experience. Built as a modern take on sites
like Montbleu Westlands and Grosvenor Residences — but engineered to be
dramatically faster.

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

**`docs/` is the actual published site** — GitHub Pages is configured to
serve `main` branch, `/docs` folder (changed 2026-07-27; was root, which
publicly exposed this brief and internal notes — see brief.md). Everything
else in the repo root is internal and not served.

```
docs/index.html      single page: hero → about → residences → amenities
                     → gallery → location → invest → enquire
docs/css/main.css    design system + all styles
docs/js/main.js      nav, scroll reveals, counters, gallery, lightbox,
                     map facade, enquiry form (all progressive enhancement)
docs/assets/*.jpg|webp  client renders, prepped to 800/1200/1600 px via
                     packages/pipeline/src/prep-images.mjs (--widths/--webp)
docs/assets/*.svg|png   floor plans (1BR/2BR only — no penthouse), favicon
docs/fonts/*.woff2   Fraunces (display) + Manrope (body), self-hosted
docs/robots.txt      + sitemap.xml — nomadtwintowers.com, see brief.md

images/batch-2026-07-27/*.png  source renders from the client, full size
                     (16 of 20 used on the page; 4 near-duplicates kept
                     in docs/assets/ but unused — see brief.md). NOT
                     served — stays at repo root, outside docs/.
reference/           client price list, mobile-nav bug screenshots, Stitch
                     prompts — internal only, NOT served (outside docs/)
brief.md, README.md, review-report.md  internal project docs — NOT served
```

## Placeholder content to replace before launch

- **Phone/WhatsApp** `+254 711 111 188` — REAL, from the client's price list
  (`reference/nomad-twin-towers-price-list-2026-07-27.jpeg`). In
  `docs/index.html` only (`docs/js/main.js` derives it from the floating
  WhatsApp button's href).
- **Email** `sales@nomadtwintowers.com` — still a PLACEHOLDER; only the
  domain half is confirmed, the mailbox itself was never given by the
  client. In `docs/index.html` only (`docs/js/main.js` derives it from the contact
  mailto link).
- **Domain** `https://nomadtwintowers.com/` — confirmed 2026-07-27 from the
  client's price list (was previously a `.co.ke` placeholder). Still needs
  one check: whether the client already owns it or it needs registering.
  Canonical link, Open Graph tags, JSON-LD, `robots.txt` and `sitemap.xml`
  are all updated to match.
- **Prices, unit sizes** — now match the client's official price list (USD
  per sqm: 1BR 60sqm ≈$87,000, 2BR 100sqm ≈$180,000). **Storey count and
  completion date were removed from the live copy 2026-07-27** (unconfirmed
  by the price list) rather than left as guessed placeholders — see
  brief.md Missing items 3 and 14.
- **Favicon & logo** — replaced 2026-07-27 with the real "NT" mark cropped
  from the client's price list. Favicon uses an opaque-background crop
  (`docs/assets/favicon-16/32.png`, `apple-touch-icon.png`); the header/footer
  nav brand mark uses a separate transparent-background crop
  (`docs/assets/logo-mark.png`, chroma-keyed since the header sits over the
  hero photo until scroll). The old in-house SVG monogram (`favicon.svg`
  and the inline `<svg>` brand marks) were both removed.
- **Exterior, amenity and interior renders** are all in place (hero, about,
  amenities, residences, gallery — from `images/batch-2026-07-27/`). To add
  more later, prep with
  `node packages/pipeline/src/prep-images.mjs <src> docs/assets --widths=800,1200 --webp`
  and wire in with correct `width`/`height` attributes to preserve zero CLS.
- **Map coordinates** — `docs/js/main.js` (`data-load-map` handler) currently
  points at central Westlands
- The enquiry form is backend-free by design (hands off to email/WhatsApp).
  If the client wants submissions stored, wire the form to Formspree/Basin or
  a small serverless endpoint.

## Development

No build step. Open `docs/index.html` directly, or serve locally:

```
npx serve docs
```

## Deployment

**Live**: GitHub Pages, `main` branch, `/docs` folder (Settings → Pages) —
`https://daydroidmuchiri.github.io/Arkanah2/`. Changed 2026-07-27 from
root folder, which publicly served this brief and internal notes
alongside the site; see brief.md for the full story. Any other static
host works too (Cloudflare Pages, Netlify) — just point it at `docs/` as
the publish directory, not the repo root.
