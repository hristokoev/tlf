import type { Block } from 'payload'

export const ProductsBlock: Block = {
  slug: 'productsBlock',
  interfaceName: 'ProductsBlock',
  labels: {
    singular: {
      cs: 'Blok Produktů',
      en: 'Products Block',
      de: 'Produkte Block',
    },
    plural: {
      cs: 'Bloky Produktů',
      en: 'Products Blocks',
      de: 'Produkte Blöcke',
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
