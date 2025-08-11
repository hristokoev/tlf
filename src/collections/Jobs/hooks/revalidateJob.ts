import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Job } from '../../../payload-types'

export const revalidateJob: CollectionAfterChangeHook<Job> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const languages = ['cs', 'en', 'de']

    // Revalidate for all languages
    languages.forEach((lang) => {
      // Revalidate the specific job page
      const jobPath = `/${lang}/jobs/${doc.slug}`
      payload.logger.info(`Revalidating job at path: ${jobPath}`)
      revalidatePath(jobPath)

      // Revalidate the jobs listing page
      const jobsPath = `/${lang}/jobs`
      revalidatePath(jobsPath)

      // Revalidate the home page (might show job openings)
      const homePath = `/${lang}`
      revalidatePath(homePath)
    })

    revalidateTag('jobs-sitemap')
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Job> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const languages = ['cs', 'en', 'de']

    languages.forEach((lang) => {
      // Revalidate the specific job page
      const jobPath = `/${lang}/jobs/${doc?.slug}`
      revalidatePath(jobPath)

      // Revalidate the jobs listing page
      const jobsPath = `/${lang}/jobs`
      revalidatePath(jobsPath)

      // Revalidate the home page
      const homePath = `/${lang}`
      revalidatePath(homePath)
    })

    revalidateTag('jobs-sitemap')
  }

  return doc
}
