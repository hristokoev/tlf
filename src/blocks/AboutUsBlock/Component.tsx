import { Media } from '@/components/Media'
import type { AboutUsBlock as AboutUsBlockProps } from '@/payload-types'

export const AboutUsBlock: React.FC<AboutUsBlockProps> = (props) => {
  const { heading, description, counters, mediaItems } = props

  return (
    <section
      className="relative bg-white container py-24"
      style={{ backgroundImage: 'url(/hero-bg.png)', backgroundSize: 'cover' }}
    >
      <div className="flex justify-between">
        <div className="flex justify-between flex-col min-h-[690px] max-w-2xl">
          <span className="uppercase">{heading}</span>
          <div className="flex space-x-32 mb-8">
            {counters.map((counter, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="text-[128px] font-bold">
                  {counter.number}
                  {counter.overflow && <span>+</span>}
                </div>
                <div className="text-xl uppercase">{counter.label}</div>
              </div>
            ))}
          </div>
          <div className="max-w-2xl">
            <p className="text-2xl">{description}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="">
            <Media
              resource={mediaItems[0]}
              className="w-full mb-2 max-w-[360px] h-[600px]"
              imgClassName="object-cover h-full"
            />
          </div>
          <div className="self-end">
            <Media
              resource={mediaItems[1]}
              className="w-full mb-2 max-w-[277px] h-[277px]"
              imgClassName="object-cover h-full"
            />
            <Media
              resource={mediaItems[2]}
              className="w-full mb-2 max-w-[277px] h-[277px]"
              imgClassName="object-cover h-full"
            />
          </div>
        </div>
      </div>
      <div className="absolute right-12 top-0 h-full w-4 py-16 flex flex-col items-center justify-center space-y-6 z-20">
        <div className="bg-black w-[1px] h-full"></div>
      </div>
    </section>
  )
}
