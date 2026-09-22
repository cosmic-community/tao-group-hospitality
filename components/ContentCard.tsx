import Link from 'next/link'

interface ContentCardProps {
  href: string
  title: string
  imgixUrl?: string
  subtitle?: string
  aspectClass?: string
}

export default function ContentCard({
  href,
  title,
  imgixUrl,
  subtitle,
  aspectClass = 'aspect-[4/5]',
}: ContentCardProps) {
  return (
    <Link
      href={href}
      className={`group relative block overflow-hidden bg-neutral-900 ${aspectClass}`}
    >
      {imgixUrl ? (
        <img
          src={`${imgixUrl}?w=1200&h=1500&fit=crop&auto=format,compress`}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-neutral-900 to-black">
          <span className="px-4 text-center font-display text-sm uppercase tracking-[0.3em] text-gold/70">
            {title}
          </span>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        {subtitle && (
          <p className="mb-1 text-xs uppercase tracking-[0.2em] text-gold">
            {subtitle}
          </p>
        )}
        <h3 className="font-display text-lg uppercase tracking-[0.15em] text-cream">
          {title}
        </h3>
      </div>
    </Link>
  )
}