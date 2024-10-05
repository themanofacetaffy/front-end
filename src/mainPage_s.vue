<script setup lang="ts">
import { computed, ref } from 'vue'
import {GetStuStatus} from '@/api/user'
import type { ComponentSize } from 'element-plus'

const size = ref<ComponentSize>('default')

const blockMargin = computed(() => {
  const marginMap = {
    large: '32px',
    default: '28px',
    small: '24px',
  }
  return {
    marginTop: marginMap[size.value] || marginMap.default,
  }
})
const StuData = ref({
  name: '',
  stuNum: '',
  Class: '',
  Remarks: '',
})

const getStuStatus = async () => {
  StuData.value = await GetStuStatus()
}
getStuStatus()

const responseCall = function (){
  alert('签到成功')
}
</script>

<template>
  <el-radio-group v-model="size">
    <el-radio value="large">Large</el-radio>
    <el-radio value="default">Default</el-radio>
    <el-radio value="small">Small</el-radio>
  </el-radio-group>

  <el-descriptions
      direction="vertical"
      :column="4"
      :size="size"
      border
  >
    <el-descriptions-item label="姓名"  >{{ StuData.name }}</el-descriptions-item>
    <el-descriptions-item label="学号" >{{ StuData.stuNum }}</el-descriptions-item>
    <el-descriptions-item label="班级" :span="2" >{{StuData.Class}}</el-descriptions-item>
    <el-descriptions-item label="积分" >
      <el-tag size="small">目前积分：{{StuData.Remarks}}
      </el-tag>
    </el-descriptions-item>

  </el-descriptions>
  <el-button class="button" type="primary" @click="responseCall">点击签到</el-button>

</template>



<style scoped>
.el-descriptions {
  margin-top: 20px;
}
.button{
  display: flex;
  justify-content:center;
}
</style>
