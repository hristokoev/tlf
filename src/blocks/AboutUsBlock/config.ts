import type { Block } from 'payload'

export const AboutUsBlock: Block = {
  slug: 'aboutUsBlock',
  interfaceName: 'AboutUsBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'counters',
      type: 'array',
      fields: [
        {
          name: 'number',
          type: 'number',
          required: true,
        },
        {
          name: 'overflow',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
      minRows: 2,
      maxRows: 2,
      required: true,
    },
    {
      name: 'mediaItems',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      minRows: 3,
      maxRows: 3,
      required: true,
    },
  ],
}
