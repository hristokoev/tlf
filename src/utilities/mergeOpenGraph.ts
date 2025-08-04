import type { Metadata } from 'next'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'An open-source website built with Payload and Next.js.',
  // TODO: Meta images
  // images: [
  //   {
  //     url: `${getServerSideURL()}/website-template-OG.webp`,
  //   },
  // ],
  siteName: 'TLF',
  title: 'TLF',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
