<script setup>
import { useAuthStore } from "@/stores"
import { ElMessage } from "element-plus"
import { reactive, ref } from "vue"

// Элемент формы
const loginFormRef = ref()

// Модель формы
const loginForm = reactive({
  email: "",
  password: "",
})

// Правила валидации
const loginFormRules = reactive({
  email: [
    {
      required: true,
      message: "Введите email",
      trigger: "blur",
    },
    {
      type: "email",
      message: "Вы ввели неккоректный email",
      trigger: ["blur", "change"],
    },
  ],
  password: [
    {
      required: true,
      message: "Ввежите пароль",
      trigger: "blur",
    },
  ],
})

// Подключаем стор аутентификации
const store = useAuthStore()

const successMessage = () => {
  ElMessage({
    message: store.loginSuccess,
    type: "success",
  })
}
// Регистрация событий компонента
const emit = defineEmits(["submitForm"])

// Валидация и эмит сабмита
const submitForm = async (formEl) => {
  if (!formEl) return

  await formEl.validate(async (valid, fields) => {
    if (valid) {
      emit("submitForm", loginForm)
    } else {
      return false
    }
  })
}
</script>

<template>
  <el-form
    ref="loginFormRef"
    label-position="top"
    label-width="100px"
    :model="loginForm"
    :rules="loginFormRules"
  >
    <el-form-item prop="email" label="Email">
      <el-input v-model="loginForm.email" />
    </el-form-item>

    <el-form-item prop="password" label="Пароль">
      <el-input v-model="loginForm.password" />
    </el-form-item>
  </el-form>

  <template v-if="store.loginErrors.length">
    <el-alert
      v-for="error in store.loginErrors"
      :key="error"
      :title="error"
      type="error"
    />
  </template>

  <el-button
    :loading="store.isLoading"
    type="primary"
    @click="submitForm(loginFormRef)"
    class="mt-4"
  >
    Войти в админку
  </el-button>
</template>
