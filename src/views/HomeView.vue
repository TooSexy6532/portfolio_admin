<script setup>
import { PreferencesApi } from "@/api"
import { ref } from "vue"

const prefs = ref(null)

async function init() {
  const data = await PreferencesApi.getPrefs
  prefs.value = data.preferences
}

init()
</script>

<template>
  <h1>home page</h1>
  <div>
    {{ prefs }}
  </div>
</template>
