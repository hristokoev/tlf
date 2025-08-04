'use client'

import React from 'react'
import { motion, type Variants } from 'framer-motion'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

import HeroBg from '../../../public/hero-bg.png'

export const DefaultHero: React.FC<Page['hero']> = ({ link, media, richText }) => {
  // Animation variants for the text content
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  }

  const textVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  const buttonVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
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

  const decorativeVariants: Variants = {
    hidden: {
      opacity: 0,
      x: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        delay: 1.2,
      },
    },
  }

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Image - Hidden on mobile, responsive positioning on larger screens */}
      <div className="hidden md:block absolute inset-y-0 left-[-60px] lg:left-[-120px] w-[30%] lg:w-[35%] z-0">
        <Media imgClassName="h-full w-full object-cover" className="w-full" src={HeroBg} />
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Main Media Section */}
        <div className="md:ml-[30%] lg:ml-[35%] md:w-[70%] lg:w-[65%] h-[60vh] sm:h-[70vh] md:h-screen relative overflow-hidden">
          <Media
            imgClassName="h-full w-full object-cover"
            className="w-full h-full"
            resource={media}
          />
          {/* Gradient Overlay - Responsive */}
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/70 md:from-background to-transparent md:to-[25%] z-10" />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 z-20 flex items-end md:items-center">
          <div className="container text-white w-full">
            <motion.div
              className="pb-8 md:pb-0 md:mt-0 max-w-full md:max-w-2xl lg:max-w-3xl"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {richText && (
                <motion.div variants={textVariants}>
                  <RichText
                    data={richText}
                    enableGutter={false}
                    enableProse={false}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight md:leading-[1.25] mb-6 md:mb-0"
                  />
                </motion.div>
              )}

              <motion.div className="mt-6 md:mt-12" variants={buttonVariants}>
                <CMSLink {...link} size="lg" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative Right Side Element - Desktop Only */}
      <motion.div
        className="hidden lg:flex absolute right-6 xl:right-12 top-0 h-full w-4 py-16 flex-col items-center justify-center space-y-6 z-30"
        variants={decorativeVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="bg-white w-[0.5px] h-32 xl:h-full"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 1.5 }}
          style={{ originY: 0 }}
        />
        <motion.div
          className="-rotate-90 text-white text-xs whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2 }}
        >
          <a href="#scroll-down">Dolů</a>
        </motion.div>
        <motion.svg
          width="7"
          height="37"
          viewBox="0 0 7 37"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-2 h-8 xl:w-[7px] xl:h-[37px]"
          initial={{ opacity: 0, y: -10 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: 2.2 },
          }}
          whileHover={{
            y: 5,
            transition: { duration: 0.3, repeat: Infinity, repeatType: 'reverse' },
          }}
        >
          <path
            d="M3.5 37L6.38675 32H0.613249L3.5 37ZM3.5 0L3 0L3 32.5H3.5H4L4 0L3.5 0Z"
            fill="white"
          />
        </motion.svg>
      </motion.div>

      {/* Scroll Down Tag */}
      <div id="scroll-down" />
    </section>
  )
}
