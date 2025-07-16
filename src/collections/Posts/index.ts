import type { CollectionConfig } from 'payload'

import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { slugField } from '@/fields/slug'

export const Posts: CollectionConfig = {
  slug: 'posts',
  hooks: {
    beforeChange: [populatePublishedAt],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      hasMany: false,
      required: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
}
