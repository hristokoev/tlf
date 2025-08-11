import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 6)

export const formatSlugHook =
  (fallback: string) =>
  ({ data, operation, value }: any) => {
    // If slug already has a value, clean it and return
    if (typeof value === 'string' && value.length > 0) {
      return value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
    }

    // For create operations, generate a shorter nanoid with only lowercase
    if (operation === 'create') {
      return nanoid()
    }

    // For update operations without a slug, fall back to title-based slug
    if (operation === 'update') {
      const fallbackData = data?.[fallback]

      if (fallbackData && typeof fallbackData === 'string') {
        return fallbackData
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      }
    }

    return value
  }
