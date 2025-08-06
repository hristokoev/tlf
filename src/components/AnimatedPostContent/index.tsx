'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import RichText from '@/components/RichText'
import type { Post } from '@/payload-types'

interface AnimatedPostContentProps {
  post: Post
}

export function AnimatedPostContent({ post }: AnimatedPostContentProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.25, 0, 1] as const,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0, 1] as const,
      },
    },
  }

  return (
    <section className="container py-16 md:py-24" ref={ref}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Content Card */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="bg-white/80 backdrop-blur-sm shadow-xl border border-white/20 overflow-hidden"
          >
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="p-8 sm:p-12 lg:p-16"
            >
              <div
                className="prose prose-lg prose-gray max-w-none
                prose-headings:font-bold prose-headings:text-gray-900
                prose-h1:text-3xl prose-h1:mb-6
                prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8
                prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-6
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                prose-a:text-gray-600 prose-a:font-medium hover:prose-a:text-gray-700
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-ul:my-6 prose-ol:my-6
                prose-li:text-gray-700 prose-li:mb-2
                prose-blockquote:border-l-4 prose-blockquote:border-gray-400  
                prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600
                prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded
                prose-pre:bg-gray-900 prose-pre:text-gray-100
                prose-img:shadow-lg"
              >
                <RichText data={post.content.content} enableGutter={false} />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
