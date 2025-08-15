import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import { Textarea as TextAreaComponent } from '@/components/ui/textarea'
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useFormTranslation } from '@/hooks/useFormTranslation'

import { Error } from '../Error'
import { Width } from '../Width'

export const Textarea: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
    rows?: number
  }
> = ({ name, defaultValue, errors, label, register, required, rows = 3, width }) => {
  const { watch } = useFormContext()
  const { tv } = useFormTranslation()
  const [charCount, setCharCount] = useState(defaultValue?.length || 0)
  const maxLength = 500

  // Watch the field value to update character count
  const fieldValue = watch(name) || ''

  React.useEffect(() => {
    setCharCount(fieldValue.length)
  }, [fieldValue])

  return (
    <Width width={width} className="border">
      <div className="px-4 py-4 flex flex-col gap-2 w-full">
        <Label htmlFor={name}>
          {label}

          {required && (
            <span className="required">
              {' '}
              * <span className="sr-only">({tv('required')})</span>
            </span>
          )}
        </Label>
        <div className="relative">
          <TextAreaComponent
            defaultValue={defaultValue}
            id={name}
            rows={rows}
            maxLength={maxLength}
            style={{ resize: 'none' }} // Prevent resizing
            className="pr-16" // Add padding for character count
            {...register(name, {
              required: required ? tv('required') : false,
              maxLength: {
                value: maxLength,
                message: tv('maxLength', {
                  max: maxLength,
                }),
              },
            })}
          />
          {/* Character count display */}
          <div
            className={`absolute bottom-2 right-2 text-xs ${
              charCount > maxLength ? 'text-red-500' : 'text-gray-400'
            }`}
          >
            {charCount}/{maxLength}
          </div>
        </div>
      </div>
      {errors[name] && <Error name={name} />}
    </Width>
  )
}
