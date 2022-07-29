<script setup>
import { useProjectsStore } from "@/stores"
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router"
import AppPageHeader from "../components/AppPageHeader.vue"
import ProjectForm from "../components/forms/ProjectForm.vue"

const projectStore = useProjectsStore()

const route = useRoute()
const router = useRouter()

const pageTitle =
  route.name === "create-project" ? "Создать проект" : "Редактировать проект"

if (route.name === "edit-project" && !projectStore.model._id) {
  router.push({ name: "projects" })
}

onBeforeRouteLeave(() => {
  projectStore.resetModel()
})

const submitForm = async () => {
  if (route.name === "create-project") {
    const success = await projectStore.createItem()
    if (success) router.push({ name: "projects" })
  } else {
    const success = await projectStore.updateItem()
    if (success) router.push({ name: "projects" })
  }
}
</script>

<template>
  <AppPageHeader :title="pageTitle" />

  <el-divider />

  <ProjectForm :button-title="pageTitle" @submit-form="submitForm" />
</template>
