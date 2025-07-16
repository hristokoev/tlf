'use client'

import Link from 'next/link'
import React, { useState, useEffect } from 'react'

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

  return (
    <header
      className={`fixed container z-20 transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${isScrolled ? 'backdrop-blur-md bg-black/30' : 'bg-transparent'}`}
    >
      <div className="py-8 flex justify-between">
        <Link href="/">
          <Logo loading="eager" priority="high" />
        </Link>
        <HeaderNav data={data} />
      </div>
    </header>
  )
}
