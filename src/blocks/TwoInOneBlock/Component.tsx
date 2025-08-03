'use client'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Button } from '@/components/ui/button'
import type { TwoInOneBlock as TwoInOneBlockProps } from '@/payload-types'
import { Fragment, useState, useEffect } from 'react'

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

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? mediaItems.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === mediaItems.length - 1 ? 0 : prevIndex + 1))
  }

  const gap = 32 // Gap between slides

  return (
    <Fragment>
      {/* First Section - Hero with Carousel */}
      <section className="relative bg-background container pr-0 py-12 md:py-24 overflow-hidden">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 justify-between items-start lg:items-center">
          {/* Content Section */}
          <div className="flex justify-between flex-col max-w-full lg:max-w-2xl h-full space-y-6 lg:space-y-8">
            <span className="uppercase text-white text-sm md:text-base">{heading}</span>

            <div className="flex flex-col space-y-6 lg:space-y-8">
              {/* Navigation Buttons */}
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-12 md:size-16 p-3 md:p-4"
                  onClick={goToPrevious}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 md:w-5 md:h-5"
                  >
                    <path
                      d="M20 11.25L4.78125 11.25L11.7813 18.25L10 20L1.19249e-07 10L10 -1.19249e-07L11.7813 1.75L4.78125 8.75L20 8.75L20 11.25Z"
                      fill="white"
                    />
                  </svg>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-12 md:size-16 p-3 md:p-4"
                  onClick={goToNext}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 md:w-5 md:h-5"
                  >
                    <path
                      d="M-3.82475e-07 8.75L15.2187 8.75L8.21875 1.75L10 4.37114e-07L20 10L10 20L8.21875 18.25L15.2187 11.25L-4.91753e-07 11.25L-3.82475e-07 8.75Z"
                      fill="white"
                    />
                  </svg>
                </Button>
              </div>

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
          <div className="relative overflow-hidden w-full lg:w-auto">
            <div
              className="flex gap-8 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (slideWidth + gap)}px)`,
              }}
            >
              {mediaItems.map((mediaItem, index) => (
                <div key={index} className="flex-shrink-0">
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
      </section>

      {/* Second Section - Cards and Certification */}
      <section className="bg-background container py-12 md:py-24">
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
                  <h3 className="text-xl md:text-2xl font-semibold leading-tight">{card.title}</h3>
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
      </section>
    </Fragment>
  )
}
