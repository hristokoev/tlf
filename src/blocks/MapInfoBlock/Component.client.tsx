'use client'

import { motion, type Variants } from 'framer-motion'
import { Media } from '@/components/Media'
import type { MapInfoBlock as MapInfoBlockProps } from '@/payload-types'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

const mapVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.05,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
}

const headerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

export const MapInfoBlockClient: React.FC<MapInfoBlockProps> = (props) => {
  const { map, heading, title, description, infoItems } = props

  return (
    <section className="bg-white overflow-hidden">
      {/* Map Container */}
      <motion.div
        className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden"
        variants={mapVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
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
      </motion.div>

      {/* Content Section */}
      <div className="container py-16 md:py-24 lg:py-32">
        <motion.div
          className="flex flex-col gap-12 md:gap-16 lg:gap-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {/* Header Section */}
          <motion.div className="space-y-6 md:space-y-8" variants={headerVariants}>
            <motion.span
              className="inline-block uppercase text-sm md:text-base tracking-[0.2em] text-gray-500 font-medium"
              variants={itemVariants}
            >
              {heading}
            </motion.span>

            <motion.div variants={itemVariants}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-[0.9] mb-6 tracking-tight">
                {title}
              </h2>
              <p className="text-lg md:text-xl leading-relaxed max-w-4xl text-gray-600">
                {description}
              </p>
            </motion.div>
          </motion.div>

          {/* Info Items Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16"
            variants={containerVariants}
          >
            {infoItems.map((item, index) => (
              <motion.div
                key={index}
                className="group"
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3, ease: 'easeOut' },
                }}
              >
                <div className="flex flex-col space-y-4 md:space-y-6 h-full">
                  {/* Icon Container */}
                  <motion.div className="flex-shrink-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl p-3 md:p-4 transition-colors duration-300">
                      <Media
                        resource={item.icon}
                        className="w-full h-full"
                        imgClassName="object-contain w-full h-full filter transition-all duration-300 group-hover:brightness-110"
                      />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 space-y-3">
                    <h4 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed whitespace-pre-line">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
