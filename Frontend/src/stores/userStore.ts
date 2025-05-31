import { getToken } from '@/api/token/TokenApi'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    username: '',
    email: '',
    accessToken: '',
    refreshToken: '',
  }),
  actions: {
    setUsername(username: string) {
      this.username = username
    },
    setEmail(email: string) {
      this.email = email
    },
    async login(email: string, password: string) {
      const token = await getToken(email, password)
      this.accessToken = token.access
      this.refreshToken = token.refresh
    },
      logout() {
        console.log('logout')
      this.clearUser()
    },
      clearUser() {
        console.log('clearUser')
      this.username = ''
      this.email = ''
    },
  },
  getters: {
    getUsername: (state) => state.username,
    getEmail: (state) => state.email,
  }
})