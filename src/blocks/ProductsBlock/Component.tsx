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
    <section className="bg-neutral-100 py-12 md:py-16 lg:py-24 px-4 md:px-6 lg:px-8">
      <div className="container">
        <div className="flex gap-8 md:gap-12 lg:gap-16 flex-col">
          <span className="uppercase text-sm md:text-base lg:text-lg tracking-wide font-medium">
            {heading}
          </span>

          {/* Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {productsDocs.map((product) => (
              <a
                href={`/produkty/${product.slug}`}
                key={product.id}
                className="w-full flex flex-col group"
              >
                {/* Product Image */}
                <div className="relative overflow-hidden">
                  <Media
                    resource={product.content.media[0]}
                    className="w-full aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5]"
                    imgClassName="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Overlay with title */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-18 md:h-20 px-3 sm:px-4 py-2 sm:py-3 backdrop-blur-md bg-white/50 border-t border-white/20">
                    <h2 className="uppercase font-bold text-sm sm:text-base md:text-lg lg:text-xl line-clamp-2 leading-tight">
                      {product.title}
                    </h2>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Button positioned responsively */}
          <div className="flex justify-center sm:justify-end">
            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 text-sm md:text-base"
            >
              Ukazát více
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
