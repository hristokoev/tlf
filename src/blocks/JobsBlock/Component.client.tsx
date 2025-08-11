'use client'

import { motion, type Variants } from 'framer-motion'
import type { Job } from '@/payload-types'
import Link from 'next/link'
import { useParams } from 'next/navigation'

interface JobsBlockClientProps {
  heading: string
  jobs: Job[]
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const headerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

const jobVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

export const JobsBlockClient: React.FC<JobsBlockClientProps> = ({ heading, jobs }) => {
  const params = useParams()
  const { lang } = params

  return (
    <section
      className="bg-neutral-50 py-16 md:py-24 lg:py-32 overflow-hidden"
      style={{ backgroundImage: 'url(/hero-bg.png)', backgroundSize: 'cover' }}
    >
      <div className="container">
        <motion.div
          className="flex gap-12 md:gap-16 lg:gap-20 flex-col"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Header */}
          <motion.span
            className="inline-block uppercase text-sm md:text-base lg:text-lg tracking-[0.2em] font-medium text-gray-700"
            variants={headerVariants}
          >
            {heading}
          </motion.span>

          {/* Jobs List */}
          <motion.div className="flex flex-col gap-4 md:gap-6" variants={containerVariants}>
            {jobs.map((job) => (
              <motion.div
                key={job.id}
                variants={jobVariants}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.3, ease: 'easeOut' },
                }}
                whileTap={{ scale: 0.98 }}
                className="group"
              >
                <Link href={`/${lang}/jobs/${job.slug}`} className="block">
                  <div className="bg-white/90 backdrop-blur-sm p-6 md:p-8 lg:p-10 border border-black/10 hover:border-neutral-300/60 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
                      {/* Job Info */}
                      <div className="flex-1">
                        <motion.h3
                          className="font-bold text-lg md:text-xl lg:text-2xl text-gray-900 group-hover:text-gray-700 transition-colors duration-300"
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          {job.title}
                        </motion.h3>
                      </div>

                      {/* Animated Arrow */}
                      <motion.div
                        className="flex-shrink-0 self-start sm:self-center"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center group-hover:from-gray-200 group-hover:to-gray-300 transition-all duration-300">
                          <motion.svg
                            className="w-5 h-5 md:w-6 md:h-6 text-gray-700"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            whileHover={{ x: 2 }}
                            transition={{ duration: 0.2 }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </motion.svg>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
