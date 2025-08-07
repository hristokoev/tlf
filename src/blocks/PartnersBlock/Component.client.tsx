'use client'

import { useState, useEffect, useRef } from 'react'
import { Media } from '@/components/Media'
import type { PartnersBlock } from '@/payload-types'

interface PartnersBlockClientProps {
  partners: PartnersBlock['partners']
}

export const PartnersBlockClient: React.FC<PartnersBlockClientProps> = ({ partners }) => {
  const [isClient, setIsClient] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px',
      },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [isClient])

  if (!isClient || !partners?.length) {
    return null
  }

  return (
    <div ref={containerRef} className="w-full">
      {/* Desktop Grid - Shows all partners in 5 columns */}
      <div className="hidden lg:grid grid-cols-5 gap-8 items-center justify-items-center">
        {partners.map((partner, index) => (
          <a
            key={partner.id || index}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center justify-center w-full opacity-60 hover:opacity-100 transition-all duration-500 transform ${
              isVisible ? 'translate-y-0 opacity-60' : 'translate-y-8 opacity-0'
            }`}
            style={{
              transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
            }}
          >
            <Media
              resource={partner.logo}
              className="max-w-full max-h-full"
              imgClassName="object-contain w-full h-full filter brightness-0 invert group-hover:filter-none transition-all duration-300"
            />
          </a>
        ))}
      </div>

      {/* Tablet Grid - Shows partners in rows of 3 */}
      <div className="hidden md:grid lg:hidden grid-cols-3 gap-8 items-center justify-items-center">
        {partners.map((partner, index) => (
          <a
            key={partner.id || index}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center justify-center w-full opacity-60 hover:opacity-100 transition-all duration-500 transform ${
              isVisible ? 'translate-y-0 opacity-60' : 'translate-y-8 opacity-0'
            }`}
            style={{
              transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
            }}
          >
            <Media
              resource={partner.logo}
              className="max-w-full max-h-full"
              imgClassName="object-contain w-full h-full filter brightness-0 invert group-hover:filter-none transition-all duration-300"
            />
          </a>
        ))}
      </div>

      {/* Mobile Grid - Shows partners in rows of 2 */}
      <div className="grid md:hidden grid-cols-2 gap-6 items-center justify-items-center">
        {partners.map((partner, index) => (
          <a
            key={partner.id || index}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center justify-center w-full opacity-60 hover:opacity-100 transition-all duration-500 transform ${
              isVisible ? 'translate-y-0 opacity-60' : 'translate-y-8 opacity-0'
            }`}
            style={{
              transitionDelay: isVisible ? `${index * 150}ms` : '0ms',
            }}
          >
            <Media
              resource={partner.logo}
              className="max-w-full max-h-full"
              imgClassName="object-contain w-full h-full filter brightness-0 invert group-hover:filter-none transition-all duration-300"
            />
          </a>
        ))}
      </div>
    </div>
  )
}
