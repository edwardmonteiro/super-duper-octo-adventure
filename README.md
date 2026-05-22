# super-duper-octo-adventure

**Quantum Journey** — 15 minutes a day, from classical physics to quantum computing.
**Jornada Quântica** — 15 minutos por dia, da física clássica à computação quântica.

A static, GitHub-Pages-friendly micro-frontend course. Each day lives in its own folder under `days/dayNN/` as a self-contained mini-app (HTML + CSS + JS) and is loaded by the root shell in an iframe. Bilingual: English and Portuguese (Brazil).

## Run locally

The shell uses `fetch()` for the day manifest, so file:// won't work. Serve over HTTP:

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy

GitHub Pages → settings → Pages → deploy from `main`, root (`/`). No build step.

## Add a new day

See `days/_TEMPLATE/BUILD.md` and the root `CLAUDE.md`.
