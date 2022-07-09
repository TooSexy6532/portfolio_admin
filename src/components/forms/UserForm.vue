<script setup>
import { useUsersStore } from "@/stores"
import { onKeyUp } from "@vueuse/core"
import { ElMessage } from "element-plus"
import { storeToRefs } from "pinia"
import { reactive, ref } from "vue"
// Элемент формы
const store = useUsersStore()

const formRef = ref()

const passwordRule = [
  {
    required: true,
    message: "Введите пароль",
    trigger: "blur",
  },
]

const formRules = reactive({
  email: [
    {
      required: true,
      message: "Введите email",
      trigger: "blur",
    },
    {
      type: "email",
      message: "Вы ввели неккоректный email",
      trigger: ["blur"],
    },
  ],
  password: store.isEditing ? null : passwordRule,
  role: [
    {
      required: true,
      message: "выберите роль",
      trigger: "blur",
    },
  ],
})

const emit = defineEmits(["done"])

const { userModel } = storeToRefs(store)

const submitForm = async (formEl) => {
  if (!formEl) return

  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const { error, message } = store.isEditing
        ? await store.updateUser()
        : await store.createUser()
      if (!error) {
        showMessage(message || "Пользователь успешно создан", "success")
        emit("done")
      } else {
        showMessage(error, "error")
      }
    } else {
      return false
    }
  })
}

const showMessage = (message, type) => {
  ElMessage({
    message,
    type,
  })
}

onKeyUp("Enter", (event) => {
  submitForm(formRef)
})

const options = [
  {
    value: "Administrator",
    label: "Администратор",
  },
]
</script>

<template>
  <el-form
    ref="formRef"
    label-position="top"
    label-width="100px"
    :model="userModel"
    :rules="formRules"
  >
    <el-form-item prop="email" label="Email">
      <el-input v-model="userModel.email" />
    </el-form-item>

    <el-form-item v-if="!store.isEditing" prop="password" label="Пароль">
      <el-input v-model="userModel.password" />
    </el-form-item>

    <el-form-item prop="role" label="Роль">
      <el-select-v2
        v-model="userModel.role"
        :options="options"
        placeholder="Выберите роль"
      />
    </el-form-item>

    <el-form-item prop="firstname" label="Имя">
      <el-input v-model="userModel.firstname" />
    </el-form-item>
  </el-form>

  <template v-if="store.createError">
    <el-alert :title="store.createError" type="error" />
  </template>

  <el-button
    :loading="store.isCreateUser"
    type="primary"
    @click="submitForm(formRef)"
    class="mt-4"
  >
    {{ store.isEditing ? "Редактировать пользователя" : "Создать пользовтеля" }}
  </el-button>
</template>
