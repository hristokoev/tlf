import { Media } from '@/components/Media'
import type { MapInfoBlock as MapInfoBlockProps } from '@/payload-types'

export const MapInfoBlock: React.FC<MapInfoBlockProps> = (props) => {
  const { map, heading, title, description, infoItems } = props
  return (
    <section className="bg-white">
      <div className="w-full h-[600px] overflow-hidden">
        <iframe width="1920" height="600" id="gmap_canvas" src={map} />
      </div>
      <div className="container py-24">
        <div className="flex flex-col gap-16">
          <span className="uppercase">{heading}</span>
          <div>
            <h2 className="text-5xl font-bold uppercase">{title}</h2>
            <p className="text-lg mt-4 max-w-2xl">{description}</p>
          </div>
          <div className="flex gap-32">
            {infoItems.map((item, index) => (
              <div key={index} className="max-w-md">
                <Media resource={item.icon} />
                <h4 className="mt-4 text-lg font-semibold">{item.title}</h4>
                <p className="mt-2 text-gray-600 whitespace-pre-line">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
