import { Media } from '@/components/Media'
import type { ScrollBlock as ScrollBlockProps } from '@/payload-types'

export const ScrollBlock: React.FC<ScrollBlockProps> = (props) => {
  const { heading, media, title, text } = props

  return (
    <section className="relative py-12 md:py-24 min-h-[60vh] md:min-h-[80vh]">
      <div className="container">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Media
            resource={media}
            className="w-full h-full"
            imgClassName="object-cover h-full w-full"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 md:bg-black/50" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col lg:grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-16">
          {/* Left Section - Title */}
          <div className="flex flex-col gap-6 md:gap-12 lg:gap-16">
            <span className="uppercase text-white text-sm md:text-base tracking-wider">
              {heading}
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase text-white leading-none">
              {title}
            </h2>
          </div>

          {/* Right Section - Scrollable Text */}
          <div className="flex-1 lg:max-w-3xl">
            {/* Mobile/Tablet - No scroll container */}
            <div className="lg:hidden">
              <p className="text-lg sm:text-xl md:text-2xl whitespace-pre-line text-white leading-relaxed">
                {text}
              </p>
            </div>

            {/* Desktop - Scrollable container */}
            <div className="hidden lg:block max-h-[500px] xl:max-h-[600px] overflow-y-auto scrollbar-hide pr-4">
              <p className="text-2xl xl:text-3xl whitespace-pre-line text-white leading-relaxed">
                {text}
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Line - Desktop Only */}
        <div className="hidden lg:flex absolute right-6 xl:right-12 top-0 h-full w-4 py-16 flex-col items-center justify-center space-y-6 z-20">
          <div className="bg-white w-[0.5px] h-full"></div>
        </div>
      </div>
    </section>
  )
}
