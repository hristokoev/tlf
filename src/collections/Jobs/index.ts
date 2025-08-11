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
              type: 'array',
              name: 'benefits',
              label: {
                cs: 'Výhody',
                en: 'Benefits',
                de: 'Vorteile',
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
                  name: 'icon',
                  label: {
                    cs: 'Ikona',
                    en: 'Icon',
                    de: 'Icon',
                  },
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
              minRows: 1,
              required: true,
            },
            {
              name: 'responsibilities',
              label: {
                cs: 'Odpovědnosti',
                en: 'Responsibilities',
                de: 'Verantwortlichkeiten',
              },
              type: 'textarea',
              localized: true,
            },
            {
              name: 'requirements',
              label: {
                cs: 'Požadavky',
                en: 'Requirements',
                de: 'Anforderungen',
              },
              type: 'textarea',
              localized: true,
            },
            {
              name: 'offer',
              label: {
                cs: 'Nabídka',
                en: 'Offer',
                de: 'Angebot',
              },
              type: 'textarea',
              localized: true,
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
