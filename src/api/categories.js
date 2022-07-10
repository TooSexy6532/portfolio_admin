import axios from "@/api/axios"

export const CategoriesApi = {
  getCategories: async (params) => {
    try {
      const response = await axios({
        url: "/api/categories",
        method: "GET",
        params,
      })

      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message)
    }
  },

  getCategory: async (params) => {
    try {
      const response = await axios({
        url: "/api/category",
        method: "GET",
        params,
      })

      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message)
    }
  },

  createCategory: async (data) => {
    try {
      const response = await axios({
        url: "/api/category",
        method: "POST",
        data,
      })

      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message)
    }
  },

  updateCategory: async (data) => {
    try {
      const response = await axios({
        url: "/api/category",
        method: "PUT",
        data,
      })

      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message)
    }
  },

  deleteCategory: async (data) => {
    try {
      const response = await axios({
        url: "/api/category",
        method: "DELETE",
        data,
      })

      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message)
    }
  },
}
