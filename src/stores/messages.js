import { defineStore } from "pinia"

export default defineStore("messages", {
  state: () => ({
    message: null,
    status: null, // 'success' | 'warning' | 'info' | 'error'
  }),

  actions: {
    setMessage({ message, status }) {
      if (!message || !status) return

      this.message = message
      this.status = status
    },
  },
})
