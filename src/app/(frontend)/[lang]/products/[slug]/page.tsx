import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import type { Product } from '@/payload-types'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { RenderBlocks } from '@/blocks/RenderBlocks'

// Import the new animated client components
import { AnimatedProductHero } from '@/components/AnimatedProductHero'
import { AnimatedAccordion } from '@/components/AnimatedAccordion'
import { notFound } from 'next/navigation'

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

  const supportedLanguages = ['cs', 'en', 'de']
  const params = []

  for (const lang of supportedLanguages) {
    for (const doc of products.docs || []) {
      if (doc.slug && typeof doc.slug === 'string') {
        params.push({
          lang: lang,
          slug: doc.slug,
        })
      }
    }
  }

  return params
}

type Args = {
  params: Promise<{
    slug?: string
    lang?: string
  }>
}

export default async function Product({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '', lang = 'cs' } = await paramsPromise
  const product = await queryProductBySlug({ slug, lang })
  const productsPage = (await queryProductsPage(lang)) || {}

  if (!product || !productsPage) {
    return notFound()
  }

  if (!product) {
    return notFound()
  }

  const { layout } = productsPage
  const layoutFiltered = layout?.filter((block) =>
    ['contactBlock', 'mapInfoBlock'].includes(block.blockType),
  )

  return (
    <>
      {draft && <LivePreviewListener />}

      <article
        className="pt-32 min-h-screen bg-white"
        style={{
          backgroundImage: 'url(/hero-bg.png)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Animated Hero Section */}
        <AnimatedProductHero product={product} />

        {/* Animated Accordion Section */}
        {product.content.accordionItems && (
          <AnimatedAccordion accordionItems={product.content.accordionItems} />
        )}
      </article>

      {/* Blog Page Layout - Keep existing RenderBlocks with its animations */}
      <RenderBlocks blocks={layoutFiltered} lang={lang} />
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const product = await queryProductBySlug({ slug, lang: 'cs' })

  return generateMeta({ doc: product })
}

const queryProductBySlug = cache(async ({ slug, lang }: { slug: string; lang: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'products',
    draft,
    locale: lang as 'cs',
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

const queryProductsPage = cache(async (lang: string) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    locale: lang as 'cs',
    where: {
      slug: {
        equals: 'products',
      },
    },
  })

  return result.docs?.[0] || null
})
