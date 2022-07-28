<script setup>
import { useCategoriesStore } from "@/stores"
import { ref } from "vue"
import AppPageHeader from "../components/AppPageHeader.vue"
import AppPagination from "../components/AppPagination.vue"
import CategoryForm from "../components/forms/CategoryForm.vue"

const store = useCategoriesStore()

store.getItems()

const showModal = ref(false)

const closeModal = () => {
  store.resetModel()
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

const handleEdit = (item) => {
  const clone = JSON.parse(JSON.stringify(item))
  store.setModel(clone)
  store.isEditing = true
  openModal()
}

const handleDelete = (user) => {
  store.deleteItem(user._id)
}
</script>

<template>
  <AppPageHeader title="Категории" />

  <el-dialog
    v-model="showModal"
    title="Создание и редактирование категории"
    @closed="closeModal"
  >
    <CategoryForm @done="closeModal" />
  </el-dialog>

  <el-divider />

  <div class="mb-10">
    <el-button icon="MagicStick" @click="openModal">
      Создать категорию
    </el-button>
  </div>

  <el-table :data="paginatedList.value" style="width: 100%">
    <el-table-column prop="name" label="Название" />
    <el-table-column prop="description" label="Описание" />
    <el-table-column label="Operations">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.row)">Edit</el-button>

        <el-popconfirm
          confirm-button-text="Да"
          cancel-button-text="Нет"
          icon="InfoFilled"
          icon-color="#626AEF"
          title="Вы уверены что хотите удалить пользователя?"
          @confirm="handleDelete(scope.row)"
        >
          <template #reference>
            <el-button size="small" type="danger"> Delete</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>

  <AppPagination
    v-if="!store.isLoadingItems"
    :list="store.items"
    @paginated="setPaginatedList"
  />
</template>
