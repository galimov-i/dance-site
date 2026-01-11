import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Analytics from '@/components/Analytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dance Coach - Индивидуальные уроки танцев в Москве',
  description: 'Профессиональные уроки танцев: Бachata, Salsa, Kizomba. Индивидуальные занятия в центре Москвы.',
  openGraph: {
    title: 'Dance Coach - Индивидуальные уроки танцев в Москве',
    description: 'Профессиональные уроки танцев: Бachata, Salsa, Kizomba',
    type: 'website',
    locale: 'ru_RU',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Navigation />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}

