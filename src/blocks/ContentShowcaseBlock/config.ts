import type { Block } from 'payload'

export const ContentShowcaseBlock: Block = {
  slug: 'contentShowcaseBlock',
  interfaceName: 'ContentShowcaseBlock',
  fields: [
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'white',
      options: [
        {
          label: 'White',
          value: 'white',
        },
        {
          label: 'Dark Gray',
          value: 'darkGray',
        },
      ],
      required: true,
    },
    {
      name: 'bottomSection',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Top Section',
          fields: [
            {
              name: 'heading',
              type: 'text',
            },
            {
              name: 'subtitle',
              type: 'textarea',
            },
            {
              name: 'title',
              type: 'textarea',
            },
            {
              name: 'description',
              type: 'textarea',
            },
            {
              name: 'media',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'mediaPosition',
              type: 'select',
              defaultValue: 'left',
              options: [
                {
                  label: 'Left',
                  value: 'left',
                },
                {
                  label: 'Right',
                  value: 'right',
                },
              ],
              required: true,
            },
          ],
        },
        {
          label: 'Bottom Section',
          // TO-DO: Turn this back on after fixing the big of conditional when there are many of the same blocks.
          // admin: {
          //   condition: (_, { bottomSection } = {}) => bottomSection,
          // },
          fields: [
            {
              name: 'type',
              type: 'select',
              admin: {
                condition: (_, { bottomSection } = {}) => bottomSection,
              },
              defaultValue: 'cards',
              options: [
                {
                  label: 'Cards',
                  value: 'cards',
                },
                {
                  label: 'Media Items',
                  value: 'mediaItems',
                },
              ],
              required: true,
            },
            {
              type: 'array',
              name: 'cards',
              admin: {
                condition: (_, { type, bottomSection } = {}) =>
                  ['cards'].includes(type) && bottomSection,
              },
              fields: [
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
                {
                  name: 'icon',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
              minRows: 4,
              maxRows: 4,
              required: true,
            },
            {
              name: 'mediaItems',
              type: 'upload',
              relationTo: 'media',
              hasMany: true,
              minRows: 4,
              maxRows: 4,
              admin: {
                condition: (_, { type, bottomSection } = {}) =>
                  ['mediaItems'].includes(type) && bottomSection,
              },
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
