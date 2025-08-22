import React from 'react'
import { RichTextBlockClient } from './Component.client'

import type { RichTextBlock as RichTextBlockProps } from '@/payload-types'

export const RichTextBlock: React.FC<RichTextBlockProps> = (props) => {
  return <RichTextBlockClient {...props} />
}
