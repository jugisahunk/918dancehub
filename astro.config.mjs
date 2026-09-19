// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SECRET_PATH, isGateActiveFor } from './src/data/gate.ts';

// GitHub Pages staging needs a project-site base path (ADR-0001); Cloudflare
// Workers production (ADR-0003) serves from the root of its own domain, so
// it must NOT inherit that base — PUBLIC_PRODUCTION (set by the "Promote to
// Production" workflow, ADR-0004; also used the same way in Layout.astro)
// tells these apart. `site` matches site.ts's `domain` (issue #11 — DNS now
// points 918dancehubandevents.com and its www subdomain at the Worker).
//
// @astrojs/sitemap reads `site` (and respects `base`) to emit sitemap-index.xml
// / sitemap-0.xml at build time — see src/pages/robots.txt.ts, which points at
// it using the same `site`, so both stay correct through the future swap.
const isProductionBuild = Boolean(process.env.PUBLIC_PRODUCTION);

// This file loads before Vite exists, so it reads `process.env` directly
// rather than `import.meta.env` (unlike src/data/gate.ts's isGateActive(),
// which runs inside Astro pages where import.meta.env is available) — same
// staging/production signals, fed into the same isGateActiveFor() formula
// gate.ts's isGateActive() wraps, so the two contexts can't drift apart.
const isStaging = process.env.PUBLIC_STAGING === 'true';
const gateActive = isGateActiveFor(isStaging, isProductionBuild);

export default defineConfig({
  site: isProductionBuild ? 'https://www.918dancehubandevents.com' : 'https://jugisahunk.github.io',
  ...(isProductionBuild ? {} : { base: '/918dancehub' }),
  integrations: [
    sitemap({
      // Coming Soon Gate (issue #40): the secret mirror path must never
      // appear in the sitemap while gated — a hard requirement, not a
      // nice-to-have (see docs/adr/0005-static-mirror-coming-soon-gate.md).
      // Unaffected while ungated, since the mirror doesn't exist to filter.
      // Matches SECRET_PATH as a whole path segment (not a substring) so
      // this can't be defeated by a future trailingSlash/build.format
      // change altering whether generated URLs end in a trailing slash.
      filter: (page) => !gateActive || !new URL(page).pathname.split('/').includes(SECRET_PATH),
    }),
  ],
});
