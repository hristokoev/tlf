'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface AccordionItem {
  title: string
  description: string
}

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

export const Accordion = ({ accordionItems }: { accordionItems: AccordionItem[] }) => {
  const [openItem, setOpenItem] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index)
  }

  return (
    <div className="divide-y divide-gray-300">
      {accordionItems.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.description}
          isOpen={openItem === index}
          onToggle={() => toggleItem(index)}
        />
      ))}
    </div>
  )
}
