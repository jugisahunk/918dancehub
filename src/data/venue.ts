// Singleton: docs/content-model.md#venue. wayfinder #13 (Gather Event
// Rentals / Venue content). "Sq ft floor" is the dance floor only: the
// L-shaped floor is two sections, 25x45 (1,125) + 15x30 (450) = 1,575.
// The whole facility is 4,260 sq ft (per Christina) — not shown on the
// site yet, noted here in case a "total space" figure is wanted later.
// Min. rental (4 hr) and availability (7 days a week) are per Christina.
// guestCapacity is the only stat still TBD — it waits on the venue
// inspection. Per Christina, pricing/what's-included/deposit terms are
// deliberately NOT shown on the site — those come after a tour and
// contract, hence no fields for them here.
export const venue = {
  // Real street address (ADR-0002) — revealed early since it was already
  // public on the Google Business Profile listing and Facebook.
  locationCopy: '2735 S Memorial Dr, Tulsa, OK 74129',
  description: 'A premier destination for big moments.',
  stats: [
    { value: '1,575', label: 'Sq ft floor' },
    { value: 'TBD', label: 'Guest capacity', pending: true },
    { value: '4 hr', label: 'Min. rental' },
    { value: '7 days', label: 'Availability' },
  ],
  eventTypes: [
    'Holiday parties',
    'Baby showers',
    'Corporate events',
    'Quinceañeras',
    'Small weddings',
    'Rehearsal dinners',
    'Bridal showers',
    'Workshops',
  ],
  // Keeps eventTypes from reading as an exhaustive list — most inquiries
  // aren't one of the eight named types, and we don't want anyone
  // self-excluding because their event isn't listed.
  eventTypesNote:
    "Don't see your event? If you can picture it here, we can probably host it. Just ask.",
  // Fixed amenities of the space itself — distinct from the rental package
  // list, which Christina was explicit is not meant for the site.
  amenities: ['Dance floor', 'Event seating', 'Kitchenette', 'Bathrooms'],
};
