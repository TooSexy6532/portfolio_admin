import { ProjectsApi } from "@/api"
import { defineStore } from "pinia"

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
    error: null,
  }),

  actions: {
    resetModel() {
      this.model = {
        title: "",
        description: "",
        alias: "",
        content: "",
      }
    },

    resetError() {
      this.error = null
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
        this.error = error
        this.isLoadingItems = false
      }
    },

    async createItem() {
      this.resetError()
      this.isCreateItem = true

      try {
        const { message } = await ProjectsApi.createProject(this.model)

        this.isCreateItem = false

        this.resetModel()
        return { message }
      } catch (error) {
        this.error = error
        this.isCreateItem = false
        return { error }
      }
    },

    async updateItem() {
      this.resetError()
      this.isCreateItem = true

      try {
        const { message } = await ProjectsApi.updateProject(this.model)

        this.isCreateItem = false

        this.resetModel()
        return { message }
      } catch (error) {
        this.error = error
        this.isCreateItem = false
        return { error }
      }
    },

    async deleteItem(_id) {
      try {
        const { message } = await ProjectsApi.deleteProject({ _id })
        await this.getItems()
        return { message }
      } catch (error) {
        return { error }
      }
    },
  },
})
