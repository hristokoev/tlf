'use client'

import { useParams } from 'next/navigation'
import { CMSLink as ServerCMSLink } from './index'

import type { Page } from '@/payload-types'
import type { ButtonProps } from '@/components/ui/button'

type CMSLinkClientType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts' | 'products' | 'jobs'
    value: Page | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

export const CMSLinkClient: React.FC<CMSLinkClientType> = (props) => {
  const params = useParams()
  const { lang } = params as { lang: string }

  return <ServerCMSLink {...props} lang={lang} />
}
