---
status: research
issue: 32
map: 31
---

# Can a Cloudflare Workers static-assets project run custom edge logic?

Research for issue #32 ("Research: can a Cloudflare Workers assets project run custom edge logic?"), a child of wayfinder map issue #31 ("Coming Soon Gate"). The eventual feature is issue #34, a coming-soon gate with a secret-link bypass, on the production Cloudflare Worker described in ADR-0003 and deployed per ADR-0004.

Primary source throughout: [developers.cloudflare.com](https://developers.cloudflare.com). Anything not from Cloudflare's own docs is labeled secondary.

## 1. Does a `main` script exist alongside static assets, with an `ASSETS` binding?

Yes. This is Cloudflare's standard, documented "Workers with assets" shape — not a workaround. From the [Static Assets configuration/binding docs](https://developers.cloudflare.com/workers/static-assets/binding/):

> Configuring a Worker with assets requires specifying a directory and, optionally, an assets binding, in your Worker's Wrangler file. The assets binding allows you to dynamically fetch assets from within your Worker script (e.g. `env.ASSETS.fetch()`)...

Two fields get added to the existing `assets` block, plus a top-level `main`:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "918dancehub",
  "compatibility_date": "2026-09-13",
  "main": "src/worker/index.ts",
  "assets": {
    "directory": "./dist",
    "binding": "ASSETS"
  }
}
```

- `main` — path to the Worker script's entry point. Optional on a static-assets-only Worker (today's `wrangler.jsonc` omits it); required to run any custom logic.
- `assets.binding` — "the binding name used to refer to the assets. Optional, and only useful when a Worker script is set with `main`" ([Wrangler configuration reference](https://developers.cloudflare.com/workers/wrangler/configuration/)). Conventionally named `ASSETS`, giving `env.ASSETS` inside the script.

The Worker script forwards ordinary requests to the asset store via `env.ASSETS.fetch(request)`. Minimal pass-through shape (from the [migrate-from-Pages guide](https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/) pattern):

```ts
export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  },
};
```

By default (`run_worker_first` unset/`false`), Cloudflare tries to match the request against a static asset first and only invokes the Worker when nothing matches — so today's zero-`main` config and a `main`-with-pass-through config behave identically for normal requests. `run_worker_first: true` (or an array of route globs, e.g. `["/api/*", "!/api/docs/*"]`) inverts that, unconditionally invoking the Worker so it can decide per-request whether to defer to `ASSETS.fetch()` at all. This is exactly the switch a coming-soon gate needs, since the gate has to inspect the request *before* deciding whether to serve the real homepage.

## 2. Does adding `main` change the deploy model, plan, or billing?

**Deploy mechanism: unchanged.** Nothing about adding `main` changes how the Worker ships. It is still `wrangler deploy`, still run by `cloudflare/wrangler-action@v3` in `.github/workflows/promote-production.yml`, still on the tag-triggered promotion flow from ADR-0004. Wrangler bundles the script and uploads it alongside the asset manifest in the same deploy — no separate step, no separate product to enable.

**Plan: still fits Workers Free.** Nothing in the Workers-with-assets docs gates `main` behind a paid plan; the [Workers pricing page](https://developers.cloudflare.com/workers/platform/pricing/) and [Workers limits page](https://developers.cloudflare.com/workers/platform/limits/) describe the same Free plan for Workers whether or not assets are attached.

**Billing: the only real change is conditional on `run_worker_first`.**

- Static asset requests are "free and unlimited" regardless of whether a `main` script exists ([Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/), footnote 3; [Static Assets billing and limitations](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/)). Today, with no `main` at all, every request is necessarily a free static-asset request.
- Once a Worker script is invoked for a request — which happens by default only for paths that don't match an asset, but happens for *every* request once `run_worker_first` is set — that request is billed as a normal Worker request (counts against the Free plan's 100,000 requests/day and 10ms CPU time/invocation, per the [Workers limits page](https://developers.cloudflare.com/workers/platform/limits/)).
- The static-assets routing docs carry an explicit caveat for this case: when using `run_worker_first`, requests matching those patterns always invoke the Worker, and if the Free plan's request limit is exceeded, those requests get a `429` instead of falling back to serving the asset directly ([Static Assets routing/worker-script docs](https://developers.cloudflare.com/workers/static-assets/routing/worker-script/)).
- CPU time is trivial for a gate check (reading a cookie/query param and branching) — well under the Free plan's 10ms/invocation ceiling, and nowhere near the 100,000 requests/day ceiling at this site's traffic (a small local dance studio, pre-launch).

Net: a `main` script that runs on every request via `run_worker_first` moves this site from "0 billable requests, all static" to "every request is a billable-but-free-tier Worker request," which is a distinction without a practical consequence at this site's volume — it would take >100,000 visits in a day to notice, and CPU cost per request is negligible. No new product, no new pricing tier, no action needed for a coming-soon gate confined to this Worker.

## 3. THE KEY QUESTION: can the Worker branch on cookies/query string and conditionally serve a different asset or redirect?

**Yes — this is an explicitly documented pattern**, not an inferred capability. Cloudflare's [Worker script routing docs](https://developers.cloudflare.com/workers/static-assets/routing/worker-script/) give almost exactly this shape as their own example for "run your Worker script first," framed as an authentication gate in front of static assets:

```js
const user = await checkIfRequestIsAuthenticated(request);
if (!user) {
  return new Response("Unauthorized", { status: 401 });
}
const assetResponse = await env.ASSETS.fetch(request);
return assetResponse;
```

That is the whole pattern: read whatever you need from `request` (`request.headers.get('Cookie')`, `new URL(request.url).searchParams`, etc.), branch, and either call `env.ASSETS.fetch(request)` to continue to the normal static response or return something else entirely — a `401`, a redirect, or, for the coming-soon-gate case, a *different* asset fetched by constructing a new `Request` against another path in the same asset store. Serving a different static file conditionally is a direct extension of the same `ASSETS.fetch()` mechanism (fetch accepts any `Request`, not just the original one), and is the pattern used by `not_found_handling: "single-page-application"` internally (always serving `index.html` for unmatched paths) — the [Static Assets overview](https://developers.cloudflare.com/workers/static-assets/) and [SPA routing docs](https://developers.cloudflare.com/workers/static-assets/routing/single-page-application/) describe that built-in behavior, which this repo's own gate logic would replicate manually for the bypass case.

Minimal illustrative gate matching issue #34's shape (secret-link bypass via a query string or cookie, otherwise serve a splash page instead of the homepage):

`wrangler.jsonc`:
```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "918dancehub",
  "compatibility_date": "2026-09-13",
  "main": "src/worker/index.ts",
  "assets": {
    "directory": "./dist",
    "binding": "ASSETS",
    "run_worker_first": true
  }
}
```

`src/worker/index.ts`:
```ts
export default {
  async fetch(request: Request, env: { ASSETS: Fetcher }) {
    const url = new URL(request.url);
    const hasBypass =
      url.searchParams.get('key') === 'the-secret-value' ||
      (request.headers.get('Cookie') ?? '').includes('bypass=1');

    if (!hasBypass && url.pathname === '/') {
      return env.ASSETS.fetch(new Request(new URL('/coming-soon.html', url), request));
    }

    return env.ASSETS.fetch(request);
  },
};
```

(A real implementation would also set a cookie on first bypass so the secret link only has to be visited once, and would need to decide how the gate interacts with other paths like `/robots.txt` — see Q4.)

## 4. Gotchas for a static Astro build

- **`src/pages/robots.txt.ts` stays a plain static asset.** Astro pre-renders this route at build time into a literal `dist/robots.txt` file (confirmed by reading the file: it's a build-time `APIRoute` with no runtime dependency, consistent with this being a fully static Astro site). Cloudflare has no visibility into how a file in `assets.directory` was produced — it is served exactly like `dist/index.html`. Adding a `main` script does **not** change this: `env.ASSETS.fetch(request)` (or the default asset-first routing) serves it unmodified unless the Worker script explicitly intercepts that path. That means a coming-soon gate that unconditionally gates `/` must decide on purpose whether `/robots.txt` (and other non-HTML assets like CSS/JS/images) should also be gated — most coming-soon implementations exclude everything except the HTML document routes, which the `run_worker_first` route-pattern array (e.g. `run_worker_first: ["/", "!/robots.txt", ...]` or simply branching only when `url.pathname === '/'` inside the script, as in the Q3 snippet) handles directly.
- **`not_found_handling` and `html_handling` are independent of `main`.** They're both `assets`-block config consumed by Cloudflare's own asset-serving layer, not by the Worker script — they keep working the same way whether or not a `main` script exists, and whether or not that script chooses to call `ASSETS.fetch()` for a given request ([Wrangler configuration reference](https://developers.cloudflare.com/workers/wrangler/configuration/)). They only stop applying for a specific request if the Worker script returns its own response instead of delegating to `ASSETS.fetch()` — which is exactly the gate's job for the gated path, and exactly why the gate must delegate for every other path.
- **`run_worker_first` is the one field that changes existing behavior.** Leaving it `false`/unset (the default) means this site's current all-static behavior is preserved byte-for-byte for every path the Worker doesn't care about — the Worker is simply never invoked for a request that matches a real file. Setting it to `true` (or a route array) is what makes the gate possible at all, and is also the field with the Free-plan billing/`429` caveat from Q2.
- **`_headers` / `_redirects` are not a factor for this repo.** Those are a Cloudflare *Pages* Functions-era convention. Workers static assets docs don't mention them as a supported feature at all (confirmed by fetching the [Static Assets overview](https://developers.cloudflare.com/workers/static-assets/) directly — no mention of either file). The migrate-from-Pages guide's `.assetsignore` example actually excludes `_redirects`/`_headers` from upload specifically so leftover Pages-era files aren't served as literal, meaningless static files. This repo has neither file today, so there's nothing to conflict with.
- **Caching sits in front of the Worker either way.** Cloudflare's own tiered cache serves repeat static-asset requests without re-invoking the Worker in the default (non-`run_worker_first`) routing mode. Once `run_worker_first` is set for the gated path, that path is deliberately taken out of the cache-first fast path on every request (by design — the whole point is to re-evaluate the gate condition each time), which is fine at this site's volume but is worth naming explicitly as a deliberate trade rather than an oversight if issue #34 is implemented.

## Bottom line

The capability exists, is officially documented (not a hack), and matches issue #34's shape closely enough that Cloudflare's own example is effectively the gate pattern already. For this repo it would mean: add `main: "src/worker/index.ts"` and `assets.binding: "ASSETS"` (plus `run_worker_first`, scoped to just the gated path/paths) to `wrangler.jsonc`, and add a small Worker script that inspects the request's cookie or query string and either calls `env.ASSETS.fetch(request)` or fetches `/coming-soon.html` instead — no change to the deploy pipeline (ADR-0003/ADR-0004 both hold), no new Cloudflare product, no billing impact at this site's traffic.

**Recommendation:** worth doing at the edge rather than client-side-only. A client-side/localStorage gate (the only option on the GitHub Pages staging deploy, since GitHub Pages is static-only) ships the real page to every visitor and hides it with JS after load — trivially bypassed (disable JS, view source, view cache) and a bad look for a "secret" link — whereas the Worker-edge version never sends the real homepage to an ungated request at all, for effectively the same implementation effort.
