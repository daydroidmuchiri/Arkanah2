# Nomad Twin Towers — Marketing Site

A fast, polished one-page marketing site for the residential units of Nomad
Twin Towers — a mixed-use development (retail podium + residences + hotel)
in Eastleigh, Nairobi, developed by Obsha Properties. This site focuses on
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

**`docs/` is the actual published site** — only this folder is uploaded to
Cloudflare Pages (changed 2026-07-29; previously GitHub Pages, and before
that the repo root, which publicly exposed this brief and internal notes —
see brief.md). Everything else in the repo root is internal and not served.

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
docs/404.html        not-found page (Cloudflare Pages serves it with a real
                     404; without it, unknown paths soft-404 as 200 + index)
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
- **Email** `sales@nomadtwintowers.com` — **live 2026-07-29** via Cloudflare
  Email Routing (free with the domain), forwarding to `makoriian11@gmail.com`.
  MX/SPF/DKIM records are created and the zone is `ready`. It lives in
  `docs/index.html` only (`docs/js/main.js` derives the form's mailto handoff
  from that contact link), so if it ever does change, one line covers it.
  **Inbound only.** Email Routing cannot *send* from the domain — replies from
  Gmail go out as the Gmail address, not `sales@`. Closing that needs either
  Cloudflare Email Sending (SMTP relay + Gmail "Send mail as", requires the
  $5/mo Workers Paid plan) or a real mailbox provider (Google Workspace, Zoho).
  Deferred to the client at handover; the site needs no change either way.
- **Domain** `https://nomadtwintowers.com/` — **registered 2026-07-29** at
  Cloudflare Registrar, $10.46/yr at cost, expires 2027-07-29, auto-renew ON,
  WHOIS redaction ON. Registrant is Ian Angwenyi Makori / Jenzi (the agency),
  to be transferred to the client after launch — note ICANN's 60-day post-
  registration transfer lock. Zone `87e39d03e4774c19f9979debe6293a84` on
  Cloudflare DNS. Canonical link, Open Graph tags, JSON-LD, `robots.txt` and
  `sitemap.xml` all already point at it.
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
- **Map coordinates** — `docs/js/main.js` (`data-load-map` handler) points at
  `-1.280676, 36.848874`, the client-supplied pin (2026-07-29). Same
  coordinates are in the JSON-LD `geo` block in `docs/index.html`.
- The enquiry form is backend-free by design (hands off to email/WhatsApp).
  If the client wants submissions stored, wire the form to Formspree/Basin or
  a small serverless endpoint.

## Development

No build step. Open `docs/index.html` directly, or serve locally:

```
npx serve docs
```

## Deployment

**Live**: Cloudflare Pages, project `nomad-twin-towers`
(`nomad-twin-towers.pages.dev`), custom domains `nomadtwintowers.com` and
`www.nomadtwintowers.com`, both proxied CNAMEs to the `.pages.dev` host with
Cloudflare-managed TLS. Deployed by `.github/workflows/deploy-pages.yml` via
`cloudflare/wrangler-action` on every push touching `docs/**`.

Requires two GitHub repository secrets: `CLOUDFLARE_API_TOKEN` (needs the
*Cloudflare Pages: Edit* permission) and `CLOUDFLARE_ACCOUNT_ID`
(`d8123d036b6a9d6e79e5e72abf6ff65a`).

Only `docs/` is uploaded, so `brief.md`, `reference/` and `images/` are never
served. That deploy-root guarantee matters: with plain GitHub Pages
(`Settings → Pages → main:/docs`, tried 2026-07-27) the legacy Jekyll build
served the *whole repository* regardless of the configured source folder, and
internal files stayed publicly fetchable. The Actions-based GitHub Pages
workflow fixed it, and the Cloudflare Pages workflow preserves it the same
way — by uploading one folder rather than the repo. See brief.md.

The old GitHub Pages deployment at `https://daydroidmuchiri.github.io/Arkanah2/`
should be turned off in repo Settings → Pages once Cloudflare is verified live,
to avoid a duplicate copy of the site (the canonical tag points at
nomadtwintowers.com, which mitigates but does not remove the issue).

## Analytics

Two sources, and **you need both** — read them together, not separately.

**Source of truth for visitor counts: the zone's edge analytics.** Cloudflare
dashboard → the `nomadtwintowers.com` zone → Analytics & Logs → Traffic. Free
plan gives *Requests*, *Bandwidth*, *Unique Visitors*, and requests by country.
Measured at Cloudflare's edge from the HTTP requests themselves, so **nothing
can block it** — no script, no cookie, no consent surface. It is also
retroactive and needed no setup; data has been accumulating since the domain
went live 2026-07-29. Caveat: it counts crawlers, bots and threat traffic
alongside real people, so it **overcounts** humans.

**Secondary, for engagement and performance: Cloudflare Web Analytics.** The JS
beacon at the bottom of `docs/index.html` (site token `04edb6ea…`). Gives page
load times, Core Web Vitals, referrers and time-on-page — things edge logs
cannot see. But it is a third-party script from
`static.cloudflareinsights.com`, so it is blocked for a meaningful share of
visitors by ad blockers, Brave shields and Edge/Safari tracking prevention.
Realistically **undercounts** by roughly 20–40% depending on audience. Blocked
loads show in the browser console as `ERR_BLOCKED_BY_CLIENT` or "Tracking
Prevention blocked a Script resource" — that is expected, not a site fault.

So: edge Unique Visitors is the ceiling, beacon visits are the floor, and the
real number sits between. Quote the edge figure to the client for reach, and
the beacon for behaviour.

**Things that were considered and rejected** (decided 2026-07-30, so nobody
re-treads this):

- *Switching the beacon to Cloudflare's automatic edge injection* does **not**
  make it unblockable. Both modes load the same script from
  `static.cloudflareinsights.com`; automatic only changes where the beacon
  *posts* (first-party `/cdn-cgi/rum` instead of `cloudflareinsights.com`). It
  would recover only visitors whose blocker stops the POST but allows the
  script. Cloudflare Web Analytics has **no** server-side mode — per their
  docs, it "only displays client-side analytics."
- *Server-side pageviews and per-URL breakdown* require the **Pro plan
  ($20/mo)**. Low value here regardless: the site is a single page, so a
  per-path breakdown tells you nothing the total doesn't.
- *A Pages Function logging hits to D1* would give true unblockable
  first-party per-visit data on the free tier, but puts serverless code in
  front of what is currently pure static hosting, and needs something built to
  read it. Not worth it for a one-page brochure site. Revisit only if the
  client asks for numbers the two sources above cannot answer.
