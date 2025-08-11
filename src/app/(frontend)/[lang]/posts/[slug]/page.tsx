import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache, Fragment } from 'react'
import type { Post } from '@/payload-types'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { AnimatedPostHero } from '@/components/AnimatedPostHero'
import { AnimatedPostContent } from '@/components/AnimatedPostContent'
import { RenderBlocks } from '@/blocks/RenderBlocks'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const supportedLanguages = ['cs', 'en']

  const params = []

  // Generate params for each language and slug combination
  for (const lang of supportedLanguages) {
    for (const doc of posts.docs || []) {
      params.push({
        lang: lang,
        slug: doc.slug,
      })
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

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '', lang = 'cs' } = await paramsPromise
  const url = '/posts/' + slug
  const post = await queryPostBySlug({ slug, lang })
  const blogPage = (await queryBlogPage()) || {}

  const { layout } = blogPage
  const layoutFiltered = layout?.filter((block) =>
    ['contactBlock', 'mapInfoBlock'].includes(block.blockType),
  )

  return (
    <Fragment>
      <article
        className="pt-32 min-h-screen bg-white"
        style={{
          backgroundImage: 'url(/hero-bg.png)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {draft && <LivePreviewListener />}

        {/* Animated Hero Section */}
        <AnimatedPostHero post={post} />

        {/* Animated Content Section */}
        <AnimatedPostContent post={post} />
      </article>

      {/* Blog Page Layout */}
      <RenderBlocks blocks={layoutFiltered} lang={lang} />
    </Fragment>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const post = await queryPostBySlug({ slug, lang: 'cs' })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug, lang }: { slug: string; lang: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
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

const queryBlogPage = cache(async () => {
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
        equals: 'posts',
      },
    },
  })

  return result.docs?.[0] || null
})
