import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

import HeroBg from '../../../public/hero-bg.png'

export const DefaultHero: React.FC<Page['hero']> = ({ link, media, richText }) => {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-y-0 left-[-120px] w-[35%] z-0">
        <Media imgClassName="h-full w-full object-cover" className="w-full" src={HeroBg} />
      </div>

      <div className="ml-[35%] w-[65%] h-screen relative overflow-hidden">
        <Media imgClassName="h-screen w-full object-cover" className="w-full" resource={media} />
        <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent to-[25%] z-10" />
      </div>

      <div className="absolute inset-0 z-10 flex items-center container text-white">
        <div className="max-w-3xl">
          {richText && (
            <RichText
              data={richText}
              enableGutter={false}
              enableProse={false}
              className="text-6xl leading-[1.25]"
            />
          )}

          <div className="mt-12">
            <CMSLink {...link} size="lg" />
          </div>
        </div>
      </div>

      <div className="absolute right-12 top-0 h-full w-4 py-16 flex flex-col items-center justify-center space-y-6 z-20">
        <div className="bg-white w-[0.5px] h-full"></div>
        <div className="-rotate-90 text-white text-xs">Dolů</div>
        <svg
          width="7"
          height="37"
          viewBox="0 0 7 37"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.5 37L6.38675 32H0.613249L3.5 37ZM3.5 0L3 0L3 32.5H3.5H4L4 0L3.5 0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  )
}
