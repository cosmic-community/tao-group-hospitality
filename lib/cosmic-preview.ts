import { createBucketClient } from '@cosmicjs/sdk'
import { cookies } from 'next/headers'

export async function getCosmic() {
  const cookieStore = await cookies()
  const previewToken = cookieStore.get('cosmic_preview')?.value

  const cosmic = createBucketClient({
    bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
    readKey: process.env.COSMIC_READ_KEY as string,
    writeKey: process.env.COSMIC_WRITE_KEY as string,
    ...(previewToken ? { previewToken } : {}),
  })

  return { cosmic, previewToken }
}