import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-secondary mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Страница не найдена</p>
        <Link
          href="/"
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
        >
          Вернуться на главную
        </Link>
      </div>
    </div>
  )
}

