import { Metadata } from 'next'
import BlogList from '@/components/BlogList'

export const metadata: Metadata = {
  title: 'Блог | Dance Coach',
  description: 'Статьи о танцах, обучении и культуре латиноамериканских танцев.',
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-secondary text-center mb-12">
          Блог
        </h1>
        <BlogList />
      </div>
    </div>
  )
}

