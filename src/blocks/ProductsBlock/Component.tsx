import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { ProductsBlock as ProductsBlockProps } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { Media } from '@/components/Media'

export const ProductsBlock: React.FC<ProductsBlockProps> = async (props) => {
  const { heading } = props
  const payload = await getPayload({ config: configPromise })
  const products = await payload.find({
    collection: 'products',
    limit: 20,
    sort: 'createdAt',
  })
  const productsDocs = products.docs

  return (
    <section className="bg-neutral-100 container py-24">
      <div className="flex gap-16 flex-col">
        <span className="uppercase">{heading}</span>
        <div className="grid grid-cols-3 gap-8">
          {productsDocs.map((product) => (
            <div key={product.id} className="w-full flex flex-col">
              <Media
                resource={product.media}
                className="w-full"
                imgClassName="w-full h-[550px] object-cover"
              />
              <div className="w-full h-[80px] px-4 py-2 backdrop-blur-md -mt-[80px] bg-white/50 relative z-10">
                <h2 className="uppercase font-bold text-xl line-clamp-2">{product.title}</h2>
              </div>
            </div>
          ))}
        </div>
        <div className="self-end">
          <Button variant="secondary" size="lg">
            Ukazát více
          </Button>
        </div>
      </div>
    </section>
  )
}
