import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import type { Job } from '@/payload-types'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { RenderBlocks } from '@/blocks/RenderBlocks'

// Import the new animated client components
import { AnimatedJobHero } from '@/components/AnimatedJobHero'
import { AnimatedAccordion } from '@/components/AnimatedAccordion'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const jobs = await payload.find({
    collection: 'jobs',
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
    for (const doc of jobs.docs || []) {
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

export default async function Job({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '', lang = 'cs' } = await paramsPromise
  const job = await queryJobBySlug({ slug, lang })
  const jobsPage = (await queryJobsPage(lang)) || {}

  if (!job || !jobsPage) {
    return notFound()
  }

  const { layout } = jobsPage
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
        <AnimatedJobHero job={job} />

        {/* Animated Accordion Section */}
        {job.content.accordionItems && (
          <AnimatedAccordion accordionItems={job.content.accordionItems} />
        )}
      </article>

      {/* Blog Page Layout - Keep existing RenderBlocks with its animations */}
      <RenderBlocks blocks={layoutFiltered} lang={lang} />
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const job = await queryJobBySlug({ slug, lang: 'cs' })

  return generateMeta({ doc: job })
}

const queryJobBySlug = cache(async ({ slug, lang }: { slug: string; lang: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'jobs',
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

const queryJobsPage = cache(async (lang: string) => {
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
        equals: 'jobs',
      },
    },
  })

  return result.docs?.[0] || null
})
