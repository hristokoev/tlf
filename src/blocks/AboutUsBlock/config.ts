import type { Block } from 'payload'

export const AboutUsBlock: Block = {
  slug: 'aboutUsBlock',
  interfaceName: 'AboutUsBlock',
  labels: {
    singular: {
      cs: 'Blok O Nás',
      en: 'About Us Block',
      de: 'Über Uns Block',
    },
    plural: {
      cs: 'Bloky O Nás',
      en: 'About Us Blocks',
      de: 'Über Uns Blöcke',
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
      name: 'description',
      label: {
        cs: 'Popis',
        en: 'Description',
        de: 'Beschreibung',
      },
      type: 'textarea',
      localized: true,
      required: true,
    },
    {
      name: 'counters',
      label: {
        cs: 'Čísla',
        en: 'Counters',
        de: 'Zähler',
      },
      labels: {
        singular: {
          cs: 'Číslo',
          en: 'Counter',
          de: 'Zähler',
        },
        plural: {
          cs: 'Čísla',
          en: 'Counters',
          de: 'Zähler',
        },
      },
      type: 'array',
      fields: [
        {
          name: 'number',
          label: {
            cs: 'Číslo',
            en: 'Number',
            de: 'Zahl',
          },
          type: 'number',
          required: true,
        },
        {
          name: 'overflow',
          label: {
            cs: 'Přetečení',
            en: 'Overflow',
            de: 'Überlauf',
          },
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'label',
          label: {
            cs: 'Popisek',
            en: 'Label',
            de: 'Beschriftung',
          },
          type: 'text',
          localized: true,
          required: true,
        },
      ],
      minRows: 2,
      maxRows: 2,
      required: true,
    },
    {
      name: 'mediaItems',
      label: {
        cs: 'Média',
        en: 'Media Items',
        de: 'Medien',
      },
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      minRows: 3,
      maxRows: 3,
      required: true,
    },
  ],
}
