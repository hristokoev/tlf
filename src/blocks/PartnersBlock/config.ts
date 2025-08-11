import type { Block } from 'payload'

export const PartnersBlock: Block = {
  slug: 'partnersBlock',
  interfaceName: 'PartnersBlock',
  labels: {
    singular: {
      cs: 'Blok Partnerů',
      en: 'Partners Block',
      de: 'Partner Block',
    },
    plural: {
      cs: 'Bloky Partnerů',
      en: 'Partners Blocks',
      de: 'Partner Blöcke',
    },
  },
  fields: [
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
      name: 'partners',
      labels: {
        singular: {
          cs: 'Partner',
          en: 'Partner',
          de: 'Partner',
        },
        plural: {
          cs: 'Partneři',
          en: 'Partners',
          de: 'Partner',
        },
      },
      type: 'array',
      fields: [
        {
          name: 'logo',
          label: {
            cs: 'Logo',
            en: 'Logo',
            de: 'Logo',
          },
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'name',
          label: {
            cs: 'Název',
            en: 'Name',
            de: 'Name',
          },
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          label: {
            cs: 'URL',
            en: 'URL',
            de: 'URL',
          },
          type: 'text',
          required: true,
        },
      ],
      required: true,
      minRows: 1,
    },
  ],
}
