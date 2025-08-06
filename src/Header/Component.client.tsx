'use client'

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // Define parent paths that should have white background for their sub-pages
  const whiteBackgroundParents = ['/aktuality', '/produkty', '/nabidky']
  const isWhiteBackgroundPage = whiteBackgroundParents.some(
    (parent) => pathname.startsWith(parent + '/') && pathname !== parent + '/',
  )

  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY

      // Show header when scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true)
      } else {
        // Hide header when scrolling down
        setIsVisible(false)
      }

      // Set background blur when scrolled down
      setIsScrolled(currentScrollY > 10)

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', controlHeader)

    return () => {
      window.removeEventListener('scroll', controlHeader)
    }
  }, [lastScrollY])

  // Determine background and text colors based on page and scroll state
  const getHeaderClasses = () => {
    if (isWhiteBackgroundPage) {
      // White background pages
      if (isScrolled) {
        return 'backdrop-blur-md bg-white/95 text-black'
      } else {
        return 'bg-white text-black'
      }
    } else {
      // Default dark theme pages
      if (isScrolled) {
        return 'backdrop-blur-md bg-black/30'
      } else {
        return 'bg-transparent'
      }
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${getHeaderClasses()}`}
    >
      <div className="container">
        <div className="py-4 sm:py-6 lg:py-8 flex justify-between items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 relative">
            <Logo loading="eager" priority="high" isWhiteBackgroundPage={isWhiteBackgroundPage} />
          </Link>

          {/* Navigation */}
          <HeaderNav data={data} isWhiteBackgroundPage={isWhiteBackgroundPage} />
        </div>
      </div>
    </header>
  )
}
