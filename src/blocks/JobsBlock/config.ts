import type { Block } from 'payload'

export const JobsBlock: Block = {
  slug: 'jobsBlock',
  interfaceName: 'JobsBlock',
  labels: {
    singular: {
      cs: 'Blok Práce',
      en: 'Jobs Block',
      de: 'Jobs Block',
    },
    plural: {
      cs: 'Bloky Prací',
      en: 'Jobs Blocks',
      de: 'Jobs Blöcke',
    },
  },
  fields: [
    {
      name: 'heading',
      label: {
        cs: 'Nadpis',
        en: 'Heading',
        de: 'Überschrift',
      },
      type: 'text',
      localized: true,
      required: true,
    },
  ],
}
