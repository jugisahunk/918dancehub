// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages staging (ADR-0001). Production moves to Cloudflare Pages at
// the real domain once DNS is pointed (issue #11) — swap site/base then.
//
// @astrojs/sitemap reads `site` (and respects `base`) to emit sitemap-index.xml
// / sitemap-0.xml at build time — see src/pages/robots.txt.ts, which points at
// it using the same `site`, so both stay correct through the future swap.
export default defineConfig({
  site: 'https://jugisahunk.github.io',
  base: '/918dancehub',
  integrations: [sitemap()],
});
