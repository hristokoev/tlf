'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Media } from '@/components/Media'
import { useRef, useEffect, useState } from 'react'
import type { Job } from '@/payload-types'

interface AnimatedJobHeroProps {
  job: Job
}

export function AnimatedJobHero({ job }: AnimatedJobHeroProps) {
  // Get the number of available images
  const availableImages = job.content.media?.filter(Boolean) || []
  const imageCount = availableImages.length

  const sectionRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Parallax scroll effects - only after mounting
  const { scrollYProgress } = useScroll({
    target: mounted ? sectionRef : undefined,
    offset: ['start end', 'end start'],
  })

  // Different parallax speeds for the 3 images (when there are 3+)
  const leftImageY = useTransform(scrollYProgress, [0, 1], ['30%', '-10%'])
  const rightImage1Y = useTransform(scrollYProgress, [0, 1], ['-30%', '10%'])
  const rightImage2Y = useTransform(scrollYProgress, [0, 1], ['-30%', '10%'])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0, 1] as const,
      },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.25, 0, 1] as const,
      },
    },
  }

  const benefitsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const benefitItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.25, 0, 1] as const,
      },
    },
  }

  const imageGridVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.25, 0, 1] as const,
        staggerChildren: 0.1,
      },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0, 1] as const,
      },
    },
  }

  const decorativeVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.25, 0, 1] as const,
        delay: 0.5,
      },
    },
  }

  // Function to render images based on count
  const renderImageLayout = () => {
    if (imageCount === 0) {
      return (
        <motion.div
          variants={imageVariants}
          className="hidden lg:flex items-center justify-center w-full h-[600px] bg-gray-100"
        >
          <p className="text-gray-500">No images available</p>
        </motion.div>
      )
    }

    if (imageCount === 1) {
      return (
        <motion.div variants={imageVariants} className="hidden lg:flex justify-center">
          <Media
            resource={availableImages[0]}
            className="w-full max-w-[400px] h-[600px] overflow-hidden"
            imgClassName="object-cover h-full w-full"
          />
        </motion.div>
      )
    }

    if (imageCount === 2) {
      return (
        <motion.div
          variants={imageGridVariants}
          className="hidden lg:grid grid-cols-1 gap-4 max-w-[400px] mx-auto"
        >
          <motion.div variants={imageVariants}>
            <Media
              resource={availableImages[0]}
              className="w-full h-[290px] overflow-hidden"
              imgClassName="object-cover h-full w-full"
            />
          </motion.div>
          <motion.div variants={imageVariants}>
            <Media
              resource={availableImages[1]}
              className="w-full h-[290px] overflow-hidden"
              imgClassName="object-cover h-full w-full"
            />
          </motion.div>
        </motion.div>
      )
    }

    // 3 or more images - parallax layout
    return (
      <motion.div variants={imageGridVariants} className="hidden lg:grid grid-cols-2 gap-4">
        <motion.div variants={imageVariants} className="flex flex-col justify-start">
          <motion.div
            style={mounted ? { y: leftImageY } : {}}
            className="relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
          >
            <Media
              resource={availableImages[0]}
              className="w-full overflow-hidden"
              imgClassName="object-cover h-full w-full"
            />
          </motion.div>
        </motion.div>
        <motion.div variants={imageVariants} className="flex flex-col justify-end gap-4">
          <motion.div
            style={mounted ? { y: rightImage1Y } : {}}
            className="relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
          >
            <Media
              resource={availableImages[1]}
              className="w-full max-w-[277px] h-[277px] overflow-hidden"
              imgClassName="object-cover h-full w-full"
            />
          </motion.div>
          {availableImages[2] && (
            <motion.div
              style={mounted ? { y: rightImage2Y } : {}}
              className="relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <Media
                resource={availableImages[2]}
                className="w-full max-w-[277px] h-[277px] overflow-hidden"
                imgClassName="object-cover h-full w-full"
              />
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    )
  }

  return (
    <section ref={sectionRef} className="container relative py-16 md:py-24">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16"
        >
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-md"
            >
              {job.content.description}
            </motion.p>

            {/* Title */}
            <motion.h1
              variants={titleVariants}
              className="text-3xl sm:text-4xl md:text-6xl text-wrap font-bold text-gray-900 leading-tight tracking-tight uppercase"
            >
              {job.title}
            </motion.h1>

            {/* Parameters */}
            <motion.div variants={benefitsVariants} className="space-y-6 pt-8">
              {job.content.benefits?.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={benefitItemVariants}
                  className="flex items-center gap-4"
                >
                  {benefit.icon && (
                    <div className="flex items-center justify-center flex-shrink-0">
                      <Media
                        resource={benefit.icon}
                        className="w-8 h-8"
                        imgClassName="object-contain"
                      />
                    </div>
                  )}
                  <span className="text-base sm:text-lg text-gray-900 font-medium">
                    {benefit.title}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Dynamic Image Layout */}
          {renderImageLayout()}
        </motion.div>

        {/* Mobile Image Gallery - Show all available images in a scrollable row */}
        {imageCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.25, 0, 1] as const }}
            className="lg:hidden mt-12"
          >
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {availableImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.6 + index * 0.1,
                    ease: [0.25, 0.25, 0, 1] as const,
                  }}
                  className="flex-shrink-0"
                >
                  <Media
                    resource={image}
                    className="w-72 h-80 overflow-hidden"
                    imgClassName="object-cover h-full w-full"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Decorative Right Side Element - Desktop Only */}
      <motion.div
        variants={decorativeVariants}
        initial="hidden"
        animate="visible"
        className="hidden lg:flex absolute right-6 xl:right-12 top-0 h-full w-4 py-8 flex-col items-center justify-center z-10"
        style={{ originY: 0 }}
      >
        <div className="bg-black w-[0.5px] h-32 xl:h-full"></div>
      </motion.div>
    </section>
  )
}
