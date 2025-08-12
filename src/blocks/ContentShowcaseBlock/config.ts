import type { Block } from 'payload'

export const ContentShowcaseBlock: Block = {
  slug: 'contentShowcaseBlock',
  interfaceName: 'ContentShowcaseBlock',
  labels: {
    singular: {
      cs: 'Blok Ukázky Obsahu',
      en: 'Content Showcase Block',
      de: 'Inhaltspräsentationsblock',
    },
    plural: {
      cs: 'Bloky Ukázky Obsahu',
      en: 'Content Showcase Blocks',
      de: 'Inhaltspräsentationsblöcke',
    },
  },
  fields: [
    {
      name: 'backgroundColor',
      label: {
        cs: 'Barva pozadí',
        en: 'Background Color',
        de: 'Hintergrundfarbe',
      },
      type: 'select',
      defaultValue: 'white',
      options: [
        {
          label: {
            cs: 'Bílá',
            en: 'White',
            de: 'Weiß',
          },
          value: 'white',
        },
        {
          label: {
            cs: 'Tmavě šedá',
            en: 'Dark Gray',
            de: 'Dunkelgrau',
          },
          value: 'darkGray',
        },
      ],
      required: true,
    },
    {
      name: 'bottomSection',
      label: {
        cs: 'Spodní sekce',
        en: 'Bottom Section',
        de: 'Untere Sektion',
      },
      type: 'checkbox',
      defaultValue: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: {
            cs: 'Horní sekce',
            en: 'Top Section',
            de: 'Obere Sektion',
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
            },
            {
              name: 'subtitle',
              label: {
                cs: 'Podnadpis',
                en: 'Subtitle',
                de: 'Untertitel',
              },
              type: 'textarea',
              localized: true,
            },
            {
              name: 'title',
              label: {
                cs: 'Název',
                en: 'Title',
                de: 'Titel',
              },
              type: 'textarea',
              localized: true,
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
        },
        {
          label: {
            cs: 'Spodní sekce',
            en: 'Bottom Section',
            de: 'Untere Sektion',
          },
          // TODO: Turn this back on after fixing the big of conditional when there are many of the same blocks.
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
                  label: {
                    cs: 'Karty',
                    en: 'Cards',
                    de: 'Karten',
                  },
                  value: 'cards',
                },
                {
                  label: {
                    cs: 'Mediální položky',
                    en: 'Media Items',
                    de: 'Medienobjekte',
                  },
                  value: 'mediaItems',
                },
              ],
              required: true,
            },
            {
              name: 'cards',
              label: {
                cs: 'Karty',
                en: 'Cards',
                de: 'Karten',
              },
              labels: {
                singular: {
                  cs: 'Karta',
                  en: 'Card',
                  de: 'Karte',
                },
                plural: {
                  cs: 'Karty',
                  en: 'Cards',
                  de: 'Karten',
                },
              },
              type: 'array',
              admin: {
                condition: (_, { type, bottomSection } = {}) =>
                  ['cards'].includes(type) && bottomSection,
              },
              fields: [
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
                  name: 'icon',
                  type: 'upload',
                  relationTo: 'media',
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
