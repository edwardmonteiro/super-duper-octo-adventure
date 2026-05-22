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

## Repository Status

This repository is a fresh scaffold. As of this writing it contains only:

- `README.md` — a single-line description in Portuguese: "Física quantica divertida" ("Fun quantum physics"). Suggests the intended topic/theme but no scope or stack is committed yet.
- `LICENSE` — Apache License 2.0.

There is **no source code, build system, package manifest, test suite, or CI configuration** yet. Build/test/lint/architecture sections don't apply until code is added — do not invent commands or describe an architecture that does not exist.

Applying the principles above to this state:

- **Think before coding:** When asked to add the first code, ask which language/stack the user wants. The physics theme is compatible with many (Python + Jupyter, JavaScript + a visualization lib, etc.) — don't pick silently.
- **Surgical changes:** Once a stack is scaffolded, **replace this "Repository Status" section** with real build/run/test commands and an architecture overview. Don't leave it claiming the repo is empty after code lands.

## Branching

Active documentation branch: `claude/claude-md-docs-pFM4g`. Default branch: `main`.
