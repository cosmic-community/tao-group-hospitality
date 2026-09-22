// app/venues/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getVenues, getVenueBySlug, getMetafieldValue } from '@/lib/cosmic'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const venues = await getVenues()
  return venues.map((venue) => ({ slug: venue.slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const venue = await getVenueBySlug(slug)

  if (!venue) {
    return { title: 'Venue Not Found — Tao Group Hospitality' }
  }

  return {
    title: `${venue.title} — Tao Group Hospitality`,
    description:
      getMetafieldValue(venue.metadata?.seo_description) ||
      `Discover ${venue.title}, part of the Tao Group Hospitality collection.`,
  }
}

export default async function VenuePage({ params }: PageProps) {
  const { slug } = await params
  const venue = await getVenueBySlug(slug)

  if (!venue) {
    notFound()
  }

  const imgixUrl = venue.metadata?.featured_image?.imgix_url
  const content = getMetafieldValue(venue.metadata?.content)

  return (
    <article className="min-h-screen bg-ink">
      <div className="relative flex h-[60vh] min-h-[420px] w-full items-end overflow-hidden">
        {imgixUrl ? (
          <img
            src={`${imgixUrl}?w=2400&h=1400&fit=crop&auto=format,compress`}
            alt={venue.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-ink to-black" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-14 md:px-10">
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-gold">
            Venue
          </p>
          <h1 className="font-display text-4xl font-thin uppercase tracking-[0.08em] text-cream md:text-6xl">
            {venue.title}
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-16 md:px-10">
        <Link
          href="/venues"
          className="mb-10 inline-block text-xs uppercase tracking-[0.25em] text-cream/60 transition-colors hover:text-gold"
        >
          ← Back to Venues
        </Link>

        {content ? (
          <div
            className="prose prose-invert max-w-none prose-headings:font-display prose-headings:uppercase prose-headings:tracking-[0.05em] prose-a:text-gold prose-p:text-cream/80"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <p className="text-cream/50">More details coming soon.</p>
        )}
      </div>
    </article>
  )
}