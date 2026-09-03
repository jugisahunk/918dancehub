# Handoff: 918 Dance Hub & Events — Marketing Site

## Overview
A single-page marketing site template for **918 Dance Hub & Events LLC** (short name: "918 Dance Hub"), a dance studio and event venue in Tulsa, OK. Domain: `www.918dancehubandevents.com`. The page covers four business lines: dance classes, event rentals, social events, and instructor recruiting.

## About the Design Files
The files in this bundle are **design references created in HTML** — a prototype showing intended look and behavior, not production code to copy directly. The task is to **recreate this design in the target codebase's existing environment** (React, Next.js, Astro, WordPress theme, etc.) using its established patterns, component library, and build setup. If no codebase exists yet, pick the framework that fits the project (a static site generator is a good fit — this is a brochure site) and implement there.

`918 Dance Hub.dc.html` is a *streaming design component* format: markup lives inside `<x-dc>` and all styling is inline `style="…"` attributes, with a small `<helmet><style>` block holding resets, fonts, and the media queries. That inline-style approach is an artifact of the prototyping tool — **do not carry it over**. Reimplement with the codebase's normal styling approach (CSS modules, Tailwind, styled-components, plain stylesheet). `style-hover="…"` attributes in the source are hover states; map them to `:hover`.

## Fidelity
**High-fidelity.** Colors, typography, spacing, radii, and transitions are final and should be matched. Copy is final except where noted under *Placeholder content*.

## Design Tokens

### Color
| Token | Value | Use |
|---|---|---|
| `bg` | `#08080a` | Page background |
| `bg-deep` | `#050506` | Footer background |
| `surface` | `rgba(255,255,255,.025)` | Card / list-row fill |
| `surface-grad` | `linear-gradient(170deg, rgba(255,255,255,.045), rgba(255,255,255,.012))` | Feature card fill |
| `text` | `#f6f2e8` | Headings |
| `text-2` | `#f0ece3` | Strong body |
| `text-3` | `#b1aba1` / `#b9b3a8` | Body copy |
| `text-4` | `#8d877d` | Labels, muted |
| `text-5` | `#6f6a62` | Copyright line |
| `gold` | `#d4af37` | Base brand gold (borders at low alpha) |
| `gold-light` | `#e9c76a` | Gold text, links |
| `gold-hover` | `#f7e6b4` | Link hover |
| `gold-grad` | `linear-gradient(105deg, #b8891f, #f0d68a 45%, #b8891f)` | Primary button, script wordmark |
| `teal` | `#2aa8a3` | Accent: eyebrows, icon rings, times, focus ring |
| `teal-light` | `#7fd6d2` / `#a8e7e4` | Secondary button text / hover |
| `hairline` | `rgba(212,175,55,.15–.35)` | Gold borders |
| `hairline-neutral` | `rgba(255,255,255,.07–.08)` | Neutral dividers |

Palette is derived from the client's Instagram flyers: black ground, metallic gold, teal accent.

### Typography
- **Display / headings:** `'Cormorant Garamond', serif` — weights 400/600/700 (Google Fonts).
- **Script accent:** `'Great Vibes', cursive` — used twice only: the hero's "create memories" and the "Inspire. Teach. Connect." line.
- **UI / body:** `system-ui, -apple-system, "Segoe UI", sans-serif`.

| Role | Size | Other |
|---|---|---|
| h1 | `clamp(2.4rem, 9vw, 4.2rem)` | Cormorant 700, line-height 1.02, letter-spacing −.01em, `text-wrap: balance` |
| Script inside h1 | `1.15em` of h1 | Great Vibes, gold gradient via `background-clip: text` |
| h2 | `clamp(1.9rem, 6vw, 2.9rem)` | Cormorant 700, line-height 1.1 |
| h2 (contact) | `clamp(1.7rem, 5.5vw, 2.4rem)` | |
| Card h3 | `.82rem` | system-ui, uppercase, letter-spacing .18em, gold-light |
| Event card h3 | `1.4rem` | Cormorant |
| Eyebrow | `.7rem` | uppercase, letter-spacing .28em, teal |
| Body | `1rem` / `.95rem` | line-height 1.6–1.65, `text-wrap: pretty` |
| Button label | `.8–.84rem` | weight 650, uppercase, letter-spacing .1–.12em |
| Nav link | `.82rem` | uppercase, letter-spacing .14em |
| Bottom-nav label | `.64rem` | uppercase, letter-spacing .12em |

