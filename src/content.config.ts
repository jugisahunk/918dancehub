import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Schema follows docs/content-model.md (wayfinder #10). Collections are
// seeded with handoff-v1's placeholder content until the real content lands
// via wayfinder #7 (classes), #8 (social events), #13 (venue/rentals).

const instructors = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/instructors' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      bio: z.string(),
      photo: image().optional(),
    }),
});

const classes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/classes' }),
  schema: z.object({
    name: z.string(),
    instructor: reference('instructors'),
    level: z.string(),
    schedule: z.string(),
    description: z.string(),
    whatToWear: z.string().optional(),
    capacity: z.number().optional(),
    prerequisites: z.string().optional(),
    pricing: z.string(),
    order: z.number(),
  }),
});

const socialEvents = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/social-events' }),
  schema: z.object({
    name: z.string(),
    recurrence: z.string(),
    description: z.string(),
    coverCharge: z.string(),
    level: z.string(),
    partnerRequired: z.boolean(),
    order: z.number(),
  }),
});

const businessLines = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/business-lines' }),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    body: z.string(),
  }),
});

export const collections = { instructors, classes, socialEvents, businessLines };
