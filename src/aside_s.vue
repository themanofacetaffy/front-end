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
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
      >
        <el-menu-item index="1">
          <template #title>
            <el-icon><icon-menu /></el-icon>
            <span>班级</span>
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
