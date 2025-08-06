'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import type { ContactBlock as ContactBlockProps } from '@/payload-types'
import { FormBlock } from '../Form/Component'
import { Media } from '@/components/Media'

export const ContactBlockClient: React.FC<ContactBlockProps> = (props) => {
  const { heading, title, description, form, media } = props

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const slideUpVariants = {
    hidden: {
      opacity: 0,
      y: 60,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  }

  const slideInFromLeft = {
    hidden: {
      opacity: 0,
      x: -100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  }

  const slideInFromRight = {
    hidden: {
      opacity: 0,
      x: 100,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  }

  const lineVariants = {
    hidden: {
      scaleY: 0,
      opacity: 0,
    },
    visible: {
      scaleY: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
        delay: 0.8,
      },
    },
  }

  // SSR fallback - render basic version without animations
  if (!mounted) {
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

  return (
    <section className="relative py-12 md:py-24 min-h-screen overflow-hidden">
      {/* Ambient background elements */}
      <motion.div
        className="absolute inset-0 opacity-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2 }}
      ></motion.div>

      <motion.div
        className="container relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col lg:flex-row justify-between gap-8 md:gap-12 lg:gap-16">
          {/* Content Section */}
          <motion.div
            className="flex flex-col justify-between gap-8 md:gap-12 lg:gap-16 w-full lg:max-w-2xl lg:flex-1"
            variants={slideInFromLeft}
          >
            {/* Header */}
            <div className="space-y-6 md:space-y-8">
              <motion.span
                className="uppercase text-white/80 text-sm md:text-base tracking-wider font-light inline-block"
                variants={slideUpVariants}
              >
                {heading}
              </motion.span>

              <motion.div variants={slideUpVariants}>
                <motion.h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-white leading-tight mb-4 bg-gradient-to-r from-white to-white/90 bg-clip-text">
                  {title}
                </motion.h2>
                <motion.p
                  className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl"
                  variants={slideUpVariants}
                >
                  {description}
                </motion.p>
              </motion.div>
            </div>

            {/* Form Section */}
            <motion.div className="w-full" variants={slideUpVariants}>
              {/* @ts-expect-error lets use of FormBlock */}
              <FormBlock enableIntro={false} form={form} />
            </motion.div>
          </motion.div>

          {/* Media Section */}
          <motion.div
            className="w-full lg:w-auto lg:flex-shrink-0 relative"
            variants={slideInFromRight}
          >
            {/* Mobile/Tablet Layout */}
            <div className="lg:hidden">
              <motion.div
                className="relative overflow-hidden"
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
              >
                <Media
                  resource={media}
                  className="w-full h-[300px] sm:h-[400px] md:h-[500px]"
                  imgClassName="object-cover h-full w-full"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </motion.div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:block">
              <motion.div
                className="relative overflow-hidden group"
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
              >
                <Media
                  resource={media}
                  className="w-[500px] xl:w-[600px] h-[600px] xl:h-[700px]"
                  imgClassName="object-cover h-full w-full transition-transform duration-700 group-hover:scale-105"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                />

                {/* Decorative border */}
                <motion.div
                  className="absolute inset-0 border border-white/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Decorative Line - Desktop Only */}
        <motion.div
          className="hidden xl:flex absolute right-6 2xl:right-12 top-0 h-full w-4 py-16 flex-col items-center justify-center space-y-6 z-20"
          variants={lineVariants}
        >
          <motion.div
            className="bg-white to-transparent w-[0.5px] h-full origin-top"
            style={{ transformOrigin: 'top' }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
