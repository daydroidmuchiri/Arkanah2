# Automated Review Report

Generated: 2026-07-15T17:22:39.056Z
Site type: hand-built static (adapted checks — no site.config.mjs/dist)
Pages checked: 1

## Failures
- ✗ index.html: leftover placeholder/demo text found

**Disposition:** known open item, not a defect. The only match is the
intentional HTML comment at `index.html:13` marking the domain as a
placeholder pending client confirmation (brief.md Missing item 8). It is
kept deliberately so the placeholder domain cannot be forgotten at deploy
time. All other automated checks passed: local + relative refs, srcset
entries, CSS url() refs, canonical host, exactly one h1, title, favicon,
wa.me link.

Checks were run with an adapted runner (this is a hand-built static site —
no `site.config.mjs`/`dist`): same `checkPage` logic as
`packages/pipeline/src/review-checks.mjs`, extended to relative refs,
srcset and CSS url() references.

## Judgment review

Read `index.html` in full against `brief.md` (2026-07-15).

**Passes:**
- Copy matches the brief: 34 storeys, 138 residences, 1–3BR, off-plan from
  KES 9.8M, Q4 2027 completion — all consistent between hero, stats and
  residence cards, and all flagged in the brief as placeholder figures
  pending confirmation.
- Tone is quiet-luxury, English only, as briefed.
- Image/alt pairings all correct and match the brief's imagery table
  (hero sunset, podium entrance, four gallery renders, in-house plan SVGs).
- No demo/template remains (hand-built site; in-house monogram as briefed).
- Off-plan disclaimer present in footer ("Artist's impressions.
  Specifications may change without notice.").
- JSON-LD carries no placeholder tel/email; WhatsApp greeting matches brief.

**Findings (no site changes made; added to brief.md Missing item 11):**
1. Drafted claims that go beyond the brief's enumerated placeholders and
   need explicit client confirmation before launch: payment plan terms
   (KES 500,000 refundable reservation, 20% deposit, quarterly interest-free
   instalments, 10% on handover), Technogym brand, heated pool,
   solar-assisted common areas, biometric lobby access, rental/tenant-
   placement offering, "Westlands remains Nairobi's strongest rental
   market", location drive times (3/4/5/10/35 min). These follow the
   agreed placeholder-pending-confirmation approach, but they are now
   itemised so the client chase message covers them.
2. Standing open items unchanged: name dispute ("Nomad Towers" vs renders'
   "Nomad Twin Tower & Hotel"), placeholder contact details and domain,
   missing interior renders, map coordinates, developer credibility
   content (brief.md Missing items 1–10).

**Gate 2 status:** report ready for Muchiri. Note gate 1 (brief approval)
is also still open — both can be reviewed together since the brief change
above only extends the confirmation list.
