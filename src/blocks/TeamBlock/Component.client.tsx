'use client'

import { Media } from '@/components/Media'
import type { TeamBlock as TeamBlockProps } from '@/payload-types'
import { motion, type Variants } from 'framer-motion'
import React from 'react'

export const TeamBlockClient: React.FC<TeamBlockProps> = (props) => {
  const { members } = props

  // Container animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  // Individual member card animation variants
  const memberVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  // Contact info animation variants
  const contactVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  }

  // Remove the hover variants - we'll use inline whileHover instead

  return (
    <motion.section
      className="bg-white py-12 md:py-16 lg:py-24 px-4 md:px-6 lg:px-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div
        className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
        variants={containerVariants}
      >
        {members.map((member, index) => (
          <motion.div
            key={member.id}
            className="flex flex-col gap-6 md:gap-8 group cursor-pointer"
            variants={memberVariants}
            whileHover={{
              scale: 1.02,
              y: -8,
              transition: { duration: 0.3, ease: 'easeOut' },
            }}
            custom={index}
          >
            {/* Member Photo */}
            <motion.div className="relative overflow-hidden">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <Media
                  resource={member.media}
                  className="w-full aspect-[3/4] sm:aspect-square lg:aspect-[3/4]"
                  imgClassName="w-full h-full object-cover"
                />
              </motion.div>

              {/* Overlay on hover */}
              <motion.div
                className="absolute inset-0 bg-black/20"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Member Name */}
            <motion.h4
              className="font-semibold text-lg md:text-xl lg:text-2xl leading-tight"
              whileHover={{ color: '#3B82F6' }}
              transition={{ duration: 0.2 }}
            >
              {member.name}
            </motion.h4>

            {/* Contact Information */}
            <motion.div className="flex flex-col gap-3 md:gap-4" variants={containerVariants}>
              {/* Work Phone */}
              {member.phoneWork && (
                <motion.div
                  className="flex items-center gap-2 md:gap-3"
                  variants={contactVariants}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="flex-shrink-0"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 9 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="border border-gray-300 p-1.5 md:p-2 size-7 md:size-8 rounded transition-colors hover:border-blue-400"
                    >
                      <path
                        d="M4.23333 2.95455C4.38444 2.95455 4.51111 2.89792 4.61333 2.78466C4.71556 2.6714 4.76667 2.53106 4.76667 2.36364C4.76667 2.19621 4.71556 2.05587 4.61333 1.94261C4.51111 1.82936 4.38444 1.77273 4.23333 1.77273C4.08222 1.77273 3.95556 1.82936 3.85333 1.94261C3.75111 2.05587 3.7 2.19621 3.7 2.36364C3.7 2.53106 3.75111 2.6714 3.85333 2.78466C3.95556 2.89792 4.08222 2.95455 4.23333 2.95455ZM0.5 13V0H7.96667V3.01364H8.5V5.85H7.96667V13H0.5Z"
                        fill="#151515"
                      />
                    </svg>
                  </motion.div>
                  <span className="text-sm md:text-base text-gray-700 break-all">
                    {member.phoneWork}
                  </span>
                </motion.div>
              )}

              {/* Mobile Phone */}
              {member.phoneMobile && (
                <motion.div
                  className="flex items-center gap-2 md:gap-3"
                  variants={contactVariants}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="flex-shrink-0"
                    whileHover={{ rotate: -5, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="border border-gray-300 p-1.5 md:p-2 size-7 md:size-8 rounded transition-colors hover:border-green-400"
                    >
                      <path
                        d="M12.2417 13C10.737 13 9.24745 12.675 7.77292 12.025C6.29838 11.375 4.95926 10.4481 3.75556 9.24444C2.55185 8.04074 1.625 6.70463 0.975 5.23611C0.325 3.76759 0 2.275 0 0.758333V0H4.26111L4.92917 3.62917L2.87083 5.70556C3.13565 6.175 3.43056 6.62037 3.75556 7.04167C4.08056 7.46296 4.42963 7.85417 4.80278 8.21528C5.15185 8.56435 5.53403 8.89838 5.94931 9.21736C6.36458 9.53634 6.81296 9.83426 7.29444 10.1111L9.38889 8.01667L13 8.75694V13H12.2417Z"
                        fill="#151515"
                      />
                    </svg>
                  </motion.div>
                  <span className="text-sm md:text-base text-gray-700 break-all">
                    {member.phoneMobile}
                  </span>
                </motion.div>
              )}

              {/* Email */}
              {member.email && (
                <motion.div
                  className="flex items-center gap-2 md:gap-3"
                  variants={contactVariants}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="flex-shrink-0"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 17 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="border border-gray-300 p-1.5 md:p-2 size-7 md:size-8 rounded transition-colors hover:border-purple-400"
                    >
                      <path
                        d="M0.5 13V0H16.5V13H0.5ZM8.5 7.3125L14.9 3.25V1.625L8.5 5.6875L2.1 1.625V3.25L8.5 7.3125Z"
                        fill="#151515"
                      />
                    </svg>
                  </motion.div>
                  <span className="text-sm md:text-base text-gray-700 break-all">
                    {member.email}
                  </span>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}
