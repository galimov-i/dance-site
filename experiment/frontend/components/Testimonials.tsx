const testimonials = [
  {
    name: 'Анна',
    age: 32,
    style: 'Bachata',
    text: 'Отличный тренер! За несколько месяцев научилась танцевать бачату. Индивидуальный подход и терпение.',
  },
  {
    name: 'Михаил',
    age: 28,
    style: 'Salsa',
    text: 'Всегда мечтал научиться сальсе. Теперь танцую уверенно и получаю массу удовольствия!',
  },
  {
    name: 'Елена',
    age: 45,
    style: 'Kizomba',
    text: 'Не думала, что в моем возрасте смогу научиться. Тренер помог поверить в себя и достичь результата.',
  },
]

export default function Testimonials() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-secondary mb-12">
          Отзывы учеников
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-6 shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.name[0]}
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-secondary">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">
                    {testimonial.age} лет • {testimonial.style}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

