// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages staging (ADR-0001). Production moves to Cloudflare Pages at
// the real domain once DNS is pointed (issue #11) — swap site/base then.
export default defineConfig({
  site: 'https://jugisahunk.github.io',
  base: '/918dancehub',
});
