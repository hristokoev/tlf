import type { MapInfoBlock as MapInfoBlockProps } from '@/payload-types'
import { MapInfoBlockClient } from './Component.client'

export const MapInfoBlock: React.FC<MapInfoBlockProps> = (props) => {
  return <MapInfoBlockClient {...props} />
}
