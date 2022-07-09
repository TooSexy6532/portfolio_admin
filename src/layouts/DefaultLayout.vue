<template>
  <div class="default-layout">
    <el-container>
      <aside-panel />
      <el-container direction="vertical">
        <app-header />
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AppHeader from "../components/AppHeader.vue"
import AsidePanel from "../components/AsidePanel.vue"
export default {
  name: "DefaultLayout",
  components: { AsidePanel, AppHeader },
}
</script>

<style lang="scss">
.default-layout {
  .el-mail {
    height: 100%;
  }
}
</style>
