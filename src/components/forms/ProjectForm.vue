<script setup>
import { useCategoriesStore, useProjectsStore } from "@/stores"
import { storeToRefs } from "pinia"
import { computed, reactive, ref } from "vue"
import ImagesModal from "../modals/ImagesModal.vue"
import TextEditor from "../TextEditor.vue"

const props = defineProps({
  buttonTitle: String,
})

const emit = defineEmits(["submitForm"])

const categoriesStore = useCategoriesStore()
const projectStore = useProjectsStore()

categoriesStore.getItems()

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

const form = ref()

const { model } = storeToRefs(projectStore)

const rules = reactive({
  title: [
    {
      required: true,
      message: "Введите заголовок",
      trigger: "blur",
    },
  ],
  alias: [
    {
      required: true,
      message: "Введите alias. Помните, он должен быть уникальным",
      trigger: "blur",
    },
  ],
  category: [
    {
      required: true,
      message: "Выберите категорию проекта",
      trigger: "blur",
    },
  ],
})

const showSetImageModal = ref(false)

const setImageType = ref("")

const openSetImageModal = (prefsType) => {
  setImageType.value = prefsType
  showSetImageModal.value = true
}

const closeSetImageModal = () => {
  showSetImageModal.value = false
  setImageType.value = ""
}

const setMainImage = (image) => {
  projectStore.model[setImageType.value] = image.url
  closeSetImageModal()
}

const submitForm = async (formEl) => {
  if (!formEl) return

  await formEl.validate(async (valid) => {
    if (valid) {
      emit("submitForm")
    } else {
      return false
    }
  })
}
</script>

<template>
  <el-dialog v-model="showSetImageModal" title="Выберите изображение">
    <ImagesModal @set-image="setMainImage" />
  </el-dialog>

  <el-form
    ref="form"
    label-position="top"
    label-width="100px"
    :model="model"
    :rules="rules"
  >
    <el-row class="">
      <el-col :span="11">
        <el-form-item prop="previewImage" label="Превью">
          <div
            @click="openSetImageModal('previewImage')"
            class="cursor-pointer w-fit"
          >
            <el-image :src="model.previewImage" class="w-60 h-36" />
          </div>
        </el-form-item>
      </el-col>

      <el-col :span="11" :offset="2">
        <el-form-item prop="heroImage" label="Превью">
          <div
            @click="openSetImageModal('heroImage')"
            class="cursor-pointer w-fit"
          >
            <el-image :src="model.heroImage" class="w-60 h-36" />
          </div>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row class="mt-10">
      <el-col :span="11">
        <el-form-item prop="title" label="Заголовок">
          <el-input v-model="model.title" />
        </el-form-item>
      </el-col>

      <el-col :span="11" :offset="2">
        <el-form-item prop="alias" label="Алиас">
          <el-input v-model="model.alias" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row class="mt-5">
      <el-col :span="24">
        <el-form-item prop="description" label="Краткое описание">
          <el-input v-model="model.description" type="textarea" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row class="mt-5">
      <el-col :span="11">
        <el-form-item prop="category" label="Категория проекта">
          <el-select-v2
            v-if="categoriesOptions?.length"
            v-model="model.category"
            :options="categoriesOptions"
            placeholder="Please select"
            style="width: 240px"
            clearable
          />
        </el-form-item>
      </el-col>

      <el-col :span="11" :offset="2">
        <el-form-item prop="showOnMainPage" label="Показывать на главной">
          <el-checkbox v-model="model.showOnMainPage" disabled />
        </el-form-item>
      </el-col>
    </el-row>

    <el-divider />

    <el-row class="">
      <el-col :span="24">
        <el-form-item prop="content" label="Основной контент проекта">
          <TextEditor v-model:content="model.content" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>

  <el-button type="success" class="mt-5" @click="submitForm(form)">
    {{ buttonTitle }}
  </el-button>
</template>
