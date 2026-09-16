// Coming Soon Gate (issue #37/#38, docs/adr/0005-static-mirror-coming-soon-gate.md).
//
// Deliberately a plain .ts constant, not an env var — a later ticket adds a
// Cloudflare-Worker-bundled route that needs to read this same value, and
// Astro's env-var system (Vite) doesn't reach a separately-bundled Worker
// script, while a plain .ts import does. Flip this to `true` and push to
// turn the gate on for both staging and production; there is no dashboard
// toggle and no date-based auto-lift by design.
export const COMING_SOON_GATE = false;

// The gate's unguessable mirror path segment (issue #39) — the real site
// keeps building here, unchanged, while COMING_SOON_GATE hides it from the
// root paths. Committed in plaintext next to the gate flag: the threat
// model here is "seen a few days early", not a security-sensitive leak, so
// rotation is just changing this value and pushing.
export const SECRET_PATH = 'wooshywooshy';

// Whether a build should actually gate, given whether it's a staging or
// production build: only the two CI-driven builds honor COMING_SOON_GATE at
// all — PUBLIC_STAGING (deploy.yml) and PUBLIC_PRODUCTION
// (promote-production.yml). `astro dev` and a local `npm run build` never
// set either, so this is always false there, regardless of the flag's
// committed value.
//
// Takes its signals as plain booleans, rather than reading env vars itself,
// so both of this project's two separate build-time contexts can share one
// formula: Astro pages (isGateActive() below, reading import.meta.env) and
// astro.config.mjs (which runs in plain Node before Vite exists, so it
// reads process.env directly and calls this with its own values).
export function isGateActiveFor(isStaging: boolean, isProductionBuild: boolean): boolean {
  return COMING_SOON_GATE && (isStaging || isProductionBuild);
}

// Astro-page-context convenience wrapper — reads the two signals from
// import.meta.env/process.env itself. Shared here so root and the
// secret-path mirror (src/pages/[...base]/*.astro) agree on exactly one
// condition.
export function isGateActive(): boolean {
  const isStaging = import.meta.env.PUBLIC_STAGING === 'true';
  const isProductionBuild = Boolean(process.env.PUBLIC_PRODUCTION);
  return isGateActiveFor(isStaging, isProductionBuild);
}
