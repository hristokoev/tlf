import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { ProductsBlock as ProductsBlockProps } from '@/payload-types'
import { ProductsBlockClient } from './Component.client'

export const ProductsBlock: React.FC<ProductsBlockProps & { lang?: string }> = async (props) => {
  const { heading, lang } = props
  const payload = await getPayload({ config: configPromise })
  const products = await payload.find({
    collection: 'products',
    limit: 20,
    sort: 'createdAt',
    locale: lang as 'cs',
  })
  const productsDocs = products.docs

  return <ProductsBlockClient heading={heading} products={productsDocs} />
}
