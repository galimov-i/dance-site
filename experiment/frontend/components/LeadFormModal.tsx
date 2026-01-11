'use client'

import { useState } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { leadsApi } from '@/lib/api'

interface LeadFormModalProps {
  isOpen: boolean
  onClose: () => void
  defaultStyle?: string
}

export default function LeadFormModal({ isOpen, onClose, defaultStyle }: LeadFormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    style: defaultStyle || '',
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
          form_type: 'lead',
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
        onClose()
      }, 2000)
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Произошла ошибка. Попробуйте позже.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="mx-auto max-w-lg rounded-lg bg-white p-6 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <DialogTitle className="text-2xl font-bold text-secondary">
              Записаться на урок
            </DialogTitle>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

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
                  rows={3}
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
        </DialogPanel>
      </div>
    </Dialog>
  )
}

