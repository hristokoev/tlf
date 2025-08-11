import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Product } from '../../../payload-types'

export const revalidateProduct: CollectionAfterChangeHook<Product> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const languages = ['cs', 'en', 'de']

    // Revalidate for all languages
    languages.forEach((lang) => {
      // Revalidate the specific product page
      const productPath = `/${lang}/products/${doc.slug}`
      payload.logger.info(`Revalidating product at path: ${productPath}`)
      revalidatePath(productPath)

      // Revalidate the products listing page
      const productsPath = `/${lang}/products`
      revalidatePath(productsPath)

      // Revalidate the home page (might show featured products)
      const homePath = `/${lang}`
      revalidatePath(homePath)
    })

    revalidateTag('products-sitemap')
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Product> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const languages = ['cs', 'en', 'de']

    languages.forEach((lang) => {
      // Revalidate the specific product page
      const productPath = `/${lang}/products/${doc?.slug}`
      revalidatePath(productPath)

      // Revalidate the products listing page
      const productsPath = `/${lang}/products`
      revalidatePath(productsPath)

      // Revalidate the home page
      const homePath = `/${lang}`
      revalidatePath(homePath)
    })

    revalidateTag('products-sitemap')
  }

  return doc
}
