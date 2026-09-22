import { getCosmic } from '@/lib/cosmic-preview'
import type { Venue, Event, Artist, CosmicObject } from '@/types'

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

export function formatDate(dateString?: string): string {
  const value = getMetafieldValue(dateString)
  if (!value) return ''
  const date = new Date(value)
  if (isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

const PROPS = ['id', 'slug', 'title', 'metadata', 'type', 'created_at', 'modified_at']

async function fetchObjects<T extends CosmicObject>(type: string): Promise<T[]> {
  const { cosmic, previewToken } = await getCosmic()
  try {
    const query = cosmic.objects.find({ type }).props(PROPS).depth(1)
    const response = previewToken ? await query.status('any') : await query
    return (response.objects as T[]) || []
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error(`Failed to fetch ${type} objects`)
  }
}

async function fetchObjectBySlug<T extends CosmicObject>(
  type: string,
  slug: string
): Promise<T | null> {
  const { cosmic, previewToken } = await getCosmic()
  try {
    const query = cosmic.objects.findOne({ type, slug }).props(PROPS).depth(1)
    const response = previewToken ? await query.status('any') : await query
    return (response.object as T) || null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error(`Failed to fetch ${type} with slug ${slug}`)
  }
}

export async function getVenues(): Promise<Venue[]> {
  return fetchObjects<Venue>('venue')
}

export async function getVenueBySlug(slug: string): Promise<Venue | null> {
  return fetchObjectBySlug<Venue>('venue', slug)
}

export async function getEvents(): Promise<Event[]> {
  const events = await fetchObjects<Event>('event')
  return events.sort((a, b) => {
    const dateA = new Date(getMetafieldValue(a.metadata?.published_at)).getTime()
    const dateB = new Date(getMetafieldValue(b.metadata?.published_at)).getTime()
    return (isNaN(dateB) ? 0 : dateB) - (isNaN(dateA) ? 0 : dateA)
  })
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  return fetchObjectBySlug<Event>('event', slug)
}

export async function getArtists(): Promise<Artist[]> {
  return fetchObjects<Artist>('artist')
}

export async function getArtistBySlug(slug: string): Promise<Artist | null> {
  return fetchObjectBySlug<Artist>('artist', slug)
}