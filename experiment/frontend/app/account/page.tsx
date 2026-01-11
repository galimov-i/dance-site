'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import Dashboard from '@/components/Dashboard'

export default function AccountPage() {
  const router = useRouter()
  const { user, accessToken } = useAuthStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Hydrate Zustand store on client
    useAuthStore.persist.rehydrate()
  }, [])

  useEffect(() => {
    if (mounted && !accessToken) {
      router.push('/account/login')
    }
  }, [accessToken, router, mounted])

  if (!mounted || !accessToken) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Загрузка...</div>
      </div>
    )
  }

  return <Dashboard />
}

