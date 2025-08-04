import type { ContentShowcaseBlock as ContentShowcaseBlockProps } from '@/payload-types'
import { ContentShowcaseBlockClient } from './Component.client'

export const ContentShowcaseBlock: React.FC<ContentShowcaseBlockProps> = (props) => {
  return <ContentShowcaseBlockClient {...props} />
}
