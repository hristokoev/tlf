'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Accordion } from '@/components/Accordion'

interface AccordionItem {
  title: string
  description: string
}

interface AnimatedAccordionProps {
  accordionItems: AccordionItem[]
}

export function AnimatedAccordion({ accordionItems }: AnimatedAccordionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const accordionVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0, 1] as const,
      },
    },
  }

  const sideContentVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0, 1] as const,
      },
    },
  }

  return (
    <section className="container py-16" ref={ref}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16"
        >
          {/* Left - Accordion */}
          <motion.div variants={accordionVariants}>
            <Accordion accordionItems={accordionItems} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
