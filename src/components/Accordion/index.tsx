'use client'

import React from 'react'

// Accordion Item Component
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
}) => (
  <div className="border-b border-gray-300">
    <button
      onClick={onToggle}
      className="w-full py-6 flex justify-between items-center text-left transition-colors"
    >
      <span className="text-lg font-medium text-gray-900 uppercase tracking-wide">{title}</span>
      <span className="text-2xl font-light text-gray-600">{isOpen ? '−' : '+'}</span>
    </button>
    {isOpen && (
      <div className="pb-6 text-gray-700 leading-relaxed whitespace-pre-line">{content}</div>
    )}
  </div>
)

export const Accordion = ({
  variants,
  materials,
  technicalData,
}: {
  variants: string
  materials: string
  technicalData: string
}) => {
  const [openItem, setOpenItem] = React.useState<string | null>(null)

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
