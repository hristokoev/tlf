'use client'

import * as React from 'react'
import { useFormContext } from 'react-hook-form'
import { useFormTranslation } from '../../../hooks/useFormTranslation'

export const Error = ({ name }: { name: string }) => {
  const {
    formState: { errors },
  } = useFormContext()
  const { tv } = useFormTranslation()

  const error = errors[name]

  if (!error) return null

  // Get the error message, with fallbacks based on error type
  const getMessage = () => {
    // If there's a custom message, use it
    if (error.message) return error.message as string

    // Get error type and provide translated message
    const errorType = error.type as string

    switch (errorType) {
      case 'required':
        return tv('required')
      case 'pattern':
        return tv('pattern')
      case 'minLength':
        return tv('minLength', { min: (error as any).minLength })
      case 'maxLength':
        return tv('maxLength', { max: (error as any).maxLength })
      case 'min':
        return tv('min', { min: (error as any).min })
      case 'max':
        return tv('max', { max: (error as any).max })
      case 'validate':
        // For custom validation (like email format)
        if (name.toLowerCase().includes('email')) {
          return tv('email')
        }
        if (name.toLowerCase().includes('phone')) {
          return tv('phone')
        }
        if (name.toLowerCase().includes('url')) {
          return tv('url')
        }
        return tv('pattern')
      default:
        return tv('required') // Fallback
    }
  }

  return <div className="p-2 mt-2 text-red-500 text-sm">{getMessage()}</div>
}
