'use client'

import { motion } from 'framer-motion'
import { Media } from '@/components/Media'
import { formatDateTime } from '@/utilities/formatDateTime'
import type { Post } from '@/payload-types'

interface AnimatedPostHeroProps {
  post: Post
}

export function AnimatedPostHero({ post }: AnimatedPostHeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.25, 0, 1] as const,
      },
    },
  }

  const decorativeVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: {
        duration: 1,
        ease: [0.25, 0.25, 0, 1] as const,
        delay: 0.5,
      },
    },
  }

  return (
    <section className="container relative pt-20 sm:pt-24 md:pt-32">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center"
        >
          {/* Content Column */}
          <div className="order-2 lg:order-1 space-y-8">
            {/* Date Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-gray-200">
                <time className="text-sm font-medium text-gray-800">
                  {formatDateTime(post.publishedAt as string)}
                </time>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight"
            >
              {post.title}
            </motion.h1>

            {/* Description */}
            {post.content.description && (
              <motion.div variants={itemVariants} className="prose prose-lg prose-gray max-w-none">
                <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                  {post.content.description}
                </p>
              </motion.div>
            )}
          </div>

          {/* Image Column */}
          <motion.div variants={imageVariants} className="order-1 lg:order-2">
            <div className="relative group">
              <div className="relative overflow-hidden">
                <Media
                  resource={post.content.media}
                  className="w-full"
                  imgClassName="h-full w-full transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Right Side Element - Desktop Only */}
      <motion.div
        variants={decorativeVariants}
        initial="hidden"
        animate="visible"
        className="hidden lg:flex absolute right-6 xl:right-12 top-0 h-full w-4 flex-col items-center justify-center z-30"
        style={{ originY: 0 }}
      >
        <div className="bg-black w-[0.5px] h-32 xl:h-full"></div>
      </motion.div>
    </section>
  )
}
