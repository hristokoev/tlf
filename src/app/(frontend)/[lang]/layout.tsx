import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import React from 'react'

// import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
// import { draftMode } from 'next/headers'

import './globals.css'
import { LexendMegaFont } from './fonts'
import { getServerSideURL } from '@/utilities/getURL'

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

const SUPPORTED_LANGUAGES = ['cs', 'en', 'de']

export async function generateStaticParams() {
  return [{ lang: 'cs' }, { lang: 'en' }, { lang: 'de' }]
}

export default async function RootLayout({ children, params }: LayoutProps) {
  // const { isEnabled } = await draftMode()
  const { lang } = await params

  // Validate language - return 404 if invalid
  if (!SUPPORTED_LANGUAGES.includes(lang)) {
    notFound()
  }

  return (
    <html className={LexendMegaFont.className} lang={lang} suppressHydrationWarning>
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <script
          defer
          src="https://umami.koev.cz/script.js"
          data-website-id="6f0608b9-4156-43c5-8bf9-d1f29414f1ac"
        ></script>
      </head>
      <body>
        {/* <AdminBar
          adminBarProps={{
            preview: isEnabled,
          }}
        /> */}

        <Header lang={lang} />
        {children}
        <Footer lang={lang} />
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
