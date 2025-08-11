import { enTranslations } from '@payloadcms/translations/languages/en'
import type { NestedKeysStripped } from '@payloadcms/translations'

export const customTranslations = {
  en: {
    formData: {
      h1: 'Form Submission Details',
      submissionInformation: 'Submission Information',
      createdAt: 'Created At',
      form: 'Form',
      submissionId: 'Submission ID',
      formData: 'Form Data',
      title: 'Title',
      question: 'Question',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      loading: 'Creating question and answer...',
      button: 'Answer the question',
    },
  },
  cs: {
    formData: {
      h1: 'Podrobnosti o odeslaném formuláři',
      submissionInformation: 'Informace',
      createdAt: 'Vytvořeno',
      form: 'Formulář',
      submissionId: 'ID odeslání',
      formData: 'Data formuláře',
      title: 'Název',
      question: 'Dotaz',
      name: 'Jméno',
      email: 'Email',
      message: 'Zpráva',
      loading: 'Vytváření otázky a odpovědi...',
      button: 'Odpovědět na otázku',
    },
  },
}

export type CustomTranslationsObject = typeof customTranslations.en & typeof enTranslations
export type CustomTranslationsKeys = NestedKeysStripped<CustomTranslationsObject>
