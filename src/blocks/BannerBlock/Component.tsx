import type { BannerBlock as BannerBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

export const BannerBlock: React.FC<BannerBlockProps> = (props) => {
  const { backgroundImage, textPosition, subtitle, title, description } = props

  return (
    <section className="relative py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-8 min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh]">
      <div className="container">
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <Media
            resource={backgroundImage}
            className="w-full h-full"
            imgClassName="object-cover h-full w-full"
          />
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 md:bg-black/50" />

        {/* Content Grid */}
        <div className="relative z-10 h-full flex items-center min-h-[50vh] md:min-h-[60vh] lg:min-h-[70vh]">
          <div
            className={cn('w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16', {
              'lg:justify-items-start': textPosition === 'left',
              'lg:justify-items-end': textPosition === 'right',
            })}
          >
            {/* Spacer for right positioning on desktop */}
            {textPosition === 'right' && <div className="hidden lg:block" />}

            {/* Text Content */}
            <div
              className={cn(
                'flex flex-col justify-center gap-6 md:gap-8 lg:gap-16 max-w-none lg:max-w-2xl text-white',
                {
                  'text-center lg:text-left': textPosition === 'left',
                  'text-center lg:text-right': textPosition === 'right',
                },
              )}
            >
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold leading-tight">
                {subtitle}
              </h3>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase leading-tight tracking-wide">
                {title}
              </h2>
              <p className="text-base md:text-lg lg:text-xl leading-relaxed max-w-prose mx-auto lg:mx-0">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
