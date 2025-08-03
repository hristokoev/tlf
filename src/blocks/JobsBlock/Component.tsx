import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { JobsBlock as JobsBlockProps } from '@/payload-types'
import { Button } from '@/components/ui/button'

export const JobsBlock: React.FC<JobsBlockProps> = async (props) => {
  const { heading } = props
  const payload = await getPayload({ config: configPromise })
  const jobs = await payload.find({
    collection: 'jobs', // Assuming your collection is named 'jobs'
    limit: 20,
    sort: 'createdAt',
  })
  const jobsDocs = jobs.docs

  return (
    <section
      className="bg-neutral-50 py-12 md:py-16 lg:py-24 px-4 md:px-6 lg:px-8"
      style={{ backgroundImage: 'url(/hero-bg.png)', backgroundSize: 'cover' }}
    >
      <div className="container">
        <div className="flex gap-8 md:gap-12 lg:gap-16 flex-col">
          <span className="uppercase text-sm md:text-base lg:text-lg tracking-wide font-medium">
            {heading}
          </span>

          {/* Jobs List */}
          <div className="flex flex-col gap-3 md:gap-4">
            {jobsDocs.map((job) => (
              <a
                href={`/nabidky/${job.slug}`} // Assuming Czech routing for jobs
                key={job.id}
                className="group"
              >
                <div className="bg-white p-4 md:p-6 lg:p-8 border border-neutral-200 transition-all duration-300 group-hover:border-neutral-300">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                    {/* Job Info */}
                    <div className="flex-1">
                      <h3 className="font-bold text-base md:text-lg lg:text-xl mb-1 group-hover:text-neutral-700 transition-colors">
                        {job.title}
                      </h3>
                    </div>

                    {/* Arrow indicator */}
                    <div className="flex-shrink-0 self-start sm:self-center">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-neutral-200 rounded-full flex items-center justify-center group-hover:bg-neutral-300 transition-colors">
                        <svg
                          className="w-4 h-4 md:w-5 md:h-5 text-neutral-600 transform group-hover:translate-x-0.5 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Show more button */}
          <div className="flex justify-center sm:justify-end">
            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 text-sm md:text-base"
            >
              Ukazát více
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
