import { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Контакты | Dance Coach',
  description: 'Свяжитесь с нами для записи на уроки танцев. Адрес, телефон, мессенджеры.',
}

export default function ContactsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-secondary text-center mb-12">
          Контакты
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-semibold text-secondary mb-6">
              Свяжитесь с нами
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Адрес</h3>
                <p className="text-gray-700">Москва, центр (уточняется при записи)</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Мессенджеры</h3>
                <div className="space-y-2">
                  <a
                    href="https://t.me/dancecoach"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-primary hover:underline"
                  >
                    Telegram
                  </a>
                  <a
                    href="https://wa.me/79161234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-primary hover:underline"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Время работы</h3>
                <p className="text-gray-700">
                  Понедельник - Воскресенье: 10:00 - 22:00
                </p>
              </div>
            </div>

            {/* Map */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Местоположение</h3>
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.3732224880775!2d37.61729931593034!3d55.75582628055246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54afc73d4b0c9%3A0x3d44d6cc5757cf4c!2sRed%20Square!5e0!3m2!1sen!2sru!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}

