import type { Block } from 'payload'

import { link } from '@/fields/link'

export const BlogBlock: Block = {
  slug: 'blogBlock',
  interfaceName: 'BlogBlock',
  labels: {
    singular: {
      cs: 'Blok Blogu',
      en: 'Blog Block',
      de: 'Blog Block',
    },
    plural: {
      cs: 'Bloky Blogu',
      en: 'Blog Blocks',
      de: 'Blog Blöcke',
    },
  },
  fields: [
    {
      name: 'type',
      label: {
        cs: 'Typ',
        en: 'Type',
        de: 'Typ',
      },
      type: 'select',
      defaultValue: 'compact',
      options: [
        {
          label: {
            cs: 'Kompaktní',
            en: 'Compact',
            de: 'Kompakt',
          },
          value: 'compact',
        },
        {
          label: {
            cs: 'Pokročilý',
            en: 'Advanced',
            de: 'Erweitert',
          },
          value: 'advanced',
        },
      ],
      required: true,
    },
    {
      name: 'heading',
      label: {
        cs: 'Nadpis',
        en: 'Heading',
        de: 'Überschrift',
      },
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'title',
      label: {
        cs: 'Název',
        en: 'Title',
        de: 'Titel',
      },
      type: 'text',
      localized: true,
      admin: {
        condition: (_, { type } = {}) => ['advanced'].includes(type),
      },
      required: true,
    },
    {
      name: 'description',
      label: {
        cs: 'Popis',
        en: 'Description',
        de: 'Beschreibung',
      },
      type: 'textarea',
      localized: true,
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
      label: {
        cs: 'Obrázek',
        en: 'Image',
        de: 'Bild',
      },
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, { type } = {}) => ['advanced'].includes(type),
      },
      required: true,
    },
  ],
}
