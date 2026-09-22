import type { Metadata } from 'next'
import { getArtists } from '@/lib/cosmic'
import ContentCard from '@/components/ContentCard'
import Reveal from '@/components/Reveal'

export const metadata: Metadata = {
  title: 'Artists — Tao Group Hospitality',
  description:
    'Meet the world-class artists and performers featured across the Tao Group Hospitality collection.',
}

export default async function ArtistsPage() {
  const artists = await getArtists()

  return (
    <div className="min-h-screen bg-ink pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-gold">
            Talent
          </p>
          <h1 className="mb-16 font-display text-4xl font-thin uppercase tracking-[0.1em] text-cream md:text-5xl">
            Artists
          </h1>
        </Reveal>

        {artists.length > 0 ? (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {artists.map((artist, i) => (
              <Reveal key={artist.id} delay={(i % 8) * 60}>
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
    </div>
  )
}