import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: {
      en: 'User',
      de: 'Benutzer',
      cs: 'Uživatel',
    },
    plural: {
      en: 'Users',
      de: 'Benutzer',
      cs: 'Uživatelé',
    },
  },
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    group: {
      cs: 'Nastavení',
      de: 'Kopfzeile',
      en: 'Header',
    },
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      label: {
        en: 'Name',
        de: 'Name',
        cs: 'Jméno',
      },
      type: 'text',
    },
  ],
  timestamps: true,
}
