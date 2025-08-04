'use client'

import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import { useRef } from 'react'
import type { BannerBlock as BannerBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const textVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
}

const overlayVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: 'easeOut',
    },
  },
}

export const BannerBlockClient: React.FC<BannerBlockProps> = (props) => {
  const { backgroundImage, textPosition, subtitle, title, description } = props

  const containerRef = useRef<HTMLElement>(null)

  // Parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Transform values for parallax effect
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 0.6, 0.8])

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden h-screen min-h-[100vh] flex items-center justify-center"
    >
      {/* Parallax Background */}
      <motion.div className="absolute inset-0 scale-110" style={{ y: backgroundY }}>
        <Media
          resource={backgroundImage}
          className="w-full h-full"
          imgClassName="object-cover h-full w-full"
        />
      </motion.div>

      {/* Animated Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60"
        style={{ opacity: overlayOpacity }}
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
      />

      {/* Content Container */}
      <div className="container relative z-10 h-full flex items-center">
        <motion.div
          className={cn('w-full grid grid-cols-1 lg:grid-cols-2', {
            'lg:justify-items-start': textPosition === 'left',
            'lg:justify-items-end': textPosition === 'right',
          })}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ y: textY }}
        >
          {/* Spacer for right positioning */}
          {textPosition === 'right' && <div className="hidden lg:block" />}

          {/* Text Content */}
          <motion.div
            className={cn('flex flex-col gap-8 md:gap-12 max-w-none lg:max-w-3xl text-white', {
              'text-center lg:text-left items-start': textPosition === 'left',
              'text-center lg:text-right items-end': textPosition === 'right',
            })}
            variants={containerVariants}
          >
            {subtitle && (
              <motion.h3
                className="text-lg md:text-xl lg:text-2xl font-medium leading-tight tracking-wide opacity-90"
                variants={textVariants}
              >
                {subtitle}
              </motion.h3>
            )}

            {title && (
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase leading-[0.9] tracking-tight"
                variants={textVariants}
              >
                {title}
              </motion.h1>
            )}

            {description && (
              <motion.p
                className="text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl opacity-90 font-light"
                variants={textVariants}
              >
                {description}
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
