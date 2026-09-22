import type { Metadata } from 'next'
import { getEvents, formatDate } from '@/lib/cosmic'
import ContentCard from '@/components/ContentCard'
import Reveal from '@/components/Reveal'

export const metadata: Metadata = {
  title: 'Events — Tao Group Hospitality',
  description:
    'Discover upcoming events, residencies, and experiences across the Tao Group Hospitality collection.',
}

export default async function EventsPage() {
  const events = await getEvents()

  return (
    <div className="min-h-screen bg-ink pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-gold">
            Calendar
          </p>
          <h1 className="mb-16 font-display text-4xl font-thin uppercase tracking-[0.1em] text-cream md:text-5xl">
            Events
          </h1>
        </Reveal>

        {events.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event, i) => (
              <Reveal key={event.id} delay={(i % 6) * 80}>
                <ContentCard
                  href={`/events/${event.slug}`}
                  title={event.title}
                  imgixUrl={event.metadata?.featured_image?.imgix_url}
                  subtitle={formatDate(event.metadata?.published_at)}
                />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="text-cream/50">No events scheduled yet.</p>
        )}
      </div>
    </div>
  )
}