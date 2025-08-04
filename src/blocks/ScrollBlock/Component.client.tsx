'use client'

import { Media } from '@/components/Media'
import type { ScrollBlock as ScrollBlockProps } from '@/payload-types'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

export const ScrollBlockClient: React.FC<ScrollBlockProps> = (props) => {
  const { heading, media, title, text } = props

  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const textContainerRef = useRef<HTMLDivElement>(null)
  const [words, setWords] = useState<string[]>([])
  const [wordTypes, setWordTypes] = useState<Array<{ word: string; isLineBreak: boolean }>>([])

  const isInView = useInView(sectionRef, { margin: '-20% 0px -20% 0px' })

  // Split text into words on mount, preserving line breaks
  useEffect(() => {
    if (text) {
      const lines = text.split('\n')
      const wordsWithLineBreaks: Array<{ word: string; isLineBreak: boolean }> = []

      lines.forEach((line, lineIndex) => {
        const lineWords = line.split(/\s+/).filter((word) => word.trim() !== '')
        lineWords.forEach((word) => {
          wordsWithLineBreaks.push({ word, isLineBreak: false })
        })
        if (lineIndex < lines.length - 1) {
          wordsWithLineBreaks.push({ word: '', isLineBreak: true })
        }
      })

      setWords(wordsWithLineBreaks.map((item) => item.word))
      setWordTypes(wordsWithLineBreaks)
    }
  }, [text])

  // Use scroll progress within the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.3', 'end 0.7'],
  })

  // Transform scroll to word reveal progress
  const wordProgress = useTransform(scrollYProgress, [0, 1], [0, words.length])

  // Single transform for word progress, with auto-scroll to follow revealed words
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  useEffect(() => {
    const unsubscribe = wordProgress.on('change', (latest) => {
      const newIndex = Math.floor(latest)
      setCurrentWordIndex(newIndex)

      // Auto-scroll the text container to show the currently revealing word
      if (textContainerRef.current && newIndex > 0) {
        const container = textContainerRef.current
        const containerHeight = container.clientHeight
        const scrollHeight = container.scrollHeight

        // Calculate approximate scroll position based on word progress
        const scrollPercentage = Math.min(newIndex / words.length, 1)
        const targetScrollTop = (scrollHeight - containerHeight) * scrollPercentage

        // Smooth scroll to the target position
        container.scrollTo({
          top: targetScrollTop,
          behavior: 'smooth',
        })
      }
    })
    return unsubscribe
  }, [wordProgress, words.length])

  return (
    <section ref={sectionRef} className="relative min-h-[150vh]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
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

        <div className="container w-full relative z-10">
          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center h-full px-4 sm:px-6 lg:px-8">
            {/* Left Section - Title */}
            <div className="space-y-6 md:space-y-8 lg:space-y-12">
              <motion.span
                className="block uppercase text-white text-sm md:text-base tracking-wider"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {heading}
              </motion.span>
              <motion.h2
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase text-white leading-none"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {title}
              </motion.h2>
            </div>

            {/* Right Section - Text */}
            <div className="lg:max-w-3xl flex flex-col justify-center h-full py-8">
              {/* Mobile/Tablet - Scrollable text container */}
              <div className="lg:hidden">
                <div className="max-h-[70vh] overflow-y-auto scrollbar-hide py-4 px-2">
                  <motion.p
                    className="text-lg sm:text-xl md:text-2xl whitespace-pre-line text-white leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    {text}
                  </motion.p>
                </div>
              </div>

              {/* Desktop - Word reveal effect in scrollable container */}
              <div className="hidden lg:block" ref={textRef}>
                <div
                  ref={textContainerRef}
                  className="max-h-[70vh] overflow-y-auto scrollbar-hide py-6 px-4"
                >
                  <div className="text-2xl xl:text-3xl leading-relaxed text-white">
                    {wordTypes.map((item, index) => {
                      if (item.isLineBreak) {
                        return <br key={index} />
                      }

                      // Find the corresponding word index (excluding line breaks)
                      const wordIndex = wordTypes
                        .slice(0, index)
                        .filter((w) => !w.isLineBreak).length

                      // Calculate opacity based on current progress
                      const getOpacity = () => {
                        if (wordIndex < currentWordIndex - 2) return 1
                        if (wordIndex === currentWordIndex) return 1
                        if (wordIndex === currentWordIndex - 1) return 1
                        if (wordIndex === currentWordIndex + 1) return 0.5
                        if (wordIndex > currentWordIndex) return 0.1
                        return 1
                      }

                      return (
                        <motion.span
                          key={index}
                          className="inline-block mr-2"
                          animate={{
                            opacity: getOpacity(),
                          }}
                          transition={{
                            duration: 0.2,
                            ease: 'easeOut',
                          }}
                        >
                          {item.word}
                        </motion.span>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Line */}
          <div className="hidden lg:flex absolute right-6 xl:right-12 top-0 h-full w-4 py-16 flex-col items-center justify-center space-y-6 z-10">
            <div className="bg-white w-[0.5px] h-full opacity-60"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
