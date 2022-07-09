<script setup>
import { reactive, ref } from "vue"
import { useAuthStore } from "@/stores"
import { ElMessage } from "element-plus"

// Элемент формы регистрации
const loginFormRef = ref()

// Модель формы
const loginForm = reactive({
  email: "",
  password: "",
})

// Правила валидации инпутов
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

// Подключаем стор
const store = useAuthStore()

const successMessage = () => {
  ElMessage({
    message: store.loginSuccess,
    type: "success",
  })
}

// Валидация и отправка формы на сервер
const submitForm = async (formEl) => {
  if (!formEl) return

  await formEl.validate(async (valid, fields) => {
    if (valid) {
      await store.login(loginForm)

      if (store.isAuth) {
        successMessage()
      }
    } else {
      return false
    }
  })
}
</script>

<template>
  <section
    class="w-screen h-screen flex items-center justify-center bg-rose-50"
  >
    <el-card shadow="always" class="w-96">
      <template #header> Авторизуйтесь </template>

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

      <el-button type="primary" @click="submitForm(loginFormRef)" class="mt-4">
        Войти в админку
      </el-button>
    </el-card>
  </section>
</template>
