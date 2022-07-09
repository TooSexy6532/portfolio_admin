<script setup>
import { useRouter } from "vue-router"

const router = useRouter()
</script>

<template>
  <el-page-header
    icon="ArrowLeft"
    title="Назад"
    content="Пользователи"
    @back="router.back"
  />
</template>
