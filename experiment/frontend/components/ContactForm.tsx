'use client'

import { useState } from 'react'
import { leadsApi } from '@/lib/api'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    style: '',
    preferred_time: '',
    comment: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      await leadsApi.create(formData)
      setSubmitSuccess(true)

      // Trigger analytics event
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'form_success',
          form_type: 'contact',
        })
      }

      // Reset form after delay
      setTimeout(() => {
        setSubmitSuccess(false)
        setFormData({
          name: '',
          phone: '',
          style: '',
          preferred_time: '',
          comment: '',
        })
      }, 3000)
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Произошла ошибка. Попробуйте позже.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-secondary mb-6">
        Оставить заявку
      </h2>

      {submitSuccess ? (
        <div className="text-center py-8">
          <div className="text-green-600 text-xl font-semibold mb-2">
            Спасибо! Мы свяжемся с вами в ближайшее время.
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Имя *
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Телефон *
            </label>
            <input
              type="tel"
              id="phone"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+7 (___) ___-__-__"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="style" className="block text-sm font-medium text-gray-700 mb-1">
              Стиль
            </label>
            <select
              id="style"
              value={formData.style}
              onChange={(e) => setFormData({ ...formData, style: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Выберите стиль</option>
              <option value="bachata">Bachata</option>
              <option value="salsa">Salsa</option>
              <option value="kizomba">Kizomba</option>
            </select>
          </div>

          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
              Предпочтительное время
            </label>
            <input
              type="text"
              id="time"
              value={formData.preferred_time}
              onChange={(e) => setFormData({ ...formData, preferred_time: e.target.value })}
              placeholder="Например: вечером, выходные"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
              Комментарий
            </label>
            <textarea
              id="comment"
              rows={4}
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-white py-2 px-4 rounded-md font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
          </button>
        </form>
      )}
    </div>
  )
}

