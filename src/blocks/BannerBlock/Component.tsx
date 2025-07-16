import type { BannerBlock as BannerBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

export const BannerBlock: React.FC<BannerBlockProps> = (props) => {
  const { backgroundImage, textPosition, subtitle, title, description } = props
  return (
    <section className="relative container py-32">
      <div className="absolute inset-0">
        <Media
          resource={backgroundImage}
          className="w-full h-full"
          imgClassName="object-cover h-full w-full"
        />
      </div>

      <div className="absolute inset-0 bg-black opacity-50" />

      <div className="relative z-10 h-full grid grid-cols-2 gap-8">
        {textPosition === 'right' && <div />}
        <div className="flex flex-col justify-between gap-16 max-w-2xl text-white">
          <h3 className="text-2xl font-semibold">{subtitle}</h3>
          <h2 className="text-6xl font-bold uppercase">{title}</h2>
          <p className="text-lg">{description}</p>
        </div>
      </div>
      <div
        className={cn(
          'absolute top-0 h-full w-4 py-24 flex flex-col items-center justify-center space-y-6 z-20',
          {
            'right-12': textPosition === 'left',
            'left-12': textPosition === 'right',
          },
        )}
      >
        <div className="bg-white w-[0.5px] h-full"></div>
      </div>
    </section>
  )
}
