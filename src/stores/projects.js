import { ProjectsApi } from "@/api"
import { defineStore } from "pinia"
import { useMessagesStore } from "."

export default defineStore("projects", {
  state: () => ({
    model: {
      title: "",
      description: "",
      alias: "",
      content: "",
      previewImage: "",
      heroImage: "",
      showOnMainPage: "",
      category: "",
    },
    isLoadingItems: false,
    isCreateItem: false,
    items: [],
  }),

  actions: {
    setMessage({ message, status }) {
      const messageStore = useMessagesStore()
      messageStore.setMessage({ message, status })
    },

    resetModel() {
      this.model = {
        title: "",
        description: "",
        alias: "",
        content: "",
        previewImage: "",
        heroImage: "",
        showOnMainPage: "",
        category: "",
      }
    },

    setModel(model) {
      this.model = model
    },

    async getItems() {
      try {
        this.isLoadingItems

        const { projects } = await ProjectsApi.getProjects()

        this.items = projects

        this.isLoadingItems = false
      } catch (error) {
        this.setMessage({ message: error.message, status: "error" })
        this.isLoadingItems = false
      }
    },

    async createItem() {
      this.isCreateItem = true

      try {
        const { message } = await ProjectsApi.createProject(this.model)

        if (message) this.setMessage({ message, status: "success" })

        this.isCreateItem = false

        this.resetModel()

        return true
      } catch (error) {
        this.setMessage({ message: error.message, status: "error" })
        this.isCreateItem = false
      }
    },

    async updateItem() {
      this.isCreateItem = true

      try {
        const { message } = await ProjectsApi.updateProject(this.model)

        if (message) this.setMessage({ message, status: "success" })

        this.isCreateItem = false

        this.resetModel()

        return true
      } catch (error) {
        this.setMessage({ message: error.message, status: "error" })
        this.isCreateItem = false
      }
    },

    async deleteItem(_id) {
      try {
        const { message } = await ProjectsApi.deleteProject({ _id })

        if (message) this.setMessage({ message, status: "success" })

        await this.getItems()
      } catch (error) {
        this.setMessage({ message: error.message, status: "error" })
      }
    },
  },
})
