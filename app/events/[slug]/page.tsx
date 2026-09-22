// app/events/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  getEvents,
  getEventBySlug,
  getMetafieldValue,
  formatDate,
} from '@/lib/cosmic'
import { markdownToHtml } from '@/lib/markdown'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const events = await getEvents()
  return events.map((event) => ({ slug: event.slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const event = await getEventBySlug(slug)

  if (!event) {
    return { title: 'Event Not Found — Tao Group Hospitality' }
  }

  return {
    title: `${event.title} — Tao Group Hospitality`,
    description:
      getMetafieldValue(event.metadata?.seo_description) ||
      `Details for ${event.title}, hosted by Tao Group Hospitality.`,
  }
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params
  const event = await getEventBySlug(slug)

  if (!event) {
    notFound()
  }

  const imgixUrl = event.metadata?.featured_image?.imgix_url
  const content = getMetafieldValue(event.metadata?.content)
  const date = formatDate(event.metadata?.published_at)

  return (
    <article className="min-h-screen bg-ink">
      <div className="relative flex h-[60vh] min-h-[420px] w-full items-end overflow-hidden">
        {imgixUrl ? (
          <img
            src={`${imgixUrl}?w=2400&h=1400&fit=crop&auto=format,compress`}
            alt={event.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-ink to-black" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-14 md:px-10">
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-gold">
            Event
          </p>
          <h1 className="font-display text-4xl font-thin uppercase tracking-[0.08em] text-cream md:text-6xl">
            {event.title}
          </h1>
          {date && (
            <p className="mt-4 text-sm uppercase tracking-[0.2em] text-cream/70">
              {date}
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-16 md:px-10">
        <Link
          href="/events"
          className="mb-10 inline-block text-xs uppercase tracking-[0.25em] text-cream/60 transition-colors hover:text-gold"
        >
          ← Back to Events
        </Link>

        {content ? (
          <div
            className="prose prose-invert max-w-none prose-headings:font-display prose-headings:uppercase prose-headings:tracking-[0.05em] prose-a:text-gold prose-p:text-cream/80"
            dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }}
          />
        ) : (
          <p className="text-cream/50">More details coming soon.</p>
        )}
      </div>
    </article>
  )
}