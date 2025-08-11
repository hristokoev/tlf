import type { Block } from 'payload'

import { link } from '@/fields/link'

export const TwoInOneBlock: Block = {
  slug: 'twoInOneBlock',
  interfaceName: 'TwoInOneBlock',
  labels: {
    singular: {
      cs: 'Blok Dva v Jednom',
      en: 'Two in One Block',
      de: 'Zwei-in-Eins-Block',
    },
    plural: {
      cs: 'Bloky Dva v Jednom',
      en: 'Two in One Blocks',
      de: 'Zwei-in-Eins-Blöcke',
    },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: {
            cs: 'Horní Sekce',
            en: 'Top Section',
            de: 'Oberer Abschnitt',
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
            link({
              overrides: {
                required: true,
              },
            }),
            {
              name: 'mediaItems',
              label: {
                cs: 'Obrázky',
                en: 'Images',
                de: 'Bilder',
              },
              type: 'upload',
              relationTo: 'media',
              hasMany: true,
              minRows: 4,
              maxRows: 6,
              required: true,
            },
          ],
        },
        {
          label: {
            cs: 'Spodní Sekce',
            en: 'Bottom Section',
            de: 'Unterer Abschnitt',
          },
          fields: [
            {
              name: 'certificationTitle',
              label: {
                cs: 'Název Certifikace',
                en: 'Certification Title',
                de: 'Zertifizierungstitel',
              },
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'certification',
              label: {
                cs: 'Certifikace',
                en: 'Certification',
                de: 'Zertifizierung',
              },
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'certificationDescription',
              label: {
                cs: 'Popis Certifikace',
                en: 'Certification Description',
                de: 'Zertifizierungsbeschreibung',
              },
              type: 'textarea',
              localized: true,
              required: true,
            },
            {
              name: 'certificationLink',
              label: {
                cs: 'Odkaz na Certifikaci',
                en: 'Certification Link',
                de: 'Zertifizierungslink',
              },
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'cards',
              type: 'array',
              minRows: 3,
              maxRows: 3,
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
                  name: 'icon',
                  label: {
                    cs: 'Ikona',
                    en: 'Icon',
                    de: 'Symbol',
                  },
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
