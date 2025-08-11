import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const FormBlock: Block = {
  slug: 'formBlock',
  interfaceName: 'FormBlock',
  labels: {
    singular: {
      cs: 'Blok Formuláře',
      en: 'Form Block',
      de: 'Formular Block',
    },
    plural: {
      cs: 'Bloky Formulářů',
      en: 'Form Blocks',
      de: 'Formular Blöcke',
    },
  },
  fields: [
    {
      name: 'form',
      label: {
        cs: 'Formulář',
        en: 'Form',
        de: 'Formular',
      },
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
    {
      name: 'enableIntro',
      type: 'checkbox',
      label: {
        cs: 'Povolit Úvodní Obsah',
        en: 'Enable Intro Content',
        de: 'Einführungsinhalt Aktivieren',
      },
    },
    {
      name: 'introContent',
      type: 'richText',
      admin: {
        condition: (_, { enableIntro }) => Boolean(enableIntro),
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: {
        cs: 'Úvodní Obsah',
        en: 'Intro Content',
        de: 'Einführungsinhalt',
      },
    },
  ],
  graphQL: {
    singularName: 'FormBlock',
  },
}
