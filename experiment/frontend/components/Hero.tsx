'use client'

import { useState } from 'react'
import LeadFormModal from './LeadFormModal'

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="relative bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Индивидуальные уроки танцев в Москве
              </h1>
              <p className="text-xl mb-8 text-gray-100">
                Бachata, Salsa, Kizomba. Профессиональное обучение для начинающих и продвинутых.
                Персональный подход к каждому ученику.
              </p>
              <div className="space-x-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Записаться на пробный урок
                </button>
                <a
                  href="#styles"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition inline-block"
                >
                  Узнать больше
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/videos/hero-placeholder.mp4" type="video/mp4" />
                  <p className="flex items-center justify-center h-full text-gray-400">
                    Видео будет здесь
                  </p>
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LeadFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

