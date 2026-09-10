// The header's "Get in Touch" and the bottom nav's "Contact" are the site's
// generic entry points into the shared Inquiry form (content-model.md) and
// leave Interest at its default, General Inquiry. Section-specific CTAs
// (Reserve a Spot, Check Availability, Apply to Teach) instead carry
// data-interest="<value>" and preselect that Interest option on click, so a
// visitor who clicked "Reserve a Spot" doesn't land on a blank-looking form
// and have to notice the dropdown themselves.
document.querySelectorAll<HTMLAnchorElement>('a[data-interest]').forEach((link) => {
  link.addEventListener('click', () => {
    const select = document.querySelector<HTMLSelectElement>('#contact select[name="interest"]');
    if (!select) return;
    select.value = link.dataset.interest!;
    select.dispatchEvent(new Event('change', { bubbles: true }));
  });
});
