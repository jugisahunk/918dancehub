# 918dancehub

Website for the 918 Dance Hub and Events Studio in Tulsa, OK.

Astro static site (ADR: [docs/adr/0001-tech-stack.md](docs/adr/0001-tech-stack.md)), staged on GitHub Pages via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

## Develop

```bash
npm install
npm run dev
```

## Content

Class, social event, and business-line copy live as Astro content collections in `src/content/`. Venue and footer singletons live in `src/data/`. Schema: [docs/content-model.md](docs/content-model.md).

Several fields are placeholders pending open content-gathering tickets:
- Real class names/instructors/pricing — [#7](https://github.com/jugisahunk/918dancehub/issues/7)
- Real social event details — [#8](https://github.com/jugisahunk/918dancehub/issues/8)
- Real venue stats/rental terms — [#13](https://github.com/jugisahunk/918dancehub/issues/13)

## Inquiry form

Posts to Formspree (ADR-0001). Set `PUBLIC_FORMSPREE_FORM_ID` in the environment (see `.env.example`) once a real form id exists.
