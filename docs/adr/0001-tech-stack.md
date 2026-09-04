---
status: accepted
---

# Tech stack: Astro, GitHub Pages (staging) + Cloudflare Pages (production), Formspree

The site needs a framework that leaves an obvious path to a future CMS, staging on GitHub Pages (developer requirement) plus genuinely free production hosting, and a forms backend for the shared Inquiry form — all deliverable in ~3 weeks for a small brochure site. We chose **Astro** (its typed Content Collections API is a first-party, documented content layer matching the design's repeated data-driven sections, and the closest thing to a built-in future-CMS boundary), staged on **GitHub Pages** and served in production from **Cloudflare Pages** (GitHub Pages' own limits page warns against sites "primarily directed at facilitating commercial transactions" — a real gray area for a named LLC's site; Cloudflare Pages carries no such restriction, and its Free plan — 100 custom domains, 500 builds/month, unmetered static bandwidth — covers this site at $0/mo), with **Formspree** handling the Inquiry form (host-agnostic, zero backend code; free tier is 50 submissions/month, next tier is $10/mo for 200).

## Considered Options

- **11ty** — credible runner-up, comparably light, but Astro's Content Collections is more explicitly the "CMS boundary" this decision was optimizing for.
- **Next.js (static export)** — rejected as over-engineered: static export disables the server features (Server Actions, dynamic routes, ISR) that justify choosing Next.js at all.
- **Plain HTML/CSS** — rejected: the design has five repeated, data-driven blocks (classes, events, venue stats, etc.) that want a templating layer.
- **GitHub Pages as production too** — rejected on the ToS gray area above; kept for staging only, where that risk doesn't apply.
- **Netlify Forms / Cloudflare Pages Functions** — both disqualified for a GitHub-Pages-hosted site: each vendor's own docs require the site to be built and deployed *through* that vendor to detect/serve forms.
- **Vercel** — ruled out entirely: its free-tier Fair Use Guidelines contractually prohibit commercial use, and this is a paid build for an LLC.

Full sourced comparison: [docs/research/stack-options.md](../research/stack-options.md) (branch `research/stack-options`).