### Spacing, radius, motion
- Side padding: `1rem` mobile → `2rem` at ≥768 → `2.5rem` at ≥1024.
- Section vertical padding: `2.5–3.5rem`.
- Container: `max-width: 1200px; margin: 0 auto`.
- Radii: `12px` (rows, small tiles), `16px` (cards), `18–20px` (image frames, CTA panel), `999px` (buttons, pills), `50%` (circular marks).
- Transitions: `.2s ease` on colors/background; `.25s ease` on card `transform`/`border-color`/`box-shadow`.
- Card hover lift: `translateY(-4px)` + `box-shadow: 0 14px 34px rgba(0,0,0,.5)`.
- Button hover lift: `translateY(-2px)` + `box-shadow: 0 10px 28px rgba(212,175,55,.3)`.

## Responsive Strategy
Mobile-first. Three tiers, implemented as `min-width` media queries:

**Base (<768px)** — single-column block stack, centered hero content and CTAs, 1rem side padding. Header shows logo + hamburger; a collapsible panel drops below the header. A **sticky bottom nav bar** (4 items, fixed, `z-index: 50`) is present; `<body>` wrapper carries `padding-bottom: 74px` to clear it.

**≥768px** — content blocks become 2 columns (`hero`, `two`, `features`, `footcols` → `1.4fr 1fr 1fr`); hamburger and bottom nav hide; the horizontal nav bar shows; hero CTA stack becomes a row; venue stat grid goes 4-across; bottom padding drops to 0.

**≥1024px** — feature and event grids go 4-across / stay 3-across respectively; side padding 2.5rem. Container stays capped at 1200px.

In the prototype these switches are attribute selectors (`[data-r="hero"]`, `[data-r="features"]`, …) inside the helmet `<style>`, because the tool requires inline styles elsewhere. Reimplement as ordinary component CSS.

**Layout gotcha worth carrying over:** grid items containing a full-bleed image need `min-width: 0; overflow: hidden`, otherwise the image's intrinsic width blows out the track and the page scrolls horizontally at tablet widths.

## Screens / Sections

The site is one scrolling page. Anchors: `#top`, `#classes`, `#venue`, `#events`, `#teach`, `#contact`. `scroll-behavior: smooth` on `<html>`.

### 1. Header (sticky)
Sticky top, `z-index: 40`, `rgba(8,8,10,.88)` + `backdrop-filter: blur(10px)`, 1px gold hairline bottom.
- **Left:** 42px circular gold-outlined mark reading "918" (Cormorant 700), then a two-line lockup — "918 Dance Hub" (Cormorant 1.15rem) over "DANCE · EVENTS · TULSA" (.62rem, letter-spacing .28em, teal). Replace the text mark with the client's real circular logo when supplied.
- **Right (≥768):** Classes / Venue / Events / Teach links + a gold pill CTA "Book a Tour" (min-height 44px).
- **Right (<768):** 48×48 hamburger button, 1px gold border, `border-radius: 12px`, three bars (two gold, one shorter teal). `aria-expanded` bound to menu state, `aria-label="Toggle menu"`.
- **Collapsed panel:** vertical list of the four links, each 48px min-height, separated by `rgba(255,255,255,.06)` rules. Closes on link click.

### 2. Hero
Two-column at ≥768 (`1fr 1fr`, gap 3rem, center-aligned); stacked and center-aligned on mobile.
- Pill badge: "Opening Fall 2026 · Tulsa", teal 1px border, uppercase .68rem, letter-spacing .22em.
- H1: "Where moves" / line break / "create memories" — the second line in Great Vibes with the gold gradient clipped to text.
- Subtext (46ch max): "A dance studio and event venue under one roof. Classes for every level and every style, plus a space built for birthdays, weddings, showers, parties, and corporate events."
- Two CTAs, stacked on mobile (max-width 380px, full width), row at ≥768: primary gold pill "See Class Schedule" → `#classes`; outlined teal pill "Rent the Venue" → `#venue`. Both `min-height: 52px`.
- Right: image frame — 10px gradient border (`linear-gradient(140deg, rgba(212,175,55,.55), rgba(42,168,163,.25), rgba(212,175,55,.15))`) at radius 20, inner image at radius 14, height `clamp(260px, 60vw, 520px)`. Ballroom / dance-floor photo.

