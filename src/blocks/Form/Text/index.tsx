import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { useFormContext } from 'react-hook-form'

import { Error } from '../Error'
import { Width } from '../Width'

export const Text: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required, width }) => {
  const {
    watch,
    formState: { errors: formErrors },
  } = useFormContext()
  const fieldValue = watch(name) || ''
  const hasError = !!formErrors[name]
  const hasValue = fieldValue.length > 0

  // Check if value meets minimum requirements
  const meetsMinLength = fieldValue.length >= 2
  const isValid = hasValue && meetsMinLength && !hasError

  // Different icons based on state
  const renderIcon = () => {
    if (hasError) {
      // Error state - Red X
      return (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 6L6 18M6 6L18 18"
            stroke="#EF4444"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    } else if (isValid) {
      // Valid state - Green checkmark
      return (
        <svg
          width="32"
          height="32"
          viewBox="0 0 29 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.1411 22L0 11.5717L2.53528 8.96466L10.1411 16.7859L26.4647 0L29 2.60707L10.1411 22Z"
            fill="#10B981"
          />
        </svg>
      )
    } else {
      // Default/neutral state - Circle or dash
      return (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="10" stroke="#9CA3AF" strokeWidth="2" />
          <path d="M8 12h8" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    }
  }

  return (
    <Width width={width} className="border">
      <div className="flex items-center">
        <div className="flex items-center justify-between py-4 px-8">{renderIcon()}</div>

        <div className="w-[0.5px] h-16 bg-white"></div>

        <div className="px-4 py-4 flex flex-col gap-2 w-full">
          <Label htmlFor={name}>
            {label}

            {required && (
              <span className="required">
                {' '}
                * <span className="sr-only">(required)</span>
              </span>
            )}
          </Label>
          <Input
            defaultValue={defaultValue}
            id={name}
            type="text"
            {...register(name, {
              required: required ? `${label} je povinné` : false,
              minLength: {
                value: 2,
                message: `${label} musí mít alespoň 2 znaky`,
              },
            })}
          />
        </div>
      </div>
      {errors[name] && <Error name={name} />}
    </Width>
  )
}
