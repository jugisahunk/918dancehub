// Singleton: docs/content-model.md#venue. wayfinder #13 (Gather Event
// Rentals / Venue content) answered: sqFt is real; guestCapacity/
// minRentalHours/availability are still not provided. Per Christina,
// pricing/what's-included/deposit terms are deliberately NOT shown on the
// site — those come after a tour and contract, hence no fields for them here.
export const venue = {
  locationCopy: 'Midtown Tulsa Adjacent',
  description: 'A premier destination for big moments.',
  stats: [
    { value: '4,260', label: 'Sq ft floor', pending: false },
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
};
