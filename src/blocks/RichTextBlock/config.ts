import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const RichTextBlock: Block = {
  slug: 'richTextBlock',
  interfaceName: 'RichTextBlock',
  labels: {
    singular: {
      cs: 'Blok Textu',
      en: 'Rich Text Block',
      de: 'Text Block',
    },
    plural: {
      cs: 'Bloky Textu',
      en: 'Rich Text Blocks',
      de: 'Text Blöcke',
    },
  },
  fields: [
    {
      name: 'richText',
      label: {
        en: 'Text',
        de: 'Text',
        cs: 'Text',
      },
      type: 'richText',
      localized: true,
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
      required: true,
    },
  ],
}
