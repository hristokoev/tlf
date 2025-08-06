import type { Metadata } from 'next'
import { PayloadRedirects } from '@/components/PayloadRedirects'
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
import { AnimatedJobAccordion } from '@/components/AnimatedJobAccordion'

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

  const params = jobs.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Job({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/aktuality/' + slug
  const job = await queryJobBySlug({ slug })
  const jobsPage = (await queryJobsPage()) || {}

  const { layout } = jobsPage
  const layoutFiltered = layout?.filter((block) =>
    ['contactBlock', 'mapInfoBlock'].includes(block.blockType),
  )

  if (!job) return <PayloadRedirects url={url} />

  return (
    <>
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />
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
        <AnimatedJobAccordion
          variants={job.content.responsibilities || ''}
          materials={job.content.requirements || ''}
          technicalData={job.content.offer || ''}
        />
      </article>

      {/* Blog Page Layout - Keep existing RenderBlocks with its animations */}
      <RenderBlocks blocks={layoutFiltered} />
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const job = await queryJobBySlug({ slug })

  return generateMeta({ doc: job })
}

const queryJobBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'jobs',
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

const queryJobsPage = cache(async () => {
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
        equals: 'nabidky',
      },
    },
  })

  return result.docs?.[0] || null
})
