import type { Block } from 'payload'

export const ContactBlock: Block = {
  slug: 'contactBlock',
  interfaceName: 'ContactBlock',
  labels: {
    singular: {
      cs: 'Blok Kontakt',
      en: 'Contact Block',
      de: 'Kontakt Block',
    },
    plural: {
      cs: 'Bloky Kontaktů',
      en: 'Contact Blocks',
      de: 'Kontakt Blöcke',
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
    {
      name: 'title',
      label: {
        cs: 'Název',
        en: 'Title',
        de: 'Titel',
      },
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'description',
      label: {
        cs: 'Popis',
        en: 'Description',
        de: 'Beschreibung',
      },
      type: 'textarea',
      localized: true,
      required: true,
    },
    {
      name: 'media',
      label: {
        cs: 'Obrázek',
        en: 'Image',
        de: 'Bild',
      },
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
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
      hasMany: false,
    },
  ],
}
