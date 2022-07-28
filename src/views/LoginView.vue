<script setup>
import LoginForm from "@/components/forms/LoginForm.vue"
import { useAuthStore } from "@/stores"
import { useRouter } from "vue-router"

const store = useAuthStore()

const router = useRouter()

const submitForm = async (loginForm) => {
  await store.login(loginForm)

  if (store.isAuth) {
    router.push({ name: "home" })
  }
}
</script>

<template>
  <el-row justify="center" align="middle" class="h-screen p-3">
    <el-col
      :md="{ span: 8, offset: 2 }"
      :xs="{ span: 24, offset: 0 }"
      class="mb-3"
    >
      <div class="flex justify-center items-center">
        <el-card shadow="always" class="min-w-[300px] w-full max-w-md">
          <template #header> Авторизуйтесь </template>

          <LoginForm @submit-form="submitForm" />
        </el-card>
      </div>
    </el-col>

    <el-col :xl="{ span: 12, pull: 2 }" :md="{ span: 13, pull: 0 }">
      <div class="max-w-[700px] w-full m-auto block overflow-clip">
        <img
          fit="cover"
          :src="require('../../public/assets/images/rabbit.webp')"
        />
      </div>
    </el-col>
  </el-row>
</template>
