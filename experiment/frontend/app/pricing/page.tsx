import { Metadata } from 'next'
import PricingTable from '@/components/PricingTable'

export const metadata: Metadata = {
  title: 'Цены на уроки танцев | Dance Coach',
  description: 'Цены на индивидуальные уроки танцев: Бachata, Salsa, Kizomba. Абонементы и разовые занятия.',
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-secondary text-center mb-4">
          Цены на уроки
        </h1>
        <p className="text-xl text-gray-600 text-center mb-12">
          Выберите подходящий для вас вариант
        </p>
        <PricingTable />
      </div>
    </div>
  )
}

