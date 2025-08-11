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
        placeholder="Leave empty to auto-generate"
      />
      <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
        Auto-generates a short, unique ID if left empty
      </div>
    </div>
  )
}
