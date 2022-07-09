<script setup>
import { ElMessage } from "element-plus"
import { ref } from "vue"
import AppPageHeader from "../components/AppPageHeader.vue"
import AppPagination from "../components/AppPagination.vue"
import AppFormModal from "../components/modals/AppFormModal.vue"
import { useUsersStore } from "../stores"

const showModal = ref(false)

const closeModal = () => {
  store.resetUserModel()
  store.resetCreateError()
  showModal.value = false
  store.isEditing = false
}

const openModal = () => {
  showModal.value = true
}

let paginatedList = ref([])

const setPaginatedList = (newList) => {
  paginatedList.value = newList
}

const store = useUsersStore()

store.getUsers()

const handleEdit = (user) => {
  const clone = JSON.parse(JSON.stringify(user))
  store.setUserModel(clone)
  store.isEditing = true
  openModal()
}

const handleDelete = async (user) => {
  const { error } = await store.deleteUser(user._id)
  if (error) {
    showMessage(error, "error")
  } else {
    showMessage("Пользователь успешно удален", "success")
  }
}

const showMessage = (message, type) => {
  ElMessage({
    message,
    type,
  })
}
</script>

<template>
  <AppPageHeader />

  <AppFormModal
    form="UserForm"
    title="Создание и редактирование пользователя"
    :showModal="showModal"
    @closed="closeModal"
  />

  <el-divider />

  <div v-loading.fullscreen.lock="store.isLoadingUsers">
    <el-button icon="MagicStick" @click="openModal">
      Создать пользователя
    </el-button>
  </div>

  <el-table :data="paginatedList.value" style="width: 100%" height="700">
    <el-table-column prop="firstname" label="Имя" />
    <el-table-column prop="email" label="Email" />
    <el-table-column prop="role" label="Роль" />
    <el-table-column label="Operations">
      <template #default="scope">
        <el-button size="small" @click="handleChangePassword(scope.row)">
          Change password
        </el-button>

        <el-button size="small" @click="handleEdit(scope.row)">Edit</el-button>

        <el-button size="small" type="danger" @click="handleDelete(scope.row)">
          Delete
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <AppPagination
    v-if="!store.isLoadingUsers"
    :list="store.users"
    @paginated="setPaginatedList"
  />
</template>
