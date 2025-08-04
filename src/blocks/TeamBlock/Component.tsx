import type { TeamBlock as TeamBlockProps } from '@/payload-types'
import { TeamBlockClient } from './Component.client'

export const TeamBlock: React.FC<TeamBlockProps> = (props) => {
  return <TeamBlockClient {...props} />
}
