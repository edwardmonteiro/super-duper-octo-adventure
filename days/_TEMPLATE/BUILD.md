# Day NN — Build journal (TEMPLATE)

> **For future Claude:** read root `CLAUDE.md` and the previous day's `BUILD.md` before editing this file. Replace every CAPS placeholder.

## Status
- **Built:** YYYY-MM-DD
- **State:** Draft / Complete
- **Topic (en):** TOPIC
- **Topic (pt-BR):** TÓPICO
- **XP:** NN
- **Languages:** `en`, `pt-BR`

## What this lesson teaches
1. CORE CONCEPT
2. METAPHOR / VISUAL
3. CONNECTION TO QUANTUM COMPUTING

## Playground (required)
Every day has a `<section class="playground">` between the visual and the quiz. One small interactive widget specific to this day's topic — not graded, no XP, just play. Whenever possible, reuse the day's main visual (e.g. day01 makes the atoms in the molecule clickable). Wire it up in `setupPlayground(dict)` in `lesson.js`. The shared CSS (`.playground`, `.playground-output`, `.has-content`) is already in `day01/style.css` — don't redefine it.

## File map
- `index.html`, `style.css`, `lesson.js`, `strings.json` — same conventions as day01 (see `days/day01/BUILD.md`).
- `style.css` imports day01's stylesheet by default — only override what you need.

## Day NN+1 plan — DRAFT
- **Topic:**
- **One-liner (en):**
- **One-liner (pt-BR):**
- **Visual idea:**
- **Quiz seeds:**

## How to start day NN+1
1. `cp -r days/_TEMPLATE days/dayNN+1`
2. Append entry to `days/manifest.json`.
3. Fill `strings.json`, tweak `index.html` content, update `DAY_ID` and `XP_REWARD` in `lesson.js`, customize `style.css` for the visual.
4. Rewrite this `BUILD.md` for the new day; leave a fresh DRAFT for the day after.
5. Update root `CLAUDE.md` Journey Log.
