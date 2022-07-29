import { AuthApi } from "@/api"
import { useMessagesStore } from "@/stores/index"
import { defineStore } from "pinia"

export default defineStore("auth", {
  state: () => ({
    user: null,
    isAuth: false,
    isLoading: false,
  }),

  actions: {
    async login(loginForm) {
      this.isLoading = true

      const messageStore = useMessagesStore()

      try {
        const data = await AuthApi.login(loginForm)

        messageStore.setMessage({ message: data.message, status: "success" })

        this.user = data.user
        this.isAuth = true
        this.isLoading = false
      } catch (error) {
        messageStore.setMessage({ message: error.message, status: "error" })

        this.isLoading = false
      }
    },

    async getMe() {
      const { user, isAuth } = await AuthApi.getMe()

      this.isAuth = isAuth
      this.user = user

      return { user, isAuth }
    },

    // logout() {
    //   this.user = null
    //   this.isAuth = false
    // },

    // me() {},
  },
})
