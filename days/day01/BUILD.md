# Day 01 — Build journal

> **For future Claude:** read root `CLAUDE.md` and this file before editing. They are the memory bridge between sessions.

## Status
- **Built:** 2026-05-22 (revised to be true zero-knowledge after user feedback)
- **State:** Complete
- **Topic (en):** Everything is made of pieces — atoms & molecules
- **Topic (pt-BR):** Tudo é feito de pedacinhos — átomos & moléculas
- **XP:** 10
- **Languages:** `en`, `pt-BR`

## Why this topic
The user has no physics background and asked for the most basic possible entry. Atoms are concrete, visual, and the foundation everything else in the course will build on (motion, energy, electromagnetism, then quantum). The previously-built "What is a 'quantum'?" lesson was archived to `days/_drafts/quantum-intro/` — it's reserved for ~day 11 when the course actually reaches the quantum threshold.

## What this lesson teaches
1. Everything visible is made of atoms.
2. Scale: ~5 million atoms across a hair.
3. Only ~100 kinds of atoms (the elements).
4. Atoms combine into molecules — water (H₂O) is the canonical example.

## Visual
Inline SVG of a water molecule (one oxygen, two hydrogens, two bonds), tilted with CSS `perspective + rotateX + rotateZ` for an isometric feel. Radial gradients give the spheres a soft 3D look. No JS, no Three.js.

## File map
- `index.html` — markup; every visible string keyed via `data-i18n` / `data-i18n-placeholder`
- `style.css` — local styles + design tokens (matches `/assets/style.css`)
- `lesson.js` — quiz logic; posts `{type:'lesson:complete',dayId,xp}` then `{type:'lesson:close'}`
- `strings.json` — `{en, "pt-BR"}` translations

## Day 02 plan — DRAFT (user authors content; Claude scaffolds)
- **Topic:** Movimento / Motion. Position, speed.
- **One-liner (en):** "Everything in the universe is either sitting still or moving. Let's measure it."
- **One-liner (pt-BR):** "Tudo no universo está parado ou se mexendo. Vamos medir isso."
- **Visual idea:** isometric track with a ball; small ticks for position; the ball slides along it; a tiny "speedometer-ish" badge nearby.
- **Concept beats:**
  1. Position = where something is.
  2. Speed = how fast position changes.
  3. Reference: motion is always *relative* to something else (you're "still" in a car, but moving relative to the road).
- **Quiz seeds:**
  - MCQ: "If a car moves 60 km in 1 hour, its speed is..." → 60 km/h
  - True/false: "An object that isn't moving has speed = 0." → true
  - Fill: "Speed = ___ ÷ time." → distance / distância

## How to start day 02
1. `cp -r days/_TEMPLATE days/day02`
2. Append `day02` entry to `days/manifest.json`.
3. Fill `strings.json` (both languages), update `index.html` content, set `DAY_ID = 'day02'` and `XP_REWARD` in `lesson.js`, design the motion visual in `style.css`.
4. Rewrite this `BUILD.md` for day02 with a fresh DRAFT for day03 (forças / forces).
5. Update the Journey Log in root `CLAUDE.md`.
