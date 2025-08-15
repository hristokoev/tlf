'use client'

import { useParams } from 'next/navigation'
import { customTranslations } from '../../custom-translations'

type FormTranslationType = typeof customTranslations.en.form
type ValidationTranslationType = typeof customTranslations.en.form.validation

export function useFormTranslation() {
  const params = useParams()
  const lang = (params?.lang as 'en' | 'cs' | 'de') || 'en'

  const translations = customTranslations[lang]?.form || customTranslations.en.form

  const t = (
    key: keyof FormTranslationType,
    variables?: Record<string, string | number>,
  ): string => {
    const value = translations[key] as any
    if (typeof value === 'string') {
      return interpolateString(value, variables)
    }
    return key
  }

  const tv = (
    key: keyof ValidationTranslationType,
    variables?: Record<string, string | number>,
  ): string => {
    const value = translations.validation[key]
    if (typeof value === 'string') {
      return interpolateString(value, variables)
    }
    return key
  }

  return { t, tv, lang }
}

function interpolateString(str: string, variables?: Record<string, string | number>): string {
  if (!variables) return str

  return str.replace(/\{(\w+)\}/g, (match, key) => {
    return variables[key]?.toString() || match
  })
}
