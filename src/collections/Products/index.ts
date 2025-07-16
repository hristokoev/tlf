import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'

export const Products: CollectionConfig = {
  slug: 'products',
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
      required: true,
    },
    ...slugField(),
  ],
}
