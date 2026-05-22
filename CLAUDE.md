# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Behavioral guidelines adapted from [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) — distilled from Andrej Karpathy's observations on common LLM coding pitfalls. Project-specific notes follow below.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

---

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them — don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it — don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

---

## Project: Quantum Journey

A static, bilingual (English + Portuguese Brazil), Duolingo-style micro-course. The user studies ~15 min/day from classical physics → advanced quantum computing and adds one new day at a time. Future Claude sessions help author and ship each day.

**The user has no prior physics background.** Day 01 starts at the absolute basics (atoms). Don't assume any vocabulary — every new term must be introduced with a concrete example before being used.

### Curriculum arc (rough)

| Phase | Days        | Theme                                                                                     |
|-------|-------------|-------------------------------------------------------------------------------------------|
| 1     | 01–10       | Classical foundations: atoms → motion → forces → energy → waves/light → heat → e&m → "the puzzle" |
| 2     | 11–25       | Quantum weirdness: the quantum → duality → superposition → uncertainty → entanglement     |
| 3     | 26+         | Quantum computing: bit → qubit → gates → circuits → algorithms (Deutsch, Grover, Shor)    |

The phases are flexible — the user drives pace. Each new day's `BUILD.md` proposes the next day in DRAFT; the user confirms the topic before scaffolding.

### Stack

- **HTML5 + CSS3 + vanilla JS modules.** No bundler. No framework. No npm.
- **Hosting:** GitHub Pages, deploy from `main` at root (`/`). No build step.
- **i18n:** per-day `strings.json` keyed by `data-i18n` attributes; shell strings live in `assets/shell.js`.
- **3D visuals:** pure CSS3 isometric (`transform: perspective / rotateX / rotateZ`) for now. Three.js may be added later only on days that genuinely need it (e.g. Bloch sphere). Don't add it preemptively.
- **State:** `localStorage` under key `quantum-journey:state` — `{xp, streak, completed[], lang, lastVisit}`.

### Run locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

`file://` won't work — the shell uses `fetch()` to load `days/manifest.json`.

### Architecture: micro-frontend via iframe shell

```
/
├── index.html              shell (sticky header, day grid, modal)
├── assets/
│   ├── style.css           shared design tokens + landing styles
│   └── shell.js            manifest loader, state, lang toggle, modal orchestration
├── days/
│   ├── manifest.json       ordered list of days; the shell renders the grid from this
│   ├── _TEMPLATE/          copy-paste seed for new days
│   ├── _drafts/            lessons drafted ahead of their phase (not in manifest)
│   └── dayNN/
│       ├── index.html      lesson markup, data-i18n keys
│       ├── style.css       per-day styling (usually `@import` of day01 + overrides)
│       ├── lesson.js       quiz logic; posts results to parent
│       ├── strings.json    {en, "pt-BR"} translations
│       └── BUILD.md        immortality breadcrumb (see below)
```

**Shell ↔ day contract:**
- Shell opens `./days/<id>/index.html?lang=<en|pt-BR>` inside a `<dialog>` iframe.
- Day posts to parent on completion:
  - `parent.postMessage({type:'lesson:complete', dayId, xp}, '*')`
  - then `parent.postMessage({type:'lesson:close'}, '*')` to dismiss the modal.
- Shell updates state (XP, streak, completed) on receipt.

Days are fully self-contained. Editing one day cannot break another. That is the point of the iframe.

### Daily authoring ritual (every new day)

1. `cp -r days/_TEMPLATE days/dayNN`
2. Set `DAY_ID` and `XP_REWARD` in `lesson.js`.
3. Translate every visible string into BOTH `en` and `pt-BR` in `strings.json`. No raw English in HTML except placeholders that `data-i18n` overrides at load.
4. Append a manifest entry to `days/manifest.json`:
   ```json
   {
     "id": "dayNN",
     "title": { "en": "...", "pt-BR": "..." },
     "topic": { "en": "...", "pt-BR": "..." },
     "xp": 10
   }
   ```
5. Write `days/dayNN/BUILD.md` (use the template). Include a DRAFT plan for `dayNN+1`.
6. Update the **Journey Log** below.
7. Commit with a clear message; push to the active branch.

### Lesson shape (the 15-min Duolingo unit)

- 1 concept
- 1 visual (CSS isometric)
- 3–5 interactive checks (MCQ, true/false, or fill-in)
- 1 next-day teaser
- XP reward on completion

Keep concepts tight. Each day should bridge the previous one to the next in a single, named idea.

### Conventions

- Every visible string must exist in both `en` and `pt-BR` in `strings.json`. Hard-coded English in markup is a bug.
- Quiz attributes:
  - MCQ / true-false: `<article class="q" data-correct="<idx>">`, buttons with `data-idx`.
  - Fill-in: `<article class="q fill" data-correct="<en>" data-correct-pt="<pt-BR>">`.
- Design tokens live in `/assets/style.css` `:root`. Day stylesheets reuse them — don't redefine palette colors per day.
- Modern icons: inline SVG only. No icon-font dependency.
- No third-party JS unless a day genuinely requires it.

### Immortality system

Memory does not survive across sessions. To work around that:
- **Root `CLAUDE.md` (this file)** is the entry point — read first, every session.
- **`days/dayNN/BUILD.md`** records what was built that day, why, file conventions, and a DRAFT plan for the next day.
- **Journey Log** below is the index — keep it in sync as days ship.

When the user says "let's continue" or "ship today's day", the correct first action is:
1. Read this file.
2. Read the most recent day's `BUILD.md`.
3. Look at the DRAFT for the next day to find the planned topic.
4. Confirm the topic with the user (one short sentence) before scaffolding.

### Journey Log

| Day  | Date       | Topic (en)                       | Topic (pt-BR)                  | XP | Status   |
|------|------------|----------------------------------|--------------------------------|----|----------|
| 01   | 2026-05-22 | Everything is made of pieces     | Tudo é feito de pedacinhos     | 10 | Complete |
| 02   | —          | Motion (draft)                   | Movimento (rascunho)           | —  | Planned  |

**Drafts (out of phase, parked in `days/_drafts/`):**
- `quantum-intro/` — "What is a 'quantum'?" — built early before we realized the user needed a true zero-knowledge entry. Promote to ~day 11 when the curriculum actually reaches the quantum threshold.

### Verification checklist (before committing a new day)

- [ ] `python3 -m http.server` + open `localhost:8000` — landing renders.
- [ ] New day's tile appears in the grid.
- [ ] Click the tile — modal opens with the lesson.
- [ ] Toggle EN ↔ PT-BR — every string swaps; no English left in pt-BR mode.
- [ ] Complete all checks — Finish button activates.
- [ ] Click Finish — XP increments, streak still correct, tile shows the green completion dot, modal closes.
- [ ] Reload the page — state persists.

## Branching

Active development branch: `claude/claude-md-docs-pFM4g`. Default branch: `main`.
