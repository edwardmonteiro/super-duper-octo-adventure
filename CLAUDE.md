# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Status

This repository is a fresh scaffold. As of this writing it contains only:

- `README.md` — a single-line description in Portuguese: "Física quantica divertida" ("Fun quantum physics"). Suggests the intended topic/theme but no scope or stack is committed yet.
- `LICENSE` — Apache License 2.0.

There is **no source code, build system, package manifest, test suite, or CI configuration** in the repo yet. Standard sections like "Build", "Test", "Lint", and "Architecture" do not apply until code is added — do not invent commands or describe an architecture that does not exist.

## Working in this repo

- When the user asks you to add the first code, **ask which language/stack they want** (the README's theme — physics — is compatible with many: Python + Jupyter, JavaScript + a visualization lib, etc.) rather than guessing.
- Once a stack is chosen and scaffolded, **update this file** with the real build/test/run commands and a real architecture overview. Replace this "Repository Status" section — don't leave it claiming the repo is empty after code lands.

## Branching

Active development branch for documentation work: `claude/claude-md-docs-pFM4g`. The default branch is `main`.
