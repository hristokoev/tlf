import { Media } from '@/components/Media'
import type { AboutUsBlock as AboutUsBlockProps } from '@/payload-types'

export const AboutUsBlock: React.FC<AboutUsBlockProps> = (props) => {
  const { heading, description, counters, mediaItems } = props

  return (
    <section
      className="relative bg-white py-12 md:py-24"
      style={{ backgroundImage: 'url(/hero-bg.png)', backgroundSize: 'cover' }}
    >
      <div className="container">
        <div className="flex justify-between flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Content Section */}
          <div className="flex justify-between flex-col lg:min-h-[690px] lg:max-w-2xl w-full lg:w-auto">
            {/* Heading */}
            <span className="uppercase text-sm md:text-base mb-6 lg:mb-0">{heading}</span>

            {/* Counters */}
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 lg:gap-32 mb-8 lg:mb-0">
              {counters.map((counter, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center sm:items-start lg:items-center text-center sm:text-left lg:text-center"
                >
                  <div className="text-6xl sm:text-7xl md:text-8xl lg:text-[96px] xl:text-[128px] font-bold leading-none">
                    {counter.number}
                    {counter.overflow && <span>+</span>}
                  </div>
                  <div className="text-base sm:text-lg lg:text-xl uppercase mt-2">
                    {counter.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="max-w-2xl">
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed">{description}</p>
            </div>
          </div>

          {/* Media Grid */}
          <div className="w-full lg:w-auto">
            {/* Mobile/Tablet Layout - Single Column */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4 sm:gap-6">
              {mediaItems?.slice(0, 3).map((item, index) => (
                <Media
                  key={index}
                  resource={item}
                  className="w-full aspect-square sm:aspect-[4/5] max-w-full"
                  imgClassName="object-cover h-full w-full"
                />
              ))}
            </div>

            {/* Desktop Layout - Two Column Grid */}
            <div className="hidden lg:grid grid-cols-2 gap-6">
              <div className="flex flex-col justify-start">
                <Media
                  resource={mediaItems[0]}
                  className="w-full mb-2 max-w-[360px] h-[600px]"
                  imgClassName="object-cover h-full w-full"
                />
              </div>
              <div className="flex flex-col justify-end gap-2">
                <Media
                  resource={mediaItems[1]}
                  className="w-full max-w-[277px] h-[277px]"
                  imgClassName="object-cover h-full w-full"
                />
                <Media
                  resource={mediaItems[2]}
                  className="w-full max-w-[277px] h-[277px]"
                  imgClassName="object-cover h-full w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Line - Hidden on Mobile */}
      <div className="hidden lg:block absolute right-12 top-0 h-full w-4 py-16 z-20">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="bg-black w-[1px] h-full"></div>
        </div>
      </div>
    </section>
  )
}
