<script lang="ts" setup>
import {ref} from 'vue'
import {AddUser, Login, GetVerifyCode} from '@/api/user'
import {useRouter} from "vue-router";
import {UseTokenStore} from '@/stores/token.js'
import {saveTokenForAccount1, saveTokenForAccount2} from '@/stores/cookie'

const tokenStore = UseTokenStore()
const router = useRouter()
// do not use same name with ref
const isRegister = ref(true)
const SubmitForm = ref({
  name: '',
  password: '',
  student_number: '',
  phone_number: '',
  verify_code: ''
})
const VerifyCodeData = ref({
  phone_number: '',
})
const LoginForm = ref({
  phone_number: '',
  password: ''
})

const radio1 = ref('1')//作为学生还是老师的判断

const changeStatus = function () {
  isRegister.value = !isRegister.value;
}

const onSubmit = async () => {
  LoginForm.value.phone_number = SubmitForm.value.phone_number
  LoginForm.value.password = SubmitForm.value.password
  await AddUser(SubmitForm.value)
  isRegister.value = false
}
const login = async () => {
  let res = await Login(LoginForm.value)
  if (res.data.base.code !== 200) {
    alert(res.data.base.msg)
    return
  }
  tokenStore.setToken(res.data.token)
  if (radio1.value === '1') {
    //saveTokenForAccount1()
    await router.push('/stu')
  } else {
    //saveTokenForAccount2()
    await router.push('/tea')
  }

}

const rules = {
  name: [
    {required: true, message: '请输入姓名', trigger: 'blur'},
    {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
  ],
  stuNum: [
    {required: true, message: '请输入学号', trigger: 'blur'},
    {min: 11, max: 11, message: '学号长度为11位', trigger: 'blur'}
  ],
  PhoneNumber: [
    {required: true, message: '请输入手机号', trigger: 'blur'},
    {min: 11, max: 11, message: '手机号长度为11位', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 6, max: 15, message: '密码长度在6到15位之间', trigger: 'blur'}
  ],
  validation: [
    {required: true, message: '请输入验证码', trigger: 'blur'},
    {min: 4, max: 4, message: '验证码长度为4位', trigger: 'blur'}
  ]
}
const getVerifyCode = async () => {
  VerifyCodeData.value.phone_number = SubmitForm.value.phone_number
  await GetVerifyCode(VerifyCodeData.value)
}
</script>

<template>

  <!-- 注册表单 -->
  <div v-if="isRegister===true" class="form-container">
    <el-form :model="SubmitForm" :rules="rules" label-width="auto" style="max-width: 600px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="SubmitForm.name"/>
      </el-form-item>
      <el-form-item label="学号/工号" prop="stuNum">
        <el-input v-model="SubmitForm.student_number"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="SubmitForm.password"/>
      </el-form-item>
      <el-form-item label="手机号" prop="PhoneNumber">
        <el-input v-model="SubmitForm.phone_number"/>
      </el-form-item>
      <div class="option">
        <div class="radio-group">
          <el-radio-group v-model="radio1">
            <el-radio border size="large" value="1">我是学生</el-radio>
            <el-radio border size="large" value="2">我是教师</el-radio>
          </el-radio-group>
        </div>

        <div class="validationCode">
          <el-form-item prop="validation">
            <el-input v-model="SubmitForm.verify_code" placeholder="请输入验证码"/>
          </el-form-item>
          <el-button type="primary" @click="getVerifyCode">获取验证码</el-button>
        </div>
      </div>

      <div class="button">
        <el-form-item>
          <el-button type="primary" @click="onSubmit">注册</el-button>
          <el-button @click="changeStatus">取消</el-button>
        </el-form-item>
      </div>

    </el-form>
  </div>

  <!-- 登录表单 -->
  <div v-else class="form-container">
    <el-form label-width="auto" style="max-width: 600px">
      <el-form-item label="手机号">
        <el-input v-model="LoginForm.phone_number" placeholder="请输入手机号"/>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="LoginForm.password" placeholder="请输入密码" type="password"/>
      </el-form-item>
      <div class="radio-group">
        <el-radio-group v-model="radio1">
          <el-radio border size="large" value="1">我是学生</el-radio>
          <el-radio border size="large" value="2">我是教师</el-radio>
        </el-radio-group>
      </div>
      <div class="button">
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button @click="changeStatus">注册</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<style scoped>

.form-container {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 100vh; /* 占满整个视口的高度，确保容器能居中 */
}

.el-form {
  width: 350px; /* 增加表单的宽度 */
  padding: 20px; /* 添加一些内边距 */
  border: 1px solid #ccc; /* 添加边框 */
  border-radius: 10px; /* 添加圆角 */
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); /* 可选：添加阴影 */
  background-color: #fff; /* 可选：设置背景颜色 */
}

.validationCode {
  display: flex; /* 使验证码输入框和按钮有适当的间距 */ /* 垂直居中 */
  margin-top: 10px;
}

.radio-group {
  display: flex;
  margin-bottom: 10px; /* 为单选按钮组增加一些底部间距 */
}

.button {
  display: flex;
  justify-content: space-around; /* 调整按钮的间距 */
}

.option {
  display: flex;
  flex-direction: column;
  gap: 20px; /* 增加选项之间的间距 */
}

</style>
