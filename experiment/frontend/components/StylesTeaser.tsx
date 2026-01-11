import Link from 'next/link'

const styles = [
  {
    name: 'Bachata',
    description: 'Страстный латиноамериканский танец с чувственными движениями',
    href: '/bachata',
    image: '/images/bachata.jpg',
  },
  {
    name: 'Salsa',
    description: 'Энергичный и зажигательный танец с ритмичными поворотами',
    href: '/salsa',
    image: '/images/salsa.jpg',
  },
  {
    name: 'Kizomba',
    description: 'Плавный и чувственный танец, популярный в Европе',
    href: '/kizomba',
    image: '/images/kizomba.jpg',
  },
]

export default function StylesTeaser() {
  return (
    <section id="styles" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-secondary mb-12">
          Наши стили танцев
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {styles.map((style) => (
            <Link
              key={style.name}
              href={style.href}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="aspect-video bg-gray-200 relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  {style.name}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-secondary mb-2">{style.name}</h3>
                <p className="text-gray-600">{style.description}</p>
                <span className="inline-block mt-4 text-primary font-medium">
                  Узнать больше →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

