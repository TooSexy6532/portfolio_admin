import axios from "@/api/axios"

export const AuthApi = {
  /* Функция, которая используется для входа пользователя. */
  login: async (data) => {
    try {
      const response = await axios({
        url: "/api/login",
        method: "POST",
        data,
      })

      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message)
    }
  },

  /* Получение данных пользователя. */
  getMe: async () => {
    try {
      const response = await axios({
        url: "/api/me",
        method: "GET",
      })

      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message)
    }
  },

  /* Функция, которая используется для выхода пользователя из системы. */
  logout: async (data) => {
    try {
      const response = await axios({
        url: "/api/logout",
        method: "POST",
        data,
      })

      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message)
    }
  },
}
