import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { AboutUsBlock } from './AboutUsBlock/Component'
import { BannerBlock } from './BannerBlock/Component'
import { BlogBlock } from './BlogBlock/Component'
import { ContactBlock } from './ContactBlock/Component'
import { ContentShowcaseBlock } from './ContentShowcaseBlock/Component'
import { JobsBlock } from './JobsBlock/Component'
import { MapInfoBlock } from './MapInfoBlock/Component'
import { MediaBlock } from './MediaBlock/Component'
import { PartnersBlock } from './PartnersBlock/Component'
import { ProductsBlock } from './ProductsBlock/Component'
import { ScrollBlock } from './ScrollBlock/Component'
import { TeamBlock } from './TeamBlock/Component'
import { TwoInOneBlock } from './TwoInOneBlock/Component'

const blockComponents = {
  aboutUsBlock: AboutUsBlock,
  bannerBlock: BannerBlock,
  blogBlock: BlogBlock,
  contactBlock: ContactBlock,
  contentShowcaseBlock: ContentShowcaseBlock,
  jobsBlock: JobsBlock,
  mapInfoBlock: MapInfoBlock,
  mediaBlock: MediaBlock,
  partnersBlock: PartnersBlock,
  productsBlock: ProductsBlock,
  scrollBlock: ScrollBlock,
  teamBlock: TeamBlock,
  twoInOneBlock: TwoInOneBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
  lang?: string
}> = (props) => {
  const { blocks, lang } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer lang={lang} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
