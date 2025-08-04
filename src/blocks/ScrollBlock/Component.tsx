import type { ScrollBlock as ScrollBlockProps } from '@/payload-types'
import { ScrollBlockClient } from './Component.client'

export const ScrollBlock: React.FC<ScrollBlockProps> = (props) => {
  return <ScrollBlockClient {...props} />
}
