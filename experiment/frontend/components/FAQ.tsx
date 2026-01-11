'use client'

import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  items: FAQItem[]
}

export default function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => toggle(index)}
            className="w-full px-6 py-4 flex justify-between items-center text-left bg-white hover:bg-gray-50 transition"
          >
            <span className="font-semibold text-secondary">{item.question}</span>
            {openIndex === index ? (
              <ChevronUpIcon className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDownIcon className="h-5 w-5 text-gray-500" />
            )}
          </button>
          {openIndex === index && (
            <div className="px-6 py-4 bg-gray-50 text-gray-700">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

