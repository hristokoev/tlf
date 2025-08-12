import type { ArrayField, Field } from 'payload'

import type { LinkAppearances } from './link'

import deepMerge from '@/utilities/deepMerge'
import { link } from './link'

type LinkGroupType = (options?: {
  appearances?: LinkAppearances[] | false
  overrides?: Partial<ArrayField>
}) => Field

export const linkGroup: LinkGroupType = ({ appearances, overrides = {} } = {}) => {
  const generatedLinkGroup: Field = {
    name: 'links',
    label: {
      en: 'Links',
      de: 'Links',
      cs: 'Odkazy',
    },
    labels: {
      singular: {
        en: 'Link',
        de: 'Link',
        cs: 'Odkaz',
      },
      plural: {
        en: 'Links',
        de: 'Links',
        cs: 'Odkazy',
      },
    },
    type: 'array',
    fields: [
      link({
        appearances,
      }),
    ],
    admin: {
      initCollapsed: true,
    },
  }

  return deepMerge(generatedLinkGroup, overrides)
}
