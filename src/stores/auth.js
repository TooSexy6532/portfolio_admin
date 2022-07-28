import { AuthApi } from "@/api"
import { defineStore } from "pinia"
import { useMessagesStore } from "./messages"
export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isAuth: false,
    isLoading: false,
  }),

  actions: {
    async login(loginForm) {
      this.isLoading = true

      const message = useMessagesStore()

      try {
        const data = await AuthApi.login(loginForm)

        message.setMessage({ message: data.message, status: "success" })

        this.user = data.user
        this.isAuth = true
        this.isLoading = false
      } catch (error) {
        message.setMessage({ message: error.message, status: "error" })

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
