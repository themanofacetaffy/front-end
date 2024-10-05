<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<template>
  <el-row class="tac">
    <el-col :span="12">
      <el-menu
          default-active="/mainPage"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          router="router"
      >
        <el-menu-item index="/mainPage">
          <template #title>
            <el-icon><icon-menu /></el-icon>
            <span>班级一</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/manage">
          <template #title>
            <el-icon><icon-menu /></el-icon>
            <span>管理学生</span>
          </template>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>
<style scoped>
.el-menu-vertical-demo {
  width: 150px; /* 根据需要调整菜单宽度 */
  height: 100vh;
}
</style>

