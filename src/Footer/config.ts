import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: {
    en: 'Footer',
    de: 'Fußzeile',
    cs: 'Zápatí',
  },
  access: {
    read: () => true,
  },
  admin: {
    group: {
      cs: 'Nastavení',
      de: 'Kopfzeile',
      en: 'Header',
    },
  },
  fields: [
    {
      name: 'columns',
      label: {
        en: 'Footer Columns',
        de: 'Fußzeilen Spalten',
        cs: 'Sloupce zápatí',
      },
      labels: {
        singular: {
          en: 'Footer Column',
          de: 'Fußzeilenspalte',
          cs: 'Sloupec zápatí',
        },
        plural: {
          en: 'Footer Columns',
          de: 'Fußzeilen Spalten',
          cs: 'Sloupce zápatí',
        },
      },
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: {
            en: 'Column Title',
            de: 'Spaltentitel',
            cs: 'Název sloupce',
          },
          localized: true,
          required: true,
        },
        {
          name: 'links',
          label: {
            en: 'Column Links',
            de: 'Spaltenlinks',
            cs: 'Odkazy sloupce',
          },
          labels: {
            singular: {
              en: 'Column Link',
              de: 'Spaltenverknüpfung',
              cs: 'Odkaz sloupce',
            },
            plural: {
              en: 'Column Links',
              de: 'Spaltenlinks',
              cs: 'Odkazy sloupce',
            },
          },
          type: 'array',
          fields: [
            link({
              appearances: false,
            }),
          ],
          maxRows: 8,
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: '@/Footer/RowLabel#RowLabel',
            },
          },
        },
      ],
      minRows: 1,
      maxRows: 4,
      admin: {
        initCollapsed: true,
      },
    },
    {
      name: 'socialLinks',
      label: {
        en: 'Social Media Links',
        de: 'Soziale Medien Links',
        cs: 'Odkazy na sociální média',
      },
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          label: {
            en: 'Social Platform',
            de: 'Soziale Plattform',
            cs: 'Sociální platforma',
          },
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'Twitter/X', value: 'twitter' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'TikTok', value: 'tiktok' },
          ],
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: {
            en: 'URL',
            de: 'URL',
            cs: 'URL',
          },
          required: true,
        },
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
      },
    },
    {
      name: 'bottomText',
      type: 'text',
      label: {
        en: 'Bottom Text (e.g., Copyright)',
        de: 'Unterer Text (z. B. Copyright)',
        cs: 'Dolní text (např. autorská práva)',
      },
      defaultValue: '© 2025 TLF s.r.o.',
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
