// The header's "Get in Touch" and the bottom nav's "Contact" are the site's
// generic entry points into the shared Inquiry form (content-model.md) and
// leave Interest at its default, General Inquiry. Section-specific CTAs
// (Reserve a Spot, Check Availability, Apply to Teach) instead carry
// data-interest="<value>" and preselect that Interest option on click, so a
// visitor who clicked "Reserve a Spot" doesn't land on a blank-looking form
// and have to notice the dropdown themselves.
//
// The same data-interest value doubles (2026-10-07) as a Microsoft Clarity
// custom event name — see Layout.astro for where the Clarity snippet loads,
// production-only. This is the one CTA-click tracking point for the whole
// site: every "Rent the Venue" / "Apply to Teach" / etc. link already runs
// through here, so no extra markup is needed per-CTA.
declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
  }
}

document.querySelectorAll<HTMLAnchorElement>('a[data-interest]').forEach((link) => {
  link.addEventListener('click', () => {
    window.clarity?.('event', `cta-click:${link.dataset.interest}`);

    const select = document.querySelector<HTMLSelectElement>('#contact select[name="interest"]');
    if (!select) return;
    select.value = link.dataset.interest!;
    select.dispatchEvent(new Event('change', { bubbles: true }));
  });
});
