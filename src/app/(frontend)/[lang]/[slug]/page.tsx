import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams({ params: paramsPromise }: Args) {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
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
    for (const doc of pages.docs || []) {
      if (doc.slug !== 'home') {
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

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home', lang = 'cs' } = await paramsPromise
  const url = '/' + slug

  const page = await queryPageBySlug({
    slug,
    lang,
  })

  if (!page) {
    return notFound()
  }

  const { hero, layout } = page

  return (
    <article>
      <PageClient />

      {draft && <LivePreviewListener />}

      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} lang={lang} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home', lang = 'cs' } = await paramsPromise
  const page = await queryPageBySlug({
    slug,
    lang,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug, lang }: { slug: string; lang: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    locale: lang as 'cs',
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
