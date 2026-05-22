# Day 01 — Build journal

> **For future Claude:** before doing anything in this folder, read the root `CLAUDE.md` and this file. They are the memory bridge between sessions.

## Status
- **Built:** 2026-05-22
- **State:** Complete
- **Topic (en):** What is a 'quantum'? — discrete energy
- **Topic (pt-BR):** O que é um 'quantum'? — energia discreta
- **XP:** 10
- **Languages:** `en`, `pt-BR`

## What this lesson teaches
1. Planck (1900): energy is not continuous.
2. Staircase-vs-ramp metaphor (CSS isometric, no JS 3D).
3. Photon = quantum of light → foreshadows qubit = quantum of information.

## File map
- `index.html` — markup; every visible string hooks into `strings.json` via `data-i18n` / `data-i18n-placeholder`
- `style.css` — local styles; shares the design tokens from `/assets/style.css`
- `lesson.js` — quiz logic; posts `{type:'lesson:complete',dayId,xp}` to parent on completion, then `{type:'lesson:close'}` to dismiss the modal
- `strings.json` — `{en, "pt-BR"}` translations

## Authoring conventions (followed here — keep for every future day)
- Every visible string lives in `strings.json` under BOTH `en` and `pt-BR`. No hard-coded English in HTML.
- HTML attributes: `data-i18n="<key>"` for content, `data-i18n-placeholder="<key>"` for inputs.
- Inline HTML inside string values (`<strong>`, `<em>`) is allowed; lesson.js uses `.innerHTML`.
- Quiz items:
  - MCQ / true-false: `<article class="q" data-correct="<idx>">` + buttons with `data-idx`.
  - Fill-in-the-blank: `<article class="q fill" data-correct="<en>" data-correct-pt="<pt-BR>">` + a single `<input>` + `<button class="check">`.
- On finish: `parent.postMessage({type:'lesson:complete',dayId:'dayNN',xp:N}, '*')`, then `parent.postMessage({type:'lesson:close'}, '*')` after a short delay.
- Length target: ~15 min — 1 concept, 1 visual, 3–5 checks, 1 teaser for tomorrow.

## Day 02 plan — DRAFT (user authors content)
- **Topic:** Superposition.
- **One-liner (en):** "Both / and, not either / or."
- **One-liner (pt-BR):** "E / e, não ou / ou."
- **Visual idea:** isometric arrow with two semi-transparent copies along orthogonal axes; on click ("measure") they collapse to one.
- **Quiz seeds:**
  - MCQ: "Superposition means a qubit is...": (only 0 / only 1 / a mix of both until measured)
  - True/false: "Measuring keeps the qubit in superposition." → false
  - Fill: "A qubit in superposition collapses when ___." → measured / medido

## How to start day 02
1. `cp -r days/_TEMPLATE days/day02`
2. Append a `day02` entry to `days/manifest.json` (id, topic, xp).
3. Replace `_TEMPLATE` placeholders in `index.html`, `style.css`, `lesson.js`, `strings.json`.
4. Rewrite `days/day02/BUILD.md` with the real journal for day 02 and a fresh DRAFT for day 03.
5. Update the **Journey Log** table in root `CLAUDE.md`.
