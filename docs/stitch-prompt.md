# Google Stitch prompts — Nomad Towers multi-page animated site

Upload the six renders from `images/*.jpg` as reference images before
prompting. Paste the master prompt first, then use the per-page prompts to
add screens one at a time (Stitch iterates best screen-by-screen).

---

## Master prompt (paste first)

Design a stylish, modern, polished multi-page marketing website for
"Nomad Towers", a 34-storey luxury residential development in Westlands,
Nairobi, with a retail podium and rooftop infinity pool. Audience:
off-plan apartment buyers and investors. Mood: quiet luxury — cinematic,
serene, editorial, never busy.

Visual system:
- Colors: deep night slate-blue backgrounds #12161e (surfaces #171c26,
  cards #202634), champagne-gold accent #cda060 (soft highlight #e2bf8b),
  warm ivory light sections #f4f0e7, slate body text on light #47505e,
  headings on light #232a37. Dark sections dominate; ivory sections
  alternate for rhythm.
- Typography: Fraunces (serif, 600) for display headlines with italic
  serif accents on key words; Manrope (sans) for body, buttons and
  uppercase letter-spaced eyebrows/labels.
- Imagery: full-bleed photorealistic dusk/sunset renders of the tower
  (use the uploaded reference images) with dark gradient scrims for text
  legibility. Thin 1px gold rules and borders. Square corners, no rounded
  cards. Generous whitespace, oversized headlines.

Motion design (annotate on every screen):
- Page-to-page transitions: full-screen slate panel wipes across, brand
  monogram flashes gold, next page's hero image scales down from 1.08 to
  1.0 as it settles (600–800 ms, expo ease-out).
- Hero images have slow Ken Burns drift and parallax on scroll.
- Content reveals: headlines rise 26 px with fade, staggered 100 ms per
  element; stats count up; thin gold rules draw in from left.
- Buttons: gold fill sweeps from left on hover; nav links get animated
  gold underline. Amenity/gallery images zoom subtly (1.05) on hover.
- Sticky translucent blurred header that hides on scroll down, returns on
  scroll up. Respect reduced-motion preferences.

Site pages: Home, Residences, Amenities & Gallery, Location & Invest,
Enquire. Persistent footer with monogram, page links, legal fine print,
and a floating WhatsApp button.

Start with the Home page: full-viewport hero using the sunset tower
render, eyebrow "Westlands · Nairobi", headline "Rise above the city,
live within it." with "live within it." in italic serif, two CTAs
("Explore Residences" gold solid, "Book a Private Viewing" gold outline),
and a stat strip (From KES 9.8M · 1–3 Bedrooms · Q4 2027) above an
infinite scrolling amenity ticker.

---

## Per-page follow-up prompts

**Residences.** Add a "Residences" page: editorial intro on ivory
background — eyebrow "The Residences", headline "Three ways to live
above it all." Then three floor-plan cards on slate (#202634): One
Bedroom 62 sqm from KES 9.8M, Two Bedroom 108 sqm from KES 16.5M,
Penthouse 172+ sqm from KES 38M — each with floor-plan artwork, gold
price in serif, four feature bullets with gold em-dash markers, and a
"Request Floor Plans" outline button. Annotate: cards rise and fade in
staggered; on hover they lift 6 px and their border warms to gold.

**Amenities & Gallery.** Add an "Amenities & Gallery" page: ivory
amenities grid — eight items (Rooftop Infinity Pool, Sky Gym & Spa,
24-Hour Concierge, Smart Residences, Layered Security, Backup Power,
Residents' Lounge, Parking & EV Charging), each a thin-line gold icon,
small serif heading and two lines of copy, separated by hairline rules.
Below, a dark full-bleed horizontal gallery of the uploaded renders with
uppercase letter-spaced captions (Rooftop Infinity Pool · Level 34, The
Tower at Dusk, Morning over Westlands, The Retail Promenade). Annotate:
gallery is a snap-scrolling filmstrip with drag cursor; images open a
dimmed lightbox; captions slide up as each image enters the viewport.

**Location & Invest.** Add a "Location & Invest" page: split layout on
ivory — left, eyebrow "Location", headline "The centre of everything.",
and a travel-time list (GTC & Westlands CBD 3 min, Sarit Centre 4 min,
Westgate 5 min, Nairobi CBD 10 min, JKIA 35 min) with gold times; right,
a stylized dark map card with a gold location pin. Below on slate: four
numbered investment steps (01 Reserve, 02 Sign & Deposit, 03 Staged
Payments, 04 Handover 2027) in serif italic numerals. Annotate: list
rows draw their divider lines as they reveal; the map pin drops in with
a soft bounce; step numbers count up as the section enters.

**Enquire.** Add an "Enquire" page: two columns on ivory — left, eyebrow
"Enquire", headline "Book a private viewing." with contact rows (Call /
WhatsApp, Email, Sales Gallery — Off Waiyaki Way, Westlands) in gold
label + serif value pairs; right, a minimal underlined-field form (Full
Name, Phone, Email, Interested In select, Message) with a gold "Send
Enquiry" button and a ghost "Send via WhatsApp" button. Annotate: fields'
underlines glow gold on focus; the submit button sweeps gold on hover;
a success state swaps the form for a serif thank-you line.
