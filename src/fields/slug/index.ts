import type { TextField } from 'payload'

import { formatSlugHook } from './formatSlug'

type Overrides = {
  slugOverrides?: Partial<TextField>
}

type Slug = (fieldToUse?: string, overrides?: Overrides) => [TextField]

export const slugField: Slug = (fieldToUse = 'title', overrides = {}) => {
  const { slugOverrides } = overrides

  const slugField: any = {
    name: 'slug',
    type: 'text',
    index: true,
    label: {
      en: 'Slug',
      de: 'Slug',
      cs: 'Slug',
    },
    ...(slugOverrides || {}),
    hooks: {
      beforeValidate: [formatSlugHook(fieldToUse)],
    },
    admin: {
      position: 'sidebar',
      description: 'Auto-generated short URL slug. Leave empty to generate automatically.',
      ...(slugOverrides?.admin || {}),
      components: {
        Field: {
          path: '@/fields/slug/SlugComponent#SlugComponent',
          clientProps: {
            fieldToUse,
          },
        },
      },
    },
  }

  return [slugField]
}
