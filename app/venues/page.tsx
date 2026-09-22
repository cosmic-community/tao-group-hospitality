import type { Metadata } from 'next'
import { getVenues } from '@/lib/cosmic'
import ContentCard from '@/components/ContentCard'
import Reveal from '@/components/Reveal'

export const metadata: Metadata = {
  title: 'Venues — Tao Group Hospitality',
  description:
    'Explore our global collection of iconic restaurants, nightclubs, and hospitality destinations.',
}

export default async function VenuesPage() {
  const venues = await getVenues()

  return (
    <div className="min-h-screen bg-ink pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-gold">
            Destinations
          </p>
          <h1 className="mb-16 font-display text-4xl font-thin uppercase tracking-[0.1em] text-cream md:text-5xl">
            Venues
          </h1>
        </Reveal>

        {venues.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {venues.map((venue, i) => (
              <Reveal key={venue.id} delay={(i % 6) * 80}>
                <ContentCard
                  href={`/venues/${venue.slug}`}
                  title={venue.title}
                  imgixUrl={venue.metadata?.featured_image?.imgix_url}
                />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="text-cream/50">No venues available yet.</p>
        )}
      </div>
    </div>
  )
}