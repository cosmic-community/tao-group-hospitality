'use client'

import { useState } from 'react'
import Link from 'next/link'

const FOOTER_LINKS = [
  {
    title: 'Explore',
    links: [
      { href: '/venues', label: 'Venues' },
      { href: '/events', label: 'Events' },
      { href: '/artists', label: 'Artists' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/', label: 'About' },
      { href: '/', label: 'Careers' },
      { href: '/', label: 'Press' },
    ],
  },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
    setEmail('')
  }

  return (
    <footer className="border-t border-white/10 bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 border-b border-white/10 pb-16 md:flex-row md:items-center">
          <div>
            <h3 className="font-display text-2xl uppercase tracking-[0.2em] text-cream">
              Join the List
            </h3>
            <p className="mt-2 max-w-md text-sm text-cream/60">
              Be first to know about new openings, exclusive events, and
              artist residencies worldwide.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border border-white/20 bg-transparent px-4 py-3 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
            />
            <button
              type="submit"
              className="whitespace-nowrap rounded-full bg-gold px-6 py-3 text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-cream"
            >
              {submitted ? 'Thanks!' : 'Subscribe'}
            </button>
          </form>
        </div>

        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <p className="font-display text-lg uppercase tracking-[0.3em] text-cream">
              Tao Group
            </p>
            <p className="mt-3 max-w-xs text-sm text-cream/50">
              A global hospitality collective of iconic restaurants,
              nightclubs, and experiential venues.
            </p>
          </div>

          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <p className="mb-4 text-xs uppercase tracking-[0.25em] text-gold">
                {col.title}
              </p>
              <ul className="space-y-3">
                {col.links.map((link, i) => (
                  <li key={`${link.label}-${i}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream/60 transition-colors hover:text-cream"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-gold">
              Follow
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-cream/60 transition-colors hover:text-gold"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-cream/60 transition-colors hover:text-gold"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-cream/60 transition-colors hover:text-gold"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-cream/40 md:flex-row">
          <p>© {new Date().getFullYear()} Tao Group Hospitality. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-cream">
              Privacy Policy
            </Link>
            <Link href="/" className="hover:text-cream">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}