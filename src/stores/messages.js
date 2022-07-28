import { defineStore } from "pinia"

export const useMessagesStore = defineStore("messages", {
  state: () => ({
    message: null,
    status: null, // 'success' | 'warning' | 'info' | 'error'
  }),

  actions: {
    reset() {
      this.message = null
      this.status = null
    },

    setMessage({ message, status }) {
      if (!message || !status) return

      this.message = message
      this.status = status
    },
  },
})
