import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      label: {
        en: 'Type',
        de: 'Typ',
        cs: 'Typ',
      },
      options: [
        {
          label: {
            en: 'None',
            de: 'Keine',
            cs: 'Žádný',
          },
          value: 'none',
        },
        {
          label: {
            en: 'Default',
            de: 'Standard',
            cs: 'Výchozí',
          },
          value: 'default',
        },
      ],
      required: true,
    },
    {
      name: 'richText',
      label: {
        en: 'Text',
        de: 'Text',
        cs: 'Text',
      },
      type: 'richText',
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      admin: {
        condition: (_, { type } = {}) => ['default'].includes(type),
      },
      required: true,
    },
    link({
      overrides: {
        admin: {
          condition: (_, { type } = {}) => ['default'].includes(type),
        },
        required: true,
      },
    }),
    {
      name: 'media',
      label: {
        en: 'Media',
        de: 'Medien',
        cs: 'Média',
      },
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['default'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
  ],
  label: false,
}
