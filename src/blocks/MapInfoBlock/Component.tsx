import { Media } from '@/components/Media'
import type { MapInfoBlock as MapInfoBlockProps } from '@/payload-types'

export const MapInfoBlock: React.FC<MapInfoBlockProps> = (props) => {
  const { map, heading, title, description, infoItems } = props

  return (
    <section className="bg-white">
      {/* Responsive Map Container */}
      <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
        <iframe
          width="100%"
          height="100%"
          id="gmap_canvas"
          src={map}
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Location Map"
        />
      </div>

      {/* Content Section */}
      <div className="container py-12 md:py-20 lg:py-24">
        <div className="flex flex-col gap-8 md:gap-12 lg:gap-16">
          {/* Header Section */}
          <div className="space-y-6 md:space-y-8">
            <span className="uppercase text-sm md:text-base tracking-wider text-gray-600">
              {heading}
            </span>
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase leading-tight mb-4">
                {title}
              </h2>
              <p className="text-base md:text-lg leading-relaxed max-w-3xl text-gray-700">
                {description}
              </p>
            </div>
          </div>

          {/* Info Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
            {infoItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col space-y-3 md:space-y-4 group hover:transform hover:translateY-[-4px] transition-transform duration-300"
              >
                {/* Icon */}
                <div className="flex-shrink-0">
                  <Media
                    resource={item.icon}
                    className="w-12 h-12 md:w-16 md:h-16"
                    imgClassName="object-contain w-full h-full"
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h4 className="text-lg md:text-xl font-semibold text-gray-900 leading-tight mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed whitespace-pre-line">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
