import { defineStore } from "pinia"

/* Определение хранилища под названием messages. */
export default defineStore("messages", {
  state: () => ({
    message: null,
    status: null, // 'success' | 'warning' | 'info' | 'error'
  }),

  actions: {
    /* Функция, которая устанавливает сообщение и статус. */
    setMessage({ message, status }) {
      if (!message || !status) return

      this.message = message
      this.status = status
    },
  },
})
