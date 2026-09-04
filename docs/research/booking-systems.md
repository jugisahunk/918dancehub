# Research: Booking/Scheduling System Fit

**Ticket:** [#6](https://github.com/jugisahunk/918dancehub/issues/6) (child of the wayfinder map, [#3](https://github.com/jugisahunk/918dancehub/issues/3))
**Date:** 2026-09-03
**Status:** Findings for a future decision — not blocking Site Launch (9/26/2026) or Grand Opening (10/10/2026).

## Context

918 Dance Hub & Events intends to use **Square** for payments (Venmo as an interim manual fallback). At Site Launch there is no embedded booking — visitors submit a plain Inquiry form. This research evaluates candidate booking/scheduling tools for the point where Christina wants one "if the price is right," against two use cases:

1. **Dance Class scheduling** — 2-3 recurring weekly classes; students need to see a schedule and ideally register/pay for a class or series.
2. **Event Rental booking** — one-off private Venue bookings (weddings, birthdays, showers, corporate events) needing deposit/fee collection and availability management so the Venue isn't double-booked.

If no tool is adopted, the fallback is Christina as manual point of contact via a spreadsheet — so any paid tool needs to earn its cost over that baseline.

## Comparison table

| Tool | Est. cost, small-studio tier | Class scheduling | Venue-rental / deposit | Square integration | Static-site embeddability |
|---|---|---|---|---|---|
| **Square Appointments** | Free tier available; **Plus $49/mo/location** (multi-staff, waitlist); **Premium $149/mo/location** (adds resource/room booking) | Strong — recurring class series with capacity, bookable online, available even on Free | Partial — one-off bookings work on any tier, but automated room/resource blocking to prevent double-booking the Venue needs **Premium ($149/mo)** | Native — it's Square's own product | Yes — hosted booking site + embeddable "Book Now" button |
| **Acuity Scheduling** | Starter **$16-20/mo** (1 calendar); Standard **$27-34/mo** (up to 6 calendars, packages/memberships, waitlist); Premium **$49-61/mo** (HIPAA, API, white-label) | Strong from Standard up — group classes with multi-spot booking, packages/series | Good — deposits and resource-based booking-limits available; Standard tier is where packages unlock | Native Square payments on **all plans** (also Stripe, PayPal) | Yes — embeddable scheduler widget + hosted page |
| **Momence** | Published tiers: Free "Light" (5% txn fee) / Basic $20/mo (1% fee) / Pro $60/mo (0% fee) — but pricing isn't fully public, and secondary sources (Capterra reviews) report real small-studio bills often landing **$250+/mo** | Strong — purpose-built for dance/fitness studios: recurring classes, waitlists, memberships | Workshop/one-off event booking exists but the product is built around class/membership management, not venue-rental contracts | **None found** — uses Stripe; help docs reference an in-progress move to its own processor, not Square | Yes — embeddable widget |
| **Vagaro** | **$23.99/mo** (1 calendar), scaling to ~$34-84/mo for 2-7 calendars, + processing fees | Strong — classes, appointments, packages; an industry-standard studio tool | Good — supports rooms/resources for rental-style bookings | **None** — Vagaro and Square are competing all-in-one platforms (own POS/processor, "Vagaro Pay"), not integrated | Yes — widget/embed and hosted page |
| **Setmore** | Free (up to 4 users, 200 appts/mo, **no deposits**); Pro **$5-12/user/mo** (annual/monthly), adds deposits, unlimited users | Decent — group/class sessions with seat limits, even on Free | Basic — deposits on Pro; **no dedicated room/resource-blocking feature found**, so double-booking protection for the Venue is weaker than Square Premium or Acuity | **Native and free** — official, no-cut Square integration; current promo waives Square fees on the first $5,000 processed | Yes — simple booking page/button |

Sources (fetched 2026-09-03):
- Square Appointments pricing/features: https://squareup.com/us/en/appointments/pricing , https://squareup.com/us/en/appointments/features , https://squareup.com/help/us/en/article/7065-square-appointments-resource-management , https://community.squareup.com/t5/Product-Updates/Class-booking-for-Appointments/ba-p/661516
- Acuity Scheduling pricing/features: https://acuityscheduling.com/pricing , https://acuityscheduling.com/partners/square , https://help.acuityscheduling.com/hc/en-us/articles/16676883946253-Creating-and-editing-group-classes , https://help.acuityscheduling.com/hc/en-us/articles/47241733203725-Let-clients-book-multiple-spots-for-appointments-and-classes
- Momence: https://help.momence.com/en/articles/12028686-stripe-payment-faq-s , https://help.momence.com/en/articles/13492775-odin-why-we-ve-switched-payment-processors-what-this-means (secondary pricing context: Capterra/vibefam reviews, since Momence does not publish full pricing)
- Vagaro: https://www.vagaro.com/pro/vagaro-vs-square , https://www.capterra.com/p/153752/Vagaro/pricing/
- Setmore: https://www.setmore.com/pricing , https://www.setmore.com/square-payment/us , https://support.setmore.com/en/articles/490938-customer-deposits , https://www.setmore.com/features/class-booking

## Per-candidate notes

### Square Appointments
Since Square is already the intended payment processor, this is the only option with zero integration friction — payments, POS, and scheduling all live in one Square account. The Free plan already supports recurring class series and online booking, which likely covers the Dance Class use case for $0/mo plus normal Square processing fees. The gap is on the Event Rental side: preventing double-booking the Venue as a bookable "resource" is a Premium-only feature at $149/mo/location — a real cost jump for a two-classes-a-week studio. Below Premium, she'd still be tracking Venue availability manually, which is close to the no-tool baseline.

### Acuity Scheduling
Now owned by Squarespace. Notable for supporting Square as a first-class payment processor on **every** plan, not just its own top tier — so the Square-integration story is nearly as clean as Square's own product, without forcing her onto the priciest tier to get class + deposit features. Standard ($27-34/mo) appears to be the tier where packages/memberships and waitlists unlock, which is what she'd want for class series; deposits and resource-based limits are also available. This is the strongest "one tool, both use cases, still-Square" candidate at a materially lower cost than Square Premium.

### Momence
The best domain fit for a dance studio specifically — built for exactly this kind of recurring class + membership business, with waitlists and check-ins out of the box. Two issues rule it out as a near-term pick: (1) it doesn't integrate with Square (Stripe-based, and reportedly migrating to its own processor), directly conflicting with the stated Square intent; (2) pricing isn't transparently published, and secondary sources suggest real small-studio bills land well above the advertised $20-60/mo tiers. Worth revisiting only if she later reconsiders Square as the processor.

### Vagaro
A full-featured, well-established studio/salon platform that would technically cover both use cases. But Vagaro is a competing all-in-one platform to Square, not an integration partner — adopting it effectively means replacing Square as the payment processor, which contradicts the stated plan. Reasonable fallback only if Square integration turns out to matter less than expected.

### Setmore
The cheapest way to get a genuinely native, fee-free Square integration (Setmore takes no cut of Square transactions, and there's currently a promo waiving Square's own fees on the first $5,000 processed). Free tier covers basic class scheduling with seat limits. Its weak point is the Event Rental side: deposits require the Pro plan, and no dedicated room/resource double-booking protection was found in Setmore's documentation — so for the Venue-rental use case it's a step down from Square Premium or Acuity in structure, even though it's cheaper.

## Forward-looking caveat

Square's own product surface keeps expanding (it already layers Square Appointments, Square Invoices, and Square Online under one account), so a "Square Appointments now, add Square Invoices or Square Online later" path is worth re-checking against Square's current offerings whenever this decision is actually made — features/pricing here reflect 2026-09-03 official pages and may have shifted.

## Recommendation

No single tool is a clear best-in-class winner for both use cases at this studio's scale — this is a genuine shortlist, not a decisive pick:

1. **Acuity Scheduling, Standard tier (~$27-34/mo)** — best overall balance: native Square payments on every plan, group-class support with capacity, packages, deposits, and resource limits, all for less than Square's own Premium tier. **Top recommendation if she wants one tool for both use cases while staying on Square.**
2. **Square Appointments** — the cleanest single-vendor story (payments + scheduling in one Square account). Free/Plus ($0-49/mo) likely covers the Dance Class use case alone; Premium ($149/mo) is needed once automated Venue double-booking protection matters. Good choice if she'd rather keep everything inside Square even at a higher cost for the rental side.
3. **Setmore** — the budget/stopgap pick: start free, add Pro ($5-12/user/mo) only once deposits are needed, native Square integration throughout. Reasonable if she wants to try a tool cheaply before committing, but weakest of the three on Venue double-booking protection.

**Momence** (best dance-studio-specific feature fit) and **Vagaro** (most established all-in-one) are both strong products but conflict with the stated Square-payments plan — they'd mean replacing Square as the processor rather than integrating with it. Worth a second look only if that assumption changes.
