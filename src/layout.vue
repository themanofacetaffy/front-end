<script setup>


import Aside from "@/aside.vue";
import MainPage from "@/mainPage.vue";
</script>

<template>
  <div class="common-layout" >
    <el-container >
      <el-aside width="200px" style="width: 10%">
        <Aside/>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>

</style>
