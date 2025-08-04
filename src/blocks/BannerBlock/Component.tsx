import type { BannerBlock as BannerBlockProps } from '@/payload-types'
import { BannerBlockClient } from './Component.client'

export const BannerBlock: React.FC<BannerBlockProps> = (props) => {
  return <BannerBlockClient {...props} />
}
