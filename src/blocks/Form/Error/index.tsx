'use client'

import * as React from 'react'
import { useFormContext } from 'react-hook-form'

export const Error = ({ name }: { name: string }) => {
  const {
    formState: { errors },
  } = useFormContext()

  const error = errors[name]

  if (!error) return null

  // Get the error message, with fallbacks based on error type
  const getMessage = () => {
    if (error.message) return error.message as string
  }

  return <div className="p-2 mt-2 text-red-500 text-sm">{getMessage()}</div>
}
