// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages staging needs a project-site base path (ADR-0001); Cloudflare
// Pages production (issue #15) serves from the root of its own domain, so it
// must NOT inherit that base — Cloudflare Pages' own CF_PAGES build env var
// (already used the same way in Layout.astro) tells these apart. `site` uses
// CF_PAGES_URL, Cloudflare's own build-time env var for the deployment's
// current URL — this will need swapping to the real custom domain once DNS
// is pointed at it (issue #11).
//
// @astrojs/sitemap reads `site` (and respects `base`) to emit sitemap-index.xml
// / sitemap-0.xml at build time — see src/pages/robots.txt.ts, which points at
// it using the same `site`, so both stay correct through the future swap.
const isProductionBuild = Boolean(process.env.CF_PAGES);

export default defineConfig({
  site: isProductionBuild ? process.env.CF_PAGES_URL : 'https://jugisahunk.github.io',
  ...(isProductionBuild ? {} : { base: '/918dancehub' }),
  integrations: [sitemap()],
});
