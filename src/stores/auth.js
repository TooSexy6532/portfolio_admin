import { AuthApi } from "@/api"
import { defineStore } from "pinia"
export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isAuth: false,
    isLoading: false,
    loginErrors: [],
    loginSuccess: null,
  }),

  actions: {
    resetErrors() {
      this.loginErrors = []
    },

    async login(loginForm) {
      this.resetErrors()

      this.isLoading = true

      try {
        const data = await AuthApi.login(loginForm)

        this.loginSuccess = data.message
        this.user = data.user
        this.isAuth = true
        this.isLoading = false
      } catch (error) {
        this.loginErrors.push(error)
        this.isLoading = false
      }
    },

    async getMe() {
      try {
        const data = await AuthApi.getMe()

        this.isAuth = data.isAuth
        this.user = data.user

        return data.user
      } catch (error) {
        throw new Error(error)
      }
    },

    // logout() {
    //   this.user = null
    //   this.isAuth = false
    // },

    // me() {},
  },
})
