# Site Brief — Nomad Twin Towers (Arkanah2)
Tier: custom (hand-built static one-pager, no template/Astro workspace) · Slug: Arkanah2 · Date: 2026-07-14

## Business summary
Nomad Twin Towers (renders are branded "Nomad Twin Tower & Hotel") is a luxury
residential development off Waiyaki Way in Westlands, Nairobi: 34 storeys,
138 residences (1–2 bedroom, off-plan from KES 9.8M), a multi-level retail
podium and a rooftop infinity pool. The site is a single-page marketing site
aimed at off-plan buyers and investors. **No penthouse/3-bedroom unit exists**
(confirmed by Daniel 2026-07-27) — the 138-residence total was previously
described as a 1–3BR mix, so that count should be re-confirmed with the
client now that only two unit types are advertised (see Missing item 13).

## Brand
Colors: primary #12161e (night slate-blue), accent #cda060 (champagne gold),
light #f4f0e7 (warm ivory) — source: client renders `images/001–006.png`
(deleted 2026-07-27, see Content & imagery — color values themselves are
unaffected), cross-checked with `node packages/pipeline/src/color-from-image.mjs`
(dominant tones #90b0d0 sky, #505070 twilight, #505050 slate; warm gold is
the lighting accent throughout).
Tone: quiet luxury, English only.
Logo: none received — monogram "N" favicon/brand mark built in-house.

## Contact & location
Phone (tel): +254 700 000 000 (PLACEHOLDER)  ·  WhatsApp: 254700000000 (PLACEHOLDER)
Email: sales@nomadtwintowers.co.ke (PLACEHOLDER)  ·  Map: none — click-to-load
facade currently points at central Westlands  ·  Hours: n/a (sales gallery)
WhatsApp greeting: "Hello Nomad Twin Towers, I'd like to enquire."

## Sitemap
One page: Hero / Vision / Residences / Amenities / Gallery / Location /
Invest / Enquire (custom build — not the fixed Starter 5-page sitemap).

## Content & imagery
Copy is drafted in `index.html` with plausible placeholder figures (prices,
sizes, completion Q4 2027) pending client confirmation.

**2026-07-27: the original six renders (`images/001–006.png`, prepped as
hero-tower-sunset / podium-entrance-dusk / rooftop-pool-dusk / tower-dusk /
tower-aerial-morning / retail-promenade) were removed entirely** — raw files
deleted from `images/`, prepped files deleted from `assets/`, all references
in `index.html` (hero, og:image, JSON-LD, Vision section, Gallery) swapped
for renders from the second batch below. `images/001–006.png` no longer
exist in this repo; see git history before 2026-07-27 if they're ever
needed again.

The site now runs entirely on the second render batch, received 2026-07-27
(`images/batch-2026-07-27/`, 20 files, prepped via `prep-images.mjs` at
1600px JPEG/WebP, q80, --widths=800,1200). 13 of 20 are placed on the page:

| Prepped filename | Used | Alt/subject |
|---|---|---|
| front-view.jpg | Hero + og:image + JSON-LD image | Tower exterior at dusk |
| drop-off.jpg | Vision section | Arrival lobby / porte-cochère, night |
| drama-shot.jpg | Gallery | Twin towers rising above the podium, dusk |
| gym-and-wellness.jpg | Gallery + Amenities highlight | Sky gym & wellness floor |
| sky-lounge-terrace.jpg | Gallery + Amenities highlight | Residents' lounge terrace, dusk |
| pool-closeup.jpg | Gallery + Amenities highlight | Rooftop pool, golden-hour lifestyle shot |
| restaurant-main.jpg | Gallery + Amenities highlight | Sky restaurant |
| retail-02.jpg | Gallery | Retail podium boutique corridor |
| 1-br-living-room.jpg | Gallery + Residences card (photo toggle) | One bedroom residence, living room |
| 2-br-living-room.jpg | Gallery + Residences card (photo toggle) | Two bedroom residence, living room |
| bedroom.jpg | Gallery | Master bedroom |
| kitchen.jpg | Gallery | Kitchen |
| master-bathroom.jpg | Gallery | Master ensuite |

Unused (prepped in `assets/` but not on the page — street-view-01.jpg,
street-view-02.jpg, birds-eye-view.jpg, retail.jpg, gym-upclose.jpg,
gym-and-wellness-upclose.jpg, sky-lounge.jpg): each duplicates the
framing/subject of an image already placed, kept in reserve in case the
client prefers one of these over the current pick.

Floor plans: `plan-1br.svg`, `plan-2br.svg`. `plan-3br.svg` (penthouse) was
deleted 2026-07-27 — see Missing item 13.

