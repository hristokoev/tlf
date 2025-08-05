'use client'

import { Media } from '@/components/Media'
import type { ScrollBlock as ScrollBlockProps } from '@/payload-types'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export const ScrollBlockClient: React.FC<ScrollBlockProps> = (props) => {
  const { heading, media, title, text } = props

  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  const isInView = useInView(sectionRef, { once: true, margin: '-10%' })
  const isHeadingInView = useInView(headingRef, { once: true, margin: '-20%' })
  const isTitleInView = useInView(titleRef, { once: true, margin: '-20%' })
  const isTextInView = useInView(textRef, { once: true, margin: '-20%' })

  // Split title into characters for gradual spacing effect
  const titleChars = title.split('')

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

            {/* Title with Gradual Spacing Effect */}
            <div ref={titleRef} className="flex flex-wrap">
              <AnimatePresence>
                {titleChars.map((char, i) => (
                  <motion.h2
                    key={i}
                    initial={{ opacity: 0, x: -18 }}
                    animate={isTitleInView ? { opacity: 1, x: 0 } : {}}
                    exit="hidden"
                    transition={{ duration: 0.3, delay: i * 0.02 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase text-white leading-none"
                  >
                    {char === ' ' ? <span>&nbsp;</span> : char}
                  </motion.h2>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Section - Text */}
          <div className="flex-1 lg:max-w-3xl">
            <div
              ref={textRef}
              className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl leading-relaxed text-white"
            >
              <AnimatePresence>
                {textParts.map((part, partIndex) => {
                  if (part.type === 'lineBreak') {
                    return <br key={`br-${partIndex}`} />
                  }

                  return part.words.map((word, wordIndex) => {
                    // Calculate global word index for staggered delay
                    let globalIndex = 0
                    for (let i = 0; i < partIndex; i++) {
                      const currentPart = textParts[i]
                      if (currentPart && currentPart.type === 'words') {
                        globalIndex += currentPart.words.length
                      }
                    }
                    globalIndex += wordIndex

                    return (
                      <motion.span
                        key={`${partIndex}-${wordIndex}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={isTextInView ? { opacity: 1, y: 0 } : {}}
                        exit="hidden"
                        transition={{ duration: 0.3, delay: globalIndex * 0.03 }}
                        className="inline-block mr-2"
                      >
                        {word}
                      </motion.span>
                    )
                  })
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Decorative Line - Desktop Only */}
        <motion.div
          className="hidden lg:flex absolute right-6 xl:right-12 top-0 h-full w-4 py-16 flex-col items-center justify-center space-y-6 z-20"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={isInView ? { opacity: 1, scaleY: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-white w-[0.5px] h-full opacity-60"></div>
        </motion.div>
      </div>
    </section>
  )
}
