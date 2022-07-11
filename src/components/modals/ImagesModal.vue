<script setup>
import { ImagesApi } from "@/api"
import { ref } from "vue"

const list = ref([])

const emit = defineEmits(["setImage"])
async function init() {
  const { images } = await ImagesApi.getImages()

  list.value = images
}

init()
</script>

<template>
  <div class="flex items-center justify-start gap-5">
    <div
      v-for="img in list"
      :key="img.name"
      class="w-32 h-32 rounded overflow-hidden cursor-pointer border-2 border-transparent hover:border-2 hover:border-gray-500 flex items-center justify-center"
      @click="$emit('setImage', img)"
    >
      <img :src="img.url" />
    </div>
  </div>
</template>
