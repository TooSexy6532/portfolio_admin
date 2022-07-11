<script setup>
import { usePrefsStore } from "@/stores"
import { computed, ref } from "vue"
import { useRoute } from "vue-router"
const store = usePrefsStore()

const route = useRoute()

const currentRoute = computed(() => {
  return route.name
})

const isCollapsed = ref(false)
</script>

<template>
  <el-aside width="auto" class="relative">
    <div
      class="ml-5 my-5 w-fit flex items-center rounded cursor-pointer absolute z-10"
      @click="isCollapsed = !isCollapsed"
    >
      <el-icon
        :size="24"
        class="!text-main"
        :class="{ '!text-primary': isCollapsed }"
      >
        <Menu />
      </el-icon>
    </div>

    <el-menu
      :collapse="isCollapsed"
      :default-active="currentRoute"
      text-color=""
      :router="true"
      class="h-full pt-16"
    >
      <el-menu-item
        v-for="item in store.menuItems"
        :key="item.name"
        :index="item.name"
        :route="{ name: item.name }"
      >
        <el-icon>
          <component :is="item.icon" />
        </el-icon>
        <template #title> {{ item.title }}</template>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>
