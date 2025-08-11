import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { BlogBlock as BlogBlockProps } from '@/payload-types'
import { BlogBlockClient } from './Component.client'

export const BlogBlock: React.FC<BlogBlockProps & { lang?: string }> = async (props) => {
  const { lang } = props
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    limit: 4,
    locale: lang as 'cs',
  })

  const postsDocs = posts.docs

  return <BlogBlockClient {...props} postsDocs={postsDocs} />
}
