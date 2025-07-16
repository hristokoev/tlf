import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { AboutUsBlock } from './AboutUsBlock/Component'
import { BlogBlock } from './BlogBlock/Component'
import { ContactBlock } from './ContactBlock/Component'
import { MediaBlock } from './MediaBlock/Component'
import { ScrollBlock } from './ScrollBlock/Component'
import { TwoInOneBlock } from './TwoInOneBlock/Component'
import { BannerBlock } from './BannerBlock/Component'
import { ContentShowcaseBlock } from './ContentShowcaseBlock/Component'
import { MapInfoBlock } from './MapInfoBlock/Component'
import { ProductsBlock } from './ProductsBlock/Component'
import { TeamBlock } from './TeamBlock/Component'

const blockComponents = {
  aboutUsBlock: AboutUsBlock,
  bannerBlock: BannerBlock,
  blogBlock: BlogBlock,
  contactBlock: ContactBlock,
  contentShowcaseBlock: ContentShowcaseBlock,
  mapInfoBlock: MapInfoBlock,
  mediaBlock: MediaBlock,
  productsBlock: ProductsBlock,
  scrollBlock: ScrollBlock,
  teamBlock: TeamBlock,
  twoInOneBlock: TwoInOneBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

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
                  <Block {...block} disableInnerContainer />
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
