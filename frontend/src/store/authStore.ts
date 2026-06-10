import { create } from 'zustand'
import type { WymmUser } from '@/lib/auth'
import { onAuthChange } from '@/lib/auth'

interface AuthStore {
  user: WymmUser
  loading: boolean
  initialized: boolean
  setUser: (user: WymmUser) => void
  setLoading: (v: boolean) => void
  initialize: () => () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  initialized: false,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  initialize: () => {
    const unsubscribe = onAuthChange((user) => {
      set({ user, loading: false, initialized: true })
    })
    return unsubscribe
  },
}))
