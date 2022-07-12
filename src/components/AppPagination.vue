<script setup>
import { computed, ref, watch } from "vue"

const props = defineProps({
  list: {
    type: Array,
  },
})

const emit = defineEmits(["paginated"])

const pageSize = 10

let currentPage = ref(1)

const startIndex = computed(() => {
  return currentPage.value === 1 ? 0 : (currentPage.value - 1) * pageSize
})

const endIndex = computed(() => {
  return currentPage.value * pageSize
})

const paginatedList = computed(() => {
  const arr = [...props.list]
  const paginatedList = arr.slice(startIndex.value, endIndex.value)
  return paginatedList
})

watch(paginatedList, () => {
  emit("paginated", paginatedList)
})

function init() {
  emit("paginated", paginatedList)
}

init()
</script>

<template>
  <div class="flex items-center justify-center mt-10">
    <el-pagination
      hide-on-single-page
      layout="prev, pager, next"
      :total="list?.length"
      :page-size="pageSize"
      v-model:currentPage="currentPage"
    />
  </div>
</template>
