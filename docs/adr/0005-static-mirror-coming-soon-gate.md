---
status: accepted
---

# Coming Soon Gate is a static build-time mirror, not an edge Worker check

DNS needs to point at production ([#11](https://github.com/jugisahunk/918dancehub/issues/11)) before Site Launch (2026-09-26), to get Search Console/SEO verification done early — but the real site can't be publicly visible the moment that happens. Research ([#32](https://github.com/jugisahunk/918dancehub/issues/32)) confirmed the Cloudflare Worker production deploy (ADR-0003) can run custom edge logic, so a cookie- or query-param-gated Worker check was a real option: keep one build, branch at the edge on a secret cookie/param to decide whether a request sees the real site or a splash.

That option is rejected in favor of a **static mirror**: a single build-time flag (`COMING_SOON_GATE`, `src/data/gate.ts`) decides, at build time, whether `/` serves a minimal splash or the real homepage. The real site keeps building, unchanged, under a secret path segment (`/wooshywooshy/…`, [#39](https://github.com/jugisahunk/918dancehub/issues/39)) so Christina and the dev can still reach it while gated.

## Why not the edge-Worker approach

GitHub Pages staging (ADR-0001) has no server-side capability at all — a cookie/query-param check there could only run client-side. That means the secret value *and* the real page content would both have to ship inside the static bundle regardless of gate state, for the client script to decide what to show. The "full replacement" the gate is meant to guarantee — an ungated visitor's browser never receives the real content at all — would be quietly defeated on the one pipeline (staging) that exists specifically to be checked before production.

A Worker-only edge check would also mean staging and production diverge in *how* the gate works, not just where it's deployed — one flag no longer moves both pipelines identically, which the spec ([#37](https://github.com/jugisahunk/918dancehub/issues/37)) requires.

## Why the static mirror

- Works identically, with no new code, on both GitHub Pages (fully static) and the Cloudflare Worker (static-assets, ADR-0003) — one mechanism, not two.
- A gated visitor's browser genuinely never receives the real page's markup, data, or JSON-LD — there's nothing to leak by inspecting the response.
- Needs no new server-side runtime, database, or edge script — keeps the project's static-site simplicity (ADR-0001, ADR-0003, ADR-0004).
- The flag being a plain `.ts` module (not an env var) means both the Astro static build and the later Worker script that will read the same secret path ([#39](https://github.com/jugisahunk/918dancehub/issues/39)) import one source of truth — Astro's env-var system doesn't reach a separately-bundled Worker script, but a plain import does.

## Trade-off accepted

Every gated build ships two full copies of the real site's HTML/CSS/JS in `dist/` (root splash + secret-path mirror) instead of one. For a small static site this costs a slightly larger build output and one extra secret-path build step — negligible against the alternative of a mechanism that only half-hides the real content on staging.

## Considered Options

- **Edge Worker cookie/query-param check** ([#32](https://github.com/jugisahunk/918dancehub/issues/32)) — rejected: doesn't reach GitHub Pages at all, so it can't be the one mechanism for both pipelines the spec requires; a client-side fallback there would ship the real content into every visitor's browser regardless of gate state.
- **Runtime dashboard toggle (Cloudflare/GitHub Actions variable)** — rejected in the spec itself ([#37](https://github.com/jugisahunk/918dancehub/issues/37)): a toggle that lives outside source control isn't a single, one-commit-moves-both-pipelines change, and it's a second place (besides the repo) the dev would need to remember to flip.
