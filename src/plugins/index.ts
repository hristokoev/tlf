import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { Plugin } from 'payload'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

import { Page } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

const generateTitle: GenerateTitle<Page> = ({ doc }) => {
  return doc?.title ? doc.title : 'TLF'
}

const generateURL: GenerateURL<Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formOverrides: {
      access: {
        create: () => false,
      },
      admin: {
        group: {
          cs: 'Nastavení',
          de: 'Kopfzeile',
          en: 'Header',
        },
      },
      labels: {
        singular: {
          en: 'Form',
          cs: 'Formulář',
          de: 'Formular',
        },
        plural: {
          en: 'Forms',
          cs: 'Formuláře',
          de: 'Formulare',
        },
      },
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })
      },
    },
    formSubmissionOverrides: {
      access: {
        create: () => false,
      },
      labels: {
        singular: {
          en: 'Form Submissions',
          cs: 'Přijaté zprávy',
          de: 'Formularübermittlungen',
        },
        plural: {
          en: 'Forms Submissions',
          cs: 'Přijaté zprávy',
          de: 'Formularübermittlungen',
        },
      },
      admin: {
        group: {
          cs: 'Další',
          de: 'Andere',
          en: 'Other',
        },
        components: {
          views: {
            edit: {
              default: {
                Component: {
                  path: 'src/views/FormData/index.tsx',
                },
              },
            },
          },
        },
      },
    },
  }),
]
