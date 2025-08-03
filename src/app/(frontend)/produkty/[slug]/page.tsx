import type { Metadata } from 'next'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import type { Product } from '@/payload-types'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Media } from '@/components/Media'
import { Accordion } from '@/components/Accordion'
import { RenderBlocks } from '@/blocks/RenderBlocks'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const products = await payload.find({
    collection: 'products',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = products.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Product({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/aktuality/' + slug
  const product = await queryProductBySlug({ slug })
  const productsPage = (await queryProductsPage()) || {}

  const { layout } = productsPage
  const layoutFiltered = layout?.filter((block) =>
    ['contactBlock', 'mapInfoBlock'].includes(block.blockType),
  )

  if (!product) return <PayloadRedirects url={url} />

  // Get the number of available images
  const availableImages = product.content.media?.filter(Boolean) || []
  const imageCount = availableImages.length

  // Function to render images based on count
  const renderImageLayout = () => {
    if (imageCount === 0) {
      return (
        <div className="hidden lg:flex items-center justify-center w-full h-[600px] bg-gray-100">
          <p className="text-gray-500">No images available</p>
        </div>
      )
    }

    if (imageCount === 1) {
      return (
        <div className="hidden lg:flex justify-center">
          <Media
            resource={availableImages[0]}
            className="w-full max-w-[400px] h-[600px] shadow-2xl overflow-hidden"
            imgClassName="object-cover h-full w-full"
          />
        </div>
      )
    }

    if (imageCount === 2) {
      return (
        <div className="hidden lg:grid grid-cols-1 gap-4 max-w-[400px] mx-auto">
          <Media
            resource={availableImages[0]}
            className="w-full h-[290px] shadow-2xl overflow-hidden"
            imgClassName="object-cover h-full w-full"
          />
          <Media
            resource={availableImages[1]}
            className="w-full h-[290px] shadow-2xl overflow-hidden"
            imgClassName="object-cover h-full w-full"
          />
        </div>
      )
    }

    // 3 or more images - original layout
    return (
      <div className="hidden lg:grid grid-cols-2 gap-4">
        <div className="flex flex-col justify-start">
          <Media
            resource={availableImages[0]}
            className="w-full mb-4 max-w-[360px] h-[600px] shadow-2xl overflow-hidden"
            imgClassName="object-cover h-full w-full"
          />
        </div>
        <div className="flex flex-col justify-end gap-4">
          <Media
            resource={availableImages[1]}
            className="w-full max-w-[277px] h-[277px] shadow-2xl overflow-hidden"
            imgClassName="object-cover h-full w-full"
          />
          {availableImages[2] && (
            <Media
              resource={availableImages[2]}
              className="w-full max-w-[277px] h-[277px] shadow-2xl overflow-hidden"
              imgClassName="object-cover h-full w-full"
            />
          )}
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}

      <article
        className="pt-32 min-h-screen bg-white"
        style={{ backgroundImage: 'url(/hero-bg.png)', backgroundSize: 'contain' }}
      >
        {/* Hero Section */}
        <section className="relative py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">
              {/* Left Column - Content */}
              <div className="space-y-8">
                {/* Description */}
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-md">
                  {product.content.description}
                </p>

                {/* Title */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight tracking-tight uppercase">
                  {product.title}
                </h1>

                {/* Parameters */}
                <div className="space-y-6 pt-8">
                  {product.content.parameters?.map((param, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="flex items-center justify-center flex-shrink-0">
                        <Media
                          resource={param.icon}
                          className="w-8 h-8"
                          imgClassName="object-contain"
                        />
                      </div>
                      <span className="text-base sm:text-lg text-gray-900 font-medium">
                        {param.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Dynamic Image Layout */}
              {renderImageLayout()}
            </div>

            {/* Mobile Image Gallery - Show all available images in a scrollable row */}
            {imageCount > 0 && (
              <div className="lg:hidden mt-12">
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {availableImages.map((image, index) => (
                    <div key={index} className="flex-shrink-0">
                      <Media
                        resource={image}
                        className="w-72 h-80 shadow-xl overflow-hidden"
                        imgClassName="object-cover h-full w-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Decorative Right Side Element - Desktop Only */}
          <div className="hidden lg:flex absolute right-6 xl:right-12 top-0 h-full w-4 py-8 flex-col items-center justify-center z-10">
            <div className="bg-black w-[0.5px] h-32 xl:h-full"></div>
          </div>
        </section>

        {/* Accordion Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Left - Accordion */}
              <Accordion
                variants={product.content.variants || ''}
                materials={product.content.materials || ''}
                technicalData={product.content.technicalData || ''}
              />

              {/* Right - Additional Info */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wide mb-8">
                  Další informace
                </h2>
                {/* Add any additional content here */}
              </div>
            </div>
          </div>
        </section>
      </article>

      {/* Blog Page Layout */}
      <RenderBlocks blocks={layoutFiltered} />
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const product = await queryProductBySlug({ slug })

  return generateMeta({ doc: product })
}

const queryProductBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'products',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

const queryProductsPage = cache(async () => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: 'produkty',
      },
    },
  })

  return result.docs?.[0] || null
})
