<script setup>
import { useRouter } from "vue-router"

const props = defineProps({
  title: String,
})

const router = useRouter()
</script>

<template>
  <el-page-header
    icon="ArrowLeft"
    title="Назад"
    :content="title"
    @back="router.back"
  />
</template>
