import type { Block } from 'payload'

import { link } from '@/fields/link'

export const BlogBlock: Block = {
  slug: 'blogBlock',
  interfaceName: 'BlogBlock',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'compact',
      options: [
        {
          label: 'Compact',
          value: 'compact',
        },
        {
          label: 'Advanced',
          value: 'advanced',
        },
      ],
      required: true,
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => ['advanced'].includes(type),
      },
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        condition: (_, { type } = {}) => ['advanced'].includes(type),
      },
      required: true,
    },
    link({
      overrides: {
        admin: {
          condition: (_, { type } = {}) => ['compact'].includes(type),
        },
        required: true,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, { type } = {}) => ['advanced'].includes(type),
      },
      required: true,
    },
  ],
}
