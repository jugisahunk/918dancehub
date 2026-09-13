// Singleton: docs/content-model.md#footer--social-links.
export const footer = {
  // Pending — quick fact to grab from Christina, not blocking (see map's
  // "Not yet specified").
  social: {
    instagram: null as string | null,
    facebook: null as string | null,
    tiktok: null as string | null,
  },
  explore: [
    { label: 'Classes', href: '#classes' },
    { label: 'Event Rentals', href: '#venue' },
    { label: 'Social Events', href: '#events' },
    { label: 'Teach With Us', href: '#teach' },
  ],
  // Destinations undefined — tracked in the map's "Not yet specified".
  // Contact points at the real section; the rest are pending pages.
  info: [
    { label: 'Contact', href: '#contact' },
    { label: 'Studio Policies', href: null as string | null },
    { label: 'Private Lessons', href: null as string | null },
    { label: 'Gift Cards', href: null as string | null },
    { label: 'Privacy Policy', href: 'privacy-policy' as string | null },
  ],
};
