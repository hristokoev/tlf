'use client'

import type { ContentShowcaseBlock as ContentShowcaseBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { Button } from '@/components/ui/button'
import { Media } from '@/components/Media'
import { useState, useEffect } from 'react'

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

  const goToPrevious = () => {
    if (totalItems === 0) return
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1))
  }

  const goToNext = () => {
    if (totalItems === 0) return
    setCurrentIndex((prevIndex) => Math.min(maxIndex, prevIndex + 1))
  }

  // Calculate transform based on responsive grid
  const getTransform = () => {
    // Return default transform during SSR
    if (!isClient) {
      return `translateX(-${currentIndex * 25}%)`
    }

    if (window.innerWidth < 640) {
      return `translateX(-${currentIndex * 100}%)`
    } else if (window.innerWidth < 1024) {
      return `translateX(-${currentIndex * 50}%)`
    } else if (window.innerWidth < 1280) {
      return `translateX(-${currentIndex * 33.333}%)`
    } else {
      return `translateX(-${currentIndex * 25}%)`
    }
  }

  return (
    <section
      className={cn('container py-12 md:py-16 lg:py-24 px-4 md:px-6 lg:px-8', {
        'bg-white text-black': backgroundColor === 'white',
        'bg-background text-white': backgroundColor === 'darkGray',
      })}
    >
      <div>
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
            <div className="relative">
              <div className="overflow-hidden">
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 transition-transform duration-500 ease-in-out"
                  style={{ transform: getTransform() }}
                >
                  {cards.map((card, index) => (
                    <div
                      key={index}
                      className="p-4 md:p-6 lg:p-8 flex-shrink-0 border border-black"
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

              {/* Navigation buttons for cards */}
              {totalItems > itemsPerView && (
                <div className="mt-4 md:mt-6 flex justify-center space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-12 md:size-14 lg:size-16 p-3 md:p-4"
                    onClick={goToPrevious}
                    disabled={currentIndex === 0}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="md:w-5 md:h-5"
                    >
                      <path
                        d="M20 11.25L4.78125 11.25L11.7813 18.25L10 20L1.19249e-07 10L10 -1.19249e-07L11.7813 1.75L4.78125 8.75L20 8.75L20 11.25Z"
                        fill="currentColor"
                      />
                    </svg>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-12 md:size-14 lg:size-16 p-3 md:p-4"
                    onClick={goToNext}
                    disabled={currentIndex === maxIndex}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="md:w-5 md:h-5"
                    >
                      <path
                        d="M-3.82475e-07 8.75L15.2187 8.75L8.21875 1.75L10 4.37114e-07L20 10L10 20L8.21875 18.25L15.2187 11.25L-4.91753e-07 11.25L-3.82475e-07 8.75Z"
                        fill="currentColor"
                      />
                    </svg>
                  </Button>
                </div>
              )}
            </div>
          )}

          {mediaItems && (
            <div className="relative">
              <div className="overflow-hidden">
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 transition-transform duration-500 ease-in-out"
                  style={{ transform: getTransform() }}
                >
                  {mediaItems.map((mediaItem, index) => (
                    <div key={index} className="flex-shrink-0">
                      <Media
                        resource={mediaItem}
                        className="w-full h-48 sm:h-56 md:h-64 lg:h-72"
                        imgClassName="object-cover h-full w-full"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation buttons for media items */}
              {totalItems > itemsPerView && (
                <div className="mt-4 md:mt-6 flex justify-center space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-12 md:size-14 lg:size-16 p-3 md:p-4"
                    onClick={goToPrevious}
                    disabled={currentIndex === 0}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="md:w-5 md:h-5"
                    >
                      <path
                        d="M20 11.25L4.78125 11.25L11.7813 18.25L10 20L1.19249e-07 10L10 -1.19249e-07L11.7813 1.75L4.78125 8.75L20 8.75L20 11.25Z"
                        fill="currentColor"
                      />
                    </svg>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-12 md:size-14 lg:size-16 p-3 md:p-4"
                    onClick={goToNext}
                    disabled={currentIndex === maxIndex}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="md:w-5 md:h-5"
                    >
                      <path
                        d="M-3.82475e-07 8.75L15.2187 8.75L8.21875 1.75L10 4.37114e-07L20 10L10 20L8.21875 18.25L15.2187 11.25L-4.91753e-07 11.25L-3.82475e-07 8.75Z"
                        fill="currentColor"
                      />
                    </svg>
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
