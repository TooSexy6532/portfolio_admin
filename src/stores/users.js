import { UsersApi } from "@/api"
import { defineStore } from "pinia"

export const useUsersStore = defineStore("users", {
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
    error: null,
    createError: null,
  }),

  actions: {
    resetUserModel() {
      this.userModel = {
        email: "",
        password: "",
        role: "",
        firstname: "",
      }
    },

    resetCreateError() {
      this.createError = null
    },

    setUserModel(model) {
      this.userModel = model
    },

    async getUsers() {
      try {
        this.isCreateUser ? null : (this.isLoadingUsers = true)

        const users = await UsersApi.getUsers()

        this.users = users

        this.isLoadingUsers = false
      } catch (error) {
        this.error = error
        this.isLoadingUsers = false
      }
    },

    async createUser() {
      this.resetCreateError()
      this.isCreateUser = true

      try {
        await UsersApi.createUser(this.userModel)

        await this.getUsers()

        this.isCreateUser = false

        this.resetUserModel()
        return { error: null }
      } catch (error) {
        this.createError = error
        this.isCreateUser = false
        return { error }
      }
    },

    async updateUser() {
      this.resetCreateError()
      this.isCreateUser = true

      try {
        const { message } = await UsersApi.updateUser(this.userModel)

        await this.getUsers()

        this.isCreateUser = false

        this.resetUserModel()
        return { error: null, message }
      } catch (error) {
        this.createError = error
        this.isCreateUser = false
        return { error }
      }
    },

    async deleteUser(_id) {
      this.isCreateUser = true
      try {
        await UsersApi.deleteUser({ _id })
        await this.getUsers()
        this.isCreateUser = false
        return { error: null }
      } catch (error) {
        this.isCreateUser = false
        return { error }
      }
    },
  },
})
