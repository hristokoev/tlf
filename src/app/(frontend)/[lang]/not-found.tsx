import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="pt-56 pb-40 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        {/* Main Content Card */}
        <div className="relative bg-white backdrop-blur-sm shadow-2xl border border-white/20 p-8 sm:p-12 lg:p-16">
          {/* 404 Number */}
          <div className="relative mb-8">
            <h1 className="text-8xl sm:text-9xl md:text-[12rem] font-bold text-transparent bg-gradient-to-r from-gray-700 via-gray-900 to-black bg-clip-text leading-none select-none">
              404
            </h1>
            <div className="absolute inset-0 text-8xl sm:text-9xl md:text-[12rem] font-bold text-gray-200/30 leading-none select-none animate-pulse">
              404
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-4 mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Stránka nebyla nalezena
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-lg mx-auto">
              Omlouváme se, ale stránka kterou hledáte neexistuje nebo byla přesunuta.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              variant="default"
              size="lg"
              className="min-w-[140px] bg-gradient-to-r from-gray-800 to-black hover:from-gray-900 hover:to-gray-800 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              <Link href="/cs" className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Domů
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
