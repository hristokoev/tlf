'use client'

import React, { useState, useEffect } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navItems = data?.navItems || []

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Close mobile menu when clicking outside or on links
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMobileMenu()
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isMobileMenuOpen])

  return (
    <nav className="flex items-center relative">
      {/* Desktop Navigation - Responsive gaps */}
      <div className="hidden md:flex flex-wrap justify-end items-center gap-4 lg:gap-6 xl:gap-8 2xl:gap-10">
        {navItems.map(({ link }, i) => {
          return (
            <div key={i} className="whitespace-nowrap">
              <CMSLink {...link} appearance="link" />
            </div>
          )
        })}
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="text-white md:hidden relative z-50 flex flex-col gap-1 p-2 focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMobileMenuOpen}
      >
        <span
          className={`block h-0.5 w-6 bg-current transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'text-black rotate-45 translate-y-1.5' : ''
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-current transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'text-black opacity-0' : ''
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-current transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'text-black -rotate-45 -translate-y-1.5' : ''
          }`}
        />
      </button>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Dark Overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />

          {/* Mobile Menu */}
          <div className="fixed inset-0 z-40 md:hidden">
            <div className="absolute h-screen inset-y-0 right-0 w-full bg-white shadow-2xl">
              <div className="flex h-full flex-col">
                {/* Menu Header */}
                <div className="flex items-center px-6 py-10 border-b">
                  <h2 className="text-lg font-semibold">Menu</h2>
                </div>

                {/* Menu Items */}
                <div className="flex-1 overflow-y-auto">
                  <div className="px-6 py-4 space-y-4">
                    {navItems.map(({ link }, i) => (
                      <div key={i} className="block">
                        <div onClick={closeMobileMenu}>
                          <CMSLink
                            {...link}
                            appearance="link"
                            className="block py-3 text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors duration-200"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  )
}
