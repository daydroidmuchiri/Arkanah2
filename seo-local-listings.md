# Local listings & entity SEO — Nomad Twin Towers

Internal. Not served (only `docs/` deploys). Companion to `brief.md`; every
figure here traces to the client's price list via `brief.md` — nothing invented.

**Goal**: the result in `reference/goal-gracehouse-knowledge-panel-2026-07-30.png`
— a Google knowledge panel with photos, map pin, reviews and Website/Directions
buttons, plus a branded organic result underneath.

**Why we want it beyond vanity**: as of 2026-07-30 Google's AI Overview for
"nomad twin towers" attributes the **NSSF Twin Towers** (60 storeys, Kenyatta
Ave/Uhuru Highway, developer NSSF) to this brand — wrong building, wrong
developer, wrong location. See
`reference/google-serp-nomad-twin-towers-2026-07-30.jpeg`. On-page schema alone
cannot fix that; Google needs the same entity corroborated off-site. Listings
are the fix.

---

## 1. The Gracehouse comparison does not transfer directly

Gracehouse Resort is an **operating hotel** — staffed, open to walk-ins, 611
reviews accumulated over years. That is the textbook eligible Google Business
Profile (GBP).

Nomad Twin Towers is an **off-plan development**: units are `PreOrder` in our
own schema and the completion date (Q4 2027) is still an unconfirmed
placeholder (`brief.md`, Missing item 3). Google's guidelines require a
location that makes in-person contact with customers during stated hours.
A building under construction, with no signage and nobody on site, is a
well-known GBP **suspension** trigger — and a suspended profile is materially
harder to recover than one never created. Do not point a GBP at the
construction site and hope.

### The structure that is both legitimate and effective

| Entity | Vehicle | Gets you |
|---|---|---|
| **Obsha Properties** (the developer) | GBP at its **staffed office** | The Gracehouse-style panel, Maps pin, reviews, Directions |
| **Nomad Twin Towers** (the development) | Portal listings + social + `sameAs` | Brand SERP, entity disambiguation, referral traffic |

The development inherits credibility from the developer's verified profile.
If — and only if — the client runs a **staffed site sales office** with
signage, that office is independently eligible for its own GBP under the
`Real estate agency` category, and that is the one legitimate route to a Maps
pin for the tower itself before completion.

---

## 2. Canonical NAP — single source of truth

Name, Address, Phone must be **byte-identical everywhere**. Inconsistent NAP is
the single most common reason local entities fail to consolidate. Copy from
here; do not retype.

```
Development name : Nomad Twin Towers
Developer        : Obsha Properties
Sales phone      : +254 711 111 188        (price-list confirmed)
Sales email      : sales@nomadtwintowers.com   (live via Cloudflare Email Routing)
Website          : https://nomadtwintowers.com/
Locality         : Eastleigh, Nairobi
Region           : Nairobi
Postal code      : 00610
Country          : KE
Map pin          : -1.280676, 36.848874   (client-supplied; Timboroa Street,
                                           California ward, Kamukunji)
Street address   : ⚠ UNCONFIRMED — see §6
```

Write the phone in **international format** (`+254 711 111 188`) on every
platform. Note the site's own WhatsApp deep link is derived from this number in
`docs/js/main.js` — if the sales line ever changes, that is the single place to
edit.

---

## 3. GBP field values — ready to paste

For the **Obsha Properties** profile. Fill the address from §6 once confirmed.

- **Business name**: `Obsha Properties` — the legal/trading name only. Do **not**
  append keywords ("Obsha Properties | Luxury Apartments Eastleigh"). Keyword
  stuffing the name is a guideline violation and a common suspension cause.
- **Primary category**: `Real estate developer`
- **Secondary categories**: `Real estate agency`, `Apartment building`
- **Description** (750 char limit; this is 512):

> Obsha Properties is a Nairobi real estate developer building in Eastleigh
> under the promise "Building Value. Creating Futures." Its current
> development, Nomad Twin Towers, is a mixed-use address on the Eastleigh
> skyline: 252 one- and two-bedroom residences above a retail podium, a
> 1,701 sqm supermarket, hotel suites and a rooftop infinity pool. Residences
> are priced from USD 48,000 and retail units from USD 25,000. Enquiries and
> private viewings by appointment.

- **Hours**: get from client. Eastleigh trades Sat; many businesses close
  Fri midday for prayers. Ask rather than assume — wrong hours generate
  "permanently closed" user edits.
