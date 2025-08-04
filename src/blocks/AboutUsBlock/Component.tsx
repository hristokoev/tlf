import type { AboutUsBlock as AboutUsBlockProps } from '@/payload-types'
import { AboutUsBlockClient } from './Component.client'

export const AboutUsBlock: React.FC<AboutUsBlockProps> = (props) => {
  return <AboutUsBlockClient {...props} />
}
