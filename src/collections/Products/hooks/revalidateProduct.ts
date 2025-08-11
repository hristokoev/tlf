import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Product } from '../../../payload-types'

export const revalidateProduct: CollectionAfterChangeHook<Product> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/products/${doc.slug}`

    payload.logger.info(`Revalidating product at path: ${path}`)

    revalidatePath(path)

    // Revalidate the main products page
    revalidatePath('/products')

    // Revalidate the home page
    revalidatePath('/')

    // Revalidate the products sitemap
    revalidateTag('products-sitemap')
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Product> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = doc?.slug === 'home' ? '/' : `/${doc?.slug}`
    revalidatePath(path)
    revalidateTag('products-sitemap')
  }

  return doc
}
