import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

type Global = keyof Config['globals']
async function getGlobal(slug: Global, depth = 0, lang: string = 'cs') {
  const payload = await getPayload({ config: configPromise })

  const global = await payload.findGlobal({
    slug,
    depth,
    locale: lang as 'cs',
  })

  return global
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedGlobal = (slug: Global, depth = 0, lang: string) =>
  unstable_cache(async () => getGlobal(slug, depth, lang), [slug, lang], {
    tags: [`global_${slug}`],
  })
