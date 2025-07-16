import type { Block } from 'payload'

export const ProductsBlock: Block = {
  slug: 'productsBlock',
  interfaceName: 'ProductsBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
  ],
}
