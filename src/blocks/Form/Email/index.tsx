import type { EmailField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Email: React.FC<
  EmailField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required, width }) => {
  return (
    <Width width={width} className="border">
      <div className="flex items-center">
        <div className="flex items-center justify-between py-4 px-8">
          <svg
            width="32"
            height="32"
            viewBox="0 0 29 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.1411 22L0 11.5717L2.53528 8.96466L10.1411 16.7859L26.4647 0L29 2.60707L10.1411 22Z"
              fill="#E8EAED"
            />
          </svg>
        </div>

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
            {...register(name, { pattern: /^\S[^\s@]*@\S+$/, required })}
          />
        </div>
      </div>
      {errors[name] && <Error name={name} />}
    </Width>
  )
}
