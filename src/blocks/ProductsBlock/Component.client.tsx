'use client'

import { motion, type Variants } from 'framer-motion'
import type { Product } from '@/payload-types'
import { Media } from '@/components/Media'
import Link from 'next/link'

interface ProductsBlockClientProps {
  heading: string
  products: Product[]
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

const headerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

const productVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

export const ProductsBlockClient: React.FC<ProductsBlockClientProps> = ({ heading, products }) => {
  return (
    <section className="bg-neutral-50 py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="container">
        <motion.div
          className="flex gap-12 md:gap-16 lg:gap-20 flex-col"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Header */}
          <motion.span
            className="inline-block uppercase text-sm md:text-base lg:text-lg tracking-[0.2em] font-medium text-gray-700"
            variants={headerVariants}
          >
            {heading}
          </motion.span>

          {/* Products Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-10"
            variants={containerVariants}
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                variants={productVariants}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3, ease: 'easeOut' },
                }}
                className="group"
              >
                <Link href={`/produkty/${product.slug}`} className="block">
                  <div className="w-full flex flex-col bg-white border border-black/10 overflow-hidden transition-all duration-500">
                    {/* Product Image */}
                    <div className="relative overflow-hidden">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <Media
                          resource={product.content?.media?.[0]}
                          className="w-full aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5]"
                          imgClassName="w-full h-full object-cover"
                        />
                      </motion.div>

                      {/* Overlay with enhanced design */}
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 md:p-6"
                        initial={{ opacity: 0.8 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.h2
                          className="uppercase font-bold text-white text-sm sm:text-base md:text-lg line-clamp-2 leading-tight"
                          whileHover={{ y: -2 }}
                          transition={{ duration: 0.2 }}
                        >
                          {product.title}
                        </motion.h2>
                      </motion.div>

                      {/* Hover indicator */}
                      <motion.div
                        className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
                        initial={{ scale: 0, rotate: -180 }}
                        whileHover={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      >
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
