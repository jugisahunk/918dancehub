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

// Whether this particular build should actually gate: only the two
// CI-driven builds honor COMING_SOON_GATE at all — PUBLIC_STAGING
// (deploy.yml) and PUBLIC_PRODUCTION (promote-production.yml), the same
// signals Layout.astro/astro.config.mjs use to tell staging/production
// apart from local dev. `astro dev` and a local `npm run build` never set
// either, so this is always false there, regardless of the flag's
// committed value. Shared here so root and the secret-path mirror
// (src/pages/[...base]/*.astro) agree on exactly one condition.
export function isGateActive(): boolean {
  const isStaging = import.meta.env.PUBLIC_STAGING === 'true';
  const isProductionBuild = Boolean(process.env.PUBLIC_PRODUCTION);
  return COMING_SOON_GATE && (isStaging || isProductionBuild);
}
