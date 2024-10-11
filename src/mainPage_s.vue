<script lang="ts" setup>
import {ref} from 'vue'
import {ChangePassword, ResponseCall, GetPersonInfo} from '@/api/user'
import type {ComponentSize} from 'element-plus'
import {ElMessage} from 'element-plus'
import {getEventId, setEventId} from '@/utils/event_id'
import {undo_call_event} from '@/api/class'

const size = ref<ComponentSize>('default')

const dialogFormVisible = ref(false)
const formLabelWidth = '120px'

const response = ref({
  class_id: 0,
  event_id: 0
})
const changeData = ref({//修改密码用数据
  old_password: '',
  new_password: ''
})
const Class_id = ref({
  class_id: 0
})

const stuTable = ref({
  base: {
    code: 0,
    msg: ''
  },
  user_count: 0,
  students: [{
    student_number: '',
    name: '',
    Class: '',
    status: '',
    point: ''
  }]
})
const personInfo = ref({
  base: {
    code: 0,
    msg: ''
  },
  uid: 0,
  name: '',
  student_phone: '',
  student_number: '',
  point: 0
})
const responseCall = async function () {
  response.value.event_id = getEventId()
  //console.log("完成签到")
  console.log("签到返回：", response.value)
  await ResponseCall(response.value)
}
const changePassword = async () => {
  let msg = await ChangePassword(changeData.value)//to be continued
  if (msg.data.base.code === 200) {
    dialogFormVisible.value = false
    ElMessage({
      message: '修改成功',
      type: 'success',
    })
  } else {
    console.log("enter false")
    dialogFormVisible.value = false
    ElMessage({
      message: '原密码输入错误',
      type: 'error',
    })
  }
  changeData.value.old_password = ''
  changeData.value.new_password = ''
}

const showFault = () => {
  dialogFormVisible.value = false
  changeData.value.old_password = ''
  changeData.value.new_password = ''
}
const checkData = ref({
  base: {
    code: 0,
    msg: ''
  },
  event: {
    id: 0,
    call_event_name: '',
    class_id: 0,
    start_time: 0,
    end_time: 0,
  },
  exist: false
})

const rules = {
  old_password: [
    {required: true, message: '请输入旧密码', trigger: 'blur'},
    {min: 6, max: 16, message: '密码长度为6到16位', trigger: 'blur'}
  ],
  new_password: [
    {required: true, message: '请输入新密码', trigger: 'blur'},
    {min: 6, max: 16, message: '密码长度为6到16位', trigger: 'blur'},
    {
      pattern: /^[a-zA-Z0-9_.]+$/,
      message: '新密码只能包含字母、数字、下划线和.符号',
      trigger: 'blur'
    }
  ]
}

const check = async () => {
  let msg = await undo_call_event()
  checkData.value = msg.data
  if (checkData.value.exist == true && checkData.value.event.call_event_name !== '随机抽点') {// && checkData.value.event.call_event_name !== '随机抽点'
    setEventId(checkData.value.event.id)
    openRandomForm()
  }
}
const getPersonInfo = async () => {
  let msg = await GetPersonInfo()
  personInfo.value = msg.data
}
getPersonInfo()
import {ElMessageBox} from 'element-plus'

const openRandomForm = () => {
  ElMessageBox({
    title: '检测到未签到事件',
    showCancelButton: false,
    showConfirmButton: true,
    confirmButtonText: '点击签到',
    cancelButtonText: 'Cancel',

    type: 'success',
    center: true,
    customClass: 'custom-message-box' // 添加自定义类名
  })
      .then(() => {
        ElMessage({
          type: 'success',
          message: '签到完成',
        })
        responseCall()
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: 'Delete canceled',
        })
      })
}
</script>

<template>
  <div>
  </div>
  <el-radio-group v-model="size">
    <el-radio value="large">Large</el-radio>
    <el-radio value="default">Default</el-radio>
    <el-radio value="small">Small</el-radio>
  </el-radio-group>
  <hr>
  <div class="buttons">
    <el-button type="primary" @click="dialogFormVisible = true">
      点击修改密码
    </el-button>
    <el-button class="button" type="primary" @click="check">刷新</el-button>
  </div>

  <el-dialog v-model="dialogFormVisible" title="修改密码" width="500">
    <el-form ref="changePasswordForm" :model="changeData" :rules="rules">
      <el-form-item :label-width="formLabelWidth" label="请输入旧密码" prop="old_password">
        <el-input v-model="changeData.old_password" autocomplete="off" type="password"/>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="请输入新密码" prop="new_password">
        <el-input v-model="changeData.new_password" autocomplete="off" type="password"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="showFault">取消</el-button>
        <el-button type="primary" @click="changePassword ">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>

  <el-descriptions
      :column="4"
      :size="size"
      border
      direction="vertical"
  >
    <el-descriptions-item label="姓名">{{ personInfo.name }}</el-descriptions-item>
    <el-descriptions-item label="学号">{{ personInfo.student_number }}</el-descriptions-item>
    <el-descriptions-item :span="2" label="uid">{{ personInfo.uid }}</el-descriptions-item>
    <el-descriptions-item label="积分">
      <el-tag size="small">目前积分：{{ personInfo.point }}
      </el-tag>
    </el-descriptions-item>

  </el-descriptions>


</template>


<style scoped>
.el-descriptions {
  margin-top: 20px;
}

.button {
  display: flex;
  justify-content: center;
}

.buttons {
  display: flex;
}
</style>
