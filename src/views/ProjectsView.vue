<script setup>
import { useProjectsStore } from "@/stores"
import { ref } from "vue"
import { useRouter } from "vue-router"
import AppPageHeader from "../components/AppPageHeader.vue"
import AppPagination from "../components/AppPagination.vue"

const router = useRouter()

const store = useProjectsStore()

store.getItems()

let paginatedList = ref([])

const setPaginatedList = (newList) => {
  paginatedList.value = newList
}

const handleEdit = (item) => {
  const clone = JSON.parse(JSON.stringify(item))
  store.setModel(clone)
  router.push({ name: "edit-project" })
}

const handleDelete = (user) => {
  store.deleteItem(user._id)
}
</script>

<template>
  <AppPageHeader title="Проекты" />

  <el-divider />

  <el-button
    icon="Plus"
    @click="router.push({ name: 'create-project' })"
    class="mb-5"
  >
    Добавить проект
  </el-button>

  <el-table :data="paginatedList.value" style="width: 100%">
    <el-table-column prop="title" label="Заголовок" />
    <el-table-column prop="description" label="Описание" />
    <el-table-column label="Operations">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.row)">Edit</el-button>

        <el-popconfirm
          confirm-button-text="Да"
          cancel-button-text="Нет"
          icon="InfoFilled"
          icon-color="#626AEF"
          title="Вы уверены что хотите удалить проект?"
          @confirm="handleDelete(scope.row)"
        >
          <template #reference>
            <el-button size="small" type="danger"> Delete </el-button>
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
