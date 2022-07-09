import axios from "@/api/axios"

export const AuthApi = {
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
