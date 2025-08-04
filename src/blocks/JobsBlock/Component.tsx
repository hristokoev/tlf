import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { JobsBlock as JobsBlockProps } from '@/payload-types'
import { JobsBlockClient } from './Component.client'

export const JobsBlock: React.FC<JobsBlockProps> = async (props) => {
  const { heading } = props
  const payload = await getPayload({ config: configPromise })
  const jobs = await payload.find({
    collection: 'jobs',
    limit: 20,
    sort: 'createdAt',
  })
  const jobsDocs = jobs.docs

  return <JobsBlockClient heading={heading} jobs={jobsDocs} />
}
