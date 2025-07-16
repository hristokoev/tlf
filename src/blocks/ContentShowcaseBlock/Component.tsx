'use client'

import type { ContentShowcaseBlock as ContentShowcaseBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { Button } from '@/components/ui/button'
import { Media } from '@/components/Media'
import { Fragment, useState } from 'react'

export const ContentShowcaseBlock: React.FC<ContentShowcaseBlockProps> = (props) => {
  const {
    backgroundColor,
    heading,
    subtitle,
    title,
    description,
    media,
    mediaPosition,
    type,
    cards,
    mediaItems,
  } = props

  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    if (!mediaItems) return null
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? mediaItems.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    if (!mediaItems) return null
    setCurrentIndex((prevIndex) => (prevIndex === mediaItems.length - 1 ? 0 : prevIndex + 1))
  }

  return (
    <section
      className={cn('container py-24', {
        'bg-white text-black': backgroundColor === 'white',
        'bg-background text-white': backgroundColor === 'darkGray',
      })}
    >
      <div>
        {mediaPosition === 'left' && (
          <div className="flex gap-32">
            <div>
              <Media
                resource={media}
                className="w-[652px] h-[690px]"
                imgClassName="object-cover h-full"
              />
            </div>
            <div className="flex flex-col justify-between gap-16 max-w-2xl">
              {heading && <span className="uppercase">{heading}</span>}
              <h3 className="text-2xl font-semibold">{subtitle}</h3>
              <h2 className="text-6xl font-bold uppercase">{title}</h2>
              <p className="text-lg">{description}</p>
            </div>
          </div>
        )}
        {mediaPosition === 'right' && (
          <div className="flex justify-between gap-16">
            <div className="flex flex-col justify-between gap-16 max-w-2xl">
              {heading && <span className="uppercase">{heading}</span>}
              <h3 className="text-2xl font-semibold">{subtitle}</h3>
              <h2 className="text-6xl font-bold uppercase">{title}</h2>
              <p className="text-lg">{description}</p>
            </div>
            <div>
              <Media
                resource={media}
                className="w-[652px] h-[690px]"
                imgClassName="object-cover h-full"
              />
            </div>
          </div>
        )}
        <div className="mt-32">
          {cards && (
            <div className="">
              <div className="relative overflow-hidden">
                <div
                  className="grid grid-cols-4 gap-8 transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * (383 + 32)}px)` }}
                >
                  {cards.map((card, index) => (
                    <div key={index} className="p-8 flex-shrink-0 border border-black">
                      <Media
                        resource={card.icon}
                        className="w-16 h-16"
                        imgClassName="object-cover h-full"
                      />
                      <h4 className="mt-4 text-lg font-semibold">{card.title}</h4>
                      <p className="mt-2 text-gray-600 whitespace-pre-line">
                        {card.description}
                      </p>{' '}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {mediaItems && (
            <div className="">
              <div className="relative overflow-hidden">
                <div
                  className="grid grid-cols-4 gap-8 transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * (383 + 32)}px)` }}
                >
                  {mediaItems.map((mediaItem, index) => (
                    <div key={index} className="flex-shrink-0">
                      <Media
                        resource={mediaItem}
                        className="w-auto h-72"
                        imgClassName="object-cover h-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-16 p-4"
                  onClick={goToPrevious}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 11.25L4.78125 11.25L11.7813 18.25L10 20L1.19249e-07 10L10 -1.19249e-07L11.7813 1.75L4.78125 8.75L20 8.75L20 11.25Z"
                      fill="white"
                    />
                  </svg>
                </Button>
                <Button variant="outline" size="icon" className="size-16 p-4" onClick={goToNext}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M-3.82475e-07 8.75L15.2187 8.75L8.21875 1.75L10 4.37114e-07L20 10L10 20L8.21875 18.25L15.2187 11.25L-4.91753e-07 11.25L-3.82475e-07 8.75Z"
                      fill="white"
                    />
                  </svg>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
