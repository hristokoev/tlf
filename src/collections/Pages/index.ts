import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { AboutUsBlock } from '@/blocks/AboutUsBlock/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { ScrollBlock } from '@/blocks/ScrollBlock/config'
import { TwoInOneBlock } from '@/blocks/TwoInOneBlock/config'
import { hero } from '@/heros/config'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { BannerBlock } from '@/blocks/BannerBlock/config'
import { BlogBlock } from '@/blocks/BlogBlock/config'
import { ContactBlock } from '@/blocks/ContactBlock/config'
import { ContentShowcaseBlock } from '@/blocks/ContentShowcaseBlock/config'
import { JobsBlock } from '@/blocks/JobsBlock/config'
import { MapInfoBlock } from '@/blocks/MapInfoBlock/config'
import { PartnersBlock } from '@/blocks/PartnersBlock/config'
import { ProductsBlock } from '@/blocks/ProductsBlock/config'
import { TeamBlock } from '@/blocks/TeamBlock/config'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  labels: {
    singular: {
      cs: 'Stránka',
      en: 'Page',
      de: 'Seite',
    },
    plural: {
      cs: 'Stránky',
      en: 'Pages',
      de: 'Seiten',
    },
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'TLF',
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'pages',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
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
          fields: [hero],
          label: {
            cs: 'Hlavní',
            en: 'Hero',
            de: 'Hero',
          },
        },
        {
          fields: [
            {
              name: 'layout',
              label: {
                cs: 'Sekce',
                en: 'Sections',
                de: 'Sektionen',
              },
              labels: {
                singular: {
                  cs: 'Sekce',
                  en: 'Section',
                  de: 'Sektion',
                },
                plural: {
                  cs: 'Sekce',
                  en: 'Sections',
                  de: 'Sektionen',
                },
              },
              type: 'blocks',
              blocks: [
                AboutUsBlock,
                BannerBlock,
                BlogBlock,
                ContactBlock,
                ContentShowcaseBlock,
                JobsBlock,
                MapInfoBlock,
                MediaBlock,
                PartnersBlock,
                ProductsBlock,
                ScrollBlock,
                TeamBlock,
                TwoInOneBlock,
              ],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: {
            cs: 'Obsah',
            en: 'Content',
            de: 'Inhalt',
          },
        },
        {
          name: 'meta',
          label: {
            cs: 'SEO',
            en: 'SEO',
            de: 'SEO',
          },
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
        cs: 'Datum publikování',
        en: 'Published at',
        de: 'Veröffentlicht am',
      },
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
