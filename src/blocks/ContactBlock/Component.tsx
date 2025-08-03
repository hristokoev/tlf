import type { ContactBlock as ContactBlockProps } from '@/payload-types'
import { FormBlock } from '../Form/Component'
import { Media } from '@/components/Media'

export const ContactBlock: React.FC<ContactBlockProps> = (props) => {
  const { heading, title, description, form, media } = props

  return (
    <section className="relative py-12 md:py-24">
      <div className="container">
        <div className="flex flex-col lg:flex-row justify-between gap-8 md:gap-12 lg:gap-16">
          {/* Content Section */}
          <div className="flex flex-col justify-between gap-8 md:gap-12 lg:gap-16 w-full lg:max-w-2xl lg:flex-1">
            {/* Header */}
            <div className="space-y-6 md:space-y-8">
              <span className="uppercase text-white text-sm md:text-base tracking-wider">
                {heading}
              </span>
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-white leading-tight mb-4">
                  {title}
                </h2>
                <p className="text-lg md:text-xl text-white leading-relaxed max-w-2xl">
                  {description}
                </p>
              </div>
            </div>

            {/* Form Section */}
            <div className="w-full">
              {/* @ts-expect-error lets use of FormBlock */}
              <FormBlock enableIntro={false} form={form} />
            </div>
          </div>

          {/* Media Section */}
          <div className="w-full lg:w-auto lg:flex-shrink-0 relative">
            {/* Mobile/Tablet Layout */}
            <div className="lg:hidden">
              <Media
                resource={media}
                className="w-full h-[300px] sm:h-[400px] md:h-[500px]"
                imgClassName="object-cover h-full w-full"
              />
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:block">
              <Media
                resource={media}
                className="w-[500px] xl:w-[600px] h-[600px] xl:h-[700px]"
                imgClassName="object-cover h-full w-full"
              />
            </div>
          </div>
        </div>

        {/* Decorative Line - Desktop Only */}
        <div className="hidden xl:flex absolute right-6 2xl:right-12 top-0 h-full w-4 py-16 flex-col items-center justify-center space-y-6 z-20">
          <div className="bg-white w-[0.5px] h-full"></div>
        </div>
      </div>
    </section>
  )
}