- **Attributes**: `Appointment required`, `Wheelchair accessible entrance`
  (only if true), `Onsite services`
- **Products**: add three —
  `One Bedroom Apartment — 60 sqm — from USD 48,000`,
  `Two Bedroom Apartment — 100 sqm — from USD 70,000` and
  `Retail Unit — from USD 25,000`
- **Website**: `https://nomadtwintowers.com/` (until Obsha has a live site of
  its own — see §6)

### Photos

Upload **10–15 minimum**; profiles with real photography outrank sparse ones and
Gracehouse's panel is carried by its photo pack. Everything in
`docs/assets/` is client-supplied render or photography and is cleared for use:

`front-view.jpg` (set as cover), `drama-shot.jpg`, `birds-eye-view.jpg`,
`1-br-living-room.jpg`, `2-br-living-room.jpg`, `bedroom.jpg`, `kitchen.jpg`,
`master-bathroom.jpg`, `pool-closeup.jpg`, `gym-and-wellness.jpg`,
`sky-lounge-terrace.jpg`, `restaurant-main.jpg`, `retail-02.jpg`,
`drop-off.jpg`, `street-view-01.jpg`, `street-view-02.jpg`

Use the full-size `.jpg` (1600px), not the `-800`/`-1200` responsive variants.
For the profile logo use the client's official lockup —
`reference/logo-official-2026-08-01.jpeg`, which is navy on white and so suits a
profile card directly. **Not** `docs/assets/logo-lockup-light.png`: that one is
recoloured cream for this site's dark header and would vanish on a white
profile. (`logo-mark.png`, named here until 2026-08-01, was our in-house
monogram and is deleted.) One caveat carried from `brief.md`:
`pool-closeup.jpg` shows what reads as a cocktail glass, and the 4th floor has
a **masjid** — check with the client before it goes on a public profile.

### Verification

Video verification is now the default and the likely path here. Have ready, in
one unbroken recording: exterior signage showing "Obsha Properties", the office
interior, and proof of management (business permit, lease, or branded
letterhead). If the profile is created without signage present it will fail.

**Ownership**: create the GBP under a **client-owned Google account**, then add
the agency as `Manager`. Do not create it on an agency account intending to
transfer later — that is the same handover trap already flagged for the domain
in `brief.md` (registered to the agency, ICANN 60-day transfer lock).

---

## 4. Property portals — Kenya

Off-plan listings are completely normal on these; unlike GBP there is no
"must be operating" problem. Priority order by domain authority and by how much
Kenyan buyers actually use them:

| Portal | Notes |
|---|---|
| **BuyRentKenya** (`buyrentkenya.com`) | Highest authority, strongest referral traffic. Developer/agency account, paid packages. Start here. |
| **Property24 Kenya** (`property24.co.ke`) | Second. Agency account required. |
| **Kenya Property Centre** (`kenyapropertycentre.com`) | Accepts developer listings; cheaper tier. |
| **Jiji Kenya** (`jiji.co.ke`) | Free, high traffic, low trust. Worth it purely as a corroborating citation. |
| **Hauzisha**, **Trovit/Mitula** (aggregators) | Mostly syndicate from the above; no direct effort needed. |

Two things to check before paying: several Kenyan portals require an **Estate
Agents Registration Board (EARB)** registration for agency accounts — confirm
whether Obsha lists as a *developer* (usually exempt) or needs an agent to
front it. And ask each portal for a **`dofollow`** link to
`nomadtwintowers.com`; many default to `nofollow`, which still corroborates the
entity but passes no authority.

Listing copy: reuse the §3 description and the §5 claim list. Every listing must
carry the same NAP from §2 and link to `https://nomadtwintowers.com/`.

---

## 5. What may and may not be claimed

Portals invite embellishment. This list is the boundary — it mirrors the
removals already made to the live site (`brief.md`, Missing item 11).

**Confirmed, safe to use**: 252 residences · 1BR 60 sqm from USD 48,000 · 2BR
100 sqm from USD 70,000 · retail units from USD 25,000 · 334 shops · 60 hotel
rooms · 105 parking bays
(52+53) · 1,701 sqm supermarket · masjid on the 4th floor · programmed floors
B3–B1 parking/supermarket, Ground–6th retail, 7th–18th residential, 19th–20th
hotel · rooftop infinity pool · sky gym & spa · residents' lounge · restaurant
· 24/7 security · Eastleigh, Nairobi · developer Obsha Properties.

