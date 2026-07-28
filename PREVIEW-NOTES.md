# Preview notes — `experiment/88-inspired-conversion`

**This branch is a visual mock-up, not a shippable site.** It adds the seven
devices we found worth stealing from [88nairobi.com](https://88nairobi.com)
(Lordship Africa's tower on 4th Ngong Avenue — the closest direct competitor
to Nomad in positioning and buyer profile), so we can see how they look on our
page before asking the client for the real content.

Four of the seven only work with content Obsha has never supplied. Rather than
leave empty boxes, those are filled with **invented placeholder content**. The
standing rule on this project — nothing goes live that isn't backed by the
client's own materials (brief.md, Missing item 11) — still holds. **Nothing on
this branch may be merged to `main` until every item in the inventory below is
either replaced with client-confirmed content or deleted.**

## Safety

- The Pages workflow (`.github/workflows/deploy-pages.yml`) triggers on
  `branches: [main]` only, so pushing this branch **cannot** publish it.
- Every invented block carries an HTML comment starting `FILLER:` and a
  `data-filler="…"` attribute. To find them all:
  `grep -n 'data-filler' docs/index.html`
- A fixed preview notice sits above the docked enquiry bar on every screen, so
  the page can't be mistaken for the real site if a screenshot escapes.
  It exists only on this branch.

## What was added (and where it came from)

| # | Device | 88 Nairobi's version | Status |
| --- | --- | --- | --- |
| 1 | Lead-capture strip under the hero + docked bar pinned to the viewport | "REGISTER YOUR INTEREST" band, both inline and pinned | Buildable now — only the callback promise is filler |
| 2 | Skyline locator band | Real Nairobi skyline photo with their logo as a map pin | Needs a real photo + confirmed plot |
| 3 | "The Standard" trust section | "The Citadel" — structure / security / architectural standards | **100% filler** |
| 4 | Testimonials | Five named quotes with credentialed roles | **100% filler** |
| 5 | Construction progress log | "LIVE FEED" construction camera in the primary nav | **100% filler** |
| 6 | Residence tier spines | Executive / Executive Plus / Sky Suites / Penthouse, colour-coded | Naming is filler; the units themselves are real |
| 7 | Founder narrative | "The Dream" — Jonathan Jackson's story | **100% filler** |

Deliberately not copied: 88's superlative register ("without equal", "epitome",
"beyond comparison"), which flattens under its own weight; their carousel that
leaves ~600 px of dead space mid-page; and their staggered amenity grid.

## Filler inventory

Everything below is **invented by Claude for this preview**. None of it came
from the client, the price list, or any other source.

### 1. Lead strip + docked bar — `#register`, `[data-dock]`
- "a member of the sales team will call you back within one business day" —
  Obsha have never committed to any response time.

### 2. Skyline band — `.skyline`
- The image is `birds-eye-view.jpg`, an artist's render, standing in for a real
  photograph of the Westlands skyline.
- The pin is positioned by eye (`top: 8%` in CSS). The actual plot has never
  been confirmed — brief.md Missing item 5.

### 3. The Standard — `#standards`
**Every single line of this section is invented.** It is the highest-risk block
on the branch: these are legal and regulatory claims.
- Consultants and contractor: "Kanyi & Partners Consulting", "Sandhurst
  Construction Ltd" — both fictional firms.
- Codes: Eurocode 2 / Eurocode 8, NFPA 101 / BS 9991, "engineered to withstand
  earthquakes", "sprinklered podium and residential core", "dual generators, N+1".
- Registrations: `NCA/1/2019/04471`, `NCC/DEV/2024/1188` — both fabricated
  numbers in a plausible format.
- Tenure: "Freehold · sectional title", "the project's own SPV".
- Certification by the Nairobi County Fire Department.
- The entire "Buyer protection" escrow arrangement.
- The lede itself ("Every claim on this page is backed by a drawing, an
  approval or a certificate") is a claim.

### 4. Testimonials — `#voices`
**All four people are fictional, as are their quotes, roles and floor numbers.**
- Faiza Abdi · "Bought a two bedroom · Floor 14"
- Peter Njoroge · "Partner, Njoroge & Wambui Advocates"
- S.M. · "Kenyan diaspora, UK · Bought two units"
- Daniel & Wanjiru Kariuki · "Bought a one bedroom · Floor 9"

### 5. Progress — `#progress`
- The 42% completion figure and the "updated July 2026" date.
- The six-stage scale (Groundworks → Handover).
- All three log entries: "Structure at level 11" (July 2026), "Podium topped
  out" (April 2026), "Substructure complete" (October 2025), and every detail
  in their descriptions.
- The three "site photographs" are artist's renders (`street-view-01`,
  `retail`, `street-view-02`), desaturated in CSS to read as site photos.
- The promises of monthly photographs and monthly buyer emails.
- "Targeting handover from Q4 2027" — already a known placeholder, brief.md
  Missing item 3(b).

### 6. Residence tiers — `#residences`
- The tier names "Signature" and "Signature Plus". The price list only ever
  says "1 Bedroom" and "2 Bedroom" — which remain the card headings, so the
  factual naming is still on the page underneath the invented tier.

### 7. The Dream — `#dream`
- "Ahmed Obsha" as founder, and his title.
- Founded 2009 (and therefore "seventeen years in the making").
- 4 completed projects, 610 units delivered.
- The entire pull quote.
- The portrait is a deliberate empty frame with initials, **not** a stand-in
  photograph of a real person — putting a stranger's face here would be a
  worse lie than an empty box.

## Cost of the additions

Gzipped, over the `main` branch:

| File | main | branch | delta |
| --- | --- | --- | --- |
| `index.html` | 7.5 KB | 12.9 KB | +5.4 KB |
| `css/main.css` | 5.4 KB | 8.2 KB | +2.8 KB |
| `js/main.js` | 3.2 KB | 4.6 KB | +1.3 KB |
| **total** | **16.1 KB** | **25.7 KB** | **+9.5 KB** |

No new fonts, no new dependencies, no build step. All new images reuse renders
already in `docs/assets/` at their existing responsive sizes. For scale,
88nairobi.com loads **4.7 MB over 124 requests** — 2.2 MB of that is CSS alone.

## Verified on this branch

- Docked bar: hidden over the hero, visible mid-page, hidden while `#enquire`
  or the footer is on screen, returns on scroll back. Dismissal persists for
  the tab session; a submitted lead also dismisses it.
- WhatsApp float clears the docked bar at every breakpoint (`--dock-h` is
  measured in JS and re-measured on resize).
- Both lead forms validate and hand off to WhatsApp exactly like the main
  enquiry form. Nothing is stored.
- Mobile (390 px): the docked bar collapses to one line plus an Enquire button
  rather than pinning three fields to the viewport.
- Testimonial track and progress bar work; progress bar keeps its correct
  inline width with JS disabled.
- No console errors (the two on localhost are Cloudflare Analytics CORS,
  which resolve on the real domain).
