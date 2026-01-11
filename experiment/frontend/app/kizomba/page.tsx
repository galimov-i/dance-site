import { Metadata } from 'next'
import StylePage from '@/components/StylePage'

export const metadata: Metadata = {
  title: 'Kizomba - Уроки танцев в Москве | Dance Coach',
  description: 'Научитесь танцевать кизомбу с профессиональным тренером. Индивидуальные уроки для начинающих в центре Москвы.',
  openGraph: {
    title: 'Kizomba - Уроки танцев в Москве',
    description: 'Научитесь танцевать кизомбу с профессиональным тренером',
  },
}

export default function KizombaPage() {
  return (
    <StylePage
      name="Kizomba"
      description="Кизомба — это плавный и чувственный танец, пришедший из Анголы и ставший популярным по всей Европе. Это танец близости и гармонии."
      benefits={[
        'Развитие чувственности и пластичности',
        'Улучшение связи с партнером',
        'Снятие напряжения и расслабление',
        'Элегантные и красивые движения',
        'Подходит для всех возрастов',
      ]}
      styleSlug="kizomba"
    />
  )
}

