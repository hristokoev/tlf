import type { ContactBlock as ContactBlockProps } from '@/payload-types'
import { ContactBlockClient } from './Component.client'

export const ContactBlock: React.FC<ContactBlockProps> = (props) => {
  return <ContactBlockClient {...props} />
}
