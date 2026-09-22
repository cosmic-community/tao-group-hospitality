# Tao Group Hospitality

![App Preview](https://imgix.cosmicjs.com/a25b41c0-b629-11f1-bece-a90b7dbb439b-CleanShot-2026-09-21-at-19-02-072x.png?w=1200&h=630&fit=crop&auto=format,compress)

A dark, global-luxury hospitality website built with Next.js and Cosmic — showcasing venues, events, and artists across the Tao Group Hospitality collection.

## Features

- 🌑 Dark, editorial visual language modeled on taogroup.com
- 🖼️ Full-bleed homepage hero with gradient + amber tint and dual pill CTAs
- 🏛️ Venue, Event, and Artist index + detail pages with hover-zoom cards
- 📅 Events automatically sorted by publish date, newest first
- ✨ Subtle scroll-reveal animations (pure CSS transitions + IntersectionObserver)
- 📱 Sticky nav with full-screen dark mobile menu
- ✉️ Newsletter signup band in the footer
- ⚡ Server-side only Cosmic SDK reads, fully typed with TypeScript

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6ab1df0f21ec3aaaf97fb243&clone_repository=6ab1e8a821ec3aaaf97fb3ca)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> No content model prompt provided - app built from existing content structure

### Code Generation Prompt

> Build a Next.js application for a company website called "Tao Group Hospitality". The content is managed in Cosmic CMS with the following object types: venue, event, artist. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: Build a dark luxury global hospitality website for Tao Group Hospitality, visually modeled on taogroup.com.
>
> IMPORTANT: Keep the component count small and self-contained. Do NOT reference any component or helper you do not also write. Inline small UI rather than creating many one-off files.
>
> CONTENT MODEL (Cosmic types that already exist — use these exact slugs, do not create new types):
> - "venue" (Venues)
> - "event" (Events)
> - "artist" (Artists)
> Each type has ONLY these metafields: metadata.featured_image (file/image, use its imgix_url), metadata.published_at (date), metadata.seo_description (textarea), metadata.content (rich text HTML/markdown string). There are NO relationship fields, so do not attempt to join venues to events. Use object title and slug for names and routing. Fall back gracefully when featured_image is missing.
>
> PAGES (keep to this list):
> 1. Home — full-bleed hero image with dark-to-transparent gradient and warm amber tint, thin large display headline, two pill CTAs ("View Venues", "Reservations"). Then a featured venues grid, an upcoming events strip, and a featured artists row. Newsletter signup band in the footer area (inline, non-functional form is fine).
> 2. /venues — responsive image-card grid of all venues, hover zoom with title overlay.
> 3. /venues/[slug] — hero image, venue title, rendered metadata.content, back link.
> 4. /events — image-card grid of events sorted by metadata.published_at descending, showing formatted date.
> 5. /events/[slug] — hero image, title, formatted date, rendered content.
> 6. /artists — image-card grid of artists.
> 7. /artists/[slug] — hero portrait, name, rendered content.
>
> DESIGN:
> - Palette: near-black (#0a0a0a) backgrounds, cream/off-white text (#f5f1ea), muted gold accent (#c8a24a).
> - Typography: thin, wide letter-spaced uppercase display type for headings and nav; clean sans for body.
> - Sticky top nav: transparent over the hero, solid near-black on scroll. Wide-tracked "TAO GROUP" wordmark on the left, links to Venues / Events / Artists, and a white pill "Reservations" button on the right. Mobile hamburger with full-screen dark overlay menu.
> - Footer: dark, columned links, social icons as inline SVG, copyright.
> - Photography-forward editorial layouts, generous whitespace, subtle CSS-only fade/slide-in on scroll (no animation library).
> - Fully responsive, accessible (alt text from object titles), good Lighthouse basics.
>
> TECH: Next.js App Router, TypeScript, Tailwind CSS, Cosmic SDK server-side reads only (read key from env). Static metadata per page using object title and metadata.seo_description. Include generateStaticParams for the detail routes. Keep all Cosmic fetching in a single lib/cosmic.ts helper that you must actually write.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) with `@tailwindcss/typography`
- [Cosmic](https://www.cosmicjs.com) headless CMS via [`@cosmicjs/sdk`](https://www.cosmicjs.com/docs)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed
- A Cosmic account with a bucket containing `venue`, `event`, and `artist` objects

### Installation

```bash
bun install
bun run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Environment Variables

The following are automatically configured for you:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## Cosmic SDK Examples

```typescript
// Fetch all venues
const venues = await getVenues()

// Fetch a single event by slug
const event = await getEventBySlug('summer-residency')

// Fetch artists
const artists = await getArtists()
```

All reads happen server-side only, in Server Components, via a single helper at `lib/cosmic.ts`.

## Cosmic CMS Integration

This app reads three existing object types from your Cosmic bucket:

- **venue** — Venues, rendered on `/venues` and `/venues/[slug]`
- **event** — Events, rendered on `/events` and `/events/[slug]`, sorted by `metadata.published_at`
- **artist** — Artists, rendered on `/artists` and `/artists/[slug]`

Each type shares the same metafields: `featured_image`, `published_at`, `seo_description`, and `content`. Learn more about querying objects in the [Cosmic docs](https://www.cosmicjs.com/docs).

## Deployment Options

### Vercel

1. Push this repository to GitHub
2. Import the project into [Vercel](https://vercel.com)
3. Add the environment variables in the Vercel dashboard
4. Deploy

### Netlify

1. Push this repository to GitHub
2. Import the project into [Netlify](https://netlify.com)
3. Set build command to `bun run build` and publish directory to `.next`
4. Add the environment variables in the Netlify dashboard
5. Deploy
<!-- README_END -->