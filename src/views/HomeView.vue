<script setup>
import { PreferencesApi } from "@/api"
import { ref } from "vue"
import AppPageHeader from "../components/AppPageHeader.vue"
import ImagesModal from "../components/modals/ImagesModal.vue"
import TextEditor from "../components/TextEditor.vue"

const prefs = ref(null)

async function init() {
  const data = await PreferencesApi.getPreferences()
  prefs.value = data.preferences
}

const isUpadating = ref(false)

async function updatePrefs() {
  isUpadating.value = true
  const { message } = await PreferencesApi.updatePreferences({
    ...prefs.value,
  })
  isUpadating.value = false
}

init()

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
  prefs.value[setImageType.value] = image.url
  updatePrefs()
  closeSetImageModal()
}
</script>

<template>
  <AppPageHeader title="Общие настройки" />

  <el-dialog v-model="showSetImageModal" title="Выберите изображение">
    <ImagesModal @set-image="setMainImage" />
  </el-dialog>

  <el-row class="mt-20">
    <el-col :span="12">
      <h2 class="font-semibold mb-5">Картинка на главной</h2>
      <div @click="openSetImageModal('mainImage')" class="cursor-pointer w-fit">
        <el-image :src="prefs?.mainImage" class="w-60 h-36" />
      </div>
    </el-col>
  </el-row>

  <el-divider />

  <el-row class="">
    <el-col :span="12">
      <h2 class="font-semibold mb-5">Картинка на странице обо мне</h2>
      <div
        @click="openSetImageModal('aboutImage')"
        class="cursor-pointer w-fit"
      >
        <el-image :src="prefs?.aboutImage" class="w-60 h-36" />
      </div>
    </el-col>
  </el-row>

  <el-divider />

  <el-row class="" v-if="prefs">
    <el-col :span="24">
      <h2 class="font-semibold mb-5">Текст на странице обо мне</h2>
      <TextEditor v-model:content="prefs.aboutContent" />
      <el-button
        :loading="isUpadating"
        type="success"
        class="mt-5"
        @click="updatePrefs()"
      >
        Сохранить
      </el-button>
    </el-col>
  </el-row>
</template>
