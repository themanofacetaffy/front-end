<script lang="ts" setup>
import {ChangePoint, GetUserList} from "@/api/user.js";
import {CallTheRoll, random_call} from "@/api/class.js";
import {getEventId, setEventId} from "@/utils/event_id.js";
import {ref} from 'vue'

const stuTable = ref({
  base: {
    code: 0,
    msg: ''
  },
  user_count: 0,
  students: [{
    student_number: '',
    name: '',
    Class: '1',
    status: '',
    point: 0,
    uid: 0
  }],
  event_id: 0
})
const Class_id = ref({
  class_id: 0
})
const msg = ref({
  base: {
    code: 0,
    msg: ''
  },
  event_id: 0
})
const TheStudent = ref({
  student_number: '',
  name: '',
  Class: '',
  status: '',
  point: 0,
  uid: 0
})
const jokers = ref([
  {
    student_number: '',
    name: '',
    Class: '1',
    status: '',
    point: 0,
    uid: 0
  }
])
const classInfo = ref({
  class_id: 0,
  deadline: 10,
  call_event_name: '全体签到'
})
const random_call_data = ref({
  class_id: 0,
  call_number: 1,
  deadline: -1,
  call_event_name: '随机抽点',
  action: 0
})
const changePointData = ref({
  stu_uid: 0,
  class_id: 0,
  action: 1,
  point: 0
})
const randomData = ref({
  base: {
    code: 0,
    msg: ''
  },
  event_id: 0,
  users: [{
    student_number: '',
    name: ''
  }]

})
// const GetStu =  async function (){
//   stuTable.students =await GetUserList(classInfo.value.class_id)
// }
// GetStu();
//发起点名
const GetStu = async function () {

  let msg = await GetUserList(Class_id.value)
  stuTable.value = msg.data
  console.log(Class_id.value)
}
GetStu()
const CalltheRoll = async function () {
  classInfo.value.class_id = Class_id.value.class_id
  let response = await CallTheRoll(classInfo.value);

  if (response.data !== null) {
    msg.value = response.data; // 正确将返回的响应赋值给 msg.value
  } else {
    console.log("调用点名接口时出错");
  }

  if (msg.value.base.code === 200) {
    setEventId(msg.value.event_id)
  }

}
const Undo_call_events = async function () {
  let msg01 = await GetUserList(Class_id.value)
  stuTable.value = msg01.data
  for (let key in stuTable.value.students) {
    if (stuTable.value.students[key].status === '未签到') {
      jokers.value.push(stuTable.value.students[key])
    }
  }
  stuTable.value.students = jokers.value
  jokers.value = []
}


const Random_call = async function () {
  let msg02 = await random_call(random_call_data.value)
  randomData.value = msg02.data
  openRandom()

}
const changePoint = async function (value, student) {
  console.log("当前操作学生：", student)
  changePointData.value.point = value
  changePointData.value.stu_uid = student.uid
  changePointData.value.action = 1

  await ChangePoint(changePointData.value)
  await GetStu()
}


import {ElMessage, ElMessageBox} from 'element-plus'

const open = (student) => {
  ElMessageBox.prompt('请输入加分数目', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    inputPattern: /^\d+(\.\d+)?$/,
    inputErrorMessage: 'Invalid number',
  })
      .then(({value}) => {
        ElMessage({
          type: 'success',
          message: `加分成功`,
        })

        changePoint(value, student)
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消',
        })
      })

}
const MinusPoint = async (student) => {
  changePointData.value.action = 0
  changePointData.value.stu_uid = student.uid
  changePointData.value.point = 1
  await ChangePoint(changePointData.value)
  await GetStu()
}

const openRandom = () => {
  ElMessageBox.alert('学生姓名：' + randomData.value.users[0].name, '随机提问学生：', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: 'OK',
    callback: (action: Action) => {
      ElMessage({
        type: 'success',
        message: `action: ${action}`,
      })
    },
  })
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-main>
        <div class="buttons">
          <el-button type="primary" @click="GetStu">刷新</el-button>
          <el-button type="primary" @click="CalltheRoll">发起签到</el-button>
          <el-button type="primary" @click="Undo_call_events">查看签到记录</el-button>
          <el-button type="primary" @click="Random_call">发起随机提问</el-button>

        </div>
        <hr>
        <el-table :data="stuTable.students" border style="width: 100%;height: 100vh">
          <el-table-column label="姓名" prop="name" width="120"/>
          <el-table-column label="班级" prop="Class" width="120"/>
          <el-table-column label="学号" prop="student_number" width="120"/>
          <el-table-column label="状态" prop="status" width="600"/>
          <el-table-column label="积分" prop="point" width="600"/>
          <el-table-column fixed="right" label="Operations" min-width="120">
            <template #default="scope">
              <el-button link size="small" type="primary" @click="open(scope.row)">
                加分
              </el-button>
              <el-button link size="small" type="primary" @click="MinusPoint(scope.row)">减分</el-button>
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
