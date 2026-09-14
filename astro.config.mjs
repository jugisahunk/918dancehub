// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages staging needs a project-site base path (ADR-0001); Cloudflare
// Workers production (ADR-0003) serves from the root of its own domain, so
// it must NOT inherit that base — PUBLIC_PRODUCTION (set by the "Promote to
// Production" workflow, ADR-0004; also used the same way in Layout.astro)
// tells these apart. `site` is hardcoded to the assigned *.workers.dev
// domain — this will need swapping to the real custom domain once DNS is
// pointed at it (issue #11).
//
// @astrojs/sitemap reads `site` (and respects `base`) to emit sitemap-index.xml
// / sitemap-0.xml at build time — see src/pages/robots.txt.ts, which points at
// it using the same `site`, so both stay correct through the future swap.
const isProductionBuild = Boolean(process.env.PUBLIC_PRODUCTION);

export default defineConfig({
  site: isProductionBuild ? 'https://918dancehub.jugisahunk.workers.dev' : 'https://jugisahunk.github.io',
  ...(isProductionBuild ? {} : { base: '/918dancehub' }),
  integrations: [sitemap()],
});
