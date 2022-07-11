import axios from "@/api/axios"

export const PreferencesApi = {
  getPreferences: async () => {
    try {
      const response = await axios({
        url: "/api/preferences",
        method: "GET",
      })

      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message)
    }
  },

  updatePreferences: async (data) => {
    try {
      const response = await axios({
        url: "/api/preferences",
        method: "PUT",
        data,
      })

      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message)
    }
  },
}
