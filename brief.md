# Site Brief — Nomad Towers (Arkanah2)
Tier: custom (hand-built static one-pager, no template/Astro workspace) · Slug: Arkanah2 · Date: 2026-07-14

## Business summary
Nomad Towers (renders are branded "Nomad Twin Tower & Hotel") is a luxury
residential development off Waiyaki Way in Westlands, Nairobi: 34 storeys,
138 residences (1–3 bedroom, off-plan from KES 9.8M), a multi-level retail
podium and a rooftop infinity pool. The site is a single-page marketing site
aimed at off-plan buyers and investors.

## Brand
Colors: primary #12161e (night slate-blue), accent #cda060 (champagne gold),
light #f4f0e7 (warm ivory) — source: client renders `images/001–006.png`,
cross-checked with `node packages/pipeline/src/color-from-image.mjs`
(dominant tones #90b0d0 sky, #505070 twilight, #505050 slate; warm gold is
the lighting accent throughout).
Tone: quiet luxury, English only.
Logo: none received — monogram "N" favicon/brand mark built in-house.

## Contact & location
Phone (tel): +254 700 000 000 (PLACEHOLDER)  ·  WhatsApp: 254700000000 (PLACEHOLDER)
Email: sales@nomadtowers.co.ke (PLACEHOLDER)  ·  Map: none — click-to-load
facade currently points at central Westlands  ·  Hours: n/a (sales gallery)
WhatsApp greeting: "Hello Nomad Towers, I'd like to enquire."

## Sitemap
One page: Hero / Vision / Residences / Amenities / Gallery / Location /
Invest / Enquire (custom build — not the fixed Starter 5-page sitemap).

## Content & imagery
Copy is drafted in `index.html` with plausible placeholder figures (prices,
sizes, completion Q4 2027) pending client confirmation. Imagery prepped from
client renders via `prep-images.mjs` (1600 px JPEG, q80):

| Prepped filename | Used | Alt/subject |
|---|---|---|
| hero-tower-sunset.jpg | Hero + og:image | Tower at sunset (001) |
| podium-entrance-dusk.jpg | Vision section | Lit entrance & retail podium (003) |
| rooftop-pool-dusk.jpg | Gallery | Rooftop infinity pool at twilight (006) |
| tower-dusk.jpg | Gallery | Tower from the gardens at dusk (002) |
| tower-aerial-morning.jpg | Gallery | Aerial over Westlands, morning (004) |
| retail-promenade.jpg | Gallery | Street-level retail promenade (005) |

Floor plans remain in-house SVGs (`plan-1br/2br/3br.svg`).

## Missing items
1. Real sales phone/WhatsApp number (site shows +254 700 000 000 in index.html only — js/main.js now derives it from the page)
2. Real sales email (site shows sales@nomadtowers.co.ke in index.html only — js/main.js derives it)
3. Confirmed prices, unit sizes, floor count and completion date
4. Interior renders — lounge, gym, bedroom, lobby — for the gallery
5. Exact plot location / Google Maps coordinates for the map facade
6. Confirm the development name: renders say "Nomad Twin Tower & Hotel", site says "Nomad Towers"
7. Client logo, if one exists (site currently uses an in-house monogram)
8. Production domain — canonical, og:url, JSON-LD url, robots.txt and
   sitemap.xml currently use the placeholder `https://nomadtowers.co.ke/`
9. Developer credibility content for a proposed "The Developer" section
   (track record, NCA/county approvals, title status) — key trust signal
   for off-plan buyers; needs client facts, do not invent
10. Decision on a hotel/retail podium section (renders show it; open question below)

## Open questions
- Is this job billed as a custom tier? It bypasses the template pipeline
  (`/build` and the `pnpm --filter` preview/build steps don't apply; review
  gate 2 should use the automated checks that make sense plus a judgment
  pass, and deploy is any static host).
- Should the hotel/retail offering (visible in renders) get its own section?

## Pipeline status
- Scaffold: n/a (hand-built, imported into `clients/Arkanah2/`)
- Intake: renders received → `clients/Arkanah2/images/` (2026-07-14)
- Brief: this document — **GATE 1: awaiting Muchiri's approval**
- Build: site exists (`index.html`, `css/`, `js/`, `assets/`); colors matched
  to renders and imagery placed 2026-07-14. Improvement pass 2026-07-15:
  responsive images (800/1200/1600 JPEG+WebP via srcset), italic font preload,
  absolute og:image + og:url/canonical (placeholder domain), placeholder
  tel/email removed from JSON-LD, skip link, mobile-nav focus trap, lightbox
  arrow keys, WhatsApp-first form actions, PNG favicons, robots.txt +
  sitemap.xml, retired artwork SVGs deleted
- Review (gate 2): not run
- Deploy: not deployed; any static host (see README)
