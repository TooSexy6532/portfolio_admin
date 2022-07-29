import axios from "@/api/axios"

export const ImagesApi = {
  /* Получение изображений из базы данных */
  getImages: async () => {
    try {
      const response = await axios({
        url: "/api/images",
        method: "GET",
      })

      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message)
    }
  },

  /* Удаление изображения из базы данных. */
  deleteImage: async (data) => {
    try {
      const response = await axios({
        url: "/api/image",
        method: "DELETE",
        data,
      })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message)
    }
  },
}
