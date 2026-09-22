import Link from 'next/link'
import { getVenues, getEvents, getArtists, formatDate } from '@/lib/cosmic'
import ContentCard from '@/components/ContentCard'
import Reveal from '@/components/Reveal'

export const metadata = {
  title: 'Tao Group Hospitality',
  description:
    'A global hospitality collective of iconic restaurants, nightclubs, and entertainment venues.',
}

export default async function HomePage() {
  const [venues, events, artists] = await Promise.all([
    getVenues(),
    getEvents(),
    getArtists(),
  ])

  const heroSource =
    venues.find((v) => v.metadata?.featured_image?.imgix_url) ||
    events.find((e) => e.metadata?.featured_image?.imgix_url) ||
    artists.find((a) => a.metadata?.featured_image?.imgix_url)
  const heroImage = heroSource?.metadata?.featured_image?.imgix_url

  const featuredVenues = venues.slice(0, 6)
  const upcomingEvents = events.slice(0, 4)
  const featuredArtists = artists.slice(0, 4)

  return (
    <>
      {/* Hero */}
      <section className="relative flex h-screen min-h-[640px] w-full items-end overflow-hidden bg-ink">
        {heroImage ? (
          <img
            src={`${heroImage}?w=2400&h=1600&fit=crop&auto=format,compress`}
            alt="Tao Group Hospitality"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-ink to-black" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-amber-900/10" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 md:px-10 md:pb-32">
          <Reveal>
            <p className="mb-4 text-xs uppercase tracking-[0.4em] text-gold">
              Global Hospitality Collective
            </p>
            <h1 className="max-w-4xl font-display text-4xl font-thin uppercase leading-[1.05] tracking-[0.08em] text-cream sm:text-6xl md:text-7xl">
              Tao Group Hospitality
            </h1>
            <p className="mt-6 max-w-xl text-sm text-cream/70 md:text-base">
              Iconic restaurants, nightlife, and entertainment experiences
              spanning the world&apos;s most vibrant cities.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/venues"
                className="rounded-full bg-cream px-8 py-3 text-xs uppercase tracking-[0.25em] text-ink transition-colors hover:bg-gold"
              >
                View Venues
              </Link>
              <Link
                href="/venues"
                className="rounded-full border border-cream/40 px-8 py-3 text-xs uppercase tracking-[0.25em] text-cream transition-colors hover:border-gold hover:text-gold"
              >
                Reservations
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured Venues */}
      <section className="bg-ink px-6 py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.35em] text-gold">
                  Destinations
                </p>
                <h2 className="font-display text-3xl font-thin uppercase tracking-[0.1em] text-cream md:text-4xl">
                  Featured Venues
                </h2>
              </div>
              <Link
                href="/venues"
                className="text-xs uppercase tracking-[0.25em] text-cream/70 transition-colors hover:text-gold"
              >
                View All Venues →
              </Link>
            </div>
          </Reveal>

          {featuredVenues.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredVenues.map((venue, i) => (
                <Reveal key={venue.id} delay={i * 80}>
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
      </section>

      {/* Upcoming Events */}
      <section className="bg-black px-6 py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.35em] text-gold">
                  Calendar
                </p>
                <h2 className="font-display text-3xl font-thin uppercase tracking-[0.1em] text-cream md:text-4xl">
                  Upcoming Events
                </h2>
              </div>
              <Link
                href="/events"
                className="text-xs uppercase tracking-[0.25em] text-cream/70 transition-colors hover:text-gold"
              >
                View All Events →
              </Link>
            </div>
          </Reveal>

          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {upcomingEvents.map((event, i) => (
                <Reveal key={event.id} delay={i * 80}>
                  <ContentCard
                    href={`/events/${event.slug}`}
                    title={event.title}
                    imgixUrl={event.metadata?.featured_image?.imgix_url}
                    subtitle={formatDate(event.metadata?.published_at)}
                    aspectClass="aspect-square"
                  />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="text-cream/50">No events scheduled yet.</p>
          )}
        </div>
      </section>

      {/* Featured Artists */}
      <section className="bg-ink px-6 py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.35em] text-gold">
                  Talent
                </p>
                <h2 className="font-display text-3xl font-thin uppercase tracking-[0.1em] text-cream md:text-4xl">
                  Featured Artists
                </h2>
              </div>
              <Link
                href="/artists"
                className="text-xs uppercase tracking-[0.25em] text-cream/70 transition-colors hover:text-gold"
              >
                View All Artists →
              </Link>
            </div>
          </Reveal>

          {featuredArtists.length > 0 ? (
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {featuredArtists.map((artist, i) => (
                <Reveal key={artist.id} delay={i * 80}>
                  <ContentCard
                    href={`/artists/${artist.slug}`}
                    title={artist.title}
                    imgixUrl={artist.metadata?.featured_image?.imgix_url}
                    aspectClass="aspect-[3/4]"
                  />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="text-cream/50">No artists available yet.</p>
          )}
        </div>
      </section>
    </>
  )
}