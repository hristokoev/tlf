import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Page } from '../../../payload-types'

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const languages = ['cs', 'en', 'de']

    if (doc._status === 'published') {
      // Revalidate for all languages
      languages.forEach((lang) => {
        if (doc.slug === 'home') {
          // For home page, revalidate the language root
          const path = `/${lang}`
          payload.logger.info(`Revalidating home page at path: ${path}`)
          revalidatePath(path)
        } else {
          // For regular pages, revalidate the page path
          const path = `/${lang}/${doc.slug}`
          payload.logger.info(`Revalidating page at path: ${path}`)
          revalidatePath(path)
        }
      })

      revalidateTag('pages-sitemap')
    }

    // If the page was previously published, we need to revalidate the old paths
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      languages.forEach((lang) => {
        if (previousDoc.slug === 'home') {
          const oldPath = `/${lang}`
          payload.logger.info(`Revalidating old home page at path: ${oldPath}`)
          revalidatePath(oldPath)
        } else {
          const oldPath = `/${lang}/${previousDoc.slug}`
          payload.logger.info(`Revalidating old page at path: ${oldPath}`)
          revalidatePath(oldPath)
        }
      })

      revalidateTag('pages-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Page> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const languages = ['cs', 'en', 'de']

    languages.forEach((lang) => {
      if (doc?.slug === 'home') {
        const path = `/${lang}`
        revalidatePath(path)
      } else {
        const path = `/${lang}/${doc?.slug}`
        revalidatePath(path)
      }
    })

    revalidateTag('pages-sitemap')
  }

  return doc
}
