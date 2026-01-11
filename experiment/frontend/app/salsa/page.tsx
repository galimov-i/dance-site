import { Metadata } from 'next'
import StylePage from '@/components/StylePage'

export const metadata: Metadata = {
  title: 'Salsa - Уроки танцев в Москве | Dance Coach',
  description: 'Обучайтесь сальсе у профессионального тренера. Индивидуальные уроки для начинающих в центре Москвы.',
  openGraph: {
    title: 'Salsa - Уроки танцев в Москве',
    description: 'Обучайтесь сальсе у профессионального тренера',
  },
}

export default function SalsaPage() {
  return (
    <StylePage
      name="Salsa"
      description="Сальса — это энергичный и зажигательный танец, который родился в Нью-Йорке и объединил в себе элементы различных латиноамериканских танцев."
      benefits={[
        'Развитие выносливости и физической формы',
        'Улучшение осанки и грации',
        'Социальная активность и новые знакомства',
        'Повышение уверенности в себе',
        'Изучение культуры и музыки',
      ]}
      styleSlug="salsa"
    />
  )
}

