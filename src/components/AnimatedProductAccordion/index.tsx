'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'

interface AnimatedProductAccordionProps {
  variants: string
  materials: string
  technicalData: string
}

// Enhanced Accordion Item Component with Framer Motion
const AnimatedAccordionItem = ({
  title,
  content,
  isOpen,
  onToggle,
}: {
  title: string
  content: string
  isOpen: boolean
  onToggle: () => void
}) => {
  const contentVariants = {
    hidden: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.25, 0, 1] as const,
      },
    },
    visible: {
      height: 'auto',
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.25, 0, 1] as const,
      },
    },
  }

  const iconVariants = {
    closed: { rotate: 0 },
    open: { rotate: 45 },
  }

  return (
    <div className="border-b border-gray-300">
      <motion.button
        onClick={onToggle}
        className="w-full py-6 flex justify-between items-center text-left transition-colors"
        whileHover={{ backgroundColor: 'rgba(249, 250, 251, 0.5)' }}
        whileTap={{ scale: 0.99 }}
        transition={{ duration: 0.2 }}
      >
        <span className="text-lg font-medium text-gray-900 uppercase tracking-wide">{title}</span>
        <motion.span
          className="text-2xl font-light text-gray-600"
          variants={iconVariants}
          animate={isOpen ? 'open' : 'closed'}
          transition={{ duration: 0.3, ease: [0.25, 0.25, 0, 1] as const }}
        >
          +
        </motion.span>
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="overflow-hidden"
          >
            <motion.div
              className="pb-6 text-gray-700 leading-relaxed whitespace-pre-line"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {content}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function AnimatedProductAccordion({
  variants,
  materials,
  technicalData,
}: AnimatedProductAccordionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [openItem, setOpenItem] = useState<string | null>(null)

  const toggleItem = (item: string) => {
    setOpenItem(openItem === item ? null : item)
  }

  const accordionItems = [
    { key: 'variants', title: 'Varianty a provedení', content: variants },
    { key: 'materials', title: 'Materiály a konstrukce', content: materials },
    { key: 'technical', title: 'Technické informace', content: technicalData },
  ]

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

  const accordionWrapperVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
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
            <motion.div
              className="divide-y divide-gray-300"
              variants={accordionWrapperVariants}
              initial="hidden"
              animate="visible"
            >
              {accordionItems.map((item) => (
                <motion.div key={item.key} variants={itemVariants}>
                  <AnimatedAccordionItem
                    title={item.title}
                    content={item.content}
                    isOpen={openItem === item.key}
                    onToggle={() => toggleItem(item.key)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Additional Info */}
          <motion.div variants={sideContentVariants}>
            <motion.h2
              className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wide mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Další informace
            </motion.h2>
            {/* Add any additional content here */}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
