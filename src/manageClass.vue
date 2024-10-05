<script setup>
import {GetUser} from "@/api/user.js";
import {ref} from 'vue'
const stuTable = ref([])
const GetStu =  async function (){
  stuTable.value =await GetUser()
}
GetStu()
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-main>
        <hr>
        <el-table :data="stuTable" style="width: 100%;height: 100vh" border>
          <el-table-column prop="name" label="姓名" width="120" />
          <el-table-column prop="Class" label="班级" width="120" />
          <el-table-column prop="stuNum" label="学号" width="120" />
          <el-table-column prop="status" label="状态" width="600" />
          <el-table-column fixed="right" label="Operations" min-width="120">
            <template #default>
              <el-button link type="danger" size="small" @click="deleteStu">
                移除
              </el-button>

            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<style scoped>

</style>