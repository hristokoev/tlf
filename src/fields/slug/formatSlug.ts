import type { FieldHook } from 'payload'

/**
 * Map of Czech diacritics to their Latin equivalents
 */
const czechToLatinMap: Record<string, string> = {
  // Lowercase letters
  á: 'a',
  č: 'c',
  ď: 'd',
  é: 'e',
  ě: 'e',
  í: 'i',
  ň: 'n',
  ó: 'o',
  ř: 'r',
  š: 's',
  ť: 't',
  ú: 'u',
  ů: 'u',
  ý: 'y',
  ž: 'z',
  // Uppercase letters
  Á: 'A',
  Č: 'C',
  Ď: 'D',
  É: 'E',
  Ě: 'E',
  Í: 'I',
  Ň: 'N',
  Ó: 'O',
  Ř: 'R',
  Š: 'S',
  Ť: 'T',
  Ú: 'U',
  Ů: 'U',
  Ý: 'Y',
  Ž: 'Z',
}

/**
 * Converts Czech diacritics to their Latin equivalents
 */
export const removeCzechDiacritics = (str: string): string => {
  return str.replace(
    /[áčďéěíňóřšťúůýžÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]/g,
    (match) => czechToLatinMap[match] || match,
  )
}

/**
 * Formats a string into a URL-friendly slug
 * Handles Czech diacritics by converting them to Latin equivalents
 */
export const formatSlug = (val: string): string => {
  const withoutDiacritics = removeCzechDiacritics(val)

  return withoutDiacritics
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()
}

/**
 * A field hook that formats a value into a slug
 * Falls back to another field if no value is provided
 */
export const formatSlugHook =
  (fallback: string): FieldHook =>
  ({ data, operation, value }) => {
    if (typeof value === 'string') {
      return formatSlug(value)
    }

    if (operation === 'create' || !data?.slug) {
      const fallbackData = data?.[fallback]

      if (fallbackData && typeof fallbackData === 'string') {
        return formatSlug(fallbackData)
      }
    }

    return value
  }
