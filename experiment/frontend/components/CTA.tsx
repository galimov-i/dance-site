'use client'

import { useState } from 'react'
import LeadFormModal from './LeadFormModal'

export default function CTA() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <section className="py-16 bg-gradient-to-r from-secondary to-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Готовы начать танцевать?
          </h2>
          <p className="text-xl mb-8 text-gray-100">
            Запишитесь на пробный урок и почувствуйте магию латиноамериканских танцев
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition text-lg"
          >
            Записаться на пробный урок
          </button>
        </div>
      </section>

      <LeadFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

