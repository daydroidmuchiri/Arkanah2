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
**mixed-use** development in Eastleigh, Nairobi (Kamukunji / California ward
— corrected 2026-07-29 from the client's map pin, see the log below), not a
pure residential tower as earlier copy framed it:

- **Retail**: 334 shops across Ground–6th floor (fashion/beauty, electronics,
  food court, fine dining, healthcare, a masjid, and a big event hall/hotel
  restaurant on the 6th floor), plus a 1,701 sqm (18,309 sqft) supermarket
  anchor in Basement 1
- **Residential**: 252 apartment units — 72×1-Bedroom (60 sqm/646 sqft) and
  180×2-Bedroom (100 sqm/1,076 sqft). **Priced from USD 48,000 and USD 70,000
  respectively — client revision 2026-07-30, superseding the USD 87,000 /
  USD 180,000 figures this brief previously derived from the price list's
  per-sqm rates (see the log entry for that date).** Retail units from
  USD 25,000. **No penthouse/3-bedroom unit exists**
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
Colors: primary #12161e (night slate-blue), accent **#d9a441** (champagne gold
— enriched from #cda060 on 2026-08-01 at the client's request; see the log),
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

**Superseded 2026-07-30 — the pad-to-square step above silently did not
happen.** The shipped files measured 16×36, 32×52 and 180×200, none of them
square, which is why Google showed its default globe in search results
instead of the monogram. Rebuilt from `assets/logo-mark.png` (the transparent
160×160 below) as square `favicon-48/96/192.png`, a real `docs/favicon.ico`
(16/32/48) and a 180×180 `apple-touch-icon.png`; `favicon-16.png` and
`favicon-32.png` were deleted. See the log entry for that date.

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
Phone/WhatsApp: **+254 141 700 000** — supplied by Daniel 2026-08-24,
superseding the price-list number `+254 711 111 188` that had itself replaced
the `+254 700 000 000` placeholder 2026-07-27 (tel link, WhatsApp float,
contact row, three JSON-LD `telephone` fields — js/main.js derives the
WhatsApp number from the page).
Email: `sales@nomadtwintowers.com` — CONFIRMED as the address the site will
use, 2026-07-29. It was never given in the price list, but Daniel confirmed
the plan: register the domain through Cloudflare Registrar and use Cloudflare
Email Routing (free, included) to forward `sales@nomadtwintowers.com` to a
Gmail account. So the address on the page stays exactly as-is and becomes real
once routing is configured — **no code change needed**. The mailbox itself is
still to be set up (see Missing item 2).
Map: click-to-load facade points at -1.280676, 36.848874 (client pin,
2026-07-29).
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
1600px JPEG/WebP, q80, --widths=800,1200). 17 of 20 are placed on the page:

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
| retail.jpg | Residences card (Shops) | Retail concourse, two levels of shopfronts (placed 2026-07-30) |
| masjid.jpg | Amenities highlight + card + Gallery | Masjid prayer hall (batch 3, placed 2026-07-31) |
| community-hall.jpg | Amenities highlight + card + Gallery | Hagisa Community Hub (batch 3, placed 2026-07-31) |
| supermarket.jpg | Amenities highlight + card + Gallery | Supermarket aisles (batch 3, placed 2026-07-31) |
| food-court.jpg | Amenities highlight + card + Gallery | Food court, 3rd floor (batch 4, placed 2026-08-02) |
| medical-spa.jpg | Amenities highlight + card + Gallery | Medical spa, 4th floor (batch 4, placed 2026-08-02) |
| medical-centre.jpg | Amenities highlight + card + Gallery | Medical centre, 5th floor (batch 4, placed 2026-08-02) |
| 1-br-living-room.jpg | Gallery + Residences card (photo toggle) | One bedroom residence, living room |
| 2-br-living-room.jpg | Gallery + Residences card (photo toggle) | Two bedroom residence, living room |
| bedroom.jpg | Gallery | Master bedroom |
| kitchen.jpg | Gallery | Kitchen |
| master-bathroom.jpg | Gallery | Master ensuite |

Unused (prepped in `assets/` but not on the page — street-view-01.jpg,
street-view-02.jpg, birds-eye-view.jpg): each duplicates the
framing/subject of an image already placed, kept in reserve.
(`retail.jpg` left this list 2026-07-30 — now the Shops card image.)

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
1. ~~Real sales phone/WhatsApp number~~ — RESOLVED 2026-07-27: `+254 711 111 188`, from the price list. **Superseded 2026-08-24** by `+254 141 700 000`, supplied and confirmed by Daniel; the live site and the brochure PDF both carry it. Whether the line has a WhatsApp account is still untested.
2. ~~Real sales email~~ — RESOLVED IN PRINCIPLE 2026-07-29. No email address ever appeared in the client's materials, so rather than guess a mailbox we're creating the one already on the page: the domain is being registered through **Cloudflare Registrar**, and **Cloudflare Email Routing** (free, included with the domain) will forward `sales@nomadtwintowers.com` to a Gmail account. The site needs no change — the address it already displays becomes real the moment routing is switched on. This also avoids showing a raw Gmail address next to USD 180,000 apartments, which is the kind of detail a cautious diaspora buyer notices.
   Still to do, none of it in this repo: (a) register the domain (see item 8); (b) add the routing rule in the Cloudflare dashboard and verify the destination Gmail; (c) if replies should also come *from* `sales@nomadtwintowers.com` rather than the Gmail, add it in Gmail under Settings → Accounts → "Send mail as" — Google emails a confirmation code to that address, which Email Routing forwards through. Usually works without external SMTP, but confirm it before promising the client a fully branded mailbox.