**Do NOT claim** — all previously removed as unverifiable: any total storey
count (the price list itemises only 24 floors of programmed space; "34
Storeys" was withdrawn) · a floor number for the pool · KES payment-plan
figures (500,000 reservation / 20% deposit / quarterly instalments / 10%
handover) · Technogym, "heated" pool, solar power, biometric access, smart-home
or fibre claims, EV charging, co-working, private dining · rental or
tenant-placement management · drive times in minutes · the restaurant's name
("Alacat Hotel Restaurant" is in the price list but not tied to the photo we
use) · any completion date (Q4 2027 remains a placeholder) · NCA number,
county approvals or title status.

Note the price list contradicts itself on residential floors — "18" total vs
"7TH–18TH" (12 floors). Do not pick one; it is an open client question.

---

## 6. Blockers — what to get from the client

1. **Obsha Properties' office street address.** Required for GBP. The
   development's own street address is separately unconfirmed (`brief.md`:
   the pin is on Timboroa Street, BBS Mall is on General Waruingi Street
   260 m away) which is why `docs/index.html` JSON-LD deliberately carries
   **no** `streetAddress`. Do not guess either one — a wrong GBP address
   fails verification.
2. **Is there a staffed site sales office?** Decides whether the tower itself
   can have its own GBP before completion (§1).
3. **Business hours**, including Friday.
4. **Existing profiles to claim rather than duplicate.** A search on
   2026-07-30 surfaced two Facebook pages — `Obsha-Properties-100086899832502`
   and `Obsha-Properties-Limited-100090740133882` — which look like
   duplicates of each other. Both returned `302` to a login wall, so their
   contents are unverified. Ask the client which is theirs; merge or delete
   the other. **Duplicate profiles get merged or suspended, so claim before
   creating.** Also ask whether a GBP already exists.
5. **`obshaproperties.com` is not registered — act on this.** Checked
   2026-07-30 after Daniel reported the site was "down". It is not down; the
   domain does not exist. NXDOMAIN at both 1.1.1.1 and 8.8.8.8, **no NS
   records, no SOA**, and RDAP at Verisign — the registry of record for
   `.com` — returns **404**, which means unregistered and available to buy.
   A site that is merely down still resolves in DNS and fails at the HTTP
   layer; this fails a step earlier.

   Two consequences, one of them time-sensitive:
   - **Anyone can register it**, including someone impersonating the developer
     to intercept buyer enquiries on a project selling USD 48,000+ units. For
     roughly USD 10/yr at Cloudflare Registrar — the same place
     `nomadtwintowers.com` sits — that risk closes. Worth raising with the
     client today rather than at handover.
   - It is why `Organization.url` was removed rather than repointed (§7).
     Once the domain is live again, put it back.
6. **Obsha logo asset** — still none on file. Note this is now the *only*
   outstanding logo: the client sent the official **Nomad Twin Towers** lockup
   on 2026-08-01 (`reference/logo-official-2026-08-01.jpeg`), which is what the
   site and its favicons are built from. **Obsha Properties**, the developer, is
   a separate brand and still has no asset — it is text-credited only.
7. **Social profiles**: do Instagram / TikTok / LinkedIn exist? Instagram and
   TikTok matter disproportionately in this market.

---

## 7. On-site work, once URLs exist

Currently `sameAs` appears **zero times** in `docs/index.html`. Once §6.4/§6.7
resolve, add it to both the `ApartmentComplex` and `Organization` nodes,
listing every confirmed profile — GBP (its Maps share URL), Facebook,
Instagram, LinkedIn, and each portal listing. `sameAs` is the explicit
machine-readable statement "these all denote the same entity", and it is the
strongest on-site lever available against the NSSF Twin Towers confusion.

**Done 2026-07-30**: the `Organization` node for Obsha Properties carried
`"url": "https://nomadtwintowers.com/"` — the development's URL, not the
developer's — which conflated exactly the two entities Google is already
confusing. The property was **removed** rather than repointed, because per
§6.5 there is currently no correct URL to point at. Omitting an unknown beats
asserting a wrong one. `WebSite.publisher` still resolves to the node, so the
developer↔site relationship survives. **Put `url` back the day
`obshaproperties.com` resolves.**

Finally, **the favicon fix shipped 2026-07-30** (`f59f9b3`) but Google
re-crawls icons on its own schedule — the default globe in results is expected
to persist for days to weeks. Gracehouse shows its own icon because that
profile is years old. Do not re-fix it.
