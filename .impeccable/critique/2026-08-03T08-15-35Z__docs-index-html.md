---
target: docs/index.html
total_score: 17
max_score: 40
na_heuristics: 
p0_count: 1
p1_count: 3
timestamp: 2026-08-03T08-15-35Z
slug: docs-index-html
---
Method: dual-agent (A: design review · B: detector + browser evidence)

Provenance caveat: the skill requires Assessment A to land before detector findings reach the synthesis context, so mechanical output cannot anchor design judgment. B completed first and async delivery put it in front of A. The independence that matters held — A ran in full isolation and never saw B — but the ordering deviated and is recorded here rather than glossed.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | 30 lightbox images with no index or count; "Request the Brochure" silently pulls 6.35 MB with no size, format or progress |
| 2 | Match System / Real World | 3 | "Request the Brochure" does not request, it downloads; `#f-unit` offers "Investment Portfolio", a product that exists nowhere on the page |
| 3 | User Control and Freedom | 1 | `.gallery-track` mandatory snap latches the mouse wheel — 20 ticks over the track moved the page 0px; lightbox shows half a portrait render behind an internal scrollbar |
| 4 | Consistency and Standards | 2 | `.res-toggle` uses `role="tab"` with `aria-pressed` and no `tabpanel`; anchor, file download and form submit all wear an identical `.btn--ghost` |
| 5 | Error Prevention | 1 | Three `[required]` inputs with no required markers; `mailto:` submit with no fallback; the Shops CTA leads to a form that cannot express shop interest |
| 6 | Recognition Rather Than Recall | 2 | Lightbox drops caption, index and count for all 30 images; arrow-key nav is the only route and is undiscoverable |
| 7 | Flexibility and Efficiency | 2 | No compare, filter or shortlist across three unit types; 20-image gallery walks one step at a time, 19 clicks end to end |
| 8 | Aesthetic and Minimalist Design | 2 | Every amenity named 3–4× (marquee, photo tile, icon tile, gallery caption) — "Rooftop Infinity Pool" ×4, "Supermarket" ×4 |
| 9 | Error Recovery | 1 | Invalid fields get a `#b0432f` bottom-border only — colour-alone, no `aria-invalid`, no per-field message, no focus move |
| 10 | Help and Documentation | 1 | For a USD 48k–70k off-plan purchase: no completion date, no payment percentages, no title route for a non-resident, no approvals, no developer track record |
| **Total** | | **17/40** | **Poor — major UX work required** |

No heuristics marked n/a; both 7 and 10 genuinely apply to a high-consideration purchase surface.

