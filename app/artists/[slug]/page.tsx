// app/artists/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getArtists, getArtistBySlug, getMetafieldValue } from '@/lib/cosmic'
import { markdownToHtml } from '@/lib/markdown'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const artists = await getArtists()
  return artists.map((artist) => ({ slug: artist.slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const artist = await getArtistBySlug(slug)

  if (!artist) {
    return { title: 'Artist Not Found — Tao Group Hospitality' }
  }

  return {
    title: `${artist.title} — Tao Group Hospitality`,
    description:
      getMetafieldValue(artist.metadata?.seo_description) ||
      `Learn more about ${artist.title}.`,
  }
}

export default async function ArtistPage({ params }: PageProps) {
  const { slug } = await params
  const artist = await getArtistBySlug(slug)

  if (!artist) {
    notFound()
  }

  const imgixUrl = artist.metadata?.featured_image?.imgix_url
  const content = getMetafieldValue(artist.metadata?.content)

  return (
    <article className="min-h-screen bg-ink">
      <div className="relative flex h-[65vh] min-h-[460px] w-full items-end overflow-hidden">
        {imgixUrl ? (
          <img
            src={`${imgixUrl}?w=2000&h=2400&fit=crop&auto=format,compress`}
            alt={artist.title}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-ink to-black" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-14 md:px-10">
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-gold">
            Artist
          </p>
          <h1 className="font-display text-4xl font-thin uppercase tracking-[0.08em] text-cream md:text-6xl">
            {artist.title}
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-16 md:px-10">
        <Link
          href="/artists"
          className="mb-10 inline-block text-xs uppercase tracking-[0.25em] text-cream/60 transition-colors hover:text-gold"
        >
          ← Back to Artists
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