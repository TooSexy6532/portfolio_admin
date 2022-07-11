<template>
  <div class="flex flex-row">
    <aside-panel />
    <el-scrollbar class="flex flex-col w-full p-8 max-h-screen">
      <router-view />
    </el-scrollbar>
  </div>
</template>

<script>
import AsidePanel from "../components/AsidePanel.vue"
export default {
  name: "DefaultLayout",
  components: { AsidePanel },
}
</script>

<style lang="scss"></style>
