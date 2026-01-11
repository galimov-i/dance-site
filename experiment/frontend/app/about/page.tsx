import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'О тренере | Dance Coach',
  description: 'Профессиональный тренер по латиноамериканским танцам. Опыт преподавания, квалификация и философия обучения.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-accent text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">О тренере</h1>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
            <div>
              <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Фото тренера
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-secondary mb-4">Биография</h2>
              <p className="text-gray-700 mb-4">
                Я — профессиональный тренер по латиноамериканским танцам с многолетним опытом
                преподавания. Моя страсть к танцам началась более 10 лет назад, и с тех пор я
                посвятил себя изучению и преподаванию различных стилей.
              </p>
              <p className="text-gray-700 mb-4">
                Я обучался у лучших мастеров из разных стран, участвовал в международных
                конкурсах и фестивалях, что позволило мне развить уникальный стиль преподавания,
                сочетающий традиционные техники с современными подходами.
              </p>
              <p className="text-gray-700">
                Моя цель — не просто научить вас танцевать, а помочь вам раскрыть свой потенциал,
                обрести уверенность и получать удовольствие от каждого движения.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Qualifications Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-secondary mb-8 text-center">
            Квалификация и опыт
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-secondary mb-4">Образование</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Сертификат инструктора по латиноамериканским танцам</li>
                <li>• Участие в международных мастер-классах</li>
                <li>• Постоянное повышение квалификации</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-secondary mb-4">Опыт</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Более 10 лет опыта преподавания</li>
                <li>• Участие в международных конкурсах</li>
                <li>• Более 500 довольных учеников</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-secondary mb-8 text-center">
            Философия и подход к обучению
          </h2>
          <div className="space-y-6 text-gray-700">
            <p>
              Я верю, что каждый человек может научиться танцевать, независимо от возраста,
              физической подготовки или предыдущего опыта. Мой подход основан на индивидуальном
              внимании к каждому ученику и создании комфортной атмосферы, в которой вы можете
              расти и развиваться.
            </p>
            <p>
              Я использую разнообразные методики обучения, адаптируя их под ваши уникальные
              потребности и цели. На занятиях мы работаем над техникой, чувством ритма,
              выразительностью и, самое главное, над тем, чтобы вы получали удовольствие от
              процесса.
            </p>
            <p>
              Моя задача — не только передать вам технические навыки, но и вдохновить вас,
              помочь обрести уверенность в себе и открыть для себя новый мир латиноамериканских
              танцев.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