3. ~~Confirmed prices, unit sizes, floor count and completion date~~ — PARTIALLY RESOLVED 2026-07-27: unit sizes and prices now match the official price list (USD, per sqm — see Business summary). Still open: (a) the price list's apartment table says "18" under "Total Floors" for both unit types, while the Project Overview footer of the same document says residential spans floors "7TH–18TH" (12 floors) — these two numbers in the client's own document don't obviously reconcile; worth asking the client to clarify rather than guessing. (b) Completion date (Q4 2027) is not stated anywhere in the price list — still a placeholder.
4. ~~Interior renders — lounge, gym, bedroom, lobby — for the gallery~~ — RESOLVED 2026-07-27.
5. Exact plot location / Google Maps coordinates for the map facade — still open.
6. ~~Confirm the development name~~ — RESOLVED 2026-07-26.
7. Client logo, if one exists — still open (in-house monogram in use). Note: Obsha Properties (the developer) also has no logo asset on file; footer currently credits them as plain text.
8. ~~Production domain~~ — RESOLVED 2026-07-27: the client's own price list prints `www.nomadtwintowers.com`. Canonical/og:url/JSON-LD/robots.txt/sitemap.xml all switched from the `nomadtwintowers.co.ke` placeholder to `nomadtwintowers.com` 2026-07-27. **This supersedes the earlier NovaHost `.co.ke` domain-purchase research and the client cost message drafted around it (KSh 1,180 for a `.co.ke` domain) — that conversation was based on the wrong TLD.** Registrar decided 2026-07-29: **Cloudflare Registrar**, confirmed by Daniel. Cloudflare sells at cost with no renewal markup and includes WHOIS privacy (a `.com` is roughly USD 10–11/yr), and crucially it comes with free Email Routing, which is what makes `sales@nomadtwintowers.com` work without a mail server (see Missing item 2). Still open: whether the domain is already registered to the client or still needs buying — and once its DNS is on Cloudflare, pointing it at GitHub Pages via CNAME moves the site off `daydroidmuchiri.github.io/Arkanah2/` and makes the canonical/og:url/JSON-LD URLs resolve for the first time.
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
- ~~`assets/pool-closeup.jpg` cocktail glass~~ — **DECIDED 2026-07-31: keep
  it, unchanged.** The image (Gallery + first Amenities highlight, "Rooftop
  Pool · Golden Hour") shows a resident in a headscarf holding what reads as a
  cocktail glass. Raised on 2026-07-27, and raised again on 2026-07-31 when
  placing the masjid put a prayer hall four tiles away in the same grid —
  highlight 1 against highlight 5, both on screen together. Daniel's call both
  times was to keep it, consistent with shipping the supermarket render with
  its alcohol aisle intact the same day. Swap candidates that were on the table
  and are still unused as highlights, should this ever be revisited:
  `assets/gym-and-wellness-upclose.jpg`, `assets/sky-lounge.jpg`, or drop the
  tile and run six highlights (lays out 4+2). **Closed — do not re-raise.**
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
  downloads the client's price list directly (`download` attribute)
  instead of scrolling to `#enquire` — was a label/behavior mismatch
  before (said "brochure", scrolled to a contact form). This is a
  **deliberate copy** of `reference/nomad-twin-towers-price-list-2026-07-27.jpeg`
  placed inside `docs/assets/` (the served folder) — intentional public
  exposure of this file, unlike `reference/`'s general internal-only
  status. Contains the same phone number and pricing already public
  elsewhere on the site, so no new sensitive info exposed.
- 2026-07-28 (later): converted to a proper single-page PDF per Daniel's
  request — `docs/assets/nomad-twin-towers-brochure.pdf` (A4 portrait,
  image fit-by-height and centered). No PDF library existed anywhere in
  the monorepo, and a single embedded image doesn't need one: hand-built
  a minimal valid PDF (`/tmp/make-brochure-pdf.js`, not committed — a
  throwaway script) that wraps the JPEG bytes directly in a `DCTDecode`
  XObject stream without re-encoding, so zero quality loss and no new
  dependency. Verified by actually reading the generated PDF back (not
  just checking it parsed) — renders correctly, all pricing legible. The
  intermediate `.jpg` copy in `docs/assets/` was deleted once the PDF
  replaced it as the download target — only the PDF is referenced now.
- 2026-07-28 (later): Cloudflare Web Analytics wired in — chosen over
  GA4 per Daniel (free, no cookies/personal data, so no cookie-consent
  banner needed; fits the budget-conscious scope and the site's already
  careful stance on its audience). Daniel generated the site token
  himself (token isn't a secret — Cloudflare Web Analytics tokens are
  designed to sit in public page source, unlike an API key). Script tag
  added right before `</body>` in `docs/index.html`.
- 2026-07-29: **domain registered.** `nomadtwintowers.com` bought through
  Cloudflare Registrar via the Registrar API — $10.46/yr at cost (≈ KSh 1,354),
  expires 2027-07-29, auto-renew ON, WHOIS redaction ON, registrar lock ON.
  Registrant: Ian Angwenyi Makori / Jenzi, makoriian11@gmail.com,
  +254.740865680, Kiambu Road, Nairobi, 00100, KE — registered under the
  agency deliberately, to be handed to the client after launch (mind ICANN's
  60-day post-registration transfer lock). Pre-flight checks confirmed the
  client did *not* already own it: NXDOMAIN at 1.1.1.1 and `registrable: true`
  at the registry. Four attempts failed with `billing_auth_failed` before
  succeeding — the PayPal balance was short, not a config problem. Zone
  `87e39d03e4774c19f9979debe6293a84` was created automatically on Cloudflare
  DNS (ns: garrett/lilyana). ICANN verification email confirmed clicked.
- 2026-07-29: **location corrected — the site was in the wrong part of
  Nairobi.** Daniel supplied the client's map pin
  (https://maps.app.goo.gl/HqJET5VyJW5jVqmq8), which resolves to
  **-1.280676, 36.848874 — Timboroa Street, California ward, Kamukunji,
  Nairobi 00610**, i.e. the Eastleigh business district. Every previous
  version of the site said Westlands, ~5.5 km away in a straight line.
  Checked the source of that claim before overwriting: brief.md attributed
  "off Waiyaki Way in Westlands" to the client's official price list, but the
  price list (`reference/nomad-twin-towers-price-list-2026-07-27.jpeg`) names
  **no** neighbourhood — it only says "PREMIUM LOCATION". So Westlands was an
  unsourced assumption from the earliest copy that later got mis-recorded as
  client-confirmed. Daniel confirmed the development is genuinely in
  Kamukunji, so the geography was rewritten end to end: `<title>`, meta
  description, og:title/og:description, JSON-LD (`description`,
  `addressLocality`, plus new `addressRegion`/`postalCode` and a `geo` block
  with the exact pin), hero alt text + eyebrow + lede, About copy, the
  Amenities pool line, the whole Location section, the map facade caption,
  the footer Sales Gallery line, and the OSM bbox/marker/title in
  `docs/js/main.js`. Verified zero remaining matches for
  Westlands/Waiyaki/Sarit/Westgate/GTC under `docs/`.
  New Location landmarks, distances measured straight-line from the pin via
  Nominatim (NOT driving distances — worth restating as "x minutes' drive"
  if the client prefers): BBS Mall / Business Bay Square 0.26 km, Eastleigh
  centre 0.70 km, Gikomba Market 1.04 km, Nairobi CBD 3.09 km, JKIA 9.76 km.
  Also nearby: Pumwani Maternity Hospital 0.37 km, Eastleigh High School
  0.50 km, Moi Air Base 1.70 km, Jogoo Rd 1.47 km. The `.loc-list` CSS already
  used `justify-content: space-between` but the markup never supplied a second
  element, so the distances now fill a slot the design was already built for.
  **Open**: the exact street address is still unconfirmed. The pin sits on
  Timboroa Street; BBS Mall is on General Waruingi Street 260 m away. The site
  deliberately claims only "Eastleigh, Nairobi" rather than guess a street —
  JSON-LD has no `streetAddress` for the same reason. Also unresolved: whether
  the premium/"quiet luxury" positioning written for Westlands still fits
  Eastleigh's market, and whether the footer "Sales Gallery" is even at the
  development address. Both are client questions.
- 2026-07-29: **hosting moved to Cloudflare Pages.** Project
  `nomad-twin-towers` (`nomad-twin-towers.pages.dev`), custom domains
  `nomadtwintowers.com` + `www`, both proxied CNAMEs to the .pages.dev host,
  Cloudflare-managed TLS. `.github/workflows/deploy-pages.yml` rewritten from
  the GitHub Pages actions to `cloudflare/wrangler-action` running
  `pages deploy docs`. Still uploads only `docs/`, so the deploy-root
  guarantee from 2026-07-27 is preserved. **Needs two GitHub repo secrets
  before CI works**: `CLOUDFLARE_API_TOKEN` (Cloudflare Pages: Edit) and
  `CLOUDFLARE_ACCOUNT_ID` (d8123d036b6a9d6e79e5e72abf6ff65a). The old GitHub
  Pages deployment should be switched off in repo Settings → Pages once
  Cloudflare is confirmed live, so the site isn't served from two origins.
- 2026-07-29: **Email Routing configured** for `sales@nomadtwintowers.com` →
  `makoriian11@gmail.com`. Zone routing enabled (status `ready`), MX ×3
  (route1/2/3.mx.cloudflare.net), SPF and DKIM records created automatically.
  The forwarding **rule itself is not yet created** — Cloudflare rejects rule
  creation with `2054: Destination address is not verified` until the
  destination clicks its verification email. Create the rule once verified.
  Known limitation carried forward: Email Routing is inbound-only; replies
  from Gmail go out as the Gmail address, not `sales@`. Options for real
  send-as are Cloudflare Email Sending (SMTP relay + Gmail "Send mail as",
  needs Workers Paid at $5/mo, 3,000 sends included) or a mailbox provider
  (Google Workspace ~$7/user/mo, Zoho free tier). Deferred to the client.
- 2026-07-29: **Email Routing completed.** Destination `makoriian11@gmail.com`
  verified, rule live and enabled: `sales@nomadtwintowers.com` → that Gmail.
  (The rule was created by the first API call, which then errored on an
  unrelated cache-purge step — a retry reported `2014: Duplicated Zone rule`,
  which was the duplicate, not a failure. Verified by listing the rules.)
  The second, unnamed disabled rule in the list is Cloudflare's catch-all
  placeholder set to `drop` — normal, leave it.
- 2026-07-29: **SEO pass.** No design/layout changes; head + data files only.
  - Meta description rewritten and cut 185 → 150 chars (was truncating in
    results) and led with the actual search phrase: "Luxury 1 & 2 bedroom
    apartments for sale in Eastleigh, Nairobi".
  - Added `robots` meta with `max-image-preview:large, max-snippet:-1` — lets
    Google show the render full-width, which matters for property searches.
  - Added `og:site_name`, `og:locale` (en_KE), `og:image:alt`, and a full
    Twitter/X card set. WhatsApp is the main sharing channel for this market
    and these tags improve how the link unfurls.
  - JSON-LD expanded from a single ApartmentComplex node to a 3-node `@graph`:
    ApartmentComplex (now with telephone, email, `numberOfAccommodationUnits`
    252, 7 `amenityFeature` entries, and two `containsPlace` Apartment nodes
    carrying floorSize + Offer at USD 87,000 / 180,000, availability PreOrder),
    Organization (Obsha Properties, slogan from the price list), and WebSite.
    **Every figure traces to the client's price list** — nothing invented.
  - robots.txt / sitemap.xml: dropped the stale "pending registration" comments
    (the domain is registered now), bumped lastmod to 2026-07-29, added an
    image sitemap entry for the hero render.
  - Added `docs/404.html` (see hosting entry) — carries `noindex`.
  **Verified live on the apex after deploy**, not just locally.
  **Deliberately NOT done — needs a human call:** the `<h1>` is "Rise above the
  city, live within it.", which contains no product or location keyword. The
  title/description/JSON-LD carry the keywords instead. Rewriting the H1 would
  help search but costs the brand voice; adding hidden keyword text was
  rejected outright (cloaking risk, and dishonest). Flagged to Daniel.
  Also outstanding and off-code: Google Search Console verification + sitemap
  submission, and a Google Business Profile — the highest-value local SEO
  actions available for a Nairobi development, neither doable from the repo.
- 2026-07-29: **DMARC added** (monitoring-only), closing the last gap in the
  email setup: `_dmarc.nomadtwintowers.com TXT "v=DMARC1; p=none;
  rua=mailto:dmarc@nomadtwintowers.com; fo=1"`. Verified resolving on both
  1.1.1.1 and 8.8.8.8. **Note the rua address is on-domain deliberately** —
  RFC 7489 external-destination verification means a `rua=mailto:` on a
  different domain (e.g. the Gmail directly) requires that domain to publish
  `nomadtwintowers.com._report._dmarc.<their-domain>`, which we obviously
  cannot add to gmail.com, so reports would silently never arrive. Instead a
  second Email Routing rule forwards `dmarc@nomadtwintowers.com` →
  `makoriian11@gmail.com`, keeping XML aggregate reports out of `sales@`.
  Tighten `p=none` → `quarantine` → `reject` only after reading a few weeks
  of reports and confirming nothing legitimate fails.
- 2026-07-29: **Google Search Console set up.** Domain property (DNS
  verification, covers all subdomains + both schemes), verified via a
  `google-site-verification` TXT record that Google's Cloudflare integration
  added itself. **Do not delete that TXT record — removing it un-verifies the
  property.** Sitemap submitted as the full URL
  `https://nomadtwintowers.com/sitemap.xml` (a Domain property has no prefix
  to fill in, so the bare `sitemap.xml` path is rejected — that tripped us up
  once). Sitemap showed "Couldn't fetch" with an empty "Last read", which is
  the pre-first-crawl default rather than a real error; confirmed nothing was
  blocking by checking for `cf-mitigated` headers, challenges, `X-Robots-Tag`
  and robots.txt, then by URL Inspection → Test Live URL returning "URL is
  available to Google". Indexing requested for the homepage.
- 2026-07-29: **Copy repitched for Eastleigh** (Daniel's call, chosen over
  leaving the voice alone). The old copy sold *escape* — "quiet luxury",
  "serene", "never intrusive" — which was a Westlands retreat pitch that made
  no sense for East Africa's densest trading district. Reframed around
  proximity and opportunity, which is what the building actually is: 334 shops
  and a supermarket under 252 homes is purpose-built for Eastleigh.
  - `<h1>` "Rise above the city, live within it." → "Luxury 1 & 2 bedroom
    apartments in Eastleigh, Nairobi." The old line was demoted to the hero
    lede, so the poetry survives but the most weighted element on the page now
    carries the phrase buyers actually search. Hidden keyword text was
    rejected outright — cloaking risk and dishonest.
  - Vision H2 "Quiet luxury, engineered for living." → "Built for the way
    Eastleigh works.", and the second paragraph rewritten from the
    "serene / never intrusive" framing to the trading-day rhythm, BBS Mall and
    CBD proximity, and the retail-plus-residence ownership angle ("Take a
    residence, take a shop — or hold both").
  - First paragraph now uses the real numbers from the price list (334 shops,
    1,701 sqm supermarket, 252 residences) instead of vague "boutique retail".
  - Location and Amenities sections were left alone — "The centre of
    everything" and "everything but work" both land harder in a trading
    district than they did in Westlands.
  - **Deliberately did NOT add a rental-yield or market-strength claim to the
    Invest section**, even though the repitch invited one. There is precedent:
    the earlier "Westlands strongest rental market" claim was removed for being
    unsubstantiated. No Eastleigh equivalent gets added without a source.
  **Note this diverges from the documented Brand tone ("quiet luxury")** at the
  top of this brief — that line now describes the finish level and the renders,
  not the sales pitch. Worth a client conversation at handover.

- 2026-07-30: **prices revised down by the client, and two distance claims
  refused.** Feedback arrived by WhatsApp from +254 740 865680 at 09:28–09:30:
  "1 bedroom is from 48k", "2 bedroom from 70k", "shops from 25k", "the site is
  100 m from bbs mall", "2km from westlands and parklands", "Remove gikomba".
  - **Currency was not stated**, and the gap between readings was too wide to
    assume — 48k USD is a sale price, 48k KES/month would make this a rental
    site. Confirmed with Daniel as **USD, off-plan sale**. What settled it:
    the *old* totals were never client figures at all, they were this brief's
    own derivation (60 sqm × USD 1,450/sqm, 100 sqm × USD 1,800/sqm). The new
    numbers are the first ones the client has written as totals. They are also
    internally coherent where the old pair was not — the old 2BR worked out
    dearer per sqm than the 1BR (1,800 vs 1,450), which is backwards; the new
    pair reads 800/sqm for the 1BR against 700/sqm for the 2BR, the normal
    shape. The old rates also implied ~KSh 187k–232k/sqm, Westlands pricing
    carried over into Eastleigh.
  - Applied to all eight price occurrences in `docs/index.html` (meta
    description, og:description, twitter:description, both JSON-LD `Offer`
    prices, hero stat, both residence cards) and to `seo-local-listings.md`,
    which would otherwise have pushed the old prices out to the portals.
  - **Shop pricing added** to the Ownership section lede — one sentence, no new
    section, keeping Missing item 10's decision that the page stays residential
    and is not rebuilt into a retail marketing site. The page already invited
    it ("Take a residence, take a shop — or hold both") without ever quoting a
    number.
  - **Gikomba Market removed** from the location list as instructed.
  - **The two distance claims were published on Daniel's instruction, after
    being queried twice and reaffirmed.** Recording the measurements so nobody
    re-derives them: from the client's own pin (-1.280676, 36.848874),
    straight-line, BBS Mall is **0.32 km**, Parklands **4.01 km** and Westlands
    **5.45 km** — road distance is further again in each case. The page now
    states BBS Mall at **100 m** (~3× short) and Westlands at **2 km** (~2.7×
    short). Daniel confirmed 2026-07-30 that the pin is correct, so the two
    facts do not reconcile: if the pin is right, BBS Mall cannot be 100 m away.
    Flagged and overruled — it is the client's own copy about their own site,
    and both figures are the kind a buyer can check on Google Maps in one tap.
    Note this is a deliberate departure from Missing item 11, which stripped
    the invented drive times for exactly this reason.
  - **Parklands added at 2 km too**, on Daniel's follow-up instruction, listed
    immediately before Westlands since it is the genuinely closer of the two
    (4.01 km against 5.45 km) even though both now display the same figure.
    The full client message is delivered as given.
  - **Still open**: whether a written price list backs the new figures, since
    they contradict
    `reference/nomad-twin-towers-price-list-2026-07-27.jpeg`.

- 2026-07-30 (later): **Shops card added to the Residences section**, on the
  client's hand-marked screenshot
  (`reference/client-markup-shops-card-2026-07-30.jpeg`) — a third card drawn
  beside the two residence cards, labelled "Shops / USD 25,000" with a button
  box beneath it. This supersedes the one-sentence treatment added earlier the
  same day in the Ownership lede, which was a stopgap for having no card; that
  sentence has been reverted to its original wording, since with three cards
  each showing a price, repeating them in the lede was a third mention and an
  invitation to divergence.
  - **`.res-grid` went from two columns to three** (`main.css`), max-width
    52rem → 70rem so each card lands at ~352px, close to the previous ~380px.
    A new 980px tier holds the old two-up layout and the 780px tier the old
    one-up, so nothing below desktop changes. At 780–980px the third card sits
    alone on a second row, which is the normal shape for a three-item two-column
    grid and was judged acceptable rather than jumping straight to one column
    and wasting tablet width.
  - **No photo/plan toggle on this card** — no floor-plan asset exists for
    retail. Safe because `main.js` iterates `$$(".res-toggle")`, so a card
    without one is simply skipped; verified rather than assumed.
  - **Image**: `retail.jpg`, until now prepped-but-unused. A two-level
    shopfront concourse, and the shoppers read as modestly dressed, which fits
    this development better than `retail-02.jpg` (kept unique to the Gallery).
  - **Card copy is price-list-confirmed only**: "334 shops in the retail
    podium", "Anchored by a 1,701 sqm supermarket", "105 basement parking
    bays". The size slot reads `GROUND – 6TH` rather than a floor area, because
    **no shop unit size is confirmed anywhere** — do not fill it in without
    one. CTA is "Request Shop Details" rather than "Request Floor Plans",
    since there are no retail plans to send.
  - Also corrected while here: the residence-card `sizes` attribute was
    `(max-width: 980px) 92vw, 380px`, which over-declared in the 780–980px band
    where the grid is two-up (~46vw, not 92vw) — it was fetching a larger
    candidate than needed even before this change. Now
    `(max-width: 780px) 92vw, (max-width: 980px) 46vw, 352px` on all three
    cards.
  - **Not done**: the JSON-LD still lists only the two `Apartment` nodes under
    `containsPlace`. A retail unit is not an `Accommodation`, so forcing one in
    there would be semantically wrong; adding a separate correctly-typed node
    is possible but was left as a decision rather than guessed at.

- 2026-07-30 (later still): **retail added to structured data, and the navbar
  breakpoint fixed.** Both on Daniel's instruction.
  - **JSON-LD**: the Shops card was live with a price that appeared nowhere in
    the graph. Added a `ShoppingCenter` node (`#retail`) — 334 units Ground–6th,
    the 1,701 sqm Basement 1 supermarket, 105 parking bays — carrying the
    USD 25,000 unit price as `makesOffer` with `availability: PreOrder` and
    `seller` pointing at `#developer`. It is wired in both directions:
    `containedInPlace` → `#development`, and an `@id` reference appended to the
    development's `containsPlace` beside the two `Apartment` nodes.
    `ShoppingCenter` was chosen over stuffing retail into `containsPlace` as an
    `Accommodation` (semantically wrong — a shop is not lodging) and over a bare
    `Product` node (which invites Google to read it as a merchant listing).
    Valid because `ShoppingCenter` → `LocalBusiness` → both `Organization` and
    `Place`, so it satisfies `containsPlace`'s Place range *and* allows
    `makesOffer`, which a plain `Place` does not. All four `@id` references in
    the graph verified to resolve.
  - **Navbar**: the hamburger only appeared at ≤820px, but the desktop nav needs
    about **1000px** — measured in-browser, not guessed: brand 146px + links
    682px at a 23px gap, and that gap is `clamp(1.2rem, 2.6vw, 2.4rem)` so it
    grows on wider viewports, against `--w: min(1180px, 92vw)`. That left a
    ~180px band (820–1000px) where the full desktop nav rendered on top of
    itself — "TWIN TOWERS" and "THE VISION" both wrapping and colliding.
    Breakpoint raised to **1040px** for margin, and `.brand-name` given
    `white-space: nowrap` so the brand can never wrap regardless. Verified at
    1042px (desktop nav, 75px clearance, no wrap, no overlap) and at 900px
    (clean hamburger). The 820px media query contained *only* nav rules, and
    `main.js` has no breakpoint coupling — both checked before moving it, so
    nothing else shifted.
  - This bug predates today and was found while screenshotting the Shops card;
    it was not caused by the three-column grid change.

- 2026-07-30 (SEO pass): audited the live page rather than assuming, then fixed
  the two real gaps found. **The technical fundamentals were already at
  ceiling** — title 59 chars, meta description 149, exactly one `<h1>`, no
  skipped heading levels, all 28 images carrying alt text *and* explicit
  width/height, canonical and robots correct, 13 requests for 331 KB, TTFB
  250 ms, CLS 0.059. There was no performance work worth doing. (LCP could not
  be measured in the headless context — paint timing entries came back empty —
  so no LCP figure is claimed here.)
  - **`sitemap.xml`**: `lastmod` still read 2026-07-29 after a day of
    substantive content changes. Now 2026-07-30, and **keep it moving** — a
    date that never changes is worth less than none. Image entries went from 1
    to 13, covering every on-page render (exteriors, both unit interiors,
    bedroom/kitchen/bathroom, retail, and the four amenity shots). Worth the
    effort specifically because property search is visual and this site already
    holds the **first slot in Google's image pack** for "nomad twin towers" —
    that channel is already working, so feed it. Every listed image was
    verified to exist on disk and to be referenced on the page.
  - **`Organization.url` removed.** The Obsha Properties node claimed
    `url: https://nomadtwintowers.com/`, which is the *development's* site, not
    the developer's. That conflates the two entities — precisely the confusion
    the AI Overview is already making by attributing the NSSF Twin Towers to
    this brand. Omitting an unknown beats asserting a wrong one, and
    `obshaproperties.com` is NXDOMAIN so there is nothing correct to point at
    yet (see `seo-local-listings.md` §6.5). `WebSite.publisher` still resolves
    to the node, so the developer↔site relationship is intact.
  - **Noted, not changed**: four amenity `<h3>`s appear twice each (highlight
    strip and cards) — "Rooftop Infinity Pool", "Sky Gym & Spa", "Residents'
    Lounge", "Sky Restaurant". Harmless duplication rather than a fault, and
    restructuring it risks the layout for no measurable gain.
  - **The ceiling is now off-site.** Everything left that would move the AI
    Overview and the brand SERP needs the client: the street address, profiles
    to claim, and portal listings. See `seo-local-listings.md` §6.

- 2026-07-31: **third render batch placed** — `images/batch-2026-07-31/`
  (masjid, community-hall, supermarket), prepped through
  `packages/pipeline/src/prep-images.mjs` at the same spec as every other asset
  (1600px, q80, `--widths=800,1200 --webp`, 18 files written).
  - **The masjid had zero presence on the site until now** — 0 occurrences of
    "masjid", "mosque" or "prayer" anywhere in `index.html`, despite the price
    list confirming one on the 4th floor and this brief repeatedly noting the
    development is Muslim-oriented. That gap is now closed: photo highlight,
    icon card, gallery entry, and a `LocationFeatureSpecification` in the
    JSON-LD.
  - **The supermarket was named 11 times with no image**, and had no amenity
    card at all. Both fixed.
  - Amenity highlights went 4 → 7 (lays out 4+3 in the existing four-column
    grid; checked in-browser, it reads as a balanced second row and needed no
    CSS change). Icon cards went 6 → 9, which lands as an exact 3×3 in the
    existing three-column grid. Gallery 14 → 17. Sitemap 13 → 16 images,
    `lastmod` 2026-07-31.
  - **Two calls Daniel made after being shown the evidence:**
    - *Supermarket render ships as supplied.* The image carries a prominent
      gondola of brown and green long-neck bottles plus wall shelving that
      reads as beer and wine. This was cropped out in a tested alternative
      (left 68%, keeping the wood-slat columns, packaged-goods aisles and the
      couple with the trolley) and Daniel chose the full render instead.
      Recorded because it sits four tiles from the masjid in the same grid.
    - *"Hagisa Community Hub" used as the name*, taken from signage inside the
      render. It appears in no client document — the price list has only a
      generic 6th-floor event hall. Note this diverges from how the restaurant
      was handled (Missing item 12 kept "Sky Restaurant" generic rather than
      assert "Alacat" until confirmed). Worth confirming at handover; it is now
      live copy and is also in the JSON-LD and the sitemap image titles.
  - **Escalated, still unresolved**: the Open Question at the top of this file
    about `pool-closeup.jpg` — a resident in a headscarf holding what reads as
    a cocktail glass — is now considerably sharper, because that tile is the
    *first* amenity highlight and the masjid is the *fifth*, so both are on
    screen together. The note said to settle it "before this goes live"; it
    went live unsettled on 2026-07-27 and is still there. Swap candidates on
    file if wanted: `gym-and-wellness-upclose.jpg`, `sky-lounge.jpg`, or drop
    the tile and run six highlights.

- 2026-07-31 (later): **lightbox crossfade, and the Amenities images wired into
  the same lightbox.** Daniel's call was to unify behaviour but keep the
  amenity tiles' own look — the 4:5 crop with the caption inset over a gradient
  scrim is a richer treatment than the gallery's caption-below, so matching the
  gallery visually would have been a downgrade.
  - The lightbox previously reassigned `boxImg.src` outright, so arrowing
    between photos was a hard cut. It now fades out, waits for **both** the
    fade and the next image, then fades in. Both waits matter: a cached image
    resolves instantly and would swap mid-fade, which reads exactly like the
    hard cut being replaced.
  - Class removal uses `img.decode()` rather than `requestAnimationFrame`.
    rAF was tried first and observed *not firing* reliably, which left
    `.is-swapping` stuck and would have pinned the photo at `opacity: 0` —
    a blank lightbox. `decode()` resolves when the frame is paintable, and is
    guarded with a `.catch()` for the same reason.
  - Amenity and gallery images now feed **one** sequence in document order
    (7 + 17 = 24), so the arrow keys walk the whole set instead of stopping at
    the end of whichever section was clicked. Amenity images gained `data-full`
    so the zoom view shows the 1600px file, not the srcset pick.
  - The triggers are plain `<img>`, so they were mouse-only. Rather than take
    that from 17 images to 24, they now carry `tabindex`/`role="button"`,
    Enter/Space, a `:focus-visible` ring, and focus returns to the tile being
    viewed on close.
  - Entrance animation on the `<dialog>` and its backdrop. Reduced-motion is
    handled: the JS skips the crossfade, and the existing media query already
    collapses durations.
  - **Verified oddly, on purpose.** Headless would not advance the animation
    clock — `getAnimations()` showed the transition `running` but stuck at
    `progress: 0`. Driving `currentTime` by hand confirmed the interpolation:
    opacity 1 → 0.235 → 0.039 → 0.003 → 0 across 240ms on `--ease`. Also
    confirmed residence-card images are *not* captured by the delegated
    handler, and the photo/plan toggle still works.
- 2026-07-31: **RESOLVED — gallery prev/next buttons work.** Found while
  testing the above; **not caused by it**, and reproduced identically against
  the deployed pre-change site. The handler fires and calls
  `scrollBy({left: 585.6, behavior: "smooth"})` — the exact call that *does*
  scroll when issued directly — yet `scrollLeft` stays 0. Suspicion is that
  focusing the button on click cancels the in-flight smooth scroll, but this
  was only ever exercised via programmatic `.click()`; a real mouse click has
  not been confirmed either way, and the browser session dropped before that
  test completed. **Check by hand in a normal browser before deciding whether
  there is anything to fix.** Note the track is also `scroll-snap-type: x
  mandatory`, and a scroll shorter than half an item snaps back to 0.

- 2026-07-31: **`docs/_headers` added — returning visitors were running stale
  JS/CSS for up to four hours.** Cloudflare Pages' defaults serve `index.html`
  at `max-age=0` but every other asset at `max-age=14400`. New HTML plus
  four-hour-old code is not a theoretical mismatch: it is exactly what shipped
  after the lightbox rewrite, where the markup carried the new `data-full`
  hooks but the cached `main.js` knew nothing about them, so the Amenities
  images did not open at all. Daniel challenged the "verified live" claim and
  was right to — the check had confirmed the *server* was serving new JS via
  curl, not that the *browser* was executing it. Several "hasn't propagated
  yet" moments earlier the same day were the same cause, misread as edge lag.
  - `/css/*` and `/js/*` now `max-age=0, must-revalidate`. Filenames are stable
    because there is no build step to content-hash them, so revalidating every
    load is the only safe policy for code; it costs a 304 when nothing changed.
  - Images and fonts keep the 14400 default deliberately — their contents never
    change under a given filename, and new renders arrive under new names.
  - `_headers` is consumed by Pages and never served, so it does not appear on
    the site.
  - **Correction, same day — the header file alone does not fix the live
    domain.** The `max-age=14400` is not a Pages default: the pages.dev origin
    honours every rule in the file. It is the zone's **Browser Cache TTL**
    (Cloudflare Free plan default, 4 hours), and it behaves as a *floor*, not a
    blanket override — measured by shipping a `/fonts/*` rule at a year, which
    reaches the browser intact, while `max-age=0` is raised to 14400. So no
    value in `_headers` can produce `max-age=0` while that setting stands.
    **Someone with dashboard access must set Caching → Configuration → Browser
    Cache TTL to "Respect Existing Headers".** The Cloudflare API MCP could not
    authenticate (`10000: Authentication error`), so this could not be done from
    here. Until it is, `/css/*` and `/js/*` are inert on nomadtwintowers.com and
    the stale-code window remains; `/assets/*` (7 days) and `/fonts/*` (1 year)
    already apply, since both exceed the floor.
  - **Verification lesson worth keeping**: `curl` against the origin proves what
    is deployed, not what a returning browser runs. For anything touching JS or
    CSS behaviour, load the page in a browser and assert on a marker only the
    new code produces — here, `tabIndex`/`role` being set on the 24 lightbox
    triggers.

- 2026-07-31: **client film added** as a new `#film` section between Gallery and
  Location. Source arrived over WhatsApp
  (`WhatsApp Video 2026-07-31 at 09.55.48.mp4`), filed as
  `docs/assets/nomad-twin-towers-film.mp4`.
  - **The file is 21.6 MB against 331 KB for the entire rest of the page**, so
    it is served `preload="none"` behind a poster and is only fetched when
    somebody presses play. Verified: 0 video bytes on load, and playback starts
    and advances once triggered. Do not add `autoplay`, `preload="metadata"` or
    a looping background treatment without re-measuring — any of them would put
    a 21.6 MB download in front of every visitor, including on mobile data,
    which is most of this audience.
  - **Quality caveat — worth chasing the original.** WhatsApp recompressed it to
    **848×478** (below 720p), H.264/AAC, 1.23 Mbps, 2 min 27 s. Every still on
    the site is 1600 px, so the film is the softest thing on the page. The
    display box is deliberately capped at `62rem` (992 px) rather than the full
    1180 px wrap to limit upscaling; it is still slightly upscaled at 992. **Ask
    the client for the original export** — WhatsApp will have destroyed a file
    that was almost certainly delivered at 1080p or better. Dropping a better
    encode in under the same filename is the only change needed.
  - Poster is `assets/film-poster.jpg`, a 16:9 crop (1600×900) of
    `birds-eye-view.jpg`, which was prepped back in batch 2 and had never been
    placed. It is an establishing aerial with the NOMAD signage legible on the
    podium, so it reads as a title card. Note it is a render, not a frame from
    the film — there is no ffmpeg available here to pull a real frame.
  - Section is `section--light`, which breaks the strict light/dark alternation
    the page has held since launch (it now runs …dark #gallery, light #film,
    light #location…). Deliberate: any insertion breaks the rhythm somewhere,
    and two light sections read far better than two dark ones, since the dark
    sections are heavy blocks while this one is dominated by the video itself.
  - `VideoObject` added to the JSON-LD graph (`#film`), with `duration
    PT2M27S`, `thumbnailUrl`, `contentUrl`, and `about`/`publisher` pointing at
    the existing development and developer nodes. Google can surface video
    results from this, which is worth having given the SEO work.
  - **CSS gotcha worth remembering**: `.film` needs an explicit `height: auto`.
    The `height="900"` attribute is a presentational hint that sets the CSS
    height, and `aspect-ratio` only computes a height when height is `auto` —
    without it the box rendered 992×900 instead of 992×558. Same trap as images.
  - Repo now carries a 21.6 MB binary. Acceptable once, but a second film
    should probably go to a video host rather than into git.

- 2026-07-31: **tested in a real browser via the Chrome extension, which found a
  bug every automated check had missed.**
  - **Gallery arrows: fine, nothing to fix.** Real mouse clicks step the track
    0 → 586 → 1171 and back to 586, and the prev button enables/disables
    correctly. The earlier "buttons do not scroll" finding was an artifact of
    Playwright's programmatic `.click()`; the open item is closed.
  - **REAL BUG FOUND AND FIXED: the Amenities tiles were not clickable.**
    `.amen-highlight::after` — the gradient scrim — is `inset: 0` over the whole
    image, and `.amen-highlight figcaption` sits above it. Neither had
    `pointer-events: none`, so a genuine click hit the scrim. A pseudo-element
    is not an event target, so `e.target` resolved to the `<figure>` and the
    lightbox handler's `closest('.amen-highlight img, .gal-item img')` returned
    `null`. `elementFromPoint` at the tile centre returned
    `FIGURE.amen-highlight`, not `IMG`. Fixed by adding `pointer-events: none`
    to both, verified by a real click opening the lightbox on `masjid.jpg`.
    **This shipped broken on 2026-07-31 and was live until this fix.**
  - **Why every automated test passed**: they called `img.click()` directly on
    the element, which dispatches straight to that node and bypasses hit
    testing entirely. Nothing about a synthetic `.click()` can reveal an
    overlay intercepting pointer input. **For anything click-driven, assert on
    `document.elementFromPoint(x, y)` resolving to the intended target, or
    click through a real input event.**
  - **The lightbox crossfade still cannot be visually confirmed by automation.**
    In both headless Playwright and the extension-driven tab, `requestAnimation
    Frame` stops firing (one frame per 400 ms) because the tab is not painting,
    so CSS transitions sit at `progress: 0` and opacity samples read a flat 1.
    What *is* proven: the rule is present, the class is applied on swap, the
    transition is declared at 240 ms on `--ease`, `getAnimations()` reports it
    running with the right properties, and driving `currentTime` by hand
    interpolates 1 → 0.235 → 0.039 → 0.003 → 0. Reduced motion is off, so it is
    not that. Confirming it renders needs a human to click a photo and press →.

- 2026-07-31: **full site audit in a real browser (Chrome extension).** Result:
  the site is in good shape. One live defect, one UX friction, one caveat.
  - **Passing**: every key interactive element reachable by real hit-test
    (gallery images, amenity tiles, map button, video, WhatsApp float, res-card
    toggles, form fields, submit); 0 broken anchors; the single external link
    (wa.me) correctly `rel="noopener"`; 34 images with 0 missing alt, 3
    deliberate decorative `alt=""`, 0 missing width/height; all 5 form fields
    labelled with an `aria-live="polite"` status region; exactly 1 `<h1>`, 32
    headings, **0 heading-level skips**; all four landmarks; skip link;
    `lang="en"`; **0 console errors or warnings** on a fresh load; 33–35
    requests for ~320 KB with **0 failed**; the 21.6 MB film fetches **0 bytes**
    until play; map iframe absent until clicked; brochure PDF (274 KB) and film
    both 200; 404 page returns a real 404 with `noindex` and a link home;
    lightbox opens on real click, closes on real Escape and on the × button,
    and returns focus to the triggering tile.
  - **Only third-party hosts are `cloudflareinsights.com` / `static.cloudflare
    insights.com`.** No Google Fonts, no tag managers, no trackers. Fonts are
    self-hosted and the map is click-to-load, so a visitor who never interacts
    contacts exactly one third party.
  - **LIVE DEFECT — the stale-CSS window is actively serving the broken
    Amenities tiles.** Reproduced twice during this audit: on a fresh navigation
    the browser reported `cssServedFromCache: YES` and
    `getComputedStyle(fig,'::after').pointerEvents === 'auto'`, so
    `elementFromPoint` at a tile centre returned `FIGURE.amen-highlight` and
    the tiles did not open. The pointer-events fix is deployed and correct; it
    simply is not reaching browsers. **This is no longer a hygiene item — the
    Browser Cache TTL change is what ships an existing bug fix to users.**
  - **UX friction — clicking the film's poster does nothing.** With
    `preload="none"` and native controls, only the small play button at bottom
    left starts it; a centre click is ignored (`readyState` stayed 0). On a
    992 px cinematic poster most people will click the middle first. A
    click-to-play handler on the video would fix it. Not a bug, and not changed
    without a decision.
  - **Noted — the enquiry form is entirely JS-dependent.** Its submit control is
    `type="button"` and the `<form>` has no `action`, so with JS unavailable it
    is inert. Mitigated in practice because the phone, WhatsApp and email are
    all plain links beside it, but it does qualify the README's "fully usable
    without JS" line.
  - **Not verifiable here**: viewport resizing does not affect the page through
    the extension (`resize_window` succeeds but `innerWidth` stays 1536), so
    responsive breakpoints remain as verified under Playwright earlier.

- 2026-07-31: **visual audit (real browser).** The page holds up — layout,
  spacing, typography and image quality are consistent throughout, the
  three-card Residences grid aligns, the 4+3 amenity grid reads as intended,
  the Location list, film block, form and footer all render correctly, and the
  hero already carries a scrim so the headline sits legibly over the render.
  Two measurable defects found and fixed.
  - **Gold text on cream failed WCAG AA: 3.78:1**, under the 4.5:1 minimum for
    body-size type. It affected every section eyebrow (THE VISION, AMENITIES,
    RESIDENCES & RETAIL, THE FILM, LOCATION, OWNERSHIP, ENQUIRE), the contact
    labels, the `sqm` superscripts in the stats bar, the form status line and
    two hover states. Added `--gold-text-on-light: #84682e` (**4.62:1**) and
    repointed the *text* uses only. `#92763c` stays on the ghost-button border,
    the amenity icon strokes and the field focus ring — decorative and exempt
    from the text threshold.
  - **Anchor jumps tucked content under the sticky header.** `scroll-margin-top`
    was `4.2rem`/67px against an **82px** header, so every nav click hid 15px of
    the target section. Visible in the audit screenshots as clipped eyebrows.
    Now `6rem`, verified to land 14px clear of the header.
  - **Two false alarms, both worth recording so they are not "re-fixed".**
    (1) The stats bar screenshots as **201 / 267 / 48 / 80 / 84 / 1,359** — all
    exactly 80% of the real values, because the counters were mid-animation.
    They settle to the correct **252 / 334 / 60 / 100 sqm / 105 / 1,701 sqm**.
    (2) The gallery caption was first measured at 2.61:1, which would have been
    a failure; that came from a bug in the audit's own background resolver
    treating a transparent section background as black. Measured properly it is
    **6.95:1** and passes. **Resolve the real painted background before
    trusting any contrast number.**
  - Every other text style measured clears AA comfortably: nav links 14.53,
    dark-section lede 14.53, footer links 14.53, stat labels 12.67, gallery
    arrows 10.40, price 9.80, eyebrow on dark 7.59, film note / location
    distances / form note 7.17, residence features 9.62, amenity body 5.19.

- 2026-08-01: **client feedback on the mobile view — five items, all actioned.**
  Verbatim: *"the hero text is a little too large on mobile, covering too much
  of the building, the building render could be brighter and higher contrast,
  the logo is slightly small, the gold color is a bit muted, i would make it
  richer, I'd add subtle animations as the user scrolls."*
  - **Hero text on mobile — worse than "a little too large".** Measured at
    390×844: `.hero-inner` was **929px tall in an 844px viewport**. The copy
    did not merely cover the tower, it overflowed the screen — the Developer /
    Obsha Properties meta row was below the fold on first paint. Cause: the
    global `h1` clamp bottoms out at `2.6rem`/41.6px, which every phone gets.
    Added a `max-width: 620px` block (hero only; desktop sizing untouched)
    taking the h1 to `clamp(2rem, 5.6vw, 2.6rem)` and tightening the lede,
    CTAs and meta row. Now **643px**, with ~280px of clean render above the
    copy. Still overflows below ~600px of viewport height (320×568 measures
    701px) — acceptable, the page scrolls, and it was ~880px there before.
  - **Render brightness.** `filter: brightness(1.12) contrast(1.12)
    saturate(1.08)` on `.hero-art` rather than re-exporting the JPEGs, so the
    source renders and the whole responsive srcset stay as they are. The bigger
    win was the scrim: the old top layer dimmed the top 30% of the frame by up
    to 0.55 for the sake of the transparent header, which on a phone is exactly
    where the tower's crown sits. It now protects the header band *harder* than
    before and clears by 215px.
  - **Logo.** Brand mark 34px → 42px (footer 30 → 36), wordmark 1.22 → 1.3rem.
    Header height is still 84px — set by the wordmark block, not the mark — so
    the `scroll-margin-top: 6rem` fix from 2026-07-31 is unaffected.
  - **Gold.** Saturation up across the ramp at the same lightness band:
    `--gold` #cda060 → **#d9a441** (52% → 67% sat), `--gold-soft` #e2bf8b →
    **#edc989**, decorative `#92763c` → **#8f7226** (now a token,
    `--gold-deep`), `--gold-text-on-light` #84682e → **#876614**. Every
    contrast figure from the 2026-07-31 audit held or improved: gold on ink
    7.59 → 8.05, gold-soft on ink 10.40 → 11.49, gold text on cream 4.62 →
    4.69, decorative on cream 3.78 → 4.01.
  - **Scroll motion.** Hero parallax (the render drifts at 82% of scroll speed;
    in JS, because it is the piece you notice and Firefox still lacks CSS
    scroll-driven animation), plus CSS `view()`-timeline settle on the split
    and amenity photographs, a drift on section headings, and a gold
    reading-progress hairline under the sticky header. All of it is inside
    `prefers-reduced-motion: no-preference` and `@supports (animation-timeline:
    view())`, so it degrades to exactly the old page.
- 2026-08-01: **the 2026-07-31 line "the hero already carries a scrim so the
  headline sits legibly over the render" was wrong, and is corrected here.**
  That audit measured text on flat colours; nothing measured text against the
  photograph. Sampling the composited pixels at 390×844 on the *old* CSS gives
  hero eyebrow **2.43:1**, lede **3.72:1** and meta labels **4.37:1** — three
  AA failures that had been on the live site since launch. Fixing the hero
  fixed them (now 5.91 / 6.04 / 5.77). Two more found the same way:
  - `.serif-accent` inside a heading on the **cream** sections was
    `--gold-soft`, a colour built for the dark sections: **1.53:1** where a
    heading needs 3:1, so "Eastleigh works." / "everything but work." were
    half-invisible. Now `--gold-text-on-light`, **4.69:1**.
  - The header wordmark's gold "TWIN TOWERS" sub-label over the hero measured
    **2.66:1** at 9.3px. Now `#f1d5a2` while the header is transparent, **4.63**;
    it returns to `--gold` the moment `.is-scrolled` paints a background.
  - **Method matters more than the numbers.** Two traps, both of which produced
    confidently wrong CSS before being caught, are written up in
    `hero-scrim.md` with the script (`hero-scrim-audit.js`): percentage
    gradient stops drift out from under fixed-height copy as the viewport
    changes (the same CSS measured 6.37 at 390×844 and 3.68 at 375×667), and
    sampling an element's *box* instead of its *text runs* averages in
    background the glyphs never touch (4.11 vs 6.50 for the eyebrow at 2560).
    The scrim is now anchored in px vertically and to the wrap (`calc(50% ±
    px)`) horizontally, and passes at every width from 320 to 2560.
  - **Also fixed, adjacent:** `.reveal` starts at `opacity: 0` and is un-hidden
    by main.js, so with JS off the page rendered blank below the header. A
    `<noscript>` style block now resets it. The README's "fully usable without
    JS" claim is closer to true; the enquiry form (logged 2026-07-31) is still
    the outstanding exception.
  - **Map facade text, fixed on request the same day.** "Eastleigh, Nairobi —
    interactive map loads on request" measured **3.95:1**: an inline
    `color:#5c6572` on the `<p>` pinned it to `--muted-on-light`, a colour
    chosen against `--cream`, while the facade paints its own lighter #d7d3c9.
    Dropping the inline override lets it inherit `.section--light`'s body
    colour — **5.45:1**, no new value in the palette. Size and measure are
    unchanged; `max-width`/`font-size` moved from the inline style to
    `.map-pin p`. A full-page sweep of all 178 text elements on flat
    backgrounds now reports zero failures.
  - **Known, pre-existing, NOT changed:** the residence cards' Photo / Floor
    Plan toggle labels sit on a 0.6-alpha chip over a photograph, and the
    amenity tile captions sit on a gradient over one. Both need pixel sampling
    like the hero to judge properly, rather than a computed background.

- 2026-08-01: **the "portrait crop for phones" idea does not work — recorded so
  nobody spends a day on it.** The suggestion was that art-directing a portrait
  crop of the hero render into `<picture>` would show more of the building on a
  phone. The geometry says otherwise. With `object-fit: cover`, the visible
  slice of the source is always a window of the *viewport's* aspect ratio, and
  its width in source pixels is `viewportAspect × sourceHeight` — 0.462 × 1500
  = **693px of front-view.png, whatever the file is cropped to**. Cropping the
  file narrower changes nothing; cropping it *shorter* shows even less. The
  tower is 725×1325 in the source (aspect 0.547) and the phone window is 0.462,
  so a crown-to-podium view of the full tower width cannot fit at 100svh — not
  a framing problem, an arithmetic one.
  - What *is* true: on a phone the full source **height** is always visible, so
    the tower already reads crown to podium; what is lost is side context
    (trees, neighbouring blocks). That is the tight-looking crop, and it is
    inherent.
  - The one lever that would change the composition is a **different render**,
    not a different crop of this one. `images/batch-2026-07-27/drama-shot.png`
    is already 2000×2500 portrait, so its phone window is 1155px wide — 58% of
    its width against front-view's 35% — a low-angle shot with the retail
    podium's storefronts at the base. It is a taste call, not a fix, and it is
    not free: the phone scrim is tuned to front-view's pixels, and drama-shot
    puts bright glazing exactly where the CTAs sit, so it would need a full
    re-measure with `hero-scrim-audit.js`. Left alone pending a decision.

- 2026-08-01: **client sent the official logo and the real brochure.** Both had
  been open items since launch; both are now in.
  - **Brochure.** What was shipping was a **one-page, 280 KB** stand-in. The
    client's is **14 pages, 6.1 MB** ("NOMAD TWIN TOWERS", made in Canva).
    Size is fine: it moves only on a download click, never on page load. The
    README's "the film is the only large file on the site" line was corrected.
    **It now ships as `nomad-twin-towers-brochure-2026-08.pdf`, not at the old
    path — see the cache correction below.**
  - **Logo — the stand-ins are gone.** The site had been carrying *two*
    approximations: the "NT" monogram cropped out of the price list, and a
    NOMAD / TWIN TOWERS wordmark typeset in Fraunces and Manrope beside it. The
    real thing is a single horizontal lockup — NOMAD with the twin towers
    forming the A, TWIN TOWERS beneath between two gold rules. Source filed at
    `reference/logo-official-2026-08-01.jpeg`.
  - It arrived as a **JPEG on white**, which is the whole reason
    `logo-assets.mjs` exists. Everything is derived from that one file: the
    lockup is knocked out of the white and recoloured for the dark header, and
    the favicons are cut from the towers device. **Ask the client for the vector
    original** — a trace would beat any of this — and re-run the script if it
    turns up.
  - Two things in that script are worth not re-learning. **The ink is sampled as
    the modal colour of each cluster, not the darkest pixel**: the darkest pixel
    is a JPEG ringing artefact (rgb(0,0,30) against a true navy near
    rgb(5,32,85)), and since alpha is solved as `(255-pixel)/(255-ink)`, too
    dark an ink makes every solid area come out ~90% opaque — a logo subtly
    see-through everywhere. And **alpha is solved rather than thresholded**, so
    the antialiasing survives instead of turning to jaggies.
  - **Header geometry.** The lockup is 2.43:1 where the old brand was roughly
    square, so at a size that keeps TWIN TOWERS legible (~6px cap height) the
    brand is 70px tall against 48px. `.nav-bar`'s padding came down 1.05 →
    0.95rem to hold the header near its old size: **84px → 101px**, and
    `.section`'s `scroll-margin-top` went 6rem → **7rem** to match. Verified by
    clicking a nav link: the target lands 37px clear of the header. The asset is
    trimmed hard to the ink, so the logo's clear space has to come from that
    padding — trim it further and the tower spires touch the top of the screen.
  - **The gold rules are `--gold-soft`, not `--gold`.** Over the hero render the
    palette gold measured **3.13:1** (2.29 on the worst pixel) against the 3:1
    WCAG 1.4.11 minimum for graphics — the same trap the hero eyebrow fell into.
    The lighter champagne clears it. The cream type measures 5.65:1.
  - **Favicons rebuilt from the towers device**, replacing the NT monogram,
    which the official logo does not use at all. Navy on cream, opaque, square —
    square being non-negotiable after the 2026-07-30 globe incident. The device
    is a portrait 0.68 mark, so a square always leaves side margin; tab-sized
    icons (≤48px) get almost no padding on top of that or they read as a sliver,
    the large ones keep it. All files got *smaller* (favicon-192: 15.8 → 4.5 KB).
  - `logo-mark.png` deleted — nothing references it. A full sweep of the 167
    text elements on flat backgrounds reports zero contrast failures, and the
    hero audit still passes at 5.56 lowest.

- 2026-08-01: **CORRECTION — `must-revalidate` does not make in-place file
  replacement safe, and the deploy earlier today proved it.** The entry above
  originally claimed that `_headers` sending `/assets/*` with
  `must-revalidate` is "what lets a file be replaced in place and still reach
  returning visitors". That is wrong. The rule is
  `max-age=604800, must-revalidate`: `must-revalidate` only governs what
  happens **after** the freshness window, so for seven days the edge considers
  the object fresh and never asks the origin. Replacing a file in place under
  `/assets/*` therefore keeps serving the old bytes for up to a week, per PoP.
  - **Measured immediately after the deploy**, on nomadtwintowers.com:
    `/assets/favicon-192.png` returned `cf-cache-status: HIT`, `Age: 75627`
    (~21 hours, i.e. cached before the deploy) and **15787 bytes — the old
    file**, while the origin `nomad-twin-towers.pages.dev` served the correct
    4542. Same deploy, same rule: `favicon-48`, `favicon-96` and
    `apple-touch-icon` happened to miss the cache and updated instantly, which
    is exactly why this is easy to miss — it is per-object and per-PoP luck.
  - `/favicon.ico` was never at risk: it sits at the root, so it does not match
    `/assets/*` and inherits `max-age=0, must-revalidate` instead. It came
    through as `REVALIDATED`.
  - **The brochure was the one that mattered** — a prospective buyer clicking
    "Request the Brochure" could have got the one-page placeholder for a week.
    Fixed the way this file's own `/assets/*` comment already prescribes ("new
    artwork ships under a new filename"): it is now
    `nomad-twin-towers-brochure-2026-08.pdf`. **Date any future brochure.**
  - The favicon PNGs keep stable paths on purpose (external consumers cache
    them), so they cannot be versioned away and will self-heal within seven
    days. A Cloudflare cache purge clears them immediately if that matters.
  - **Also worth knowing for next time:** the 404 seen on
    `/assets/logo-lockup-light.png` seconds after the deploy was a propagation
    race, not a failure — the HTML was live before the asset had reached that
    edge. It resolved on its own within a minute. Do not chase it; re-check
    against `nomad-twin-towers.pages.dev` first, which is the origin truth.

- 2026-08-02: **fourth render batch placed — food court, medical spa, medical
  centre** (`images/batch-2026-08-02/`, prepped through `prep-images.mjs` at
  the same spec as every other asset: 1600px, q80, `--widths=800,1200 --webp`,
  18 files). Each one is placed in all four places an amenity lives: a photo
  highlight, an icon card, a Gallery entry and a JSON-LD
  `LocationFeatureSpecification`.
  - **The price list pins a floor to all three**, so the copy cites floors
    instead of hedging: food court on the **3rd** ("Food, Entertainment &
    Family Floor" — open seating, kids' play area, barista café), medical spa
    on the **4th** ("Premium Lifestyle & Wellness Floor", the same floor as the
    masjid, alongside a men's spa), healthcare centre on the **5th**
    ("Healthcare & Offices Floor", with a dialysis centre).
  - **"Medical Spa" is deliberately not a duplicate of "Sky Gym & Spa."** Both
    are real and both are on the price list: the Sky Gym & Spa is the
    residents' amenity floor, the Medical Spa is a 4th-floor retail tenancy.
    The card copy carries that distinction so the two do not read as one
    amenity listed twice.
  - Spelling is **"Medical Centre"** — the page is British-English
    ("The centre of everything"), and it matches the client's own filename.
    `ShoppingCenter` in the JSON-LD stays American: it is a schema.org type.
  - Counts: amenity highlights 7 → 10, icon cards 9 → **12 (an exact 4×3)**,
    Gallery 17 → 20, JSON-LD amenities 9 → 12, sitemap 16 → 19 images,
    lastmod 2026-08-02.
  - **CSS change — the highlight strip now centres an orphan trailing row.**
    At 10 tiles the four-column grid left the last row hard left against two
    empty cells, which reads as unfinished (7 tiles had left one gap; two is
    conspicuous). `.amen-highlights` is now `repeat(8, 1fr)` with each tile
    `grid-column: span 2` — a span-2 tile absorbs the gap it straddles, so
    **tile widths are unchanged at every breakpoint** (measured: 276px before
    and after at 1440px). The half-tile granularity is what allows
    `:nth-child(4n+1):nth-last-child(2) { grid-column: 3 / span 2 }` to centre
    a trailing pair — 301px inset each side, verified. Keyed off the item
    count rather than a fixed index, so it stays correct as batches arrive.
    The 980px/560px breakpoints reset `grid-column` to `auto`.
  - Verified in a real browser at 1440/900/390: rows 4-4-2 centred, 2-col, then
    1-col; no horizontal overflow; captions stay inside their tiles; all 40
    images load; JSON-LD parses; sitemap well-formed; every referenced asset
    resolves (139 refs, 0 missing). Hit-tested the new tiles with
    `elementFromPoint` at both tile centre **and** over the caption — all
    return the right `IMG`, so the 2026-07-31 scrim bug does not recur — and a
    real click on Medical Centre opened the lightbox at the full 1600×810.
  - **Two render-quality issues shipped as supplied, following the batch-3
    precedent (client's artwork, client's call), but the client should see
    them:**
    1. `medical-centre.jpg` has **garbled signage** on the back wall — a
       string of nonsense CJK-like glyphs above "Runley BPT". It is a
       generation artifact, small on the tile but legible in the lightbox at
       full size. The background skyline is also generic high-rise, not
       Eastleigh — true of other renders in the set, noted only for
       completeness.
    2. `food-court.jpg` shows **five invented tenant brands** in legible
       signage — "Fuel & Go Smoothies", "Keto Kitchen", "Vegan Vibes",
       "Bulk & Burn Grill", "Protein Power-Up". They read as a gym-nutrition
       food hall, which sits oddly against the price list's description of
       that floor (kids' play area, barista café, family floor), and a buyer
       could reasonably take named stalls for confirmed tenants. No site copy
       repeats any of these names.

- 2026-08-05: **the site was telling Google the shops are at street level, and
  Google was repeating it.** A client-supplied SERP capture
  (`reference/google-serp-nomad-twin-towers-2026-08-05.png`) shows the brand
  ranking #1 with a full rich result — favicon, sitename, title, description and
  the front-view thumbnail all present — and an AI Overview describing the
  development from our own copy. That overview said "**334 ground-level shops**"
  and "shops and a supermarket at street level".
  - Not a Google misreading. The Vision paragraph read "334 shops and a 1,701
    sqm supermarket **at street level**", and "at street level" attaches to
    both. Against the price list, wrong twice: only **52 of the 334** shops are
    on the ground floor (16 road-front + 36 indoor), the rest on floors 1–5; and
    the supermarket is the **Basement 1** anchor.
  - The JSON-LD had always been correct ("334 retail units from Ground to 6th
    floor, anchored by a 1,701 sqm supermarket in Basement 1"), so the
    structured data and the prose contradicted each other — **and the prose is
    what got quoted.** Worth remembering: schema.org accuracy does not protect
    you if the visible sentence says something else.
  - Now "334 shops across the retail podium, a 1,701 sqm supermarket in
    Basement 1". Deliberately no floor count in the prose: the brief and JSON-LD
    say Ground–6th, but the price list shows no shop count against the 6th
    (event hall / hotel restaurant), so a number would overclaim.
  - Commercially this mattered more than a pedantic correction — it framed the
    retail podium, which is the investor product, as a ground-floor shopping
    strip.

- 2026-08-05: **the "NT" favicon in that SERP is Google's cache, not our file.**
  Checked before changing anything: `favicon.ico` carries three PNG entries
  (16/32/48) and all are the towers device, as are favicon-48/96/192 and
  apple-touch-icon. Every one matches local byte-for-byte at the edge, so the
  `/assets/*` seven-day window from the 2026-08-01 rebuild has expired and
  self-healed exactly as predicted. Nothing to fix in the repo.
  - One real defect found while checking: the `<link rel="icon">` for the .ico
    advertised `sizes="32x32"` while the file actually contains 16, 32 and 48.
    Google's favicon guidance asks for a multiple of 48, so we were declaring
    the one size it does not want. Now `sizes="16x16 32x32 48x48"`.
  - **This does not force a refresh.** Google's favicon crawler is separate and
    caches for weeks. `/favicon.ico` must stay at its well-known path so it
    cannot be versioned away, which means the filename trick that works for
    `/assets/*` is unavailable here. The only real accelerator is a Search
    Console **URL Inspection → Request Indexing** on the homepage, which needs
    the client's account. Do not go chasing this in code.

- 2026-08-14: **the film was replaced with the 5:51 cut — and the source we were
  given is a TV broadcast rip, so this encode is provisional.** Client dropped
  `Xayeysiiska Nomad.mp4` ("the Nomad advertisement", Somali) in the repo root:
  1920×1080, 5 min 51 s, H.264/AAC, 3.89 Mbps, **163 MiB**.
  - **Check the corners before trusting a client video.** Every frame carried
    three burned-in third-party watermarks: **HORN PETROLEUM** top-left (an
    unrelated fuel company), a **Hereri** channel bug top-right, and a green
    **5G** telco badge bottom-left. They are on the NOMAD title card too. This
    is a broadcast recording, not the client's master — and the 2:27 cut already
    on the site is clean, same campaign, same shots, so a clean master of this
    cut almost certainly exists. **Ask for it.** Second time running that a
    client film arrived degraded by the delivery channel (see 2026-07-31,
    WhatsApp).
  - Removed with three `delogo` boxes in source coordinates, applied *before*
    `scale` so they land on the right pixels. Verified by tiling the top-left
    300×120 region across the whole runtime: clean over sky, ceilings and walls,
    with mild horizontal smear where the corner holds vertical detail. At the
    62rem display cap that region is ~127 CSS px wide, and the low bitrate
    softens everything anyway, so it does not read on the page.
  - **Stripping a broadcaster's bug and a sponsor's logo to republish is a
    rights question, not a technical one.** Shipped anyway on the client's
    instruction, as provisional — swap in the clean master when it arrives.
  - **163 MiB could never have shipped.** Cloudflare Pages caps a single file at
    **25 MiB** and GitHub rejects pushes over 100 MB. That cap is the whole
    reason the encode looks the way it does: 5:51 inside 25 MiB is ~0.5 Mbps
    total, so 1280×720 at 380k video + 96k AAC, two-pass. The result is **softer
    per second than the 2:27 film it replaces** (1.23 Mbps) despite a much
    better source. Trimming the ad would be the only way to buy quality back.
  - Root `*.mp4` is now gitignored (root-anchored, so `docs/assets/*.mp4` stays
    tracked). Masters stay out of the repo; only the encode is committed.
  - **Filename is dated: `nomad-twin-towers-film-2026-08.mp4`.** `/assets/*` is
    cached a week, so reusing the old name would have kept feeding returning
    visitors the old 2:27 cut. Same trap the brochure taught us on 2026-08-01.
  - Poster deliberately **unchanged**. The film's own title card makes a decent
    frame and delogos cleanly, but it is broadcast-soft, and the poster is the
    one image 100% of visitors see whether or not they press play — the crisp
    1600px render crop still wins. Revisit with the clean master.
  - `preload="none"` unchanged and still load-bearing. Do not add `autoplay` or
    `preload="metadata"`: most of this audience is on mobile data.
  - JSON-LD `#film` updated — `duration PT5M51S`, new `contentUrl`, real
    `uploadDate`, and a `description` widened to match the longer cut (it now
    covers the food court, gym, pool and sky lounge as well).

- 2026-08-14: **added an AV1 encode alongside the H.264 one, which buys back
  most of the quality the 25 MiB cap took away.** No change to the source, the
  delogo, the resolution or the bitrate — the gain is purely the codec.
  - Measured, not assumed. Encoded a 40 s segment four ways at identical
    bitrate and scored each with VMAF against a near-lossless reference:

        H.264 (what shipped)   VMAF 64.73
        H.264 + hqdn3d         VMAF 64.91
        VP9                    VMAF 76.71
        AV1 (SVT, preset 4)    VMAF 83.24

    ~65 is "noticeably impaired", ~83 is "good". At the ~0.5 Mbps this film is
    forced into, H.264 simply falls apart and AV1 does not.
  - **The delivered gain is smaller than that test implied — measure the real
    files, not a segment.** Scoring the two full-length encodes over the same
    window gives **H.264 67.73 vs AV1 78.51, so +10.8, not +18.5.** Two reasons:
    the shipped H.264 is two-pass across the whole film, so this window got more
    than its even share of bits; and SVT-AV1's VBR undershot the target, landing
    at 328k video against the 380k asked for. Quote +10.8 to anyone who asks.
  - Because AV1 undershot, it is also **smaller: 17.79 MiB against 20.17 MiB** —
    better picture AND ~12% less mobile data for the clients who get it. Pushing
    `-b:v` to ~460k would spend the spare budget on more quality instead; not
    done, on the grounds that this audience is on mobile data and the current
    result already wins on both axes.
  - **Denoising before encoding does nothing here** (+0.2, and it slightly HURT
    AV1). The intuition that cleaning broadcast noise frees up bits did not
    survive measurement. Do not spend time on it again.
  - **Upscaling was considered and rejected.** Resolution is not the constraint,
    bitrate is: 1080p at the same 0.5 Mbps spreads the same bits over 2.25x the
    pixels and looks worse. AI super-resolution fails for the same reason — the
    invented detail is exactly the high-frequency texture a 0.5 Mbps encode
    discards first.
  - **Reusing the old 2:27 film's cleaner video under the new audio was also
    considered and rejected**, though it was a closer call than expected. The
    two films share a footage library — 79% of the new cut's 105 shots have a
    strong match in the old file, and the old encode genuinely looks better
    (848x478 at 1.23 Mbps beats 1280x720 at 0.38 Mbps). It fails on arithmetic:
    the old file holds **147 s of footage against 351 s of audio**, so 58% of the
    runtime has no clean source. And the edits do not correspond — 21 shots
    against 105 — so it is a full re-edit synced to Somali narration, not a
    remux. Worth re-reading before anyone proposes it again.
  - Markup is two `<source>` elements, AV1 first. **The `codecs=` parameter is
    load-bearing**: without it Safari reports it can play `video/mp4`, selects
    the AV1 file and then fails. The value `av01.0.05M.08` is read off the
    encode, not guessed. Download links stay on the H.264 file, which plays in
    any desktop player.
  - Cost is a second binary in the repo (17.8 MB on top of the 20.2 MB H.264).
    Each visitor still downloads only one, and only on play. If that weight ever
    becomes a problem, AV1 could be encoded at roughly half the bitrate and
    still match today's H.264.
  - Still provisional, and still worth chasing the clean master — a clean source
    in AV1 would be better again, and the two are independent.
- 2026-08-24: **sales number changed to `+254 141 700 000`** per Daniel,
  replacing the price-list number `+254 711 111 188` that had been live since
  2026-07-27. Five places in `docs/index.html`: three JSON-LD `telephone`
  fields (development, retail, developer), the `tel:` href and its visible
  text in the contact rows, and the `wa.me` deep link on the floating WhatsApp
  button. `docs/js/main.js` needed no change — it still scrapes the number off
  `.wa-float`'s href at runtime, which is exactly the single-source-of-truth
  arrangement the 2026-07-27 note predicted would pay off. Deployed and
  verified live on `nomadtwintowers.com`.
  - Written in international form (`+254141700000` / `254141700000`) rather
    than the local `0141700000` Daniel supplied. Not cosmetic: `wa.me` only
    resolves an international number, and §2 of `seo-local-listings.md`
    requires byte-identical international NAP across every platform.
  - **The number was queried and confirmed.** `0141` sits outside the
    `0100`–`0115` Kenyan mobile prefixes this repo knew of, so it was flagged
    to Daniel as a possible typo; he confirmed it 2026-08-24 as correct. Treat
    the prefix list above as incomplete, not the number as suspect. The one
    thing still untested is whether the line has a WhatsApp account — `wa.me`
    only opens a chat if it does, and tapping the float on a phone settles it
    in seconds. Not checkable from the repo.
  - README, this brief and `seo-local-listings.md` updated the same day. The
    2026-07-27 changelog entry above still reads `+254 711 111 188` on
    purpose — that is what went live that day, and rewriting it would falsify
    the log. Nothing was submitted to the listings platforms under the old
    number (§6 blockers are still open), so there is no published NAP to fix.
  - **The brochure PDF carried the old number too, and the site serves it —
    now fixed in place** (`docs/assets/nomad-twin-towers-brochure-2026-08-24.pdf`,
    the client's own file, received 2026-08-01). It held `+254 711 111 188` in
    four places: the printed text on the CONTACT DETAILS page, a clickable
    `/URI (tel:+254711111188)` annotation, that annotation's `/Contents`, and
    the outline/bookmark `/Title`. See the 2026-08-24 entry below for how the
    printed text was changed, which was not trivial.

- 2026-08-24 (same day, later): **the brochure PDF's printed number was
  changed in place — the font had no `0` glyph, which is the whole story.**
  `docs/assets/nomad-twin-towers-brochure-2026-08.pdf` is served from the site,
  so leaving `+254 711 111 188` in it would have handed every downloader the
  dead line. Four places held it: the printed text on the CONTACT DETAILS page,
  the `tel:` link annotation, that annotation's `/Contents`, and the outline
  `/Title`. The last three are plain strings and were trivial. The printed text
  was not.
  - **Why it was not a byte swap.** The page draws text as Identity-H CID
    glyph IDs against a subsetted `AGPPHP+Montserrat-Regular`, one
    `<GID> Tj` per glyph with an explicit `Td` advance between each. The
    subset carried exactly the digits `1 2 4 5 7 8` — the digits of the old
    number — and **no `0`**. GID 1486 (the zero slot, confirmed by the
    `<05CF> <05D0> <0031>` ToUnicode bfrange putting `1` at 1487) existed but
    was an empty glyph with advance 0. Every other font in the file is a
    subset of the same eight-descriptor shared program at object 148, and
    none of them had a zero either — no page in the brochure displays one.
    So `700 000` would have rendered as `7` followed by five blanks.
  - **What was done.** Grafted the real Montserrat `0` outline into GID 1486
    of the shared font program. The source is Google Fonts' variable
    Montserrat instanced at `wght=400`, and it is provably the same cut: the
    advance widths of all six digits already embedded match exactly
    (1=361, 2=568, 4=661, 5=566, 7=589, 8=638) and so do their glyph
    bounding boxes, to the unit. Point counts differ only because the
    variable font carries extra interpolation points. Then: `/W` gained
    `1486 [662]`, the ToUnicode bfrange was widened to `<05CE> <05D0> <0030>`
    so the text still extracts, and the glyph run was re-laid with the new
    GIDs and advances.
  - **Three things that were easy to miss.** (a) The line is *centred*, not
    left- or right-aligned — three of the four lines in that block centre on
    x=154.8836 — and the new number is 23pt wider in text space, so it had to
    be re-centred, not just retyped. (b) A separate `88.7969 70 132.187 1 re
    f` rule draws the underline; left alone it stopped short of the last
    digit. (c) The `tel:` annotation's `/Rect` is sized to the old text and
    had to grow with it, or the tap target would have missed the number.
  - **Verified, not assumed.** All 14 pages were rendered before and after and
    pixel-diffed: 13 are byte-identical and page 13 differs only inside a
    175x17px box around the phone line. `pdftotext` over the whole document
    differs on exactly one line. The rendered page was read back visually to
    confirm the zeros actually draw.
  - **One wart.** The edit is a PDF incremental update (objects appended, new
    xref, `/Prev` chain) — the spec-sanctioned way to modify a PDF, and it is
    why the change is provably surgical. The cost is that the superseded
    objects remain in the file, so `grep` still finds three copies of the old
    number in dead bytes. No viewer will ever show them; the file grew 10 KB.
    Do not "fix" this by rewriting the file wholesale — the risk is real and
    the benefit is cosmetic.
  - Reproduction scripts are not kept in the repo; the method is written down
    here because the next number change will hit the same missing-glyph wall.
  - **Shipped under a new filename, the second time this lesson was needed.**
    The patched PDF first went out replacing `...-2026-08.pdf` in place, and
    the edge did exactly what the 2026-08-01 entry above says it does: the
    plain URL kept returning the old 6,348,526-byte file while the origin held
    the new 6,359,003-byte one — confirmed by a cache-buster query returning
    `cf-cache-status: MISS` and the correct number. `/assets/*` is
    `max-age=604800`, so that would have stood for a week. It is now
    `nomad-twin-towers-brochure-2026-08-24.pdf`, per the rule the HTML comment
    beside the download link already stated. The old URL still serves the old
    number from cache until it expires and then 404s; purge it in the
    Cloudflare dashboard if anyone is known to hold that link.
