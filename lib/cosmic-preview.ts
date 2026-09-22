import { createBucketClient } from '@cosmicjs/sdk'
import { cookies } from 'next/headers'

/**
 * Reads the preview token from the request cookies.
 *
 * `cookies()` throws when it is called outside of a request scope, which is
 * exactly what happens during `generateStaticParams()` and other build-time
 * data collection. Preview is never active in those contexts, so we swallow
 * the error and fall back to the public (published) read.
 */
async function readPreviewToken(): Promise<string | undefined> {
  try {
    const cookieStore = await cookies()
    return cookieStore.get('cosmic_preview')?.value
  } catch {
    return undefined
  }
}

export async function getCosmic() {
  const previewToken = await readPreviewToken()

  const cosmic = createBucketClient({
    bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
    readKey: process.env.COSMIC_READ_KEY as string,
    writeKey: process.env.COSMIC_WRITE_KEY as string,
    ...(previewToken ? { previewToken } : {}),
  })

  return { cosmic, previewToken }
}
