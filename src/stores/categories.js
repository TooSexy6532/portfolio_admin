import { CategoriesApi } from "@/api"
import { defineStore } from "pinia"
import { useMessagesStore } from "@/stores/index"

export default defineStore("categories", {
  state: () => ({
    model: {
      name: "",
      description: "",
    },
    isLoadingItems: false,
    isCreateItem: false,
    isEditing: false,
    items: [],
  }),

  actions: {
    setMessage({ message, status }) {
      const messageStore = useMessagesStore()

      messageStore.setMessage({ message, status })
    },

    resetModel() {
      this.model = {
        name: "",
        description: "",
      }
    },

    setModel(model) {
      this.model = model
    },

    async getItems() {
      try {
        if (!this.isCreateItem) {
          this.isLoadingItems = true
        }

        const { categories } = await CategoriesApi.getCategories()

        this.items = categories

        this.isLoadingItems = false
      } catch (error) {
        this.isLoadingItems = false
      }
    },

    async createItem() {
      this.isCreateItem = true

      try {
        const { message } = await CategoriesApi.createCategory(this.model)
        if (message) this.setMessage({ message, status: "success" })

        await this.getItems()

        this.isCreateItem = false

        this.resetModel()
      } catch (error) {
        this.setMessage({ message: error.message, status: "error" })
        this.isCreateItem = false
      }
    },

    async updateItem() {
      this.isCreateItem = true

      try {
        const { message } = await CategoriesApi.updateCategory(this.model)

        if (message) this.setMessage({ message, status: "success" })

        await this.getItems()

        this.isCreateItem = false

        this.resetModel()
      } catch (error) {
        this.setMessage({ message: error, status: "error" })
        this.isCreateItem = false
      }
    },

    async deleteItem(_id) {
      this.isCreateItem = true
      try {
        const { message } = await CategoriesApi.deleteCategory({ _id })

        if (message) this.setMessage({ message, status: "success" })

        await this.getItems()

        this.isCreateItem = false
      } catch (error) {
        this.setMessage({ message: error, status: "error" })
        this.isCreateItem = false
      }
    },
  },
})