## Missing items
1. Real sales phone/WhatsApp number (site shows +254 700 000 000 in index.html only — js/main.js now derives it from the page)
2. Real sales email (site shows sales@nomadtwintowers.co.ke in index.html only — js/main.js derives it)
3. Confirmed prices, unit sizes, floor count and completion date
4. ~~Interior renders — lounge, gym, bedroom, lobby — for the gallery~~ — RESOLVED 2026-07-27: second batch received, 12 placed in Gallery (see Content & imagery table above).
5. Exact plot location / Google Maps coordinates for the map facade
6. ~~Confirm the development name~~ — RESOLVED 2026-07-26 (Daniel): "Nomad Twin Towers" is correct, matches the render watermark. Site updated throughout (title, meta, OG, JSON-LD, alt text, footer, js/main.js) 2026-07-26.
7. Client logo, if one exists (site currently uses an in-house monogram)
8. Production domain — canonical, og:url, JSON-LD url, robots.txt and
   sitemap.xml currently use the placeholder `https://nomadtwintowers.co.ke/`
9. Developer credibility content for a proposed "The Developer" section
   (track record, NCA/county approvals, title status) — key trust signal
   for off-plan buyers; needs client facts, do not invent
10. Decision on a hotel/retail podium section (renders show it; open question below)
11. Confirm drafted claims found in review (2026-07-15) that go beyond items 3–5:
    payment plan (KES 500,000 refundable reservation, 20% deposit, quarterly
    interest-free instalments, 10% on handover), amenity specifics (Technogym
    brand, heated pool, solar-assisted common areas, biometric lobby access),
    rental/tenant-placement management offering, "Westlands strongest rental
    market" claim, and the location drive times (3/4/5/10/35 min)
12. New amenity added 2026-07-27 on the strength of `restaurant-main.jpg`
    (second render batch): "Sky Restaurant" — "All-day dining on the
    amenity floor, with a private terrace over the Westlands skyline."
    Added as a 9th card in the Amenities icon grid plus a photo highlight
    card, on the `experiment/amenity-and-unit-imagery` branch. This is a
    drafted claim like the others above — needs client confirmation the
    restaurant is real (not just a rendered space) before merging to main.
13. ~~Third residence type (Penthouse)~~ — RESOLVED 2026-07-27 (Daniel): no
    penthouse exists. Removed the Penthouse card, `plan-3br.svg`, and every
    "1–3 bedroom" / "three bedroom" mention (meta description, og:description,
    JSON-LD, hero lede, hero stats, Residences heading, "Largest Penthouse"
    stat, enquiry form unit dropdown). Site now advertises 1BR/2BR only.
    Open sub-item: the "138 Residences" stat and business-summary total
    were sized against a 1–3BR mix — worth re-confirming with the client
    now that the mix is 1–2BR only.

## Open questions
- Is this job billed as a custom tier? It bypasses the template pipeline
  (`/build` and the `pnpm --filter` preview/build steps don't apply; review
  gate 2 should use the automated checks that make sense plus a judgment
  pass, and deploy is any static host).
- Should the hotel/retail offering (visible in renders) get its own section?
- `assets/pool-closeup.jpg` (now in the Gallery as "Rooftop Pool · Golden
  Hour") shows a resident holding what reads as a cocktail glass. Most other
  renders across both batches depict Muslim dress/attire — worth a client
  check on whether that image is on-brand before this goes live, or whether
  to swap in `assets/gym-and-wellness-upclose.jpg` or drop the shot.

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
- Review (gate 2): run 2026-07-15 → `review-report.md` (adapted automated
  checks + judgment pass); awaiting Muchiri's eyeball of the preview
- Deploy: not deployed; any static host (see README)
- 2026-07-26: name corrected to "Nomad Twin Towers" site-wide (see git log)
- 2026-07-27: second render batch placed — Gallery expanded from 4 to 16
  images (interiors, lobby, gym, lounge, restaurant, retail podium); brand
  mark and WhatsApp deep-link text (missed in the 07-26 rename pass) fixed
  to "Nomad Twin Towers"
- 2026-07-27 (later same day): amenity photo highlights + residence
  photo/plan toggle added (`experiment/amenity-and-unit-imagery`, merged to
  main). Then, per Daniel: the original six renders removed entirely (raw
  + prepped), hero/Vision images swapped to the second batch, Gallery
  trimmed to 11 second-batch images, and the Penthouse card/copy removed
  site-wide (no penthouse exists) — site now runs on the 2026-07-27 batch
  only and advertises 1BR/2BR
