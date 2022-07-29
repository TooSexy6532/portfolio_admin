import axios from "@/api/axios"

export const UsersApi = {
  /* Получение пользователей. */
  getUsers: async () => {
    try {
      const response = await axios({
        url: "/api/users",
        method: "GET",
      })

      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message)
    }
  },

  /* Создание нового пользователя. */
  createUser: async (data) => {
    try {
      const response = await axios({
        url: "/api/user",
        method: "POST",
        data,
      })

      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message)
    }
  },

  /* Обновление пользователя. */
  updateUser: async (data) => {
    try {
      const response = await axios({
        url: "/api/user",
        method: "PUT",
        data,
      })

      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message)
    }
  },

  /* Удаление пользователя. */
  deleteUser: async (data) => {
    try {
      const response = await axios({
        url: "/api/user",
        method: "DELETE",
        data,
      })

      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message)
    }
  },
}
