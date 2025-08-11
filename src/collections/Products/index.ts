import type { CollectionConfig } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

import { slugField } from '@/fields/slug'
import { revalidateDelete, revalidateProduct } from './hooks/revalidateProduct'

export const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: {
      en: 'Product',
      de: 'Produkt',
      cs: 'Produkt',
    },
    plural: {
      en: 'Products',
      de: 'Produkte',
      cs: 'Produkty',
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
    afterChange: [revalidateProduct],
    afterDelete: [revalidateDelete],
  },
  fields: [
    {
      name: 'title',
      label: {
        en: 'Title',
        de: 'Titel',
        cs: 'Název',
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
            en: 'Content',
            de: 'Inhalt',
            cs: 'Obsah',
          },
          fields: [
            {
              name: 'description',
              label: {
                en: 'Description',
                de: 'Beschreibung',
                cs: 'Popis',
              },
              type: 'textarea',
              localized: true,
              required: true,
            },
            {
              type: 'array',
              name: 'parameters',
              fields: [
                {
                  name: 'title',
                  label: {
                    en: 'Title',
                    de: 'Titel',
                    cs: 'Název',
                  },
                  type: 'text',
                  localized: true,
                  required: true,
                },
                {
                  name: 'icon',
                  label: {
                    en: 'Icon',
                    de: 'Symbol',
                    cs: 'Ikona',
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
              name: 'variants',
              label: {
                en: 'Variants',
                de: 'Varianten',
                cs: 'Varianty',
              },
              type: 'textarea',
              localized: true,
            },
            {
              name: 'materials',
              label: {
                en: 'Materials',
                de: 'Materialien',
                cs: 'Materiály',
              },
              type: 'textarea',
              localized: true,
            },
            {
              name: 'technicalData',
              label: {
                en: 'Technical Data',
                de: 'Technische Daten',
                cs: 'Technické údaje',
              },
              type: 'textarea',
              localized: true,
            },
            {
              name: 'media',
              label: {
                en: 'Media',
                de: 'Medien',
                cs: 'Média',
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
