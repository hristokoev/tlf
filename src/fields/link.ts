import type { Field, GroupField } from 'payload'

import deepMerge from '@/utilities/deepMerge'
import { en } from 'payload/i18n/en'

export type LinkAppearances = 'default' | 'outline'

export type I18nLabel = { en: string; de: string; cs: string }

export const appearanceOptions: Record<LinkAppearances, { label: I18nLabel; value: string }> = {
  default: {
    label: {
      en: 'Default',
      de: 'Standard',
      cs: 'Výchozí',
    },
    value: 'default',
  },
  outline: {
    label: {
      en: 'Outline',
      de: 'Umriss',
      cs: 'Obrys',
    },
    value: 'outline',
  },
}

type LinkType = (options?: {
  appearances?: LinkAppearances[] | false
  disableLabel?: boolean
  overrides?: Partial<GroupField>
}) => Field

export const link: LinkType = ({ appearances, disableLabel = false, overrides = {} } = {}) => {
  const linkResult: GroupField = {
    name: 'link',
    type: 'group',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            admin: {
              layout: 'horizontal',
              width: '50%',
            },
            defaultValue: 'reference',
            options: [
              {
                label: {
                  en: 'Internal link',
                  de: 'Interner Link',
                  cs: 'Interní odkaz',
                },
                value: 'reference',
              },
              {
                label: {
                  en: 'Custom URL',
                  de: 'Benutzerdefinierte URL',
                  cs: 'Vlastní URL',
                },
                value: 'custom',
              },
            ],
          },
          {
            name: 'newTab',
            type: 'checkbox',
            admin: {
              style: {
                alignSelf: 'flex-end',
              },
              width: '50%',
            },
            label: {
              en: 'Open in new tab',
              de: 'In neuem Tab öffnen',
              cs: 'Otevřít v novém okně',
            },
          },
        ],
      },
    ],
  }

  const linkTypes: Field[] = [
    {
      name: 'reference',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
      },
      label: {
        en: 'Internal Link',
        de: 'Interner Link',
        cs: 'Interní odkaz',
      },
      relationTo: ['pages'],
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
      label: {
        en: 'Custom URL',
        de: 'Benutzerdefinierte URL',
        cs: 'Vlastní URL',
      },
      required: true,
    },
  ]

  if (!disableLabel) {
    linkTypes.map((linkType) => ({
      ...linkType,
      admin: {
        ...linkType.admin,
        width: '50%',
      },
    }))

    linkResult.fields.push({
      type: 'row',
      fields: [
        ...linkTypes,
        {
          name: 'label',
          type: 'text',
          admin: {
            width: '50%',
          },
          label: {
            en: 'Label',
            de: 'Bezeichnung',
            cs: 'Štítek',
          },
          localized: true,
          required: true,
        },
      ],
    })
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes]
  }

  if (appearances !== false) {
    let appearanceOptionsToUse = [appearanceOptions.default, appearanceOptions.outline]

    if (appearances) {
      appearanceOptionsToUse = appearances.map((appearance) => appearanceOptions[appearance])
    }

    linkResult.fields.push({
      name: 'appearance',
      label: {
        en: 'Appearance',
        de: 'Erscheinungsbild',
        cs: 'Vzhled',
      },
      type: 'select',
      admin: {
        description: {
          en: 'Select the appearance of the link.',
          de: 'Wählen Sie das Erscheinungsbild des Links.',
          cs: 'Vyberte vzhled odkazu.',
        },
      },
      defaultValue: 'default',
      options: appearanceOptionsToUse,
    })
  }

  return deepMerge(linkResult, overrides)
}
