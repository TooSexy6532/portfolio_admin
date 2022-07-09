import { defineStore } from "pinia"

export const usePrefsStore = defineStore("prefs", {
  state: () => ({
    layout: "DefaultLayout",
  }),

  actions: {
    setLayout(newLayout) {
      this.layout = newLayout
    },
  },
})
