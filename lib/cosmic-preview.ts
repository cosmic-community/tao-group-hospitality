import { createBucketClient } from '@cosmicjs/sdk'
import { cookies } from 'next/headers'

function createClient(previewToken?: string) {
  return createBucketClient({
    bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
    readKey: process.env.COSMIC_READ_KEY as string,
    writeKey: process.env.COSMIC_WRITE_KEY as string,
    ...(previewToken ? { previewToken } : {}),
  })
}

/**
 * `cookies()` throws when it is called outside of a request scope, which is
 * exactly what happens while Next.js collects page data at build time
 * (generateStaticParams / generateMetadata). There is no visitor in that
 * context, so there is no preview token either: fall back to the public
 * client instead of failing the build.
 *
 * Any other error (notably Next's DynamicServerError bailout, which is how
 * static/dynamic detection works during rendering) is re-thrown untouched.
 */
async function readPreviewToken(): Promise<string | undefined> {
  try {
    const cookieStore = await cookies()
    return cookieStore.get('cosmic_preview')?.value
  } catch (error) {
    const message = error instanceof Error ? error.message : ''
    if (message.includes('outside a request scope')) {
      return undefined
    }
    throw error
  }
}

export async function getCosmic() {
  const previewToken = await readPreviewToken()

  return { cosmic: createClient(previewToken), previewToken }
}

/**
 * Cookie-free client for contexts that never have a request scope, such as
 * generateStaticParams. Safe to call at build time.
 */
export function getCosmicStatic() {
  return { cosmic: createClient(), previewToken: undefined as string | undefined }
}
