<script setup>
import { usePrefsStore } from "@/stores"
import { storeToRefs } from "pinia"
import DefaultLayout from "../layouts/DefaultLayout"
import SimpleLayout from "../layouts/SimpleLayout"

const prefs = usePrefsStore()

const { layout } = storeToRefs(prefs)

const components = {
  DefaultLayout,
  SimpleLayout,
}
</script>

<template>
  <component :is="components[layout]"></component>
</template>
