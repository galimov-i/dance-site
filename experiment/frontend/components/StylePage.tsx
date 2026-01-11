'use client'

import { useState, useEffect } from 'react'
import { slotsApi, leadsApi } from '@/lib/api'
import LeadFormModal from './LeadFormModal'
import FAQ from './FAQ'

interface StylePageProps {
  name: string
  description: string
  benefits: string[]
  styleSlug: string
}

export default function StylePage({ name, description, benefits, styleSlug }: StylePageProps) {
  const [slots, setSlots] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await slotsApi.get({ style: styleSlug })
        setSlots(response.data.slots.slice(0, 10)) // Show first 10 slots
      } catch (error) {
        console.error('Failed to fetch slots:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSlots()
  }, [styleSlug])

  const faqItems = [
    {
      question: 'Сколько нужно времени, чтобы научиться?',
      answer: 'Это зависит от ваших начальных навыков и частоты занятий. Обычно первые результаты видны уже через несколько занятий.',
    },
    {
      question: 'Нужен ли партнер?',
      answer: 'Нет, партнер не обязателен. На индивидуальных занятиях тренер выступает в роли партнера.',
    },
    {
      question: 'Что нужно принести на первое занятие?',
      answer: 'Удобную одежду, не сковывающую движения, и обувь с мягкой подошвой или специальную танцевальную обувь.',
    },
    {
      question: 'Можно ли заниматься с нуля?',
      answer: 'Конечно! Индивидуальные занятия идеально подходят для начинающих. Тренер адаптирует программу под ваш уровень.',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-accent text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{name}</h1>
          <p className="text-xl max-w-3xl text-gray-100">{description}</p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-secondary mb-8">Преимущества изучения {name}</h2>
          <ul className="space-y-4">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <span className="text-primary text-xl mr-3">✓</span>
                <span className="text-gray-700 text-lg">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-secondary mb-8 text-center">Процесс обучения</h2>
          <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              Видео будет здесь
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-secondary mb-8">Доступное время</h2>
          {loading ? (
            <div className="text-center py-8">Загрузка...</div>
          ) : slots.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {slots.map((slot, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                >
                  <div className="font-semibold text-secondary">{slot.date}</div>
                  <div className="text-gray-600">
                    {new Date(slot.start_time).toLocaleTimeString('ru-RU', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}{' '}
                    -{' '}
                    {new Date(slot.end_time).toLocaleTimeString('ru-RU', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-600">
              Нет доступных слотов. Свяжитесь с нами для уточнения расписания.
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-secondary mb-8 text-center">Часто задаваемые вопросы</h2>
          <FAQ items={faqItems} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-secondary to-primary text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Готовы начать?</h2>
          <p className="text-xl mb-8 text-gray-100">
            Запишитесь на индивидуальный урок {name}
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition text-lg"
          >
            Записаться на урок
          </button>
        </div>
      </section>

      <LeadFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultStyle={styleSlug}
      />
    </div>
  )
}

