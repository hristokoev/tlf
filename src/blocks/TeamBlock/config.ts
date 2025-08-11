import type { Block } from 'payload'

export const TeamBlock: Block = {
  slug: 'teamBlock',
  interfaceName: 'TeamBlock',
  labels: {
    singular: {
      cs: 'Blok Týmu',
      en: 'Team Block',
      de: 'Team Block',
    },
    plural: {
      cs: 'Bloky Týmu',
      en: 'Team Blocks',
      de: 'Team Blöcke',
    },
  },
  fields: [
    {
      name: 'members',
      labels: {
        singular: {
          cs: 'Člen Týmu',
          en: 'Team Member',
          de: 'Team Mitglied',
        },
        plural: {
          cs: 'Členové Týmu',
          en: 'Team Members',
          de: 'Team Mitglieder',
        },
      },
      type: 'array',
      fields: [
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
          name: 'name',
          label: {
            cs: 'Jméno',
            en: 'Name',
            de: 'Name',
          },
          type: 'text',
          required: true,
        },
        {
          name: 'position',
          label: {
            cs: 'Pozice',
            en: 'Position',
            de: 'Position',
          },
          type: 'text',
          required: true,
        },
        {
          type: 'row',
          fields: [
            {
              name: 'phoneWork',
              label: {
                cs: 'Pracovní Telefon',
                en: 'Work Phone',
                de: 'Bürotelefon',
              },
              type: 'text',
            },
            {
              name: 'phoneMobile',
              label: {
                cs: 'Mobilní Telefon',
                en: 'Mobile Phone',
                de: 'Handy',
              },
              type: 'text',
            },
            {
              name: 'email',
              label: {
                cs: 'Email',
                en: 'Email',
                de: 'Email',
              },
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
