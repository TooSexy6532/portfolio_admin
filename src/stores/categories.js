import { CategoriesApi } from "@/api"
import { defineStore } from "pinia"

export const useCategoriesStore = defineStore("categories", {
  state: () => ({
    model: {
      name: "",
      description: "",
    },
    isLoadingItems: false,
    isCreateItem: false,
    isEditing: false,
    items: [],
    error: null,
  }),

  actions: {
    resetModel() {
      this.model = {
        name: "",
        description: "",
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
        this.isCreateItem ? null : (this.isLoadingItems = true)

        const { categories } = await CategoriesApi.getCategories()

        this.items = categories

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
        await CategoriesApi.createCategory(this.model)

        await this.getItems()

        this.isCreateItem = false

        this.resetModel()
        return
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
        const { message } = await CategoriesApi.updateCategory(this.model)

        await this.getItems()

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
      this.isCreateItem = true
      try {
        await CategoriesApi.deleteCategory({ _id })
        await this.getItems()
        this.isCreateItem = false
        return { error: null }
      } catch (error) {
        this.isCreateItem = false
        return { error }
      }
    },
  },
})
