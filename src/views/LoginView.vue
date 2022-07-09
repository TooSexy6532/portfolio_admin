<script setup>
import LoginForm from "@/components/forms/LoginForm.vue"
import { useAuthStore } from "@/stores"
import { useRouter } from "vue-router"

// Подключаем стор
const store = useAuthStore()

const router = useRouter()

// Oтправка формы на сервер
const submitForm = async (loginForm) => {
  await store.login(loginForm)

  if (store.isAuth) {
    router.push({ name: "home" })
  }
}
</script>

<template>
  <section
    class="w-screen h-screen flex items-center justify-center bg-rose-50"
  >
    <el-card shadow="always" class="w-96">
      <template #header> Авторизуйтесь </template>

      <LoginForm @submit-form="submitForm" />
    </el-card>
  </section>
</template>
