import type { Block } from 'payload'

export const MapInfoBlock: Block = {
  slug: 'mapInfoBlock',
  interfaceName: 'MapInfoBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'map',
      type: 'code',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      type: 'array',
      name: 'infoItems',
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
      required: true,
      minRows: 3,
      maxRows: 3,
    },
  ],
}
