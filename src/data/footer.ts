// Singleton: docs/content-model.md#footer--social-links.
export const footer = {
  social: {
    instagram: 'https://www.instagram.com/918dancehub',
    facebook: 'https://www.facebook.com/profile.php?id=61590633093849',
    tiktok: 'https://www.tiktok.com/@918dancehubandevents',
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
