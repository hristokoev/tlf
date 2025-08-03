'use client'

import type { ContentShowcaseBlock as ContentShowcaseBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'
import { useState, useEffect, useRef } from 'react'

export const ContentShowcaseBlock: React.FC<ContentShowcaseBlockProps> = (props) => {
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
        setItemsPerView(1) // Mobile: 1 item
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2) // Tablet: 2 items
      } else if (window.innerWidth < 1280) {
        setItemsPerView(3) // Small desktop: 3 items
      } else {
        setItemsPerView(4) // Large desktop: 4 items
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
            return 0 // Loop back to start
          }
          return prev + 1
        })
      }
    }, 3000) // Change slide every 3 seconds
  }

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
      autoplayRef.current = null
    }
  }

  // Start autoplay when component mounts and conditions are met
  useEffect(() => {
    if (isClient && totalItems > itemsPerView) {
      startAutoplay()
    }

    return () => stopAutoplay()
  }, [isClient, totalItems, itemsPerView, isDragging, isHovered])

  // Restart autoplay after user interaction
  useEffect(() => {
    if (!isDragging && !isHovered && totalItems > itemsPerView) {
      const timer = setTimeout(() => {
        startAutoplay()
      }, 2000) // Wait 2 seconds after interaction before restarting

      return () => clearTimeout(timer)
    } else {
      stopAutoplay()
    }
  }, [isDragging, isHovered, totalItems, itemsPerView])

  // Get the percentage each item takes up
  const getItemWidth = () => {
    if (!isClient) return 25

    if (window.innerWidth < 640) return 100
    if (window.innerWidth < 1024) return 50
    if (window.innerWidth < 1280) return 33.333
    return 25
  }

  // Handle drag start (mouse and touch)
  const handleDragStart = (clientX: number) => {
    setIsDragging(true)
    setDragStart(clientX)
    setDragOffset(0)
    isDragRef.current = true
  }

  // Handle drag move
  const handleDragMove = (clientX: number) => {
    if (!isDragging || !containerRef.current) return

    const diff = clientX - dragStart
    const containerWidth = containerRef.current.offsetWidth
    const itemWidth = getItemWidth()
    const offsetPercentage = (diff / containerWidth) * 100

    setDragOffset(offsetPercentage)
  }

  // Handle drag end
  const handleDragEnd = () => {
    if (!isDragging) return

    const itemWidth = getItemWidth()
    const threshold = itemWidth * 0.3 // 30% of item width to trigger slide

    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0 && currentIndex > 0) {
        // Dragged right, go to previous
        setCurrentIndex((prev) => Math.max(0, prev - 1))
      } else if (dragOffset < 0 && currentIndex < maxIndex) {
        // Dragged left, go to next
        setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
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
      className={cn('py-12 md:py-16 lg:py-24 px-4 md:px-6 lg:px-8', {
        'bg-white text-black': backgroundColor === 'white',
        'bg-background text-white': backgroundColor === 'darkGray',
      })}
    >
      <div className="container">
        {/* Media Left Layout */}
        {mediaPosition === 'left' && (
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 xl:gap-32">
            <div className="w-full lg:w-auto lg:flex-shrink-0">
              <Media
                resource={media}
                className="w-full h-64 sm:h-80 md:h-96 lg:w-[400px] lg:h-[450px] xl:w-[652px] xl:h-[690px]"
                imgClassName="object-cover h-full w-full"
              />
            </div>
            <div className="flex flex-col justify-center lg:justify-between gap-6 md:gap-8 lg:gap-16 max-w-none lg:max-w-2xl">
              {heading && (
                <span className="uppercase text-sm md:text-base tracking-wide">{heading}</span>
              )}
              <h3 className="text-xl md:text-2xl font-semibold">{subtitle}</h3>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight">
                {title}
              </h2>
              <p className="text-base md:text-lg leading-relaxed">{description}</p>
            </div>
          </div>
        )}

        {/* Media Right Layout */}
        {mediaPosition === 'right' && (
          <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-16">
            <div className="order-2 lg:order-1 flex flex-col justify-center lg:justify-between gap-6 md:gap-8 lg:gap-16 max-w-none lg:max-w-2xl">
              {heading && (
                <span className="uppercase text-sm md:text-base tracking-wide">{heading}</span>
              )}
              <h3 className="text-xl md:text-2xl font-semibold">{subtitle}</h3>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight">
                {title}
              </h2>
              <p className="text-base md:text-lg leading-relaxed">{description}</p>
            </div>
            <div className="order-1 lg:order-2 w-full lg:w-auto lg:flex-shrink-0">
              <Media
                resource={media}
                className="w-full h-64 sm:h-80 md:h-96 lg:w-[400px] lg:h-[450px] xl:w-[652px] xl:h-[690px]"
                imgClassName="object-cover h-full w-full"
              />
            </div>
          </div>
        )}

        {/* Cards or Media Items Carousel */}
        <div className="mt-16 md:mt-20 lg:mt-32">
          {cards && (
            <div
              ref={containerRef}
              className="relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
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
                className={cn(
                  'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8',
                  isDragging ? 'transition-none' : 'transition-transform duration-500 ease-in-out',
                )}
                style={{ transform: getTransform() }}
              >
                {cards.map((card, index) => (
                  <div
                    key={index}
                    className="p-4 md:p-6 lg:p-8 flex-shrink-0 border border-black pointer-events-none"
                  >
                    <Media
                      resource={card.icon}
                      className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
                      imgClassName="object-cover h-full"
                    />
                    <h4 className="mt-3 md:mt-4 text-base md:text-lg font-semibold">
                      {card.title}
                    </h4>
                    <p className="mt-2 text-sm md:text-base text-gray-600 whitespace-pre-line leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {mediaItems && (
            <div
              ref={containerRef}
              className="relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
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
                className={cn(
                  'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8',
                  isDragging ? 'transition-none' : 'transition-transform duration-500 ease-in-out',
                )}
                style={{ transform: getTransform() }}
              >
                {mediaItems.map((mediaItem, index) => (
                  <div key={index} className="flex-shrink-0 pointer-events-none">
                    <Media
                      resource={mediaItem}
                      className="w-full h-48 sm:h-56 md:h-64 lg:h-72"
                      imgClassName="object-cover h-full w-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
