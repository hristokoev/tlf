import { Media } from '@/components/Media'
import type { ScrollBlock as ScrollBlockProps } from '@/payload-types'

export const ScrollBlock: React.FC<ScrollBlockProps> = (props) => {
  const { heading, media, title, text } = props

  return (
    <section className="relative container py-24">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Media
          resource={media}
          className="w-full h-full"
          imgClassName="object-cover h-full w-full"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50" />

      {/* Content */}
      <div className="relative z-10 h-full grid grid-cols-2 gap-8">
        {/* Left Title */}
        <div className="flex flex-col gap-16">
          <span className="uppercase text-white">{heading}</span>
          <h2 className="text-8xl mt-4 font-bold uppercase text-white">{title}</h2>
        </div>

        {/* Right Text */}
        <div className="max-w-3xl max-h-[600px] overflow-y-scroll scrollbar-hide">
          <p className="text-3xl whitespace-pre-line text-white">{text}</p>
        </div>
      </div>
      <div className="absolute right-12 top-0 h-full w-4 py-16 flex flex-col items-center justify-center space-y-6 z-20">
        <div className="bg-white w-[0.5px] h-full"></div>
      </div>
    </section>
  )
}
