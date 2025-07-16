import type { Block } from 'payload'

export const TeamBlock: Block = {
  slug: 'teamBlock',
  interfaceName: 'TeamBlock',
  fields: [
    {
      name: 'members',
      type: 'array',
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          type: 'row',
          fields: [
            {
              name: 'phoneWork',
              label: 'Work Phone',
              type: 'text',
              required: true,
            },
            {
              name: 'phoneMobile',
              label: 'Mobile Phone',
              type: 'text',
              required: true,
            },
            {
              name: 'email',
              type: 'email',
              required: true,
            },
          ],
        },
      ],
      minRows: 1,
      maxRows: 4,
      required: true,
    },
  ],
}
