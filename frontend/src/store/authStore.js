import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: { id: 'dummy-id', name: 'Rizky', email: 'rizky@example.com' },
  token: 'dummy-token',
  isAuthenticated: true,
  isLoading: false,
  
  setAuth: (user, token) => {
    localStorage.setItem('token', token)
    set({ user, token, isAuthenticated: true })
  },
  
  logout: () => {
    localStorage.removeItem('token')
    set({ user: null, token: null, isAuthenticated: false })
  },
  
  setUser: (user) => {
    set({ user })
  }
}))
