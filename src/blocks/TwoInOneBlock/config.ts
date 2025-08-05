import type { Block } from 'payload'

import { link } from '@/fields/link'

export const TwoInOneBlock: Block = {
  slug: 'twoInOneBlock',
  interfaceName: 'TwoInOneBlock',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Top Section',
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
            },
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
            link({
              overrides: {
                required: true,
              },
            }),
            {
              name: 'mediaItems',
              type: 'upload',
              relationTo: 'media',
              hasMany: true,
              minRows: 4,
              maxRows: 6,
              required: true,
            },
          ],
        },
        {
          label: 'Bottom Section',
          fields: [
            {
              name: 'certificationTitle',
              type: 'text',
              required: true,
            },
            {
              name: 'certification',
              type: 'text',
              required: true,
            },
            {
              name: 'certificationDescription',
              type: 'textarea',
              required: true,
            },
            {
              name: 'certificationLink',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'cards',
              type: 'array',
              minRows: 3,
              maxRows: 3,
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'icon',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
