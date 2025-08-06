'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'

// Enhanced Accordion Item Component with Framer Motion
const AccordionItem = ({
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

export const Accordion = ({
  variants,
  materials,
  technicalData,
}: {
  variants: string
  materials: string
  technicalData: string
}) => {
  const [openItem, setOpenItem] = useState<string | null>(null)

  const toggleItem = (item: string) => {
    setOpenItem(openItem === item ? null : item)
  }

  const accordionItems = [
    { key: 'variants', title: 'Varianty a provedení', content: variants },
    { key: 'materials', title: 'Materiály a konstrukce', content: materials },
    { key: 'technical', title: 'Technické informace', content: technicalData },
  ]

  return (
    <div className="divide-y divide-gray-300">
      {accordionItems.map((item) => (
        <AccordionItem
          key={item.key}
          title={item.title}
          content={item.content}
          isOpen={openItem === item.key}
          onToggle={() => toggleItem(item.key)}
        />
      ))}
    </div>
  )
}
