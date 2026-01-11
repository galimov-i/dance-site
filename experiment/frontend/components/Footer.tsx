import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Dance Coach</h3>
            <p className="text-sm text-gray-300">
              Индивидуальные уроки танцев в центре Москвы
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Стили</h4>
            <ul className="space-y-2">
              <li><Link href="/bachata" className="text-sm text-gray-300 hover:text-white">Bachata</Link></li>
              <li><Link href="/salsa" className="text-sm text-gray-300 hover:text-white">Salsa</Link></li>
              <li><Link href="/kizomba" className="text-sm text-gray-300 hover:text-white">Kizomba</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Информация</h4>
            <ul className="space-y-2">
              <li><Link href="/pricing" className="text-sm text-gray-300 hover:text-white">Цены</Link></li>
              <li><Link href="/about" className="text-sm text-gray-300 hover:text-white">О тренере</Link></li>
              <li><Link href="/blog" className="text-sm text-gray-300 hover:text-white">Блог</Link></li>
              <li><Link href="/contacts" className="text-sm text-gray-300 hover:text-white">Контакты</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Контакты</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Москва, центр</li>
              <li>
                <a href="https://t.me/dancecoach" className="hover:text-white">Telegram</a>
              </li>
              <li>
                <a href="https://wa.me/79161234567" className="hover:text-white">WhatsApp</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-center text-sm text-gray-300">
            © {new Date().getFullYear()} Dance Coach. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  )
}

