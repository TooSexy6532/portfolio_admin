import axios from "@/api/axios"

export const ProjectsApi = {
  /* Получение проектов */
  getProjects: async (params) => {
    try {
      const response = await axios({
        url: "/api/projects",
        method: "GET",
        params,
      })

      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message)
    }
  },

  /* Получение проекта */
  getProject: async (params) => {
    try {
      const response = await axios({
        url: "/api/project",
        method: "GET",
        params,
      })

      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message)
    }
  },

  /* Создание нового проекта. */
  createProject: async (data) => {
    try {
      const response = await axios({
        url: "/api/project",
        method: "POST",
        data,
      })

      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message)
    }
  },

  /* Обновление проекта. */
  updateProject: async (data) => {
    try {
      const response = await axios({
        url: "/api/project",
        method: "PUT",
        data,
      })

      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message)
    }
  },

  /* Удаление проекта. */
  deleteProject: async (data) => {
    try {
      const response = await axios({
        url: "/api/project",
        method: "DELETE",
        data,
      })

      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message)
    }
  },
}
