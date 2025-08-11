import type { Block } from 'payload'

export const MapInfoBlock: Block = {
  slug: 'mapInfoBlock',
  interfaceName: 'MapInfoBlock',
  labels: {
    singular: {
      cs: 'Blok Informace o Mapě',
      en: 'Map Info Block',
      de: 'Karteninfo Block',
    },
    plural: {
      cs: 'Bloky Informací o Mapě',
      en: 'Map Info Blocks',
      de: 'Karteninfo Blöcke',
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
      name: 'map',
      label: {
        cs: 'Mapa',
        en: 'Map',
        de: 'Karte',
      },
      type: 'code',
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
      type: 'array',
      name: 'infoItems',
      labels: {
        singular: {
          cs: 'Položka Informace',
          en: 'Info Item',
          de: 'Info Element',
        },
        plural: {
          cs: 'Položky Informací',
          en: 'Info Items',
          de: 'Info Elemente',
        },
      },
      fields: [
        {
          name: 'icon',
          label: {
            cs: 'Ikona',
            en: 'Icon',
            de: 'Symbol',
          },
          type: 'upload',
          relationTo: 'media',
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
      ],
      required: true,
      minRows: 3,
      maxRows: 3,
    },
  ],
}
