import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    username: '',
    email: '',
  }),
  actions: {
    setUsername(username: string) {
      this.username = username
    },
    setEmail(email: string) {
      this.email = email
    },
    login(email: string, password: string) {
      console.log(email, password)
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