import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Job } from '../../../payload-types'

export const revalidateJob: CollectionAfterChangeHook<Job> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/jobs/${doc.slug}`

    payload.logger.info(`Revalidating job at path: ${path}`)

    revalidatePath(path)

    // Revalidate the main jobs page
    revalidatePath('/jobs')

    // Revalidate the home page
    revalidatePath('/')

    // Revalidate the jobs sitemap
    revalidateTag('jobs-sitemap')
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Job> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = doc?.slug === 'home' ? '/' : `/${doc?.slug}`
    revalidatePath(path)
    revalidateTag('jobs-sitemap')
  }

  return doc
}
