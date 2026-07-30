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
Phone/WhatsApp: **+254 711 111 188** — REAL, from the client's price list,
replaced the `+254 700 000 000` placeholder 2026-07-27 (tel link, WhatsApp
float, contact row — js/main.js derives the WhatsApp number from the page).
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
1. ~~Real sales phone/WhatsApp number~~ — RESOLVED 2026-07-27: `+254 711 111 188`, from the price list.
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
