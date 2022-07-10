import { defineStore } from "pinia"

export const usePrefsStore = defineStore("prefs", {
  state: () => ({
    layout: "DefaultLayout",
    menuItems: [
      { name: "home", title: "Главная", icon: "Grid" },
      { name: "users", title: "Пользователи", icon: "Avatar" },
      { name: "categories", title: "Категории", icon: "Key" },
      { name: "images", title: "Изображения", icon: "Picture" },
    ],
  }),

  actions: {
    setLayout(newLayout) {
      this.layout = newLayout
    },
  },
})
