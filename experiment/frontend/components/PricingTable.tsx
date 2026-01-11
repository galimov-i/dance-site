'use client'

import { useState } from 'react'
import LeadFormModal from './LeadFormModal'

const pricingPlans = [
  {
    name: 'Разовое занятие',
    price: '2000',
    duration: '60 минут',
    features: [
      'Индивидуальный урок',
      'Выбор стиля',
      'Гибкое расписание',
      'Все материалы включены',
    ],
  },
  {
    name: 'Пакет из 5 занятий',
    price: '9000',
    originalPrice: '10000',
    duration: '60 минут каждое',
    features: [
      '5 индивидуальных уроков',
      'Скидка 10%',
      'Выбор стиля',
      'Гибкое расписание',
      'Все материалы включены',
      'Срок действия: 2 месяца',
    ],
    popular: false,
  },
  {
    name: 'Пакет из 10 занятий',
    price: '16000',
    originalPrice: '20000',
    duration: '60 минут каждое',
    features: [
      '10 индивидуальных уроков',
      'Скидка 20%',
      'Выбор стиля',
      'Гибкое расписание',
      'Все материалы включены',
      'Срок действия: 4 месяца',
    ],
    popular: true,
  },
  {
    name: 'Месячный абонемент',
    price: '12000',
    duration: '8 занятий в месяц',
    features: [
      '8 индивидуальных уроков',
      'Выбор стиля',
      'Приоритетное расписание',
      'Все материалы включены',
      'Срок действия: 1 месяц',
    ],
  },
]

export default function PricingTable() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className={`bg-white rounded-lg shadow-lg p-6 relative ${
              plan.popular ? 'ring-2 ring-primary transform scale-105' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 rounded-bl-lg rounded-tr-lg text-sm font-semibold">
                Популярно
              </div>
            )}
            <h3 className="text-xl font-bold text-secondary mb-4">{plan.name}</h3>
            <div className="mb-4">
              <span className="text-3xl font-bold text-primary">{plan.price}₽</span>
              {plan.originalPrice && (
                <span className="text-lg text-gray-400 line-through ml-2">
                  {plan.originalPrice}₽
                </span>
              )}
            </div>
            <p className="text-gray-600 mb-6">{plan.duration}</p>
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-primary text-lg mr-2">✓</span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setIsModalOpen(true)}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition ${
                plan.popular
                  ? 'bg-primary text-white hover:bg-primary/90'
                  : 'bg-gray-200 text-secondary hover:bg-gray-300'
              }`}
            >
              Записаться
            </button>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-white rounded-lg p-8 shadow-md">
        <h2 className="text-2xl font-bold text-secondary mb-4">Условия отмены и переноса</h2>
        <ul className="space-y-2 text-gray-700">
          <li>• Отмена или перенос занятия возможны не позднее чем за 24 часа до начала</li>
          <li>• При отмене менее чем за 24 часа занятие считается проведенным</li>
          <li>• Перенос возможен только в рамках срока действия абонемента</li>
          <li>• Возврат средств за неиспользованные занятия производится при наличии уважительных причин</li>
        </ul>
      </div>

      <LeadFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

