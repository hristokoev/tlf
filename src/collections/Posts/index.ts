import type { CollectionConfig } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { slugField } from '@/fields/slug'
import { revalidateDelete, revalidatePost } from './hooks/revalidatePost'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: {
      en: 'Post',
      de: 'Beitrag',
      cs: 'Příspěvek',
    },
    plural: {
      en: 'Posts',
      de: 'Beiträge',
      cs: 'Příspěvky',
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
    afterChange: [revalidatePost],
    afterDelete: [revalidateDelete],
    beforeChange: [populatePublishedAt],
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
              name: 'media',
              label: {
                en: 'Media',
                de: 'Medien',
                cs: 'Média',
              },
              type: 'upload',
              relationTo: 'media',
              hasMany: false,
              required: true,
            },
            {
              name: 'content',
              label: {
                en: 'Content',
                de: 'Inhalt',
                cs: 'Obsah',
              },
              type: 'richText',
              localized: true,
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
    {
      name: 'publishedAt',
      label: {
        en: 'Published at',
        de: 'Veröffentlicht am',
        cs: 'Datum publikování',
      },
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
}
