import type { PartnersBlock as PartnersBlockProps } from '@/payload-types'
import { PartnersBlockClient } from './Component.client'

export const PartnersBlock: React.FC<PartnersBlockProps> = (props) => {
  const { heading, partners } = props

  return (
    <section className="relative bg-black py-12 md:py-24">
      <div className="container">
        {/* Heading */}
        <div className="mb-8 md:mb-12">
          <span className="uppercase text-white text-sm md:text-base tracking-wider">
            {heading}
          </span>
        </div>

        {/* Partners Grid/Carousel */}
        <PartnersBlockClient partners={partners} />
      </div>
    </section>
  )
}
