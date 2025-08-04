'use client'

import { motion, type Variants } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import type { ContentShowcaseBlock as ContentShowcaseBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const mediaVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.1,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
}

const textVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

const cardVariants: Variants = {
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
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

export const ContentShowcaseBlockClient: React.FC<ContentShowcaseBlockProps> = (props) => {
  const {
    backgroundColor,
    heading,
    subtitle,
    title,
    description,
    media,
    mediaPosition,
    cards,
    mediaItems,
  } = props

  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(4)
  const [isClient, setIsClient] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const isDragRef = useRef(false)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)

  // Set client flag after hydration
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Calculate items per view based on screen size
  useEffect(() => {
    if (!isClient) return

    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2)
      } else if (window.innerWidth < 1280) {
        setItemsPerView(3)
      } else {
        setItemsPerView(4)
      }
    }

    updateItemsPerView()
    window.addEventListener('resize', updateItemsPerView)
    return () => window.removeEventListener('resize', updateItemsPerView)
  }, [isClient])

  const totalItems = cards?.length || mediaItems?.length || 0
  const maxIndex = Math.max(0, totalItems - itemsPerView)

  // Autoplay functionality
  const startAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current)

    autoplayRef.current = setInterval(() => {
      if (!isDragging && !isHovered && totalItems > itemsPerView) {
        setCurrentIndex((prev) => {
          if (prev >= maxIndex) {
            return 0
          }
          return prev + 1
        })
      }
    }, 4000)
  }

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
      autoplayRef.current = null
    }
  }

  useEffect(() => {
    if (isClient && totalItems > itemsPerView) {
      startAutoplay()
    }
    return () => stopAutoplay()
  }, [isClient, totalItems, itemsPerView, isDragging, isHovered])

  // Get the percentage each item takes up
  const getItemWidth = () => {
    if (!isClient) return 25
    if (window.innerWidth < 640) return 100
    if (window.innerWidth < 1024) return 50
    if (window.innerWidth < 1280) return 33.333
    return 25
  }

  // Handle drag functionality
  const handleDragStart = (clientX: number) => {
    setIsDragging(true)
    setDragStart(clientX)
    setDragOffset(0)
    isDragRef.current = true
  }

  const handleDragMove = (clientX: number) => {
    if (!isDragging || !containerRef.current) return

    const diff = clientX - dragStart
    const containerWidth = containerRef.current.offsetWidth
    const itemWidth = getItemWidth()
    const dragOffsetPercent = (diff / containerWidth) * itemWidth * 0.5

    setDragOffset(dragOffsetPercent)
  }

  const handleDragEnd = () => {
    if (!isDragging) return

    const threshold = 50
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0 && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1)
      } else if (dragOffset < 0 && currentIndex < maxIndex) {
        setCurrentIndex((prev) => prev + 1)
      }
    }

    setIsDragging(false)
    setDragOffset(0)
    isDragRef.current = false
  }

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    handleDragStart(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX)
  }

  const handleMouseUp = () => {
    handleDragEnd()
  }

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    handleDragEnd()
  }

  // Global mouse up handler
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragRef.current) {
        handleDragEnd()
      }
    }

    if (isDragging) {
      document.addEventListener('mouseup', handleGlobalMouseUp)
      return () => document.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [isDragging, dragStart])

  // Calculate transform with drag offset
  const getTransform = () => {
    const baseTransform = (() => {
      if (!isClient) return `translateX(-${currentIndex * 25}%)`
      const itemWidth = getItemWidth()
      return `translateX(-${currentIndex * itemWidth}%)`
    })()

    if (isDragging) {
      return `${baseTransform} translateX(${dragOffset}%)`
    }

    return baseTransform
  }

  return (
    <section
      className={cn('py-16 md:py-24 lg:py-32 overflow-hidden', {
        'bg-white text-black': backgroundColor === 'white',
        'bg-background text-white': backgroundColor === 'darkGray',
      })}
    >
      <div className="container">
        {/* Media Left Layout */}
        {mediaPosition === 'left' && (
          <motion.div
            className="flex flex-col lg:flex-row gap-12 lg:gap-20 xl:gap-32"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.div className="w-full lg:w-auto lg:flex-shrink-0" variants={mediaVariants}>
              <Media
                resource={media}
                className="w-full h-64 sm:h-80 md:h-96 lg:w-[450px] lg:h-[500px] xl:w-[652px] xl:h-[690px] overflow-hidden shadow-2xl"
                imgClassName="object-cover h-full w-full"
              />
            </motion.div>

            <motion.div
              className="flex flex-col justify-center lg:justify-between gap-8 md:gap-12 lg:gap-16 max-w-none lg:max-w-2xl"
              variants={containerVariants}
            >
              {heading && (
                <motion.span
                  className="inline-block uppercase text-sm md:text-base tracking-[0.2em] text-gray-500 font-medium"
                  variants={textVariants}
                >
                  {heading}
                </motion.span>
              )}

              {subtitle && (
                <motion.h3
                  className="text-xl md:text-2xl font-semibold leading-tight"
                  variants={textVariants}
                >
                  {subtitle}
                </motion.h3>
              )}

              {title && (
                <motion.h2
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-[0.9] tracking-tight"
                  variants={textVariants}
                >
                  {title}
                </motion.h2>
              )}

              {description && (
                <motion.p
                  className="text-lg md:text-xl leading-relaxed text-gray-100"
                  variants={textVariants}
                >
                  {description}
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* Media Right Layout */}
        {mediaPosition === 'right' && (
          <motion.div
            className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.div
              className="order-2 lg:order-1 flex flex-col justify-center lg:justify-between gap-8 md:gap-12 lg:gap-16 max-w-none lg:max-w-2xl"
              variants={containerVariants}
            >
              {heading && (
                <motion.span
                  className="inline-block uppercase text-sm md:text-base tracking-[0.2em] text-gray-500 font-medium"
                  variants={textVariants}
                >
                  {heading}
                </motion.span>
              )}

              {subtitle && (
                <motion.h3
                  className="text-xl md:text-2xl font-semibold leading-tight"
                  variants={textVariants}
                >
                  {subtitle}
                </motion.h3>
              )}

              {title && (
                <motion.h2
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-[0.9] tracking-tight"
                  variants={textVariants}
                >
                  {title}
                </motion.h2>
              )}

              {description && (
                <motion.p
                  className="text-lg md:text-xl leading-relaxed text-gray-700"
                  variants={textVariants}
                >
                  {description}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              className="order-1 lg:order-2 w-full lg:w-auto lg:flex-shrink-0"
              variants={mediaVariants}
            >
              <Media
                resource={media}
                className="w-full h-64 sm:h-80 md:h-96 lg:w-[450px] lg:h-[500px] xl:w-[652px] xl:h-[690px] overflow-hidden shadow-2xl"
                imgClassName="object-cover h-full w-full"
              />
            </motion.div>
          </motion.div>
        )}

        {/* Cards or Media Items Carousel */}
        {(cards || mediaItems) && (
          <motion.div
            className="mt-20 md:mt-28 lg:mt-36"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {cards && (
              <div
                ref={containerRef}
                className="relative cursor-grab active:cursor-grabbing select-none"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <motion.div
                  className={cn(
                    'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-12',
                    isDragging ? 'transition-none' : 'transition-transform duration-500 ease-out',
                  )}
                  style={{
                    transform: getTransform(),
                  }}
                  variants={containerVariants}
                >
                  {cards.map((card, index) => (
                    <motion.div
                      key={index}
                      className="group"
                      variants={cardVariants}
                      whileHover={{
                        y: -12,
                        transition: { duration: 0.3, ease: 'easeOut' },
                      }}
                    >
                      <div className="flex flex-col space-y-6 h-full p-8 bg-white shadow-lg border border-black/10 hover:shadow-2xl transition-shadow duration-300">
                        {/* Icon */}
                        <motion.div className="flex-shrink-0">
                          <div className="w-16 h-16 md:w-20 md:h-20 p-4 transition-colors duration-300">
                            <Media
                              resource={card.icon}
                              className="w-full h-full"
                              imgClassName="object-contain w-full h-full filter transition-all duration-300 group-hover:brightness-110"
                            />
                          </div>
                        </motion.div>

                        {/* Content */}
                        <div className="flex-1 space-y-4">
                          <h4 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight tracking-tight">
                            {card.title}
                          </h4>
                          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                            {card.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}

            {mediaItems && (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-12"
                variants={containerVariants}
              >
                {mediaItems.map((item, index) => (
                  <motion.div
                    key={index}
                    className="group"
                    variants={cardVariants}
                    whileHover={{
                      scale: 1.03,
                      transition: { duration: 0.3, ease: 'easeOut' },
                    }}
                  >
                    <Media
                      resource={item}
                      className="w-full aspect-square overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                      imgClassName="object-cover h-full w-full group-hover:scale-105 transition-transform duration-500"
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  )
}
