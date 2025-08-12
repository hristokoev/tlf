import type { CollectionConfig } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

import { slugField } from '@/fields/slug'
import { revalidateDelete, revalidateJob } from './hooks/revalidateJob'

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  labels: {
    singular: {
      cs: 'Nabídka práce',
      en: 'Job',
      de: 'Job',
    },
    plural: {
      cs: 'Nabídky práce',
      en: 'Jobs',
      de: 'Jobs',
    },
  },
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ['title', 'updatedAt'],
    group: 'TLF',
  },
  hooks: {
    afterChange: [revalidateJob],
    afterDelete: [revalidateDelete],
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
      type: 'tabs',
      tabs: [
        {
          name: 'content',
          label: {
            cs: 'Obsah',
            en: 'Content',
            de: 'Inhalt',
          },
          fields: [
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
              name: 'benefits',
              label: {
                cs: 'Výhody',
                en: 'Benefits',
                de: 'Vorteile',
              },
              labels: {
                singular: {
                  cs: 'Výhoda',
                  en: 'Benefit',
                  de: 'Vorteile',
                },
                plural: {
                  cs: 'Výhody',
                  en: 'Benefits',
                  de: 'Vorteil',
                },
              },
              type: 'array',
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
                    de: 'Icon',
                  },
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
              minRows: 1,
              required: true,
            },
            {
              name: 'accordionItems',
              label: {
                cs: 'Položky',
                de: 'Akkordeon-Elemente',
                en: 'Accordion Items',
              },
              labels: {
                singular: {
                  cs: 'Položka',
                  de: 'Akkordeon-Element',
                  en: 'Accordion Item',
                },
                plural: {
                  cs: 'Položky',
                  de: 'Akkordeon-Elemente',
                  en: 'Accordion Items',
                },
              },
              type: 'array',
              fields: [
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
              ],
            },
            {
              name: 'media',
              label: {
                cs: 'Média',
                en: 'Media',
                de: 'Medien',
              },
              type: 'upload',
              relationTo: 'media',
              hasMany: true,
              maxRows: 3,
              required: true,
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    ...slugField(),
  ],
}
