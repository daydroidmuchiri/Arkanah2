# Site Brief — Nomad Twin Towers (Arkanah2)
Tier: custom (hand-built static one-pager, no template/Astro workspace) · Slug: Arkanah2 · Date: 2026-07-14

**Repo layout (changed 2026-07-27):** the published site lives entirely
under `docs/` (`docs/index.html`, `docs/css/`, `docs/js/`, `docs/assets/`,
`docs/fonts/`, `docs/robots.txt`, `docs/sitemap.xml`) — GitHub Pages serves
`main` branch, `/docs` folder. Below, bare mentions of `index.html`,
`css/main.css`, `js/main.js`, `assets/*` etc. mean the copy under `docs/`
unless stated otherwise. `reference/` holds internal-only material (client
price list, bug screenshots, Stitch prompts) and is NOT served.
`images/batch-2026-07-27/` (raw renders) also stays at the repo root, NOT
served. This split exists because the site used to be deployed from the
repo root, which publicly exposed this brief, the README and internal
notes alongside the live site — see Missing items / Open questions history
below for the full account.

## Business summary
Nomad Twin Towers, developed by **Obsha Properties** ("Building Value.
Creating Futures.") — confirmed 2026-07-27 via the client's official price
list, `reference/nomad-twin-towers-price-list-2026-07-27.jpeg` — is a landmark
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
monogram square). Cropped from `reference/nomad-twin-towers-price-list-2026-07-27.jpeg`
(source coordinates: left 693, top 1, width 100, height 80 of the 1024×1536
JPEG, padded to a 100×100 square with sampled background navy #011226) and
regenerated as `assets/favicon-16.png`, `favicon-32.png` and
`apple-touch-icon.png` (opaque navy background — fine for a favicon/touch
icon). The old in-house "N" monogram (`favicon.svg`) was deleted.

The header/footer nav brand mark (previously a separate hand-drawn inline
SVG "N") was also replaced 2026-07-27: same crop, but chroma-keyed to a
transparent background (navy pixels within a distance threshold of the
sampled background color become transparent, everything else opaque —
works cleanly because the source is flat vector art, not a photo) and
saved as `assets/logo-mark.png` (160×160, transparent). Used via `<img
class="brand-mark">` in both the header and footer, replacing the old
inline `<svg>` — needed transparency since the header is see-through
until scroll (`.site-header.is-scrolled`) and sits over the hero photo.
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
1600px JPEG/WebP, q80, --widths=800,1200). 16 of 20 are placed on the page:

| Prepped filename | Used | Alt/subject |
|---|---|---|
| front-view.jpg | Hero + og:image + JSON-LD image | Tower exterior at dusk |
| drop-off.jpg | Vision section | Arrival lobby / porte-cochère, night |
| drama-shot.jpg | Gallery | Twin towers rising above the podium, dusk |
| gym-and-wellness.jpg | Gallery + Amenities highlight | Sky gym & wellness floor |
| gym-upclose.jpg | Gallery | Sky gym, close detail (added 2026-07-27) |
| gym-and-wellness-upclose.jpg | Gallery | Wellness lounge near the sky gym (added 2026-07-27) |
| sky-lounge-terrace.jpg | Gallery + Amenities highlight | Residents' lounge terrace, dusk |
| sky-lounge.jpg | Gallery | Residents' lounge interior (added 2026-07-27) |
| pool-closeup.jpg | Gallery + Amenities highlight | Rooftop pool, golden-hour lifestyle shot |
| restaurant-main.jpg | Gallery + Amenities highlight | Sky restaurant (see Missing item 12 re: naming) |
| retail-02.jpg | Gallery | Retail podium boutique corridor |
| 1-br-living-room.jpg | Gallery + Residences card (photo toggle) | One bedroom residence, living room |
| 2-br-living-room.jpg | Gallery + Residences card (photo toggle) | Two bedroom residence, living room |
| bedroom.jpg | Gallery | Master bedroom |
| kitchen.jpg | Gallery | Kitchen |
| master-bathroom.jpg | Gallery | Master ensuite |

Unused (prepped in `assets/` but not on the page — street-view-01.jpg,
street-view-02.jpg, birds-eye-view.jpg, retail.jpg): each duplicates the
framing/subject of an image already placed, kept in reserve.

2026-07-27: considered an in-card mini-carousel for the Amenities highlight
strip (multiple angles per card) instead of one static photo each. Checked
the actual inventory: only Gym (3 photos) and Lounge (2 photos) have
multiple angles — Pool and Restaurant have exactly one photo each. Building
a carousel for 2 of 4 cards and leaving the other 2 static would read as
inconsistent, so skipped it. Added the 3 extra Gym/Lounge photos to the
main Gallery instead (which already is a proper multi-image carousel) —
same "use the extra photography" goal without a new/inconsistent UI
pattern.

Floor plans: `plan-1br.svg` (60 sqm, label updated from 62), `plan-2br.svg`
(100 sqm, label updated from 108). `plan-3br.svg` (penthouse) was deleted
2026-07-27.

