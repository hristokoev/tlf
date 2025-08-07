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
          name: 'position',
          type: 'text',
        },
        {
          type: 'row',
          fields: [
            {
              name: 'phoneWork',
              label: 'Work Phone',
              type: 'text',
            },
            {
              name: 'phoneMobile',
              label: 'Mobile Phone',
              type: 'text',
            },
            {
              name: 'email',
              type: 'email',
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
