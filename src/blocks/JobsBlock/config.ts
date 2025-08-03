import type { Block } from 'payload'

export const JobsBlock: Block = {
  slug: 'jobsBlock',
  interfaceName: 'JobsBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
  ],
}