Reference doc: `reference/nomad-twin-towers-price-list-2026-07-27.jpeg` — the
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
- ~~Deploy-root exposure~~ — RESOLVED 2026-07-27, in two steps (the first
  wasn't actually sufficient on its own — see below):
  1. Moved the actual site into `docs/` and changed the GitHub Pages
     source (via `gh api`) from `main:/` to `main:/docs`. **This alone did
     not fix the problem.** GitHub Pages' legacy build type (Jekyll) turned
     out to serve the *entire repository checkout* as static files at
     their own repo-relative paths, regardless of the configured source
     folder — verified live: after switching source to `/docs`,
     `daydroidmuchiri.github.io/Arkanah2/brief.md`,
     `.../README.md`, `.../reference/nomad-twin-towers-price-list-....jpeg`
     and even `.../docs/index.html` (its own new location) were *all*
     still directly fetchable (curl'd with cache-busting query strings to
     rule out CDN caching — genuinely still served, not stale).
  2. Switched Pages to **Actions-based deployment** instead: set
     `build_type: workflow` via the API and added
     `.github/workflows/deploy-pages.yml`, which uploads only `docs/` as
     the Pages artifact via `actions/upload-pages-artifact` +
     `actions/deploy-pages`. This serves a built artifact rather than the
     live git checkout, so nothing outside `docs/` is reachable through
     the Pages domain at all — this is what actually fixed it.

  Verified live after the workflow ran (`gh run watch`, succeeded in 26s):
  site loads (200, correct title), all assets/css/js/robots.txt/sitemap.xml
  load (200), and `brief.md`, `README.md`, `reference/*`, `images/*`,
  `docs/index.html` (direct path) and even `.github/workflows/deploy-pages.yml`
  itself all now 404. The workflow only auto-triggers on pushes that touch
  `docs/**` — pushes that only touch this brief, README, or `reference/`
  won't redeploy the site (correct — nothing public changed), but also
  won't accidentally publish those files either.

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
- Deploy: **live** on GitHub Pages at `daydroidmuchiri.github.io/Arkanah2`
  (confirmed 2026-07-27 from a bug-report screenshot's URL bar — this repo
  entry was stale, previously said "not deployed"). Source folder changed
  same day from `main:/` to `main:/docs` to fix the deploy-root exposure
  issue — see Open questions history (now resolved).
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
- 2026-07-27 (evening): navbar/footer brand mark swapped to the real logo
  (`assets/logo-mark.png`, transparent crop). Explored an in-card
  carousel for the Amenities highlights, found only Gym/Lounge have
  multiple angles, added those 3 photos to the Gallery instead.
- 2026-07-27 (night): Daniel reported (via `reference/mobile-nav-bug-*` screenshots)
  the mobile hamburger menu rendering broken — only one nav item
  ("Gallery") visible inside a thin bar, the rest bleeding through as
  faint ghosted text over the real page. Root cause: `.site-header`'s
  `backdrop-filter` (added via `.is-scrolled` once the page scrolls)
  establishes a new CSS containing block for fixed-position descendants,
  so `.nav-links`'s `position: fixed; inset: 0` (meant to be a fullscreen
  overlay) was sizing itself to the header's own small box instead of the
  viewport whenever the menu was opened after scrolling. Fixed by adding
  a `menu-open` class to `.site-header` on toggle-open (js/main.js) that
  sets `backdrop-filter: none` while the mobile nav is open (css/main.css)
  — the nav's own opaque background covers the header visually anyway, so
  losing its blur during that moment is unnoticeable. Not visually
  re-tested in a live browser (no browser tool available this session) —
  reasoned from the CSS spec (backdrop-filter/filter/transform/perspective/
  will-change on an ancestor create a containing block for `position:
  fixed` descendants) and confirmed `.site-header` had no other such
  property. Worth a visual confirm next time a browser tool is available.
  Also discovered from the bug screenshot's URL bar that **the site is
  already deployed** on GitHub Pages — see Deploy line above.
- 2026-07-27 (later still): deploy-root exposure fixed per Daniel's
  request — see the resolved Open questions entry above. Took two attempts:
  the `docs/`/`reference/` restructuring plus a Pages source-folder change
  looked right but didn't actually work (legacy Jekyll builds serve the
  whole repo regardless of source folder); switching to Actions-based
  deployment (`build_type: workflow` + `.github/workflows/deploy-pages.yml`)
  was the real fix. Verified live via curl with cache-busting query
  strings — internal files 404, site itself works.
- 2026-07-28: "Request the Brochure" button (About/Vision section) now
  downloads the client's price list directly (`download` attribute,
  `docs/assets/nomad-twin-towers-brochure.jpg`) instead of scrolling to
  `#enquire` — was a label/behavior mismatch before (said "brochure",
  scrolled to a contact form). This is a **deliberate copy** of
  `reference/nomad-twin-towers-price-list-2026-07-27.jpeg` placed inside
  `docs/assets/` (the served folder) — intentional public exposure of this
  file, unlike `reference/`'s general internal-only status. Contains the
  same phone number and pricing already public elsewhere on the site, so
  no new sensitive info exposed. Still a JPEG, not a PDF — fine for now,
  a PDF conversion would be a small follow-up if the client wants a more
  traditional "brochure" file format.