### 3. Feature Grid — 4 cards
1 col → 2×2 at 768 → 4 across at 1024. Card: 1px `rgba(212,175,55,.2)` border, radius 16, padding `1.5rem 1.35rem`, subtle top-lit gradient fill. Contents: 44px teal-outlined circle with a roman numeral, uppercase gold-light title, muted body.

| # | Title | Body |
|---|---|---|
| I | Dance Classes | All levels, all styles. Group classes, series, and private lessons. |
| II | Event Rentals | Birthdays, weddings, showers, parties and more, on a floor built to host. |
| III | Social Events | Monthly socials and themed nights. Dance, connect, make memories. |
| IV | A Community | Built on passion, respect and good vibes. Come once, you'll come back. |

The roman numerals stand in for icons — swap in a real icon set (Lucide or similar) at ~20px, teal stroke, centered in the 44px ring.

### 4. Classes (`#classes`)
Band with gold hairlines top and bottom and a `radial-gradient(120% 80% at 50% 0%, rgba(212,175,55,.07), transparent 60%)` wash. Two columns at ≥768.
- Left: eyebrow "Dance Classes", h2 "All levels. All styles. No partner required.", body paragraph, outlined gold CTA "Reserve a Spot".
- Right: schedule list — rows with `space-between`, class name (1rem, weight 600) + level label (.78rem uppercase muted) on the left, day/time in teal on the right (`white-space: nowrap`). Hover tints the row teal.

Rows: West Coast Swing / Beginner welcome / Mon · 7:00 pm; Salsa & Bachata / All levels / Tue · 7:30 pm; Country Two-Step / Beginner / Wed · 6:30 pm; Ballroom Basics / Intro series / Thu · 7:00 pm; Line Dance / Drop-in / Sat · 11:00 am. **These are placeholders** — wire to the real schedule (see *Data*).

### 5. Venue (`#venue`)
Two columns at ≥768, image **left**, copy right (inverted from the hero for rhythm). Image frame: radius 18, 1px gold border, height `clamp(240px, 55vw, 460px)`.
- Eyebrow "Event Rentals", h2 "A premier destination for big moments", body paragraph.
- Stat grid: 2×2 mobile → 4 across at 768. Each tile: Cormorant 1.5rem gold value over a .7rem uppercase muted label. Values: 3,000 / Sq ft floor · 150 / Guest capacity · 4 hr / Min. rental · 7 days / Availability. **Placeholder numbers.**
- Primary gold CTA "Check Availability".

### 6. Social Events (`#events`)
Top gold hairline, `linear-gradient(180deg, rgba(212,175,55,.05), transparent)` wash. Eyebrow "Social Events", h2 "Dance. Connect. Make memories." Three cards, 1 col → 2 → 3-across on the same grid rule as features (they land 3-up because there are only three).
- Card: radius 16, `overflow: hidden`, 170px image band on top, then body: teal .72rem uppercase date, Cormorant 1.4rem title, muted description. Hover lift + gold border.
- Cards: "First Friday / Friday Night Social" · "Monthly / Beginner Bootcamp" · "Seasonal / Themed Gala Nights".

### 7. Instructor Recruiting (`#teach`)
Full-width panel inside the container: 1px `rgba(212,175,55,.35)` border, radius 20, centered text, `radial-gradient(100% 120% at 50% 0%, rgba(42,168,163,.12), rgba(255,255,255,.02))` fill.
- Eyebrow "Now Hiring", h2 "We're looking for dance instructors of all types", body: "918 Dance Hub & Events is building a vibrant community and we want you to be a part of it. All styles welcome, flexible schedules, and room to grow your brand."
- Gold CTA "Apply to Teach" → `#contact` (point at the real application form or mailto).
- Closing line in Great Vibes 1.6rem gold: "Inspire. Teach. Connect."

### 8. Contact (`#contact`)
Neutral hairline top, two columns at ≥768. Left: h2 "Come see the space" + one-line promise. Right: three 48px-min rows — email (`mailto:`), phone (`tel:`), and a non-interactive "Studio / Tulsa, Oklahoma" row. Each row: uppercase muted label left, value right, gold-tinted hover on the two links. **Email and phone are placeholders** (`hello@918dancehubandevents.com`, `(918) 555-0918`).

