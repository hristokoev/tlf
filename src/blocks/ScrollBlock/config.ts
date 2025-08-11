import type { Block } from 'payload'

export const ScrollBlock: Block = {
  slug: 'scrollBlock',
  interfaceName: 'ScrollBlock',
  labels: {
    singular: {
      cs: 'Blok Scroll',
      en: 'Scroll Block',
      de: 'Scroll Block',
    },
    plural: {
      cs: 'Bloky Scroll',
      en: 'Scroll Blocks',
      de: 'Scroll Blöcke',
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
      name: 'title',
      label: {
        cs: 'Název',
        en: 'Title',
        de: 'Titel',
      },
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'text',
      label: {
        cs: 'Text',
        en: 'Text',
        de: 'Text',
      },
      type: 'textarea',
      localized: true,
      required: true,
    },
    {
      name: 'media',
      label: {
        cs: 'Obrázek',
        en: 'Image',
        de: 'Bild',
      },
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
