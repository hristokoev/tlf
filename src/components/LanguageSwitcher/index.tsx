'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useParams, usePathname } from 'next/navigation'
import Link from 'next/link'

const languages = [
  { code: 'cs', label: 'CZ' },
  { code: 'en', label: 'EN' },
  { code: 'de', label: 'DE' },
]

export const LanguageSwitcher: React.FC<{ isWhiteBackgroundPage?: boolean }> = ({
  isWhiteBackgroundPage = false,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const params = useParams()
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLang = params.lang as string
  const currentLanguage = languages.find((lang) => lang.code === currentLang) || languages[0]

  // Get the path without the language prefix
  const getPathWithoutLang = () => {
    const segments = pathname.split('/').filter(Boolean)
    segments.shift() // Remove the language segment
    return segments.length > 0 ? `/${segments.join('/')}` : ''
  }

  // Generate URL for a different language
  const getLanguageUrl = (langCode: string) => {
    const pathWithoutLang = getPathWithoutLang()
    return `/${langCode}${pathWithoutLang}`
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const textColor = isWhiteBackgroundPage ? 'text-black' : 'text-white'
  const borderColor = isWhiteBackgroundPage ? 'border-black' : 'border-white'
  const hoverBg = isWhiteBackgroundPage ? 'hover:bg-gray-100' : 'hover:bg-white/10'

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-center
          w-16 h-10 
          border-2 ${borderColor}
          ${textColor} 
          ${hoverBg}
          transition-colors duration-200
          text-sm font-medium
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
        `}
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        {currentLanguage.label}
        <svg
          className={`ml-1 w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          className={`
          absolute right-0 top-full mt-1 
          bg-white 
          border-2 border-black
          shadow-lg 
          z-50
        `}
        >
          {languages.map((language) => (
            <Link
              key={language.code}
              href={getLanguageUrl(language.code)}
              onClick={() => setIsOpen(false)}
              className={`
                block w-full px-3 py-2 
                text-sm font-medium text-black text-center
                hover:bg-gray-100 
                transition-colors duration-200
                ${language.code === currentLang ? 'bg-gray-50' : ''}
              `}
            >
              {language.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
