// src/utilities/generateLangUrl.ts

/**
 * Generates a language-aware URL for internal navigation
 * @param lang - Current language (cs, en, de)
 * @param path - The path without language prefix (e.g., '/about', '/products/product-slug')
 * @returns Full path with language prefix (e.g., '/en/about', '/de/products/product-slug')
 */
export function generateLangUrl(lang: string, path: string): string {
  // Remove leading slash from path to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.substring(1) : path

  // Handle home page
  if (!cleanPath || cleanPath === 'home') {
    return `/${lang}`
  }

  return `/${lang}/${cleanPath}`
}

/**
 * Generates URLs for different collections with language support
 */
export const generateCollectionUrl = {
  page: (lang: string, slug: string) => {
    if (slug === 'home') return `/${lang}`
    return generateLangUrl(lang, slug)
  },

  post: (lang: string, slug: string) => {
    return generateLangUrl(lang, `posts/${slug}`)
  },

  product: (lang: string, slug: string) => {
    return generateLangUrl(lang, `products/${slug}`)
  },

  job: (lang: string, slug: string) => {
    return generateLangUrl(lang, `jobs/${slug}`)
  },
}

/**
 * Check if a URL is external (doesn't need language prefix)
 */
export function isExternalUrl(url: string): boolean {
  return (
    url.startsWith('http') ||
    url.startsWith('mailto:') ||
    url.startsWith('tel:') ||
    url.startsWith('ftp:') ||
    url.startsWith('#')
  )
}

/**
 * Generates the correct href for CMS links
 */
export function generateCMSLinkHref(
  type: 'custom' | 'reference' | null,
  lang: string,
  reference?: {
    relationTo: string
    value: any
  } | null,
  url?: string | null,
): string | null {
  if (type === 'reference' && typeof reference?.value === 'object' && reference.value.slug) {
    const collection = reference.relationTo
    const slug = reference.value.slug

    switch (collection) {
      case 'pages':
        return generateCollectionUrl.page(lang, slug)
      case 'posts':
        return generateCollectionUrl.post(lang, slug)
      case 'products':
        return generateCollectionUrl.product(lang, slug)
      case 'jobs':
        return generateCollectionUrl.job(lang, slug)
      default:
        return generateLangUrl(lang, `${collection}/${slug}`)
    }
  }

  if (type === 'custom' && url) {
    if (isExternalUrl(url)) {
      return url // External URLs don't need language prefix
    }
    return generateLangUrl(lang, url)
  }

  return null
}
