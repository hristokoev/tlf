'use client'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import type { TwoInOneBlock as TwoInOneBlockProps } from '@/payload-types'
import { Fragment, useState, useEffect, useRef } from 'react'

export const TwoInOneBlock: React.FC<TwoInOneBlockProps> = (props) => {
  const {
    heading,
    title,
    description,
    cards,
    certification,
    certificationTitle,
    link,
    mediaItems,
  } = props

  const [currentIndex, setCurrentIndex] = useState(0)
  const [slideWidth, setSlideWidth] = useState(383)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

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
            <div className="flex justify-between flex-col max-w-full lg:max-w-2xl h-full space-y-6 lg:space-y-8">
              <span className="uppercase text-white text-sm md:text-base">{heading}</span>

              <div className="flex flex-col space-y-6 lg:space-y-8">
                {/* Title and Description */}
                <div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl uppercase font-bold text-white leading-tight">
                    {title}
                  </h2>
                </div>
                <div className="text-lg md:text-xl text-white leading-relaxed">{description}</div>
              </div>

              {/* CTA Link */}
              <div className="pt-4">
                <CMSLink {...link} size="lg" />
              </div>
            </div>

            {/* Carousel Section */}
            <div
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
            >
              <div
                className={`flex gap-8 ${isDragging ? 'transition-none' : 'transition-transform duration-500 ease-in-out'}`}
                style={{
                  transform: getTransform(),
                }}
              >
                {mediaItems.map((mediaItem, index) => (
                  <div key={index} className="flex-shrink-0 pointer-events-none">
                    <Media
                      resource={mediaItem}
                      className={`w-[280px] sm:w-[320px] lg:w-[383px] h-[400px] sm:h-[500px] lg:h-[690px]`}
                      imgClassName="object-cover h-full w-full"
                    />
                  </div>
                ))}
              </div>

              {/* Slide Indicators */}
              <div className="flex justify-center mt-4 space-x-2 lg:hidden">
                {mediaItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-white' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Second Section - Cards and Certification */}
      <section className="bg-background py-12 md:py-24">
        <div className="container">
          <div className="flex flex-col xl:flex-row items-stretch gap-8 xl:gap-32">
            {/* Cards Grid */}
            <div className="w-full xl:flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {cards.map((card, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 md:p-8 flex flex-col space-y-4 w-full max-w-none sm:max-w-[300px] mx-auto"
                  >
                    <Media
                      resource={card.icon}
                      className="w-12 h-12 md:w-16 md:h-16"
                      imgClassName="object-cover h-full w-full"
                    />
                    <h3 className="text-xl font-semibold leading-tight">{card.title}</h3>
                  </div>
                ))}
              </div>
            </div>

            {/* Certification Section */}
            <div className="w-full xl:max-w-xl flex flex-col justify-between space-y-6 xl:space-y-0">
              <div>
                <h2 className="text-xl md:text-2xl text-white mb-6 md:mb-8 max-w-md leading-relaxed">
                  {certificationTitle}
                </h2>
              </div>
              <div className="border border-white p-6 md:p-8 flex flex-col sm:flex-row gap-6 md:gap-8 items-start sm:items-center mt-auto">
                <svg
                  width="32"
                  height="30"
                  viewBox="0 0 45 42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 md:w-[45px] md:h-[42px] flex-shrink-0"
                >
                  <path
                    d="M15.5455 42L11.6591 35.6L4.29545 34L5.01136 26.6L0 21L5.01136 15.4L4.29545 8L11.6591 6.4L15.5455 0L22.5 2.9L29.4545 0L33.3409 6.4L40.7045 8L39.9886 15.4L45 21L39.9886 26.6L40.7045 34L33.3409 35.6L29.4545 42L22.5 39.1L15.5455 42ZM20.3523 28.1L31.9091 16.8L29.0455 13.9L20.3523 22.4L15.9545 18.2L13.0909 21L20.3523 28.1Z"
                    fill="white"
                  />
                </svg>
                <span className="text-lg md:text-2xl text-white leading-relaxed">
                  {certification}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}
