<script lang="ts" setup>
import {ref} from 'vue'
import {AddUser} from '@/api/user'
import {useRouter} from "vue-router";
const router = useRouter()
// do not use same name with ref
const isRegister=ref(true)
const LoginForm = ref({
  name: '',
  stuNum:'',
  PhoneNumber:'',
  validation:'',
  password:''
})
const changeStatus = function (){
  isRegister.value = !isRegister.value;
}

const onSubmit = async () => {
    await AddUser(LoginForm.value)
  isRegister.value = false
}
const login = async () => {

   await router.push('/')
}

const rules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
  ],
  stuNum: [
    { required: true, message: '请输入学号', trigger: 'blur' },
    { min: 11, max:11 , message: '学号长度为11位', trigger: 'blur' }
  ],
  PhoneNumber: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { min: 11, max:11 , message: '手机号长度为11位', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 15, message: '密码长度在6到15位之间', trigger: 'blur' }
  ],
  validation: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 4, max: 4, message: '验证码长度为4位', trigger: 'blur' }
  ]
}
</script>

<template>

  <!-- 注册表单 -->
  <div class="form-container" v-if="isRegister===true">
    <el-form :model="form" label-width="auto" style="max-width: 600px" :rules="rules">
      <el-form-item label="姓名"  prop="name">
        <el-input v-model="LoginForm.name" />
      </el-form-item>
      <el-form-item label="学号" :rules="rules" prop="stuNum">
        <el-input v-model="LoginForm.stuNum" />
      </el-form-item>
      <el-form-item label="密码" :rules="rules" prop="password">
        <el-input v-model="LoginForm.password" />
      </el-form-item>
      <el-form-item label="手机号" :rules="rules" prop="PhoneNumber">
        <el-input v-model="LoginForm.PhoneNumber" />
      </el-form-item>
      <div class="validationCode">
        <el-form-item  :rules="rules" prop="validation">
          <el-input placeholder="请输入验证码" v-model="LoginForm.validation" />
        </el-form-item>
        <el-button type="primary">获取验证码</el-button>
      </div>

      <div class="button">
        <el-form-item >
          <el-button type="primary" @click="onSubmit">注册</el-button>
          <el-button @click="changeStatus">取消</el-button>
        </el-form-item>
      </div>

    </el-form>
    </div>

  <!-- 登录表单 -->
  <div class="form-container" v-else>
    <el-form label-width="auto" style="max-width: 600px">
      <el-form-item label="手机号">
        <el-input placeholder="请输入手机号" v-model="LoginForm.PhoneNumber"/>
      </el-form-item>
      <el-form-item label="密码">
        <el-input placeholder="请输入密码" type="password" v-model="LoginForm.password"/>
      </el-form-item>
      <div class="button">
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button @click="changeStatus">注册</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<style scoped >

.form-container {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 100vh; /* 占满整个视口的高度，确保容器能居中 */
}

.el-form {
  width: 300px; /* 设置表单的固定宽度 */
  padding: 20px; /* 添加一些内边距 */
  border: 1px solid #ccc; /* 添加边框 */
  border-radius: 10px; /* 添加圆角 */
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); /* 可选：添加阴影 */
  background-color: #fff; /* 可选：设置背景颜色 */
}

.validationCode{
  display: flex;
  justify-content: flex-end;
}
.button{
  display: flex;
  justify-content: center;
}



</style>

