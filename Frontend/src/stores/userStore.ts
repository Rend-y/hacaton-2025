import { api } from '@/api'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    username: '',
    email: '',
    accessToken: '',
  }),
  actions: {
    setUsername(username: string) {
      this.username = username
    },
    setEmail(email: string) {
      this.email = email
    },
    async login(email: string, password: string) {
      const token = await api.login(email, password)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      this.accessToken = token;
      document.cookie = `token=${token}; path=/; max-age=3600;`
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