Consider replacing with a real inquiry form (name, email, event type, date, message) posting to the client's CRM or an email service — the design leaves room for it in this two-column slot.

### 9. Footer
`#050506`, gold hairline top. Grid: 1 col → `1.4fr 1fr 1fr` at 768.
- Col 1: "918 Dance Hub & Events LLC" (Cormorant 1.35rem), tagline "Dance classes and event rentals in Tulsa. More than a studio, it's a place to belong.", then three 48×48 social tiles (IG / FB / TT text marks — replace with real icons and real profile URLs).
- Cols 2–3: "Explore" (Classes, Event Rentals, Social Events, Teach With Us) and "Info" (Contact, Studio Policies, Private Lessons, Gift Cards) — each link 40px min-height, teal uppercase column heading.
- Bottom bar: "© 2026 918 Dance Hub & Events LLC. All rights reserved." left, "www.918dancehubandevents.com" right; wraps on narrow screens.

### 10. Bottom Nav (mobile only)
Fixed bottom, 4 equal columns, `rgba(10,10,12,.96)` + blur, gold hairline top. Each item ≥60px tall: roman numeral in gold over a .64rem uppercase label. Classes / Venue / Events / Contact. Hidden at ≥768.

## Interactions & Behavior
- **Mobile menu:** single boolean; hamburger toggles, any link click closes. `aria-expanded` reflects state.
- **Anchor navigation:** in-page `href="#id"` with `scroll-behavior: smooth`. If the target framework uses a router, keep these as hash anchors, and offset scroll targets by the sticky header height (~66px) so headings aren't hidden under it — the prototype doesn't do this and should.
- **Hover:** links → `#f7e6b4`; cards lift 4px with a gold border and drop shadow; buttons lift 2px with a gold glow; schedule rows and contact rows tint.
- **Focus:** global `:focus-visible` → `2px solid #2aa8a3`, `outline-offset: 3px`, `border-radius: 6px`. Keep this; it is the only visible keyboard affordance.
- **Touch targets:** every interactive element is ≥48px in its smallest dimension on mobile (buttons 52px, nav rows 48px, bottom-nav items 60px, social tiles 48×48). Preserve this.
- No loading, error, or form-validation states exist in the prototype — define them when the contact form is built.

## State Management
Only one piece of UI state: `menuOpen: boolean` for the mobile nav. Everything else is static content rendered from arrays.

Two tweakable props exist in the prototype and can be dropped in production: `accent` (teal hex) and `showVenueStats` (boolean).

## Data
These arrays drive repeated sections and are the natural CMS boundary if the client wants to self-edit:
- `features` — 4 × `{ mark, title, body }`
- `classes` — 5 × `{ name, level, when }`
- `venueStats` — 4 × `{ value, label }`
- `events` — 3 × `{ date, title, body, image }`
- `socials` — 3 × `{ label, mark, href }`
- `bottomNav` — 4 × `{ href, label, mark }`

## Assets
No real assets are included. The prototype uses `image-slot.js` — a drag-and-drop placeholder component from the prototyping tool. **Do not port it.** Replace each slot with a real, optimized image (`<img>` with `width`/`height`, `loading="lazy"` below the fold, responsive `srcset`):

| Slot id | Placement | Needs |
|---|---|---|
| `hero-ballroom` | Hero right | Ballroom / dance floor, landscape, hero quality |
| `venue-room` | Venue left | Event setup (tables, uplighting) |
| `event-social` | Events card 1 | Social night crowd |
| `event-bootcamp` | Events card 2 | Class in session |
| `event-gala` | Events card 3 | Themed gala night |

Also needed from the client: the real circular "918 Dance Hub & Events LLC" logo (currently a text stand-in in the header), a favicon set, and an OG share image. Brand fonts in the flyers are close to but not identical to Cormorant Garamond / Great Vibes; if the client has the originals licensed, substitute them.

## Placeholder content — confirm with client before launch
Class names and times, venue stats, event dates and descriptions, email address, phone number, social URLs, footer "Info" links (Studio Policies, Private Lessons, Gift Cards have no destinations yet), and the "Opening Fall 2026" badge.

## Files
- `918 Dance Hub.dc.html` — the full design prototype. Opens directly in a browser.
- `image-slot.js` — placeholder-image runtime the prototype depends on; reference only, do not port.
