import axios from "@/api/axios"

export const UsersApi = {
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
