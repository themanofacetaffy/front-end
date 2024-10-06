<script setup>
import {GetUser, AddPoint, MinusPoint, GetUserList} from "@/api/user.js";
import {CallTheRoll,undo_call_events,random_call} from "@/api/class.js";

import {ref} from 'vue'
const stuTable = ref({})
const class_id = ref({
  class_id:'',
  deadline:'',
  call_event_name:'第一次点名'
})
const random_call_data = ref({
  class_id:'',
  class_number:'',
  deadline:'',
  call_event_name:'随机抽点'
})

const GetStu =  async function (){
  stuTable.value =await GetUserList()
}
GetStu();

const CalltheRoll = async function (){
  let res =await CallTheRoll(class_id.value)
}
const Undo_call_events = async function (){
  await undo_call_events(class_id.value.class_id)
}
const Random_call = async function (){
  await random_call(random_call_data.value)
}
const addPoint = async function (){
  await AddPoint()
}
const minusPoint = async function (){
  await MinusPoint()
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-main>
        <div class="buttons">
          <el-button type="primary" @click="GetStu">查看所有学生</el-button>
          <el-button type="primary" @click="CalltheRoll">发起签到</el-button>
          <el-button type="primary" @click="Undo_call_events">查看签到记录</el-button>
          <el-button type="primary" @click="Random_call">发起随机提问</el-button>

        </div>
        <hr>
        <el-table :data="stuTable.value" style="width: 100%;height: 100vh" border>
          <el-table-column prop="name" label="姓名" width="120" />
          <el-table-column prop="Class" label="班级" width="120" />
          <el-table-column prop="stuNum" label="学号" width="120" />
          <el-table-column prop="status" label="状态" width="600" />
          <el-table-column fixed="right" label="Operations" min-width="120">
            <template #default>
              <el-button link type="primary" size="small" @click="addPoint">
                加分
              </el-button>
              <el-button link type="primary" size="small" @click="minusPoint">减分</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>
<style scoped>
.common-layout {
  padding: 0;
  margin: 0;
}

.el-container, .el-main {
  padding: 0;
  margin: 0;
}

</style>
