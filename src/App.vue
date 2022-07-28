<script setup>
import AppLayout from "./components/AppLayout.vue"
import { useMessage } from "./composables/message"

useMessage()
</script>

<template>
  <AppLayout />
</template>

<style>
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  overflow: hidden;
}
</style>
