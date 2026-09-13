import type { APIRoute } from 'astro';

// Production robots.txt: allow crawling and point at the sitemap that
// @astrojs/sitemap generates (see astro.config.mjs). Built from `site`/`base`
// rather than a hardcoded domain so this stays correct after the future
// swap to the production Cloudflare Pages domain (issue #11).
//
// Environment-conditional staging disallow (GitHub Pages, jugisahunk#21) is
// deliberately out of scope here — this always allows crawling.
export const GET: APIRoute = ({ site }) => {
  // BASE_URL (e.g. `/918dancehub`) is where @astrojs/sitemap actually serves
  // sitemap-index.xml under GitHub Pages' project-site routing — it's baked
  // into every `loc` in the generated sitemap itself. Guard against a
  // doubled slash the same way Layout.astro does for the favicon links.
  const sitemapPath = `${import.meta.env.BASE_URL}/sitemap-index.xml`.replace('//', '/');
  const sitemapUrl = new URL(sitemapPath, site);
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl.href}\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
