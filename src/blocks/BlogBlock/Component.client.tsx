'use client'

import type { BlogBlock as BlogBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import { formatDateTime } from '@/utilities/formatDateTime'
import { Button } from '@/components/ui/button'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface BlogBlockClientProps extends BlogBlockProps {
  postsDocs: any[]
}

export const BlogBlockClient: React.FC<BlogBlockClientProps> = (props) => {
  const { type, heading, title, description, media, postsDocs } = props

  const sectionRef = useRef<HTMLElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)

  // Parallax effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '-15%'])

  // Container animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const },
    },
  }

  // Grid animation variants
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  }

  return (
    <motion.section
      ref={sectionRef}
      className="relative bg-white py-12 md:py-24 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      {/* Animated Background with Parallax */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: backgroundY,
          backgroundImage: 'url(/hero-bg.png)',
          backgroundSize: 'cover',
        }}
      />

      {/* Floating geometric elements */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <div className="container relative z-10">
        {/* Conditional Rendering Based on Block Type */}
        <div className="flex gap-8 md:gap-16 flex-col">
          {/* Header Section */}
          {type === 'compact' ? (
            <motion.span className="uppercase text-sm md:text-base" variants={itemVariants}>
              {heading}
            </motion.span>
          ) : (
            <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-16">
              {/* Content Section - Animated */}
              <motion.div
                className="flex flex-col justify-between gap-8 md:gap-16 max-w-full lg:max-w-4xl"
                variants={containerVariants}
              >
                <motion.span className="uppercase text-sm md:text-base" variants={itemVariants}>
                  {heading}
                </motion.span>

                <motion.h2
                  className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase line-clamp-3 leading-tight md:leading-normal"
                  variants={itemVariants}
                >
                  {title?.split(' ').map((word, index) => (
                    <motion.span
                      key={index}
                      className="inline-block mr-3"
                      initial={{ opacity: 0, rotateX: -90 }}
                      whileInView={{ opacity: 1, rotateX: 0 }}
                      transition={{
                        delay: index * 0.1 + 0.5,
                        duration: 0.6,
                        ease: 'easeOut' as const,
                      }}
                      viewport={{ once: true }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.h2>

                <motion.p
                  className="text-base md:text-lg line-clamp-3 leading-relaxed max-w-3xl"
                  variants={itemVariants}
                >
                  {description}
                </motion.p>
              </motion.div>

              {/* Media Section - Enhanced with Parallax */}
              <motion.div
                ref={mediaRef}
                className="hidden lg:block relative flex-shrink-0"
                initial={{ opacity: 0, x: 50, rotateY: -15 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                viewport={{ once: true }}
                style={{ y: mediaY }}
              >
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    rotateY: 5,
                    transition: { duration: 0.4 },
                  }}
                  className="relative"
                >
                  <Media
                    resource={media}
                    className="w-[300px] xl:w-[400px] h-[500px] xl:h-[690px]"
                    imgClassName="object-cover h-full w-full"
                  />

                  {/* Subtle overlay on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                {/* Decorative Line - Animated */}
                <motion.div
                  className="absolute right-[-48px] xl:right-[-48px] top-0 h-full w-4 py-16 flex flex-col items-center justify-center space-y-6 z-20"
                  initial={{ opacity: 0, scaleY: 0 }}
                  whileInView={{ opacity: 1, scaleY: 1 }}
                  transition={{ duration: 1.2, delay: 1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-black w-[0.5px] h-full"></div>
                </motion.div>
              </motion.div>
            </div>
          )}

          {/* Posts Grid Section - Cool Animations */}
          <motion.div
            className="mt-8 md:mt-16 flex flex-col gap-6 md:gap-8"
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* Responsive Grid with Staggered Animation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {postsDocs.map((post) => (
                <motion.a
                  key={post.id}
                  href={`/aktuality/${post.slug}`}
                  className="w-full bg-background text-white flex flex-col gap-3 md:gap-4 group relative overflow-hidden"
                  variants={cardVariants}
                  whileHover={{
                    y: -10,
                    scale: 1.03,
                    transition: { duration: 0.3, ease: 'easeOut' },
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Animated background glow */}
                  <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Post Image with Enhanced Hover */}
                  <div className="overflow-hidden relative">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                      <Media
                        resource={post.content.media}
                        className="w-full"
                        imgClassName="h-[200px] sm:h-[220px] md:h-[240px] lg:h-[287px] object-cover"
                      />
                    </motion.div>

                    {/* Overlay effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />

                    {/* Hover icon */}
                    <motion.div
                      className="absolute top-4 right-4 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Post Content with Animation */}
                  <motion.div
                    className="px-3 md:px-4 py-2 flex-1 flex flex-col relative z-10"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <motion.h3
                      className="text-lg md:text-xl line-clamp-3 md:line-clamp-4 leading-tight mb-auto"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {post.title}
                    </motion.h3>

                    {/* Post Date with Subtle Animation */}
                    <motion.div
                      className="mt-4 pt-3 border-t border-gray-600"
                      whileHover={{ borderColor: 'rgba(255,255,255,0.4)' }}
                      transition={{ duration: 0.2 }}
                    >
                      <time className="text-gray-300 text-xs md:text-sm">
                        {post.publishedAt && formatDateTime(post.publishedAt)}
                      </time>
                    </motion.div>
                  </motion.div>

                  {/* Subtle border glow on hover */}
                  <motion.div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 transition-colors duration-300 pointer-events-none" />
                </motion.a>
              ))}
            </div>

            {/* Show More Button - Enhanced */}
            {type === 'compact' && (
              <motion.div
                className="flex justify-center lg:justify-end mt-4 md:mt-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Ukazat více
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade gradient */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        viewport={{ once: true }}
      />
    </motion.section>
  )
}
