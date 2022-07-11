<template>
  <component :is="components[layout]"></component>
</template>

<script setup>
import { usePrefsStore } from "@/stores"
import { storeToRefs } from "pinia"
import DefaultLayout from "./layouts/DefaultLayout"
import SimpleLayout from "./layouts/SimpleLayout"

const prefs = usePrefsStore()

const { layout } = storeToRefs(prefs)

const components = {
  DefaultLayout,
  SimpleLayout,
}
</script>

<style>
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  overflow: hidden;
}
</style>
