<script lang="ts" setup>
//顶栏
import {ref} from 'vue'
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<template>
  <div class="menu">
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
    >
      <el-menu-item index="0" style="color: white;font-size: large">
        <img
            style="width: 50px "
            src="./imag/42554166b2816bb449fbfbf97eeed380.png"
            alt="小菲"
        />首页
      </el-menu-item>

      <el-menu-item index="1" style="color: white;font-size: large" >管理班级</el-menu-item>
      <el-sub-menu index="2" style="color: white;font-size: large">
        <template #title >
          <span style="color: white;font-size: large">个人空间</span>
        </template>
        <el-menu-item index="2-1">创建班级</el-menu-item>
        <el-menu-item index="2-2">发起签到</el-menu-item>
        <el-menu-item index="2-3">签到</el-menu-item>
        <el-sub-menu index="2-4">
          <template #title>
            <span style="color: white;font-size: large"></span>
          </template>
          <el-menu-item index="2-4-1">item one</el-menu-item>
          <el-menu-item index="2-4-2">item two</el-menu-item>
          <el-menu-item index="2-4-3">item three</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>


    </el-menu>
  </div>
</template>

<style scoped>

.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
.el-menu-demo{
  background-color: #242424;
  height: 75px;
}
</style>