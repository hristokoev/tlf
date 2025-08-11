import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Post } from '../../../payload-types'

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const languages = ['cs', 'en', 'de']

    // Revalidate for all languages
    languages.forEach((lang) => {
      // Revalidate the specific post page
      const postPath = `/${lang}/posts/${doc.slug}`
      payload.logger.info(`Revalidating post at path: ${postPath}`)
      revalidatePath(postPath)

      // Revalidate the posts listing page
      const postsPath = `/${lang}/posts`
      revalidatePath(postsPath)

      // Revalidate the home page (might show recent posts)
      const homePath = `/${lang}`
      revalidatePath(homePath)
    })

    revalidateTag('posts-sitemap')
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const languages = ['cs', 'en', 'de']

    languages.forEach((lang) => {
      // Revalidate the specific post page
      const postPath = `/${lang}/posts/${doc?.slug}`
      revalidatePath(postPath)

      // Revalidate the posts listing page
      const postsPath = `/${lang}/posts`
      revalidatePath(postsPath)

      // Revalidate the home page
      const homePath = `/${lang}`
      revalidatePath(homePath)
    })

    revalidateTag('posts-sitemap')
  }

  return doc
}
