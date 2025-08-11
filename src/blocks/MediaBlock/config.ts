import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  labels: {
    singular: {
      cs: 'Blok Média',
      en: 'Media Block',
      de: 'Medien Block',
    },
    plural: {
      cs: 'Bloky Médií',
      en: 'Media Blocks',
      de: 'Medien Blöcke',
    },
  },
  fields: [
    {
      name: 'media',
      label: {
        cs: 'Média',
        en: 'Media',
        de: 'Medien',
      },
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
