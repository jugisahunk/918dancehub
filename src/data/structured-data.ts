// LocalBusiness JSON-LD for SEO (wayfinder #17 / issue #22).
//
// Full street address included (ADR-0002, issue #28) — revealed early since
// it was already public on the Google Business Profile listing and
// Facebook, ahead of the original Grand Opening (2026-10-10) reveal date.
import { site } from './site';
import { mission } from './mission';

// Canonical four Business Lines per CONTEXT.md — kept in sync with the
// glossary's own descriptions rather than any single section's marketing
// copy (e.g. FeatureGrid's "A Community" card, which sells the vibe, not
// the Instructor Recruiting business line).
const businessLines = [
  {
    name: 'Event Rentals',
    description:
      'Renting the Venue out for private events, including weddings, birthdays, showers, and corporate events.',
  },
  {
    name: 'Dance Classes',
    description: 'Group and private dance instruction at the Venue.',
  },
  {
    name: 'Social Events',
    description: "The studio's own recurring or themed social dance nights, open to the public.",
  },
  {
    name: 'Instructor Recruiting',
    description: 'Recruiting instructors to teach Dance Classes at the Venue.',
  },
];

export function buildLocalBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    // LocalBusiness (not a narrower subtype like DanceSchool or EventVenue)
    // because the business is genuinely both, in equal standing per
    // CONTEXT.md's "Business Line" entry — a narrower type would
    // misrepresent whichever line it didn't name.
    '@type': 'LocalBusiness',
    name: site.name,
    legalName: site.legalName,
    description: mission.heroLine,
    url: `https://${site.domain}/`,
    telephone: site.phone,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2735 S Memorial Dr',
      addressLocality: 'Tulsa',
      addressRegion: 'OK',
      postalCode: '74129',
      addressCountry: 'US',
    },
    areaServed: {
      '@type': 'City',
      name: 'Tulsa, OK',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Business Lines',
      itemListElement: businessLines.map((line) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: line.name,
          description: line.description,
        },
      })),
    },
  };
}
