import { Metadata } from 'next'
import StylePage from '@/components/StylePage'

export const metadata: Metadata = {
  title: 'Bachata - Уроки танцев в Москве | Dance Coach',
  description: 'Изучайте бачату с профессиональным тренером. Индивидуальные уроки для начинающих в центре Москвы.',
  openGraph: {
    title: 'Bachata - Уроки танцев в Москве',
    description: 'Изучайте бачату с профессиональным тренером',
  },
}

export default function BachataPage() {
  return (
    <StylePage
      name="Bachata"
      description="Бачата — это страстный латиноамериканский танец, который берет свое начало в Доминиканской Республике. Это танец о любви, страсти и эмоциях."
      benefits={[
        'Улучшение координации и пластичности',
        'Развитие чувства ритма',
        'Снятие стресса и повышение настроения',
        'Отличная физическая активность',
        'Возможность познакомиться с латиноамериканской культурой',
      ]}
      styleSlug="bachata"
    />
  )
}

