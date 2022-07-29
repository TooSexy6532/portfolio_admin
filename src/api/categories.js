import axios from "@/api/axios"

export const CategoriesApi = {
  /* Получение категорий из базы данных*/
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

  /* Функция, которая используется для получения категории из базы данных. */
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

  /* Создание новой категории. */
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

  /* Обновление категории. */
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

  /* Удаление категории. */
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
