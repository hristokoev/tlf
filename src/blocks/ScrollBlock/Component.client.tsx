'use client'

import { Media } from '@/components/Media'
import type { ScrollBlock as ScrollBlockProps } from '@/payload-types'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef } from 'react'

export const ScrollBlockClient: React.FC<ScrollBlockProps> = (props) => {
  const { heading, media, title, text } = props

  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  // Scroll-based progress for the entire section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.8', 'end 0.6'],
  })

  // View-based triggers for initial animations
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' })
  const isHeadingInView = useInView(headingRef, { once: true, margin: '-20%' })

  // Split title into words for word-by-word highlighting
  const titleWords = title.split(' ').filter((word) => word.trim() !== '')

  // Split text into words while preserving line breaks
  type TextPart = { type: 'lineBreak' } | { type: 'words'; words: string[] }

  const textParts: TextPart[] = text
    .split(/(\n)/)
    .map((part) => {
      if (part === '\n') return { type: 'lineBreak' } as const
      return {
        type: 'words',
        words: part.split(/\s+/).filter((word) => word.trim() !== ''),
      } as const
    })
    .filter(
      (part): part is TextPart =>
        part.type === 'lineBreak' || (part.type === 'words' && part.words.length > 0),
    )

  // Flatten text words for progress calculation
  const flatTextWords: string[] = []
  textParts.forEach((part) => {
    if (part.type === 'words') {
      flatTextWords.push(...part.words)
    }
  })

  // Calculate total words for progress mapping
  const totalWords = titleWords.length + flatTextWords.length

  return (
    <section ref={sectionRef} className="relative py-12 md:py-24 min-h-[60vh] md:min-h-[80vh]">
      <div className="container">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Media
            resource={media}
            className="w-full h-full"
            imgClassName="object-cover h-full w-full"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 md:bg-black/50" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col lg:grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-16">
          {/* Left Section - Title */}
          <div className="flex flex-col gap-6 md:gap-12 lg:gap-16">
            {/* Heading Animation */}
            <motion.span
              ref={headingRef}
              className="uppercase text-white text-sm md:text-base tracking-wider"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {heading}
            </motion.span>

            {/* Title with Word-by-word Scroll Highlighting */}
            <div ref={titleRef} className="flex flex-wrap">
              {titleWords.map((word, wordIndex) => {
                const wordProgress = wordIndex / totalWords

                return (
                  <motion.h2
                    key={wordIndex}
                    style={{
                      opacity: useTransform(
                        scrollYProgress,
                        [0, wordProgress - 0.05, wordProgress + 0.05, 1],
                        [0, 0, 1, 1],
                      ),
                    }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase text-white leading-none mr-4 mb-2"
                  >
                    {word}
                  </motion.h2>
                )
              })}
            </div>
          </div>

          {/* Right Section - Text */}
          <div className="flex-1 lg:max-w-3xl">
            <div
              ref={textRef}
              className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl leading-relaxed text-white"
            >
              {(() => {
                let globalTextWordIndex = 0
                return textParts.map((part, partIndex) => {
                  if (part.type === 'lineBreak') {
                    return <br key={`br-${partIndex}`} />
                  }

                  return part.words.map((word, wordIndex) => {
                    const totalWordIndex = titleWords.length + globalTextWordIndex
                    const wordProgress = totalWordIndex / totalWords
                    globalTextWordIndex++

                    return (
                      <motion.span
                        key={`${partIndex}-${wordIndex}`}
                        style={{
                          opacity: useTransform(
                            scrollYProgress,
                            [
                              0,
                              Math.min(wordProgress - 0.05, 0.85),
                              Math.min(wordProgress + 0.05, 0.95),
                              1,
                            ],
                            [0, 0, 1, 1],
                          ),
                        }}
                        className="inline-block mr-2 transition-all duration-100"
                      >
                        {word}
                      </motion.span>
                    )
                  })
                })
              })()}
            </div>
          </div>
        </div>

        {/* Decorative Line - Desktop Only with Scroll Progress */}
        <motion.div
          className="hidden lg:flex absolute right-6 xl:right-12 top-0 h-full w-4 py-16 flex-col items-center justify-center space-y-6 z-20"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={isInView ? { opacity: 1, scaleY: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Progress indicator */}
          <motion.div className="bg-white w-[2px] h-full opacity-30" />
          <motion.div
            className="bg-white w-[2px] absolute top-16"
            style={{
              height: useTransform(scrollYProgress, [0, 1], ['0%', 'calc(100% - 8rem)']),
              opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 0.8, 0.8, 0]),
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}