Read the band with one qualification: this score is driven almost entirely by conversion, trust and interaction gaps, not by visual or engineering craft. The build quality measured here is genuinely high (see What's Working). A site can be well-made and still score poorly on whether a buyer can act.

## Design Specificity Verdict

**LLM assessment.** Category-generic composition; only the copy and two images are not interchangeable. Structurally this is the standard off-plan template executed cleanly: full-bleed dusk render → serif headline with italic gold tail → marquee → alternating cream/ink sections → animated stat row → 3-up cards → amenity photo grid → amenity icon grid → horizontal gallery → film → distance list → four-step process → split form. Swap the render and the place name and this sells apartments in Dubai, Lagos, Accra or Manchester without touching a line of layout.

Nine of eleven sections use an identical `eyebrow → h2-with-italic-gold-tail → lede → grid` scaffold, and the italic `.serif-accent` closes *every* headline — "above it all." / "everything but work." / "up close." / "in motion." / "to the keys." Used once that is a signature; used seven times it is a template, and by the fourth the eye stops reading it as emphasis.

Two things resist the template. The copy knows exactly where it is — *"Eastleigh trades from first light, and the towers are built for that rhythm… Take a residence, take a shop — or hold both"* — which is the entire product proposition, buried in paragraph two of a section labelled "The Vision". And the masjid tile sits between an infinity pool and a sky restaurant at identical weight with no apology, which does more positioning work for a Somali-Kenyan buyer than the whole copy deck precisely because it is presented as ordinary.

The page then undercuts both. The masjid — the most place-specific fact available — gets the most generic treatment: same 4:5 crop, same one-line caption, same icon tile 3,000px below. And "Two floors devoted to **everything but work**" argues against the product in a district that trades from first light, where 334 of 586 sellable units are shops.

The largest missed opportunity is structural. The building's own IA is a vertical stack — supermarket in B1 → six floors of shops → food court on 3 → masjid and medical spa on 4 → healthcare on 5 → 252 homes → hotel on 19–20. That stack is the product, the client's price list already documents it, and the page flattens it into a marquee and two grids that discard floor information entirely. Eastleigh itself never appears: every render is empty, quiet, and could be the Gulf.

**Deterministic scan.** CLI detector on `docs/index.html`: exit 2, **1 finding** — `broken-image` at `index.html:702`. **False positive**: that is the lightbox `<img>` inside a closed `<dialog>`; `js/main.js:189` sets `src` in `showInBox()` before `showModal()`, so it never renders as a broken image.

In-page detector overlay: **40 findings** — `undersized-ui-text` ×16 (10.24–10.88px, below an 11px floor), `low-contrast` ×10, `repeated-section-kickers` ×8, `all-caps-body` ×2, `oversized-h1` ×1 (74px / 54 chars / 33vh), `hero-eyebrow-chip` ×1, `line-length` ×1 (~92 chars), `overused-font` ×1 (Fraunces at 33% of text).

The `repeated-section-kickers` ×8 is the mechanical signature of the same template fatigue the design review reached independently — the detector counted the eyebrows; the review named why eight of them flatten the page.

**All 10 `low-contrast` hits are a measured false positive.** They are `.amen-highlight` captions over scrimmed photos; the detector walked past the `<img>` element and landed on the light section background, reporting 1.1:1. Sampling actual decoded pixels and compositing the scrim at the caption's exact position (alpha 0.757) gives **6.64:1 to 12.44:1** — all clear AA comfortably, and even a hypothetical pure-white photo yields 6.62:1.

**Visual overlays.** Injection succeeded after a fallback: the skill's `live-server.mjs` serves only its own script routes, not project files, so a static server on `docs/` was used for the page while the detector script loaded from the skill server. Preflight mutation passed (title writable, appended `<script>` executed). Both servers were stopped and `index.html` verified free of injected tags. No overlay tab remains open for you to inspect — the findings above are the console output, read and stopped within the run.

**What the detector caught that the review missed** — three real, specific defects:

1. **Form fields have no keyboard focus ring.** `main.css:761` sets `outline: none` on `.field input/select/textarea:focus`, outranking the global `:focus-visible` rule at `main.css:111` on specificity. Verified with a real Tab press: `:focus-visible` matches `true`, computed `outline-style: none`. The only indicator is a 0.8px border-bottom colour change — a **1.88:1 state change**, which fails WCAG 2.2 SC 2.4.13 Focus Appearance (needs ≥3:1 and ≥2px-equivalent).
2. **Residence cards ship JPEG where WebP already exists on disk.** The three `.res-card` images use a JPEG-only srcset while the gallery wraps the *same sources* in `<picture><source type="image/webp">`. Measured saving: **57,100 B (28% of those images, ~5.8% of page weight)** for a markup change only.
3. **`film-poster.jpg` at 285 KB is the largest single asset** and is fetched eagerly regardless of `preload="none"` — 29% of initial transfer for content well below the fold. A `.webp` exists but `<video poster>` cannot take a `<picture>`.

## Overall Impression

This is a well-engineered, well-written site that a motivated buyer cannot actually buy from.

The craft floor is high and measurably so: zero horizontal overflow at three widths, CLS 0.0000, one render-blocking resource, 36/40 images lazy with explicit dimensions, `prefers-reduced-motion` honoured in CSS *and* JS, zero unlabelled controls, zero heading-order jumps, and a hero scrim tuned with pixel-anchored stops rather than eyeballed. That is better hygiene than most commercial property sites ship.

The gap is that all of it serves a page whose primary job — turning a diaspora buyer's interest into a qualified lead — is broken in one place and unsupported in several others. 334 of the 586 sellable units have no working enquiry path and silently generate mislabelled leads. The section that should de-risk a USD 48,000 off-plan wire contains four steps and zero numbers. And the last thing a buyer reads before deciding is "nothing is stored on this site."

The single biggest opportunity is not visual. It is to make the page sell the thing it is actually selling — a stake in Eastleigh, bought by someone who cannot visit — and to make the shop path work.

## What's Working

**1. The hero scrim is engineered, not eyeballed, and solves the real tradeoff.** Three layered gradients with pixel-anchored stops, a separate phone ramp under 620px, and a hero-only eyebrow colour (`#f1d5a2`) because `--gold-soft` only reached 4.21:1 over open sky. The desktop ramp is *horizontal*, anchored to the wrap's edges via `calc(50% ± 620px)` — so it buys contrast exactly where the left-aligned copy sits and leaves the centre-right tower untouched. A vertical wash heavy enough for that headline would have greyed the whole render. This is the one place a hard constraint produced a genuinely non-obvious form. Measured: 23 distinct rendered text pairs, **zero real contrast failures**.

**2. Performance treated as a design decision, for the right audience.** `preload="none"` on a 22.6 MB film (confirmed not fetched), a click-to-load map facade, `content-visibility: auto`, self-hosted subset WOFF2, one CSS file, one deferred JS file, no framework. FCP 320 ms, CLS 0. For buyers on Kenyan mobile data, speed *is* the luxury signal — restraint here is the design, not a compromise on it.

**3. The masjid and Hagisa Community Hub tiles.** Placed between a rooftop infinity pool and a sky restaurant, at identical weight, with no explanatory apology. That editorial confidence positions the building for its actual buyer precisely *because* it is presented as ordinary rather than as a concession.

## Priority Issues

### [P0] The Shops CTA leads to a form that cannot express shop interest

**Why it matters.** "Request Shop Details" (`index.html:364`) links to `#enquire`. The `#f-unit` select offers only *One Bedroom Residence / Two Bedroom Residence / Investment Portfolio* (`index.html:802–806`). Worse, `buildMessage()` at `main.js:300` hardcodes `` `I would like to enquire about a ${d.get("unit")}` `` — so a retail buyer's WhatsApp message arrives reading *"I would like to enquire about a One Bedroom Residence."* **334 of the 586 sellable units on this page have no working enquiry path**, and the sales team receives silently mislabelled leads with no way to detect the error. Hotel suites are named in the hero, the About copy, the stats and the marquee with no card, no price and no enquiry option at all.

**Fix.** Add `Retail Shop` and `Hotel Suite` to `#f-unit`. Give each card CTA a `data-unit` attribute and preselect the field on click so the form arrives pre-answered. Fix `buildMessage()` to read the actual selection.

**Suggested command:** `/impeccable harden`

### [P1] The gallery track latches the mouse wheel and can stop the page dead

**Why it matters.** `.gallery-track` is `overflow-x: auto` + `scroll-snap-type: x mandatory`, 1180×460, sitting mid-page. Chrome converts vertical wheel deltas to horizontal on x-only scrollers; mandatory snap rubber-bands `scrollLeft` back to 0 and consumes the vertical scroll. Measured live: **20 consecutive wheel ticks with the cursor at (760, 400) moved the page 0px** — `scrollY` stayed at 5700 — while the same input 680px to the left moved it 500px. A desktop user whose cursor rests mid-screen, which is the default, hits a wall in the middle of the page.

**Fix.** `scroll-snap-type: x proximity` and `overscroll-behavior-x: contain`. Verify by wheeling with the cursor centred over the track, not beside it.

**Suggested command:** `/impeccable harden`

### [P1] The lightbox is unusable for portrait images and contextless for all 30

**Why it matters.** Measured at 1440×900: the `<dialog>` renders **1080×682 with 649px of internal scroll** on the 1600×2000 `drama-shot.jpg`, and pins to `x: 0` rather than centring because it overflows. The buyer sees roughly half of the single most important image on the page and must scroll *inside* a modal to see the rest. Across all 30 images there is no caption, no "3 of 30", and no prev/next control — `ArrowLeft`/`ArrowRight` only, which nobody discovers.

**Fix.** `.lightbox { max-height: 90svh }`, `.lightbox img { max-height: 90svh; object-fit: contain; width: auto }`. Add visible prev/next, an index counter, and carry the source `<figcaption>` into the dialog.

**Suggested command:** `/impeccable adapt`

### [P1] Form accessibility: focus ring suppressed, errors colour-only

**Why it matters.** Two independent failures on the one element that converts. `main.css:761` sets `outline: none` on focused form fields, defeating the global `:focus-visible` rule — verified with a real Tab press, computed `outline-style: none`, leaving a 0.8px border colour change at a **1.88:1 state change** (fails WCAG 2.2 SC 2.4.13). Separately, invalid fields get a `#b0432f` bottom-border and nothing else: colour-alone (fails WCAG 1.4.1), no `aria-invalid`, no `aria-describedby`, no per-field message, no focus move to the first invalid field. Three `[required]` inputs carry no required marker at all, while the optional field is the only one labelled. A keyboard or screen-reader user cannot see where they are or what they got wrong.

**Fix.** Delete the `outline: none`; let `:focus-visible` apply, or give fields a ≥2px ring at ≥3:1. Add `aria-invalid`, per-field messages wired with `aria-describedby`, focus move to first invalid, and mark the required fields rather than the optional one.

**Suggested command:** `/impeccable harden`

### [P2] Nothing on the page de-risks the purchase

**Why it matters.** `#invest` — the one section a buyer opens to reduce risk — contains four generic steps and **zero numbers**: no reservation fee, no deposit percentage, no instalment schedule, no completion quarter. Nothing addresses how a non-resident takes title in Kenya, whether funds are escrowed, or what approvals exist. Obsha Properties is named three times with no link, no history and no finished project. "Load Interactive Map" yields an OSM pin with no site photo or street context, so a buyer abroad cannot confirm the plot exists. The floor plan compounds this: toggling FLOOR PLAN yields a stylised wireframe cropped by `object-fit: cover`, with no dimensions, no scale, an unlabelled main room, an "EN-SUITE" label floating in the living area — and it is **not clickable** (`main.js:179` binds only `.amen-highlight img, .gal-item img`), so the asset an off-plan buyer needs most cannot be enlarged on any device. Directly beneath sits "Request Floor Plans", which is what the control above appears to have just delivered. Meanwhile the 6.35 MB brochure downloads freely and the form stores nothing, so the site captures **zero first-party leads** while giving away its only gated asset.

**Fix.** Put the real payment schedule (percentages + milestones) and a completion quarter into `#invest`. Add a dated construction-progress strip. Add a short "Buying from abroad" block covering title, currency, escrow and handover. Make the plan image lightbox-able with `object-fit: contain`, dimensions and a scale bar. Gate the brochure behind the form, or at minimum post the enquiry to a real endpoint.

**Suggested command:** `/impeccable clarify`

## Persona Red Flags

**Jordan (Confused First-Timer).** Two hero CTAs, neither of which says "how do I buy". Picks "Explore Residences", clicks **FLOOR PLAN** on the One Bedroom, gets a wireframe with EN-SUITE floating in the living room, no dimensions, no way to enlarge. Clicks **"Request Floor Plans"** — apparently what the toggle just did — and reaches a form where nothing marks which fields are required (three `[required]`, zero asterisks, only "(optional)" on Message). Picks **"Investment Portfolio"** because it sounds serious, and WhatsApps the sales team about a product that does not exist.

**Riley (Deliberate Stress Tester).** Reads `#invest`: four steps, no fee, no percentage, no date. Searches the developer: three mentions, no link, no history. Clicks **"Request the Brochure"** — it does not request, the `download` attribute silently pulls **6.35 MB** with no size or format disclosed. Submits via **"Send by Email"**: `main.js:320` sets `location.href = mailto:…` then unconditionally writes *"Opening your email app…"* — on a machine with no mail client, nothing happens and the interface claims success.

**Casey (Distracted Mobile User).** At 390×844 the page is **16,534px — 19.6 screens**. `#amenities` alone is **7,186px**, naming all twelve amenities twice: once as a 435px photo tile, once as an icon tile. Casey thumbs past all of it and never reaches the gallery, the film or the location. `.wa-float` sits over the form's right edge for the entire scroll. The mobile menu shows seven links and **no phone number**, on a site whose primary channel is WhatsApp. `.res-toggle button` measures **69–102 × 29.7px with 0px separation** from its neighbour and slides under the 98px sticky header the moment Casey scrolls. Also under the WCAG 2.5.8 24×24 floor: the film "Download" link at **85×15px** and footer nav at **19.5px** tall.

**Amina (diaspora buyer in Minneapolis, cannot visit — project-specific).** Every artefact that would substitute for a site visit is missing: no completion date, no construction photo, no payment schedule, no title route for a non-resident, no escrow, no approvals, no evidence Obsha has finished a building. The gallery promises *"A first look, up close"* and delivers twenty renders the footer itself labels artist's impressions. The map facade gives her an OSM pin — no street view, no plot photo — so she cannot confirm a hole in the ground exists. Her only route to a human is WhatsApp to a Kenyan number with no named agent, no stated response time, no timezone note, and **no option anywhere to book a video walkthrough** — the one thing that would actually replace visiting. The last line she reads before deciding is *"nothing is stored on this site."*

## Minor Observations

- **The scrim fails at 900px.** The horizontal ramp is anchored to a 1180px wrap; at 900 the tail of "NAIROBI" falls past the ramp's zero point onto the lit tower facade. Tuned at 1440 and 390 — the width between them is unprotected.
- **At 1366×640** (a 1366×768 laptop, very common) the hero is 765px tall and **"PRICED FROM USD 48,000" sits 74px below the fold**. The price anchor is invisible on first paint on a standard laptop.
- **Stat counters animate from 0 and are legible at wrong values** — captured mid-animation: "251 Residences / 332 Retail Shops / 1,692 sqm Supermarket". Near-miss figures on a property spec sheet read as sloppy even for 1.4s. Count only the last 20%, or drop the animation on numeric specs.
- **`content-visibility: auto` + opacity-0 `.reveal` children produce genuinely blank viewports** on fast scroll and anchor jumps — a full blank cream frame at the film/location boundary, and an olive slab where `.invest-steps` should be.
- **Hero `h1` carries `.reveal`**, so LCP cannot resolve until deferred JS runs and a 0.7s transition begins. FCP was 320 ms, so the gap is animation-gated, not network-gated. The `<noscript>` and `reduce` paths both force `opacity:1`, so only the JS-on + motion-allowed path is affected.
- **16 UI text items render at 10.24–10.88px**, below an 11px floor: the hero stat labels, the PHOTO/FLOOR PLAN tabs, the contact-row labels and every form label.
- `.res-toggle` uses `role="tablist"`/`role="tab"` with `aria-pressed` and no `tabpanel`; screen readers announce "tab" and never report which is active.
- `#876614` on `#f4f0e7` passes AA at **4.69:1 — a 0.19 margin**. Any future darkening of the cream or lightening of the gold breaks it.
- Gallery prev/next buttons sit *above* the track and scroll under the sticky header exactly when the images are in view.
- The lightbox close handler restores focus correctly, but arrowing from a gallery image into the amenity range dumps focus 4,000px up the page with no warning.
- The hero eyebrow "EASTLEIGH · NAIROBI" sits directly beneath the brand lockup and reads as part of the logo.
- `html { scroll-behavior: smooth }` across a 16,534px document makes the footer's back-to-top logo a long animated ride on mobile.

## Questions to Consider

1. If the entire amenities section were replaced with one sentence — *"a masjid, a supermarket, a medical centre and a food court, in the building"* — would a single buyer be less likely to enquire? What is the other 7,000px buying?
2. Eastleigh is a district where people buy a shop to work in and a flat to live above it. Why does the page sell a rooftop infinity pool first and a 334-shop podium third, when the shop generates the income that pays for the flat?
3. What if the primary CTA were **"Book a video walkthrough — Thursday 4pm EAT"** instead of "Book a Private Viewing"? Who is a private viewing for, if the buyer is in Minneapolis?
4. The page never says when the building will be finished. Would naming a completion quarter — even a conservative one — convert better than every render on the page combined?
5. Prices are in USD for a Kenyan asset with no KES equivalent. International credibility, or a tell that the developer is pricing for diaspora dollars? What would a currency toggle do to local trust?
6. The film is the client's own footage and arguably the most persuasive asset here. Why is it the seventh section, behind twenty static renders?
7. If "nothing is stored on this site" is literally true, how does the developer know which of the 252 residences are still available — and how does the buyer?
8. The building stacks supermarket → six floors of shops → masjid → homes → hotel. That vertical order is the product's only genuinely unusual structure, and the price list already documents it. What would the page look like if scrolling down meant going *up* the tower?
