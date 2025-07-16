'use client'

import React, { useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navItems = data?.navItems || []

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="flex items-center">
      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-8 items-center">
        {navItems.map(({ link }, i) => {
          return <CMSLink key={i} {...link} appearance="link" />
        })}
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden flex flex-col gap-1 p-2"
        aria-label="Toggle menu"
      >
        <span
          className={`block h-0.5 w-6 bg-current transition-transform duration-300 ${
            isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-current transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-current transition-transform duration-300 ${
            isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
          }`}
        />
      </button>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t">
          <div className="container py-4 flex flex-col gap-4">
            {navItems.map(({ link }, i) => {
              return <CMSLink key={i} {...link} appearance="link" />
            })}
          </div>
        </div>
      )}
    </nav>
  )
}
