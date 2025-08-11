'use client'

import { CMSLinkClient as CMSLink } from '@/components/Link/CMSLink.client'
import { Media } from '@/components/Media'
import type { TwoInOneBlock as TwoInOneBlockProps } from '@/payload-types'
import { Fragment, useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export const TwoInOneBlockClient: React.FC<TwoInOneBlockProps> = (props) => {
  const {
    heading,
    title,
    description,
    cards,
    certification,
    certificationTitle,
    certificationDescription,
    certificationLink,
    link,
    mediaItems,
  } = props
  const params = useParams()
  const { lang } = params

  const [currentIndex, setCurrentIndex] = useState(0)
  const [slideWidth, setSlideWidth] = useState(383)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [showCertificationModal, setShowCertificationModal] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const isDragRef = useRef(false)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)

  // Update slide width based on screen size
  useEffect(() => {
    const updateSlideWidth = () => {
      if (window.innerWidth < 640) {
        setSlideWidth(280) // Mobile
      } else if (window.innerWidth < 1024) {
        setSlideWidth(320) // Tablet
      } else {
        setSlideWidth(383) // Desktop
      }
    }

    updateSlideWidth()
    window.addEventListener('resize', updateSlideWidth)
    return () => window.removeEventListener('resize', updateSlideWidth)
  }, [])

  const gap = 32 // Gap between slides

  // Autoplay functionality
  const startAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current)

    autoplayRef.current = setInterval(() => {
      if (!isDragging && !isHovered && mediaItems?.length > 1) {
        setCurrentIndex((prev) => (prev === mediaItems.length - 1 ? 0 : prev + 1))
      }
    }, 4000) // Change slide every 4 seconds
  }

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
      autoplayRef.current = null
    }
  }

  // Start autoplay when component mounts and conditions are met
  useEffect(() => {
    if (mediaItems?.length > 1) {
      startAutoplay()
    }

    return () => stopAutoplay()
  }, [mediaItems?.length, isDragging, isHovered])

  // Restart autoplay after user interaction
  useEffect(() => {
    if (!isDragging && !isHovered && mediaItems?.length > 1) {
      const timer = setTimeout(() => {
        startAutoplay()
      }, 3000) // Wait 3 seconds after interaction before restarting

      return () => clearTimeout(timer)
    } else {
      stopAutoplay()
    }
  }, [isDragging, isHovered, mediaItems?.length])

  // Handle drag start (mouse and touch)
  const handleDragStart = (clientX: number) => {
    setIsDragging(true)
    setDragStart(clientX)
    setDragOffset(0)
    isDragRef.current = true
  }

  // Handle drag move
  const handleDragMove = (clientX: number) => {
    if (!isDragging) return

    const diff = clientX - dragStart
    setDragOffset(diff)
  }

  // Handle drag end
  const handleDragEnd = () => {
    if (!isDragging) return

    const threshold = slideWidth * 0.3 // 30% of slide width to trigger slide

    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        // Dragged right, go to previous (with wrap around)
        setCurrentIndex((prev) => (prev === 0 ? mediaItems.length - 1 : prev - 1))
      } else {
        // Dragged left, go to next (with wrap around)
        setCurrentIndex((prev) => (prev === mediaItems.length - 1 ? 0 : prev + 1))
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

  // Add global mouse move and up listeners
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragRef.current) {
        handleDragMove(e.clientX)
      }
    }

    const handleGlobalMouseUp = () => {
      if (isDragRef.current) {
        handleDragEnd()
      }
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove)
      document.addEventListener('mouseup', handleGlobalMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove)
      document.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [isDragging, dragStart])

  // Calculate transform with drag offset
  const getTransform = () => {
    const baseTransform = -currentIndex * (slideWidth + gap)

    if (isDragging) {
      return `translateX(${baseTransform + dragOffset}px)`
    }

    return `translateX(${baseTransform}px)`
  }

  return (
    <Fragment>
      {/* First Section - Hero with Carousel */}
      <section className="relative bg-background pr-0 py-12 md:py-24 overflow-hidden">
        <div className="container">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 justify-between items-start lg:items-center">
            {/* Content Section */}
            <motion.div
              className="flex justify-between flex-col max-w-full lg:max-w-2xl h-full space-y-6 lg:space-y-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.span
                className="uppercase text-white text-sm md:text-base"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {heading}
              </motion.span>

              <div className="flex flex-col space-y-6 lg:space-y-8">
                {/* Title */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl md:text-4xl lg:text-5xl uppercase font-bold text-white leading-tight">
                    {title}
                  </h2>
                </motion.div>

                {/* Description */}
                <motion.div
                  className="text-lg md:text-xl text-white leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  {description}
                </motion.div>
              </div>

              {/* CTA Link */}
              <motion.div
                className="pt-4"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <motion.div>
                  <CMSLink {...link} size="lg" />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Carousel Section */}
            <motion.div
              ref={containerRef}
              className="relative overflow-hidden w-full lg:w-auto cursor-grab active:cursor-grabbing select-none"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div
                className={`flex gap-8 ${isDragging ? 'transition-none' : 'transition-transform duration-500 ease-in-out'}`}
                style={{
                  transform: getTransform(),
                }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.15,
                      delayChildren: 0.4,
                    },
                  },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                {mediaItems?.map((mediaItem, index) => (
                  <motion.div
                    key={index}
                    className="flex-shrink-0 pointer-events-none"
                    variants={{
                      hidden: {
                        opacity: 0,
                        y: 60,
                        scale: 0.9,
                      },
                      visible: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                          duration: 0.7,
                          ease: 'easeOut',
                        },
                      },
                    }}
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.3, ease: 'easeOut' },
                    }}
                  >
                    <motion.div
                      className="overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                    >
                      <Media
                        resource={mediaItem}
                        className={`w-[280px] sm:w-[320px] lg:w-[383px] h-[400px] sm:h-[500px] lg:h-[690px]`}
                        imgClassName="object-cover h-full w-full transition-transform duration-300"
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Slide Indicators with animation */}
              <motion.div
                className="flex justify-center mt-4 space-x-2 lg:hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                {mediaItems?.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-white' : 'bg-white/30'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Second Section - Cards and Certification */}
      <section className="bg-background py-12 md:py-24">
        <div className="container">
          <div className="flex flex-col xl:flex-row items-stretch gap-8 lg:gap-16">
            {/* Cards Grid */}
            <div className="w-full xl:flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 h-full">
                {cards?.map((card, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-6 md:p-8 flex flex-col space-y-4 w-full mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      ease: 'easeOut',
                    }}
                    whileHover={{
                      y: -5,
                      transition: { duration: 0.2 },
                    }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    {card.icon && (
                      <Media
                        resource={card.icon}
                        className="w-12 h-12 md:w-16 md:h-16"
                        imgClassName="object-cover h-full w-full"
                      />
                    )}
                    <h3 className="text-lg font-semibold leading-tight">{card.title}</h3>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Certification Section */}
            <motion.div
              className="w-full xl:max-w-xl flex flex-col justify-between space-y-6 xl:space-y-0"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-xl md:text-2xl text-white mb-6 md:mb-8 max-w-md leading-relaxed">
                  {certificationTitle}
                </h2>
              </motion.div>

              <motion.button
                className="border border-white p-6 md:p-8 flex flex-col sm:flex-row gap-6 md:gap-8 items-start sm:items-center mt-auto cursor-pointer transition-colors hover:bg-white/5"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                whileHover={{
                  scale: 1.02,
                  borderColor: 'rgba(255,255,255,0.8)',
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.98 }}
                viewport={{ once: true }}
                onClick={() => setShowCertificationModal(true)}
              >
                <motion.svg
                  width="32"
                  height="30"
                  viewBox="0 0 45 42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 md:w-[45px] md:h-[42px] flex-shrink-0"
                  whileHover={{ rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <path
                    d="M15.5455 42L11.6591 35.6L4.29545 34L5.01136 26.6L0 21L5.01136 15.4L4.29545 8L11.6591 6.4L15.5455 0L22.5 2.9L29.4545 0L33.3409 6.4L40.7045 8L39.9886 15.4L45 21L39.9886 26.6L40.7045 34L33.3409 35.6L29.4545 42L22.5 39.1L15.5455 42ZM20.3523 28.1L31.9091 16.8L29.0455 13.9L20.3523 22.4L15.9545 18.2L13.0909 21L20.3523 28.1Z"
                    fill="white"
                  />
                </motion.svg>
                <span className="text-lg md:text-2xl text-white leading-relaxed text-left">
                  {certification}
                </span>

                {/* Click indicator */}
                <motion.div
                  className="ml-auto opacity-60"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-4 h-4 text-white"
                  >
                    <path
                      d="M12 4L20 12L12 20M20 12H4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              </motion.button>
            </motion.div>

            {/* Certification Modal */}
            <AnimatePresence>
              {showCertificationModal && (
                <motion.div
                  className="fixed inset-0 z-50 flex items-center justify-center p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Backdrop */}
                  <motion.div
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowCertificationModal(false)}
                  />

                  {/* Modal Content */}
                  <motion.div
                    className="relative bg-white p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    {/* Close Button */}
                    <motion.button
                      className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                      onClick={() => setShowCertificationModal(false)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-6 h-6 text-gray-600"
                      >
                        <path
                          d="M18 6L6 18M6 6L18 18"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.button>

                    {/* Modal Header */}
                    <motion.div
                      className="flex items-center gap-4 mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="p-3 bg-green-100 rounded-full">
                        <svg
                          width="32"
                          height="30"
                          viewBox="0 0 45 42"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-8 h-8 text-green-600"
                        >
                          <path
                            d="M15.5455 42L11.6591 35.6L4.29545 34L5.01136 26.6L0 21L5.01136 15.4L4.29545 8L11.6591 6.4L15.5455 0L22.5 2.9L29.4545 0L33.3409 6.4L40.7045 8L39.9886 15.4L45 21L39.9886 26.6L40.7045 34L33.3409 35.6L29.4545 42L22.5 39.1L15.5455 42ZM20.3523 28.1L31.9091 16.8L29.0455 13.9L20.3523 22.4L15.9545 18.2L13.0909 21L20.3523 28.1Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">Naše certifikace</h3>
                        <p className="text-gray-600">Zajištění kvality a normy</p>
                      </div>
                    </motion.div>

                    {/* Modal Body */}
                    <motion.div
                      className="space-y-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="p-2">
                        <h4 className="font-semibold mb-3 text-gray-900">{certification}</h4>
                        <p className="text-gray-700 leading-relaxed text-sm">
                          {certificationDescription}
                        </p>
                      </div>

                      {/* Download Button */}
                      <motion.div
                        className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-md"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h5 className="font-semibold text-gray-900">Zobrazit certifikát</h5>
                        <Link
                          href={
                            typeof certificationLink === 'string'
                              ? certificationLink
                              : certificationLink?.url || '#'
                          }
                          passHref
                          target="_blank"
                        >
                          <motion.button
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Zobrazit
                          </motion.button>
                        </Link>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </Fragment>
  )
}
