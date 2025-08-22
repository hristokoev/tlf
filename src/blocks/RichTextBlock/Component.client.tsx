'use client'

import React from 'react'
import { motion, type Variants } from 'framer-motion'
import RichText from '@/components/RichText'

import type { RichTextBlock as RichTextBlockProps } from '@/payload-types'

export const RichTextBlockClient: React.FC<RichTextBlockProps> = (props) => {
  const { richText } = props

  // Animation variants for the container
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  }

  // Animation variants for the content with staggered reveal
  const contentVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
        delay: 0.2,
      },
    },
  }

  // Decorative elements animation
  const decorativeVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 0.1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: 'easeOut' as const,
        delay: 0.8,
      },
    },
  }

  return (
    <motion.section
      className="relative mt-10 pt-12 md:pt-16 lg:pt-24 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <motion.div
        className="absolute bottom-20 left-10 w-24 h-24 bg-white/5 rounded-full blur-lg"
        variants={decorativeVariants}
        animate={{
          rotate: [360, 0],
          y: [0, -10, 0],
        }}
        transition={{
          rotate: {
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          },
          y: {
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
      />

      {/* Main content container */}
      <div className="bg-white h-screen p-8 md:p-12 lg:p-16">
        <div className="container relative z-10">
          <motion.div className="max-w-4xl mx-auto" variants={contentVariants}>
            {/* White content box */}
            <motion.div
              className=""
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{
                y: -5,
                transition: { duration: 0.3 },
              }}
            >
              {/* Enhanced RichText with styling for white background and dark text */}
              <RichText
                data={richText}
                enableGutter={false}
                enableProse={true}
                className="prose prose-lg max-w-none text-gray-900 [&_h1]:text-gray-900 [&_h2]:text-gray-900 [&_h3]:text-gray-900 [&_h4]:text-gray-900 [&_h5]:text-gray-900 [&_h6]:text-gray-900 [&_p]:text-gray-800 [&_li]:text-gray-800 [&_strong]:text-gray-900 [&_em]:text-gray-700 [&_a]:text-blue-600 [&_a:hover]:text-blue-800 [&_blockquote]:text-gray-700 [&_blockquote]:border-l-gray-300 [&_code]:text-gray-900 [&_code]:bg-gray-100 [&_pre]:bg-gray-50 [&_pre]:border-gray-200"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
