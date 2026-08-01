# Hero scrim — how the numbers were arrived at

Internal. Not served (lives outside `docs/`).

The hero is the one place on the site where text sits on a photograph instead of
a flat colour, so its contrast cannot be read off the palette — it depends on
which pixels of the render happen to be behind which line of type, at which
viewport. `--hero-scrim` in `docs/css/main.css` is set from measurement. This is
the method, and the script that does it.

## Why not just eyeball it

Every value in the scrim was wrong at least once, and never in a way that was
visible at the size it was tuned at:

| Symptom | Cause |
| --- | --- |
| Copy legible at 390×844, washed out at 375×667 | Percentage stops. The copy block is a fixed ~643px on both, which is 67% of one viewport and 84% of the other. |
| Eyebrow passed at 1440, failed at 1920 | Same thing sideways. The wrap stops growing at 1180px, so it drifts toward the middle of the frame as the screen widens, out from under a viewport-proportional side ramp. |
| Eyebrow "failing" at 2560 by every measurement | Measurement bug, not a real failure — see below. |

The stops are therefore in **pixels** (vertical) and **`calc(50% ± px)`**
(horizontal, anchored to the wrap's own edges). Only things that scale with the
viewport get percentages, and nothing in the hero does.

## The measurement bug worth knowing about

Sample the *element box* and you get the wrong answer. `.hero .eyebrow` is a
grid item, so its box stretches the full 1180px wrap while its glyphs occupy the
left ~240px — the average pulls in bright sky the text never touches. At 2560 it
read 4.11:1 against a real value of 6.50:1, and chasing it cost the render about
0.15 alpha of unnecessary scrim before the artefact was spotted.

Sample the **text runs** (`Range.getClientRects()` per text node), not the box.

## Running it

Serve the site (`npx serve docs`), open it at the viewport you care about, and
paste `hero-scrim-audit.js` into the console. It:

1. redraws the hero render into a canvas at the same `object-fit: cover`
   mapping and through the same CSS `filter`, so sampled pixels match the screen;
2. parses the live `::after` gradient — every layer, any angle, `%`/`px`/`calc`
   — into an alpha-at-(x, y) function, so it always reads what the CSS actually
   says rather than a copy that can drift;
3. composites the two and reports the measured ratio per line against the WCAG
   AA threshold for that line's size and weight.

Report `mean` as the result. `worst px` is the single brightest pixel under the
text (usually one lit window); it is useful for spotting a headline sitting
across a hard specular highlight, but holding every line to it would mean a
scrim heavy enough to flatten the render, which is the opposite of the brief.

## Current state (2026-08-01)

Lowest measured ratio in the hero, all lines passing at every width checked:

| Viewport | Lowest | Binding line |
| --- | --- | --- |
| 320×568 | pass | — (hero copy runs below the fold here; see README) |
| 375×667 | 5.57 | eyebrow |
| 390×844 | 5.56 | serif accent |
| 622×900 | 5.60 | eyebrow |
| 768×1024 | 4.96 | eyebrow |
| 1440×900 | 5.48 | eyebrow |
| 1920×1080 | 5.06 | eyebrow |
| 2560×1440 | ~6.5 | eyebrow |

The eyebrow is the binding constraint nearly everywhere: 11.5px, and it sits at
the top of the copy block where the scrim has almost run out. It is why the hero
eyebrow is `#f1d5a2` rather than `--gold` — see the comment on that rule.

Re-run the audit if the hero copy, its type scale, or the render changes.
