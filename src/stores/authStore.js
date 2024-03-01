import axios from 'axios'
import { defineStore } from 'pinia'

const API_URL = import.meta.env.VITE_SERVER_API_URL

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true'
  }),
  actions: {
    async login(credentials) {
      try {
        const response = await axios.post(`${API_URL}/login/`, credentials)
        this.isAuthenticated = true
        localStorage.setItem('accessToken', response.data.access)
        localStorage.setItem('refreshToken', response.data.refresh)
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('profileId', response.data.profile.id)
      } catch (error) {
        console.log('Login error', error)
        throw error
      }
    },
    async register(credentials) {
      try {
        const response = await axios.post(`${API_URL}/register/`, credentials)
        this.isAuthenticated = true
        localStorage.setItem('accessToken', response.data.access)
        localStorage.setItem('refreshToken', response.data.refresh)
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('profileId', response.data.profile.id)
      } catch (error) {
        console.log('Registration error', error)
        throw error
      }
    },
    async logout() {
      try {
        const refreshToken = localStorage.getItem('refreshToken')
        const accessToken = localStorage.getItem('accessToken')
        if (!refreshToken || !accessToken) {
          throw new Error('Refresh token not found')
        }
        await axios.post(
          `${API_URL}/logout/`,
          { refresh: refreshToken },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`
            }
          }
        )

        this.isAuthenticated = false
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('profileId')
      } catch (error) {
        console.error('Logout error', error.response)
        throw error
      }
    }
  }
})
