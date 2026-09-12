// Singleton: docs/content-model.md#venue. wayfinder #13 (Gather Event
// Rentals / Venue content) answered facility sqFt, but the "Sq ft floor"
// stat needs the dance-floor size specifically, which Christina won't have
// until 10/1/2026 — so it's TBD along with guestCapacity/minRentalHours/
// availability. Per Christina, pricing/what's-included/deposit terms are
// deliberately NOT shown on the site — those come after a tour and
// contract, hence no fields for them here.
export const venue = {
  locationCopy: 'Midtown Tulsa Adjacent',
  description: 'A premier destination for big moments.',
  stats: [
    { value: 'TBD', label: 'Sq ft floor', pending: true },
    { value: 'TBD', label: 'Guest capacity', pending: true },
    { value: 'TBD', label: 'Min. rental', pending: true },
    { value: 'TBD', label: 'Availability', pending: true },
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
  // Fixed amenities of the space itself — distinct from the rental package
  // list, which Christina was explicit is not meant for the site.
  amenities: ['Dance floor', 'Event seating', 'Kitchenette', 'Bathrooms'],
};
