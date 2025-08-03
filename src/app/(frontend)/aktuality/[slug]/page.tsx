import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache, Fragment } from 'react'
import RichText from '@/components/RichText'

import type { Post } from '@/payload-types'

import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Media } from '@/components/Media'
import { formatDateTime } from '@/utilities/formatDateTime'
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

  const params = posts.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/aktuality/' + slug
  const post = await queryPostBySlug({ slug })
  const blogPage = (await queryBlogPage()) || {}

  const { layout } = blogPage
  const layoutFiltered = layout?.filter((block) =>
    ['contactBlock', 'mapInfoBlock'].includes(block.blockType),
  )
  if (!post) return <PayloadRedirects url={url} />

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
        {/* Allows redirects for valid pages too */}
        <PayloadRedirects disableNotFound url={url} />

        {draft && <LivePreviewListener />}

        {/* Hero Section */}
        <section className="container relative pt-20 sm:pt-24 md:pt-32">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
              {/* Content Column */}
              <div className="order-2 lg:order-1 space-y-8">
                {/* Date Badge */}
                <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-gray-200 shadow-sm">
                  <time className="text-sm font-medium text-gray-800">
                    {formatDateTime(post.publishedAt as string)}
                  </time>
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
                  {post.title}
                </h1>

                {/* Description */}
                <div className="prose prose-lg prose-gray max-w-none">
                  <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                    {post.content.description}
                  </p>
                </div>
              </div>

              {/* Image Column */}
              <div className="order-1 lg:order-2">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-gray-400 to-neutral-400 blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                  <div className="relative bg-white shadow-xl overflow-hidden">
                    <Media
                      resource={post.content.media}
                      className="w-full h-64 sm:h-80 md:h-96 lg:h-[400px] xl:h-[500px]"
                      imgClassName="object-cover h-full w-full transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Right Side Element - Desktop Only */}
          <div className="hidden lg:flex absolute right-6 xl:right-12 top-0 h-full w-4 flex-col items-center justify-center z-30">
            <div className="bg-black w-[0.5px] h-32 xl:h-full"></div>
          </div>
        </section>

        {/* Content Section */}
        <section className="container py-16 md:py-24">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Content Card */}
              <div className="bg-white/80 backdrop-blur-sm shadow-xl border border-white/20 overflow-hidden">
                <div className="p-8 sm:p-12 lg:p-16">
                  <div
                    className="prose prose-lg prose-gray max-w-none
                  prose-headings:font-bold prose-headings:text-gray-900
                  prose-h1:text-3xl prose-h1:mb-6
                  prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8
                  prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-6
                  prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                  prose-a:text-gray-600 prose-a:font-medium hover:prose-a:text-gray-700
                  prose-strong:text-gray-900 prose-strong:font-semibold
                  prose-ul:my-6 prose-ol:my-6
                  prose-li:text-gray-700 prose-li:mb-2
                  prose-blockquote:border-l-4 prose-blockquote:border-gray-400  
                  prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600
                  prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded
                  prose-pre:bg-gray-900 prose-pre:text-gray-100
                  prose-img:shadow-lg"
                  >
                    <RichText data={post.content.content} enableGutter={false} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>

      {/* Blog Page Layout */}
      <RenderBlocks blocks={layoutFiltered} />
    </Fragment>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const post = await queryPostBySlug({ slug })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
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
        equals: 'aktuality',
      },
    },
  })

  return result.docs?.[0] || null
})
