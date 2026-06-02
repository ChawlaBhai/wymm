import { create } from 'zustand'
import type { User } from 'firebase/auth'
import { onAuthChange } from '@/lib/auth'

interface AuthStore {
  user: User | null
  loading: boolean
  initialized: boolean
  setUser: (user: User | null) => void
  setLoading: (v: boolean) => void
  initialize: () => () => void // returns unsubscribe
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
