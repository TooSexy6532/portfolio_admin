import { UsersApi } from "@/api"
import { defineStore } from "pinia"
import { useMessagesStore } from "@/stores/index"

export default defineStore("users", {
  state: () => ({
    userModel: {
      email: "",
      password: "",
      role: "",
      firstname: "",
    },
    isLoadingUsers: false,
    isCreateUser: false,
    isEditing: false,
    users: [],
  }),

  actions: {
    setMessage({ message, status }) {
      const messageStore = useMessagesStore()
      messageStore.setMessage({ message, status })
    },

    resetUserModel() {
      this.userModel = {
        email: "",
        password: "",
        role: "",
        firstname: "",
      }
    },

    setUserModel(model) {
      this.userModel = model
    },

    async getUsers() {
      try {
        if (this.isCreateUser) {
          this.isLoadingUsers = true
        }

        const { users } = await UsersApi.getUsers()

        this.users = users

        this.isLoadingUsers = false
      } catch (error) {
        this.setMessage({ message: error.message, status: "error" })
        this.isLoadingUsers = false
      }
    },

    async createUser() {
      this.isCreateUser = true

      try {
        const { message } = await UsersApi.createUser(this.userModel)

        if (message) this.setMessage({ message, status: "success" })

        await this.getUsers()

        this.isCreateUser = false

        this.resetUserModel()
        return { error: null }
      } catch (error) {
        this.setMessage({ message: error.message, status: "error" })
        this.isCreateUser = false
      }
    },

    async updateUser() {
      this.isCreateUser = true

      try {
        const { message } = await UsersApi.updateUser(this.userModel)

        if (message) this.setMessage({ message, status: "success" })

        await this.getUsers()

        this.isCreateUser = false

        this.resetUserModel()
        return { error: null }
      } catch (error) {
        this.setMessage({ message: error.message, status: "error" })
        this.isCreateUser = false
      }
    },

    async deleteUser(_id) {
      this.isCreateUser = true
      try {
        const { message } = await UsersApi.deleteUser({ _id })

        if (message) this.setMessage({ message, status: "success" })

        await this.getUsers()

        this.isCreateUser = false
      } catch (error) {
        this.setMessage({ message: error.message, status: "error" })
        this.isCreateUser = false
      }
    },
  },
})
