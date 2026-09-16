// Coming Soon Gate (issue #37/#38, docs/adr/0005-static-mirror-coming-soon-gate.md).
//
// Deliberately a plain .ts constant, not an env var — a later ticket adds a
// Cloudflare-Worker-bundled route that needs to read this same value, and
// Astro's env-var system (Vite) doesn't reach a separately-bundled Worker
// script, while a plain .ts import does. Flip this to `true` and push to
// turn the gate on for both staging and production; there is no dashboard
// toggle and no date-based auto-lift by design.
export const COMING_SOON_GATE = false;
