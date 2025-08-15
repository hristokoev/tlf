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
    form: {
      validation: {
        required: 'This field is required',
        email: 'Please enter a valid email address',
        minLength: 'This field must be at least {min} characters long',
        maxLength: 'This field must be no more than {max} characters long',
        pattern: 'Please enter a valid format',
        min: 'Value must be at least {min}',
        max: 'Value must be no more than {max}',
        number: 'Please enter a valid number',
        phone: 'Please enter a valid phone number',
        url: 'Please enter a valid URL',
        date: 'Please enter a valid date',
      },
      labels: {
        submit: 'Submit',
        loading: 'Loading...',
        required: 'Required',
      },
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
    form: {
      validation: {
        required: 'Toto pole je povinné',
        email: 'Zadejte prosím platnou e-mailovou adresu',
        minLength: 'Toto pole musí mít alespoň {min} znaků',
        maxLength: 'Toto pole může mít maximálně {max} znaků',
        pattern: 'Zadejte prosím platný formát',
        min: 'Hodnota musí být alespoň {min}',
        max: 'Hodnota může být maximálně {max}',
        number: 'Zadejte prosím platné číslo',
        phone: 'Zadejte prosím platné telefonní číslo',
        url: 'Zadejte prosím platnou URL adresu',
        date: 'Zadejte prosím platné datum',
      },
      labels: {
        submit: 'Odeslat',
        loading: 'Načítání...',
        required: 'Povinné',
      },
    },
  },
  de: {
    formData: {
      h1: 'Details zur Formularübermittlung',
      submissionInformation: 'Übermittlungsinformationen',
      createdAt: 'Erstellt am',
      form: 'Formular',
      submissionId: 'Übermittlungs-ID',
      formData: 'Formulardaten',
      title: 'Titel',
      question: 'Frage',
      name: 'Name',
      email: 'E-Mail',
      message: 'Nachricht',
      loading: 'Erstelle Frage und Antwort...',
      button: 'Frage beantworten',
    },
    form: {
      validation: {
        required: 'Dieses Feld ist erforderlich',
        email: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
        minLength: 'Dieses Feld muss mindestens {min} Zeichen lang sein',
        maxLength: 'Dieses Feld darf maximal {max} Zeichen lang sein',
        pattern: 'Bitte geben Sie ein gültiges Format ein',
        min: 'Der Wert muss mindestens {min} sein',
        max: 'Der Wert darf maximal {max} sein',
        number: 'Bitte geben Sie eine gültige Zahl ein',
        phone: 'Bitte geben Sie eine gültige Telefonnummer ein',
        url: 'Bitte geben Sie eine gültige URL ein',
        date: 'Bitte geben Sie ein gültiges Datum ein',
      },
      labels: {
        submit: 'Absenden',
        loading: 'Wird geladen...',
        required: 'Erforderlich',
      },
    },
  },
}

export type CustomTranslationsObject = typeof customTranslations.en & typeof enTranslations
export type CustomTranslationsKeys = NestedKeysStripped<CustomTranslationsObject>
