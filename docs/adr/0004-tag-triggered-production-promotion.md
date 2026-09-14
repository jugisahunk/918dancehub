---
status: accepted
---

# Production deploys are promoted by tag, not by pushing to `main`

`main` is trunk-based: every commit deploys automatically to GitHub Pages (staging). Production no longer deploys on every `main` push — instead, a `workflow_dispatch` "Promote to Production" GitHub Actions workflow tags the chosen commit (`prod-YYYY-MM-DD[-n]`, defaulting to `main`'s tip but accepting an older ref/tag for rollback) and runs `wrangler deploy` against that snapshot. This replaces Cloudflare Workers Builds' own dashboard git-integration auto-deploy (set up in #15/ADR-0003), which is being disabled to avoid two systems racing to deploy the same push.

Two follow-on consequences, both because the build now runs in GitHub Actions instead of Cloudflare's own CI:
- `astro.config.mjs` and `Layout.astro` switch their production check from `WORKERS_CI` (Cloudflare-set) to an explicit `PUBLIC_PRODUCTION=true` build env var, set by the promote workflow — mirroring the existing `PUBLIC_STAGING` convention.
- `PUBLIC_FORMSPREE_FORM_ID` and `PUBLIC_CF_BEACON_TOKEN`, previously configured directly in the Cloudflare Worker's dashboard settings, move to GitHub (secrets/vars on a `production` Environment, scoping the Cloudflare API token alongside them). Staging and production also get **separate** Formspree forms, so a test Inquiry submitted against staging can no longer land in Christina's real inbox.

No required-reviewer approval gate on the promote workflow — clicking "Run workflow" is the whole gate, appropriate for a single-owner project. Rollback is dashboard rollback for immediate mitigation, followed by re-running the promote workflow against the last-good tag so the tag history and what's actually live don't drift apart.
