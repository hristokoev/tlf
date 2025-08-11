'use client'

import type { TextFieldClientComponent } from 'payload'

import { TextInput, useField } from '@payloadcms/ui'
import React from 'react'

export const SlugComponent: TextFieldClientComponent = (props) => {
  const { field, path } = props
  const { value, setValue } = useField({ path: path || field.name })

  return (
    <div className="field-type text">
      <TextInput
        {...props}
        value={(value as string) || ''}
        onChange={(e: any) => setValue(e.target.value)}
      />
    </div>
  )
}
