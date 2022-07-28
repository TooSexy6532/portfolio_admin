import { defineStore } from "pinia"

export default defineStore("prefs", {
  state: () => ({
    layout: "DefaultLayout",
    menuItems: [
      { name: "home", title: "Главная", icon: "Grid" },
      { name: "users", title: "Пользователи", icon: "Avatar" },
      { name: "categories", title: "Категории", icon: "Key" },
      { name: "images", title: "Изображения", icon: "Picture" },
      {
        name: "allprojects",
        title: "Проекты",
        icon: "Expand",
        type: "submenu",
        submenus: [
          { name: "projects", title: "Все Проекты", icon: "DocumentCopy" },
          {
            name: "create-project",
            title: "Создать проект",
            icon: "DocumentAdd",
          },
        ],
      },
    ],
  }),

  actions: {
    setLayout(newLayout) {
      this.layout = newLayout
    },
  },
})
