<script setup>
import { useCategoriesStore, useProjectsStore } from "@/stores"
import { computed, ref } from "vue"
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router"
import AppPageHeader from "../components/AppPageHeader.vue"
import ImagesModal from "../components/modals/ImagesModal.vue"
import TextEditor from "../components/TextEditor.vue"

const categoriesStore = useCategoriesStore()
const projectStore = useProjectsStore()
const route = useRoute()
const router = useRouter()

categoriesStore.getItems()

if (route.name === "edit-project" && !projectStore.model._id) {
  router.push({ name: "projects" })
}

onBeforeRouteLeave(() => {
  projectStore.resetModel()
})

const categoriesOptions = computed(() => {
  if (!categoriesStore.items.length) {
    return []
  }
  return categoriesStore.items.map((item) => {
    return {
      value: item._id,
      label: item.name,
    }
  })
})

const submit = async () => {
  if (route.name === "create-project") {
    await projectStore.createItem()
    await router.push({ name: "projects" })
  } else {
    await projectStore.updateItem()
    await router.push({ name: "projects" })
  }
}

const showSetImageModal = ref(false)

const setImageType = ref("")

const openSetImageModal = (prefsType) => {
  setImageType.value = prefsType
  showSetImageModal.value = ""
}

const closeSetImageModal = () => {
  showSetImageModal.value = false
  setImageType.value = ""
}

const setMainImage = (image) => {
  projectStore.model[setImageType.value] = image.url
  closeSetImageModal()
}
</script>

<template>
  <AppPageHeader
    :title="
      route.name === 'create-project'
        ? 'Создать проект'
        : 'Редактировать проект'
    "
  />

  <el-dialog v-model="showSetImageModal" title="Выберите изображение">
    <ImagesModal @set-image="setMainImage" />
  </el-dialog>

  <el-divider />

  <el-row class="">
    <el-col :span="11">
      <h2 class="font-semibold mb-5">Превью</h2>
      <div
        @click="openSetImageModal('previewImage')"
        class="cursor-pointer w-fit"
      >
        <el-image :src="projectStore.model.previewImage" class="w-60 h-36" />
      </div>
    </el-col>

    <el-col :span="11" :offset="2">
      <h2 class="font-semibold mb-5">Главная картинка проекта</h2>
      <div @click="openSetImageModal('heroImage')" class="cursor-pointer w-fit">
        <el-image :src="projectStore.model.heroImage" class="w-60 h-36" />
      </div>
    </el-col>
  </el-row>

  <el-row class="mt-10">
    <el-col :span="11">
      Заголовок:
      <el-input v-model="projectStore.model.title" />
    </el-col>

    <el-col :span="11" :offset="2">
      Алиас:
      <el-input v-model="projectStore.model.alias" />
    </el-col>
  </el-row>

  <el-row class="mt-5">
    <el-col :span="24">
      Краткое описание:
      <el-input v-model="projectStore.model.description" type="textarea" />
    </el-col>
  </el-row>

  <el-row class="mt-5">
    <el-col :span="11">
      Категория проекта:
      <el-select-v2
        v-if="categoriesOptions?.length"
        v-model="projectStore.model.category"
        :options="categoriesOptions"
        placeholder="Please select"
        style="width: 240px"
        clearable
      />
    </el-col>

    <el-col :span="11" :offset="2">
      Показывать на главной:
      <el-checkbox v-model="projectStore.model.showOnMainPage" />
    </el-col>
  </el-row>

  <el-divider />

  <el-row class="">
    <el-col :span="24">
      <h2 class="font-semibold mb-5">Основной контент проекта</h2>
      <TextEditor v-model:content="projectStore.model.content" />
    </el-col>
  </el-row>

  <el-button type="success" class="mt-5" @click="submit()">
    {{ route.name === "create-project" ? "Создать" : "Сохранить" }}
  </el-button>
</template>
