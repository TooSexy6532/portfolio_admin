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
      <template v-for="item in store.menuItems" :key="item.name">
        <template v-if="item.type === 'submenu'">
          <el-sub-menu index="1">
            <template #title>
              <el-icon><component :is="item.icon" /></el-icon>
              <span>{{ item.title }}</span>
            </template>

            <el-menu-item
              v-for="subitem in item.submenus"
              :key="subitem.name"
              :index="subitem.name"
              :route="{ name: subitem.name }"
            >
              <el-icon>
                <component :is="subitem.icon" />
              </el-icon>
              <template #title> {{ subitem.title }}</template>
            </el-menu-item>
          </el-sub-menu>
        </template>

        <template v-else>
          <el-menu-item :index="item.name" :route="{ name: item.name }">
            <el-icon>
              <component :is="item.icon" />
            </el-icon>
            <template #title> {{ item.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </el-aside>
</template>
