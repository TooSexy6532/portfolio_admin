<script setup>
import { useCategoriesStore } from "@/stores"
import { onKeyUp } from "@vueuse/core"
import { storeToRefs } from "pinia"
import { reactive, ref } from "vue"

const store = useCategoriesStore()

const formRef = ref()

const formRules = reactive({
  name: [
    {
      required: true,
      message: "Введите название категории",
      trigger: "blur",
    },
  ],
})

const emit = defineEmits(["done"])

const { model } = storeToRefs(store)

const submitForm = async (formEl) => {
  if (!formEl) return

  await formEl.validate(async (valid) => {
    if (valid) {
      const data = store.isEditing
        ? await store.updateItem()
        : await store.createItem()

      if (!data?.error) {
        emit("done")
      }
    }
  })
}

onKeyUp("Enter", () => {
  submitForm(formRef)
})
</script>

<template>
  <el-form
    ref="formRef"
    label-position="top"
    label-width="100px"
    :model="model"
    :rules="formRules"
  >
    <el-form-item prop="name" label="Название">
      <el-input v-model="model.name" />
    </el-form-item>

    <el-form-item prop="description" label="Описание">
      <el-input :rows="2" type="textarea" v-model="model.description" />
    </el-form-item>
  </el-form>

  <template v-if="store.error">
    <el-alert :title="store.error" type="error" />
  </template>

  <el-button
    :loading="store.isCreateItem"
    type="primary"
    @click="submitForm(formRef)"
    class="mt-4"
  >
    {{ store.isEditing ? "Редактировать категорию" : "Создать категорию" }}
  </el-button>
</template>
