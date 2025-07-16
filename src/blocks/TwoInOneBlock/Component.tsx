'use client'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Button } from '@/components/ui/button'
import type { TwoInOneBlock as TwoInOneBlockProps } from '@/payload-types'
import { Fragment, useState } from 'react'

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

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? mediaItems.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === mediaItems.length - 1 ? 0 : prevIndex + 1))
  }

  return (
    <Fragment>
      <section className="relative bg-background container pr-0 py-24 overflow-hidden">
        <div className="grid grid-cols-2 justify-between items-center">
          <div className="flex justify-between flex-col max-w-2xl h-full">
            <span className="uppercase text-white">{heading}</span>
            <div className="flex flex-col space-y-8">
              <div className="flex space-x-4">
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
              <div>
                <h2 className="text-5xl uppercase font-bold text-white">{title}</h2>
              </div>
              <div className="text-xl text-white">{description}</div>
            </div>
            <div>
              <CMSLink {...link} size="lg" />
            </div>
          </div>
          <div className="relative overflow-hidden">
            <div
              className="flex gap-8 transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (383 + 32)}px)` }}
            >
              {mediaItems.map((mediaItem, index) => (
                <div key={index} className="flex-shrink-0">
                  <Media
                    resource={mediaItem}
                    className="w-[383px] h-[690px]"
                    imgClassName="object-cover h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="bg-background container py-24">
        <div className="flex items-stretch gap-32">
          <div className="grid grid-cols-3 gap-8">
            {cards.map((card, index) => (
              <div key={index} className="bg-white p-8 flex flex-col space-y-4 max-w-[300px]">
                <Media
                  resource={card.icon}
                  className="w-16 h-16"
                  imgClassName="object-cover h-full"
                />
                <h3 className="text-2xl">{card.title}</h3>
              </div>
            ))}
          </div>
          <div className="max-w-xl flex flex-col justify-between">
            <div>
              <h2 className="text-2xl text-white mb-8 max-w-md">{certificationTitle}</h2>
            </div>
            <div className="border border-white p-8 flex gap-8 mt-auto">
              <svg
                width="45"
                height="42"
                viewBox="0 0 45 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.5455 42L11.6591 35.6L4.29545 34L5.01136 26.6L0 21L5.01136 15.4L4.29545 8L11.6591 6.4L15.5455 0L22.5 2.9L29.4545 0L33.3409 6.4L40.7045 8L39.9886 15.4L45 21L39.9886 26.6L40.7045 34L33.3409 35.6L29.4545 42L22.5 39.1L15.5455 42ZM20.3523 28.1L31.9091 16.8L29.0455 13.9L20.3523 22.4L15.9545 18.2L13.0909 21L20.3523 28.1Z"
                  fill="white"
                />
              </svg>
              <span className="text-2xl text-white">{certification}</span>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}
