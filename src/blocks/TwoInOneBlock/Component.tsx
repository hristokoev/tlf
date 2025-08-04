import type { TwoInOneBlock as TwoInOneBlockProps } from '@/payload-types'
import { TwoInOneBlockClient } from './Component.client'

export const TwoInOneBlock: React.FC<TwoInOneBlockProps> = (props) => {
  return <TwoInOneBlockClient {...props} />
}
