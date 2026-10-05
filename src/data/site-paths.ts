// Home-relative URLs for shared navigation (Header, BottomNav, Footer).
//
// Those components render on every page, but their hash links (`#classes`)
// only resolve on the homepage, and their page links (`privacy-policy`) are
// relative and stack up when clicked from a sub-page. Building every link off
// the homepage URL fixes both, and keeps the Coming Soon Gate's secret mirror
// path inside the mirror instead of escaping to the root splash.
import { SECRET_PATH } from './gate';

export function homeUrl(pathname: string): string {
  // BASE_URL is `/918dancehub/` on staging and `/` in production (ADR-0001, ADR-0003).
  // Normalized to a trailing slash: BASE_URL can arrive without one.
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
  const inMirror = pathname.split('/').includes(SECRET_PATH);
  return inMirror ? `${base}${SECRET_PATH}/` : base;
}
