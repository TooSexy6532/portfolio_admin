import { AuthApi } from "@/api"
import { defineStore } from "pinia"
export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isAuth: false,
    loginErrors: [],
    loginSuccess: null,
  }),

  actions: {
    async login(loginForm) {
      try {
        const data = await AuthApi.login(loginForm)

        this.loginSuccess = data.message
        this.user = data.user
        this.isAuth = true
      } catch (error) {
        this.loginErrors.push(error)
      }
    },

    // logout() {
    //   this.user = null
    //   this.isAuth = false
    // },

    // me() {},
  },
})
