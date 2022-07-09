import { defineStore } from "pinia"

export const usePrefsStore = defineStore("prefs", {
  state: () => ({
    layout: "DefaultLayout",
    menuItems: [
      { name: "home", title: "Главная", icon: "Grid" },
      { name: "users", title: "Пользователи", icon: "Avatar" },
    ],
  }),

  actions: {
    setLayout(newLayout) {
      this.layout = newLayout
    },
  },
})
