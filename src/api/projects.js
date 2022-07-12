import axios from "@/api/axios"

export const ProjectsApi = {
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
