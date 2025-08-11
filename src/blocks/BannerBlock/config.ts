import type { Block } from 'payload'

export const BannerBlock: Block = {
  slug: 'bannerBlock',
  interfaceName: 'BannerBlock',
  labels: {
    singular: {
      cs: 'Blok Banner',
      en: 'Banner Block',
      de: 'Banner Block',
    },
    plural: {
      cs: 'Bloky Banner',
      en: 'Banner Blocks',
      de: 'Banner Blöcke',
    },
  },
  fields: [
    {
      name: 'subtitle',
      label: {
        cs: 'Podnadpis',
        en: 'Subtitle',
        de: 'Untertitel',
      },
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'title',
      label: {
        cs: 'Nadpis',
        en: 'Title',
        de: 'Titel',
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
      name: 'backgroundImage',
      label: {
        cs: 'Pozadí',
        en: 'Background Image',
        de: 'Hintergrundbild',
      },
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'textPosition',
      label: {
        cs: 'Pozice Textu',
        en: 'Text Position',
        de: 'Textposition',
      },
      type: 'select',
      defaultValue: 'left',
      options: [
        {
          label: {
            cs: 'Vlevo',
            en: 'Left',
            de: 'Links',
          },
          value: 'left',
        },
        {
          label: {
            cs: 'Vpravo',
            en: 'Right',
            de: 'Rechts',
          },
          value: 'right',
        },
      ],
      required: true,
    },
  ],
}
