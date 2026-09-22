export interface CosmicMedia {
  url: string
  imgix_url: string
}

export interface BaseMetadata {
  featured_image?: CosmicMedia
  published_at?: string
  seo_description?: string
  content?: string
}

export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: BaseMetadata
  type: string
  created_at: string
  modified_at: string
}

export interface Venue extends CosmicObject {
  type: 'venue'
}

export interface Event extends CosmicObject {
  type: 'event'
}

export interface Artist extends CosmicObject {
  type: 'artist'
}