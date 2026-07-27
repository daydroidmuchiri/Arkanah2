# Site Brief — Nomad Twin Towers (Arkanah2)
Tier: custom (hand-built static one-pager, no template/Astro workspace) · Slug: Arkanah2 · Date: 2026-07-14

## Business summary
Nomad Twin Towers, developed by **Obsha Properties** ("Building Value.
Creating Futures.") — confirmed 2026-07-27 via the client's official price
list, `docs/nomad-twin-towers-price-list-2026-07-27.jpeg` — is a landmark
**mixed-use** development off Waiyaki Way in Westlands, Nairobi, not a pure
residential tower as earlier copy framed it:

- **Retail**: 334 shops across Ground–6th floor (fashion/beauty, electronics,
  food court, fine dining, healthcare, a masjid, and a big event hall/hotel
  restaurant on the 6th floor), plus a 1,701 sqm (18,309 sqft) supermarket
  anchor in Basement 1
- **Residential**: 252 apartment units — 72×1-Bedroom (60 sqm/646 sqft,
  USD 1,450/sqm ≈ USD 87,000) and 180×2-Bedroom (100 sqm/1,076 sqft,
  USD 1,800/sqm ≈ USD 180,000). **No penthouse/3-bedroom unit exists**
  (confirmed by Daniel 2026-07-27, independently of the price list, which
  also shows no 3BR line item)
- **Hotel**: 60 rooms across the 19th–20th floors (avg. 30 sqm/323 sqft),
  with a separate hotel lobby/lifts
- Parking: Basement 2 (~52 bays) and Basement 3 (~53 bays)
- **All prices in the official list are USD, per sqm/sqft** — the site
  previously showed flat KES prices; now converted to match (see Missing
  item 3)

The site (this repo) is a single-page marketing site focused on selling the
**residential units** — it does not attempt to replicate the full
commercial/retail price list or a hotel-booking experience, per Daniel's
2026-07-27 direction to reposition (not fully rebuild) the site around the
mixed-use scope.

## Brand
Colors: primary #12161e (night slate-blue), accent #cda060 (champagne gold),
light #f4f0e7 (warm ivory) — source: client renders `images/001–006.png`
(deleted 2026-07-27, see Content & imagery — color values themselves are
unaffected), cross-checked with `node packages/pipeline/src/color-from-image.mjs`
(dominant tones #90b0d0 sky, #505070 twilight, #505050 slate; warm gold is
the lighting accent throughout).
Tone: quiet luxury, English only.
Logo: **RESOLVED 2026-07-27** — real logo found in the price list (the "NT"
monogram square). Cropped from `docs/nomad-twin-towers-price-list-2026-07-27.jpeg`
(source coordinates: left 693, top 1, width 100, height 80 of the 1024×1536
JPEG, padded to a 100×100 square with sampled background navy #011226) and
regenerated as `assets/favicon-16.png`, `favicon-32.png` and
`apple-touch-icon.png`. The old in-house "N" monogram (`favicon.svg`) was
deleted — it no longer matches the real brand. Note: the header/footer
still use a separate hand-drawn inline SVG "N" mark for the nav brand
lockup (not the favicon file) — not yet updated to match the real logo;
would need the same crop treatment or a proper vector trace if wanted.
Developer: **Obsha Properties** — credited in the footer 2026-07-27
("Developed by Obsha Properties"). No separate logo/branding assets
received for Obsha itself; text credit only.

## Contact & location
Phone/WhatsApp: **+254 711 111 188** — REAL, from the client's price list,
replaced the `+254 700 000 000` placeholder 2026-07-27 (tel link, WhatsApp
float, contact row — js/main.js derives the WhatsApp number from the page).
Email: `sales@nomadtwintowers.com` — still a PLACEHOLDER (no real email was
given anywhere in the price list); only the domain half was corrected from
`.co.ke` to `.com` to match the confirmed domain (see Missing item 8).
Map: none — click-to-load facade currently points at central Westlands.
Hours: n/a (sales gallery).
WhatsApp greeting: "Hello Nomad Twin Towers, I'd like to enquire."

## Sitemap
One page: Hero / Vision / Residences / Amenities / Gallery / Location /
Invest / Enquire (custom build — not the fixed Starter 5-page sitemap).

## Content & imagery
**2026-07-27: the original six renders (`images/001–006.png`) were removed
entirely** — raw files deleted from `images/`, prepped files deleted from
`assets/` (hero-tower-sunset, podium-entrance-dusk, rooftop-pool-dusk,
tower-dusk, tower-aerial-morning, retail-promenade). All references in
`index.html` swapped for the second batch. If those first-batch files are
ever needed again, they're in git history before commit `e77692c`.

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
| restaurant-main.jpg | Gallery + Amenities highlight | Sky restaurant (see Missing item 12 re: naming) |
| retail-02.jpg | Gallery | Retail podium boutique corridor |
| 1-br-living-room.jpg | Gallery + Residences card (photo toggle) | One bedroom residence, living room |
| 2-br-living-room.jpg | Gallery + Residences card (photo toggle) | Two bedroom residence, living room |
| bedroom.jpg | Gallery | Master bedroom |
| kitchen.jpg | Gallery | Kitchen |
| master-bathroom.jpg | Gallery | Master ensuite |

Unused (prepped in `assets/` but not on the page — street-view-01.jpg,
street-view-02.jpg, birds-eye-view.jpg, retail.jpg, gym-upclose.jpg,
gym-and-wellness-upclose.jpg, sky-lounge.jpg): each duplicates the
framing/subject of an image already placed, kept in reserve.

Floor plans: `plan-1br.svg` (60 sqm, label updated from 62), `plan-2br.svg`
(100 sqm, label updated from 108). `plan-3br.svg` (penthouse) was deleted
2026-07-27.

Reference doc: `docs/nomad-twin-towers-price-list-2026-07-27.jpeg` — the
client's official price sheet (moved here 2026-07-27 from the repo root,
where it would otherwise have been publicly servable alongside `index.html`
on deploy — see Open questions re: deploy-root exposure).

## Missing items
1. ~~Real sales phone/WhatsApp number~~ — RESOLVED 2026-07-27: `+254 711 111 188`, from the price list.
2. Real sales email — still open. Domain half corrected to `.com` 2026-07-27, but `sales@` itself is still an unconfirmed placeholder; no email address appeared anywhere in the client's materials.
3. ~~Confirmed prices, unit sizes, floor count and completion date~~ — PARTIALLY RESOLVED 2026-07-27: unit sizes and prices now match the official price list (USD, per sqm — see Business summary). Still open: (a) the price list's apartment table says "18" under "Total Floors" for both unit types, while the Project Overview footer of the same document says residential spans floors "7TH–18TH" (12 floors) — these two numbers in the client's own document don't obviously reconcile; worth asking the client to clarify rather than guessing. (b) Completion date (Q4 2027) is not stated anywhere in the price list — still a placeholder.
4. ~~Interior renders — lounge, gym, bedroom, lobby — for the gallery~~ — RESOLVED 2026-07-27.
5. Exact plot location / Google Maps coordinates for the map facade — still open.
6. ~~Confirm the development name~~ — RESOLVED 2026-07-26.
7. Client logo, if one exists — still open (in-house monogram in use). Note: Obsha Properties (the developer) also has no logo asset on file; footer currently credits them as plain text.
8. ~~Production domain~~ — RESOLVED 2026-07-27: the client's own price list prints `www.nomadtwintowers.com`. Canonical/og:url/JSON-LD/robots.txt/sitemap.xml all switched from the `nomadtwintowers.co.ke` placeholder to `nomadtwintowers.com` 2026-07-27. **This supersedes the earlier NovaHost `.co.ke` domain-purchase research and the client cost message drafted around it (KSh 1,180 for a `.co.ke` domain) — that conversation was based on the wrong TLD.** Still needs one check: confirm with the client whether `nomadtwintowers.com` is already registered/owned, or still needs buying — a `.com` from a registrar like Namecheap/Cloudflare Registrar is a very different purchase flow (and price) than the `.co.ke` KENIC-registrar path discussed earlier.
9. Developer credibility content — PARTIALLY RESOLVED 2026-07-27: developer name "Obsha Properties" confirmed and credited in the footer. Still needs real track record / NCA / county approvals / title status for a full trust section — do not invent.
10. ~~Decision on a hotel/retail podium section~~ — clarified 2026-07-27 by Daniel: the site stays focused on residential sales copy; it is not being rebuilt into a full retail/hotel marketing site, even though the underlying development is confirmed mixed-use (see Business summary). Stats bar now reflects the scale (334 shops, 60 hotel rooms) without a dedicated section for either.
11. ~~Confirm drafted claims found in review (2026-07-15)~~ — RESOLVED
    2026-07-27 by removal rather than confirmation, per Daniel's direction
    that nothing not backed by the price list (or the actual photos) should
    stay on the live page: removed the KES payment-plan figures (500,000
    reservation, 20% deposit, quarterly instalments, 10% handover) and
    replaced with generic non-numeric copy; removed the invented amenity
    specifics (Technogym brand, "heated" pool, "34th floor" pool claim,
    solar-assisted power, biometric access, app-controlled/fibre "Smart
    Residences," EV charging points, private dining/co-working claims);
    removed the rental/tenant-placement management claim; removed the
    "Westlands strongest rental market" claim; removed the location drive
    times (3/4/5/10/35 min), keeping the landmark names without invented
    minute-precision. Two Amenities cards (Smart Residences, Full Backup
    Power) were dropped entirely — no basis for either anywhere. "24-Hour
    Concierge" was folded into a renamed "24/7 Security" card, matching the
    price list's own wording. "Parking & EV Charging" became "Basement
    Parking" — also fixed a real error in the old copy ("three basement
    levels" — the price list has only two parking levels, B2+B3; B1 is the
    supermarket).
12. "Sky Restaurant" amenity (added 2026-07-27 on the strength of
    `restaurant-main.jpg`) — the price list independently confirms a real
    restaurant exists ("Alacat Hotel Restaurant," 6th floor, "Events &
    Hotel Restaurant Floor"), which is reassuring, but it's not confirmed
    whether `restaurant-main.jpg`'s skyline-view dining room is actually
    that same 6th-floor space or a separate amenity-floor restaurant higher
    up. Left the site copy generic ("Sky Restaurant") rather than asserting
    the "Alacat" name until this is confirmed — renaming it is a one-line
    change once confirmed.
13. ~~Third residence type (Penthouse)~~ — RESOLVED 2026-07-27. Independently
    confirmed by the price list, which also shows no 3BR/penthouse line item.
14. ~~"34 Storeys" stat~~ — RESOLVED 2026-07-27 by removal: not
    cross-verifiable against the price list (which only itemises 24 floors
    of programmed space — Basement 3–1, Ground–6th retail, 7th–18th
    residential, 19th–20th hotel), so it and the "Rooftop Infinity Pool ·
    Level 34" floor claim were both dropped from the live copy. Stats bar
    replaced Storeys and the also-unconfirmed "Amenity Floors" with two
    price-list-confirmed numbers instead: **105 Parking Bays** (52+53) and
    **1,701 sqm Supermarket**. If the client confirms an actual storey
    count later, it's an easy re-add.

## Open questions
- Is this job billed as a custom tier? It bypasses the template pipeline
  (`/build` and the `pnpm --filter` preview/build steps don't apply; review
  gate 2 should use the automated checks that make sense plus a judgment
  pass, and deploy is any static host).
- `assets/pool-closeup.jpg` (in the Gallery + Amenities highlight as
  "Rooftop Pool · Golden Hour") shows a resident holding what reads as a
  cocktail glass. The price list's 4th floor includes a **masjid**, which
  reinforces (independently of the earlier render-attire observation) that
  this is a Muslim-oriented development — worth a client check on whether
  that image is on-brand before this goes live, or whether to swap in
  `assets/gym-and-wellness-upclose.jpg` or drop the shot. Not yet decided.
- **Deploy-root exposure**: `brief.md`, `README.md`, `review-report.md` and
  `docs/` all currently sit in the same folder as `index.html`. The README
  says "deploy from root folder" for any static host — taken literally,
  that would make this brief (with its judgment calls, currency-mismatch
  notes, etc.) and the price-list reference image publicly fetchable
  alongside the live site. Worth deciding on a deploy approach (host-level
  ignore rules, or restructuring so only the public site files are in the
  served root) before the real domain goes live.

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
- Deploy: not deployed; any static host (see README; see Open questions re: deploy-root exposure)
- 2026-07-26: name corrected to "Nomad Twin Towers" site-wide
- 2026-07-27: second render batch placed (Gallery 4→16 images); brand mark
  and WhatsApp deep-link text fixed to "Nomad Twin Towers"
- 2026-07-27 (later): amenity photo highlights + residence photo/plan
  toggle added (`experiment/amenity-and-unit-imagery`, merged to main).
  Original six renders removed entirely; Gallery trimmed to 11 images;
  Penthouse removed site-wide.
- 2026-07-27 (later still): client's official price list received as an
  image in the repo root, moved to `docs/`. Full repositioning pass per
  Daniel: site reframed as a mixed-use address (not pure residential);
  real phone number (+254 711 111 188) live; domain corrected to
  `nomadtwintowers.com`; email domain corrected to match (mailbox itself
  still unconfirmed); developer credited ("Obsha Properties") in footer;
  residence pricing converted to the official USD/sqm figures (1BR 60sqm
  $87,000, 2BR 100sqm $180,000); stats bar built from confirmed price-list
  numbers only (Residences 252, Retail Shops 334, Hotel Rooms 60, Largest
  Residence 100sqm, Parking Bays 105, Supermarket 1,701sqm).
- 2026-07-27 (final pass this day): favicon replaced with the real "NT"
  logo cropped from the price list (old in-house "N" monogram SVG
  deleted). Full editorial sweep per Daniel ("nothing not factually in the
  price list should be on the live page"): removed every invented/
  unconfirmed specific across the site — see Missing items 11 and 14 for
  the full list (payment-plan figures, amenity brand/technical claims, two
  entire Amenities cards, rental-market claim, drive times, storey count).
  Marquee and stats bar rebuilt from confirmed facts only. Residence
  feature bullets rewritten to state only what's visible in the actual
  interior photos (floor-to-ceiling windows, stone worktops) rather than
  invented specifics (walk-in closets, balconies, aspect direction,
  laundry rooms, dedicated parking).
