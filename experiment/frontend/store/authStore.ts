import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// SSR-safe storage
const getStorage = () => {
  if (typeof window !== 'undefined') {
    return localStorage
  }
  return undefined
}

interface User {
  id: number
  email: string
  phone: string
  name: string
  role: string
  is_active: boolean
}

interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  setUser: (user: User | null) => void
  setTokens: (accessToken: string | null, refreshToken: string | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      setUser: (user) => set({ user }),
      setTokens: (accessToken, refreshToken) => {
        set({ accessToken, refreshToken })
        if (typeof window !== 'undefined') {
          if (accessToken) {
            localStorage.setItem('access_token', accessToken)
          }
          if (refreshToken) {
            localStorage.setItem('refresh_token', refreshToken)
          }
        }
      },
      logout: () => {
        set({ user: null, accessToken: null, refreshToken: null })
        if (typeof window !== 'undefined') {
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => getStorage()),
      skipHydration: true, // Prevent hydration mismatches in SSR
    }
  )
)

