# Content / Data Model

Resolves [wayfinder ticket #10](https://github.com/jugisahunk/918dancehub/issues/10). Terms below follow [CONTEXT.md](../CONTEXT.md). Written as a spec for implementation, not code — the actual Astro Content Collections config is an implementation detail, but the shape here maps directly onto it (see [ADR-0001](adr/0001-tech-stack.md)).

## Collections

### Instructor

A person teaching Dance Classes at the Venue. Its own collection, referenced by id from Class — not embedded — so a bio isn't duplicated if an Instructor ever teaches more than one Class or gets featured on Instructor Recruiting as social proof.

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | slug | yes | |
| `name` | string | yes | |
| `bio` | string | yes | short, 1-2 sentences |
| `photo` | image | no | may be pending until after Grand Opening — render a placeholder/no-photo state if absent |

Source: [Dance Classes questionnaire](../to-questionnaire-dance-classes-content.md), sent to Christina.

### Class

A Dance Class or Practice Dance taught/hosted at the Venue. Despite the collection name, an entry can be a lesson or the practice dance that follows one — `kind` distinguishes them, since both share every other field (day, time, instructor) and the site lists them in the same per-day schedule block.

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | slug | yes | |
| `name` | string | yes | |
| `instructor` | reference → Instructor | yes | |
| `level` | string | yes | e.g. "Beginner", "All levels" |
| `day` | string | yes | e.g. "Monday" — groups entries into one schedule block per day on the site |
| `schedule` | string | yes | time range only, e.g. "7:00-8:00pm" (day lives in `day`, not here) |
| `description` | string | yes | marketing blurb |
| `whatToWear` | string | no | |
| `capacity` | number | no | |
| `prerequisites` | string | no | |
| `pricing` | string | no | free text describing the whole day's pricing (both lessons plus the practice dance) — shown once per day on the site, so set it on exactly one entry for that day; leave the rest unset |
| `kind` | `"lesson"` \| `"practice"` | no, defaults to `"lesson"` | `"practice"` marks the open practice dance following that day's Open Level class — no instruction, not a Dance Class in the marketing sense |

Not to be confused with SocialEvent below: a practice dance is a low-key, no-cover extension of that day's classes for people who just took them; a Social Event (e.g. the monthly WCS Social) is a standalone community dance night, unrelated to any specific class.

Source: [Dance Classes questionnaire](../to-questionnaire-dance-classes-content.md), sent to Christina.

### SocialEvent

A recurring/themed Social Event.

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | slug | yes | |
| `name` | string | yes | |
| `recurrence` | string | yes | e.g. "First Friday of the month, 8-11pm" |
| `description` | string | yes | |
| `coverCharge` | string | yes | free text — "Free" or a price |
| `level` | string | yes | who it's for |
| `partnerRequired` | boolean | yes | |

Source: [Social Events questionnaire](../to-questionnaire-social-events-content.md), sent to Christina.

### BusinessLineSummary

The four-card feature-grid summary (one per Business Line). Evergreen marketing copy, not fact that can go stale — light-edit from [handoff-v1](design/handoff-v1/README.md)'s existing four cards, reordered so **Event Rentals leads** (handoff-v1 led with Dance Classes; destination corrects that). No content-gathering step needed.

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | slug | yes | one of the four Business Lines |
| `order` | number | yes | display order — Event Rentals = 1 |
| `title` | string | yes | |
| `body` | string | yes | one-liner |

## Singletons

Not collections — each of these has exactly one instance, matching CONTEXT.md's Venue (single physical location).

### Venue

| Field | Type | Required | Notes |
|---|---|---|---|
| `locationCopy` | string | yes | fixed as **"Midtown Tulsa Adjacent"** until Grand Opening (see CONTEXT.md); becomes the real address after |
| `sqFt` | number | pending | placeholder in handoff-v1 — real value needed. See newly-opened content-gathering ticket. |
| `guestCapacity` | number | pending | same |
| `minRentalHours` | number | pending | same |
| `availability` | string | pending | same |
| `description` | string | yes | section copy, light-edit from handoff-v1 |

**Gap found while defining this model:** unlike Dance Classes and Social Events, no ticket existed to gather real Venue/Event-Rentals numbers — despite Event Rentals being the primary Business Line. Opened [Gather Event Rentals / Venue content](https://github.com/jugisahunk/918dancehub/issues/13) to close that gap; values above stay `pending` until it resolves.

### Footer / Social Links

| Field | Type | Required | Notes |
|---|---|---|---|
| `instagram`, `facebook`, `tiktok` | url | pending | not yet gathered — quick fact, not blocking this spec |
| Explore links (Classes, Event Rentals, Social Events, Teach With Us) | internal anchors | yes | known — same-page anchors, already defined by the site's own sections |
| Info links (Contact, Studio Policies, Private Lessons, Gift Cards) | url | pending | destinations undefined — tracked in the map's "Not yet specified" (out of this ticket's scope) |

### Instructor Recruiting panel

Static evergreen copy from handoff-v1 (heading, body, closing line) — no content-gathering needed. Its only data dependency is the Inquiry form's `Teach With Us` interest type, defined below.

## Form schema (not a content collection)

### Inquiry

Visitor-submitted, not author-managed content — handled by Formspree (ADR-0001), not an Astro collection.

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | string | yes | |
| `email` | string | yes | |
| `interest` | enum | yes | `Event Rental` \| `Book a Tour` \| `Dance Class` \| `Teach With Us` \| `General Inquiry` |
| `date` | date | no | only meaningful for `Event Rental`/`Dance Class` |
| `message` | string | yes | |

Validation and anti-spam approach (reCAPTCHA vs. honeypot, etc.) is still open — tracked in the map's "Not yet specified," not resolved by this ticket.
