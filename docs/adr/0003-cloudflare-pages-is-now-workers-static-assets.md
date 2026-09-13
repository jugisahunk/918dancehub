---
status: accepted
---

# Production hosting is a Cloudflare Worker with static assets, not classic Pages

ADR-0001 picked "Cloudflare Pages," meaning its Git-integration flow: connect a GitHub repo in the dashboard, Cloudflare's own build system runs `npm run build` and serves `dist/`. While setting this up (issue #15), that flow turned out to no longer exist for new projects — Cloudflare's dashboard now creates every new site as a Worker, deployed via Wrangler. Their own `migrate-from-pages` guide documents this as the supported successor, not a removed feature with no replacement.

This changes the mechanism, not the ADR's underlying reasoning (GitHub Pages' commercial-use gray area, Cloudflare's free tier, no vendor lock-in for a paid LLC build): production is now a static-assets-only Worker (`wrangler.jsonc`, `assets.directory: "./dist"`, no server-side `main` script), deployed through the same "Workers & Pages" dashboard project ADR-0001 already intended, on the same Workers Free plan (custom domains and static hosting remain free at this site's scale — this is not a paid upsell).

Practical differences from what ADR-0001 assumed:
- Build output directory is configured in `wrangler.jsonc` (`assets.directory`), not a dashboard field.
- The assigned domain is `<name>.<account-subdomain>.workers.dev`, not `*.pages.dev`.
- Workers Builds' CI needs a Cloudflare API token to run `wrangler deploy` — the dashboard offers to create this automatically; no manual token handling required.

No options were considered here — this isn't a choice, it's what the "Cloudflare Pages" decision from ADR-0001 concretely means to execute today.
