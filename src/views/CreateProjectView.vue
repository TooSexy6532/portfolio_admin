<script setup>
import { useCategoriesStore, useProjectsStore } from "@/stores"
import { computed, ref } from "vue"
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router"
import AppPageHeader from "../components/AppPageHeader.vue"
import ImagesModal from "../components/modals/ImagesModal.vue"
import TextEditor from "../components/TextEditor.vue"

const categoriesStore = useCategoriesStore()
const store = useProjectsStore()
const route = useRoute()
const router = useRouter()

categoriesStore.getItems()

if (route.name === "edit-project" && !store.model._id) {
  router.push({ name: "projects" })
}

onBeforeRouteLeave((to, from) => {
  store.resetModel()
})

const categoriesOptions = computed(() => {
  return categoriesStore.items.map((item) => {
    return {
      value: item._id,
      label: item.name,
    }
  })
})

const submit = async () => {
  if (route.name === "create-project") {
    try {
      await store.createItem()

      router.push({ name: "projects" })
    } catch (error) {
      console.log(error)
    }
  } else {
    try {
      await store.updateItem()

      router.push({ name: "projects" })
    } catch (error) {
      console.log(error)
    }
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
  store.model[setImageType.value] = image.url
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
        <el-image :src="store.model.previewImage" class="w-60 h-36" />
      </div>
    </el-col>

    <el-col :span="11" :offset="2">
      <h2 class="font-semibold mb-5">Главная картинка проекта</h2>
      <div @click="openSetImageModal('heroImage')" class="cursor-pointer w-fit">
        <el-image :src="store.model.heroImage" class="w-60 h-36" />
      </div>
    </el-col>
  </el-row>

  <el-row class="mt-10">
    <el-col :span="11">
      Заголовок:
      <el-input v-model="store.model.title" />
    </el-col>

    <el-col :span="11" :offset="2">
      Алиас:
      <el-input v-model="store.model.alias" />
    </el-col>
  </el-row>

  <el-row class="mt-5">
    <el-col :span="24">
      Краткое описание:
      <el-input v-model="store.model.description" type="textarea" />
    </el-col>
  </el-row>

  <el-row class="mt-5">
    <el-col :span="11">
      Категория проекта:
      <el-select-v2
        v-model="store.model.category"
        :options="categoriesOptions"
        placeholder="Please select"
        style="width: 240px"
        multiple
        collapse-tags
        collapse-tags-tooltip
        clearable
      />
    </el-col>

    <el-col :span="11" :offset="2">
      Показывать на главной:
      <el-checkbox v-model="store.model.showOnMainPage" />
    </el-col>
  </el-row>

  <el-divider />

  <el-row class="">
    <el-col :span="24">
      <h2 class="font-semibold mb-5">Основной контент проекта</h2>
      <TextEditor v-model:content="store.model.content" />
    </el-col>
  </el-row>

  <el-button type="success" class="mt-5" @click="submit()">
    {{ route.name === "create-project" ? "Создать" : "Сохранить" }}
  </el-button>
</template>
