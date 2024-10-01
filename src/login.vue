<script lang="ts" setup>
import {ref} from 'vue'
import {AddUser} from '@/api/user'
// do not use same name with ref
const LoginForm = ref({
  name: '',
  stuNum:'',
  PhoneNumber:'',
  validation:'',
  password:''
})

const onSubmit = async () => {
    await AddUser(LoginForm.value)
}

//顶栏
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

        <el-menu-item index="1" style="color: white;font-size: large">班级</el-menu-item>
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
  <div class="form-container">
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="姓名">
        <el-input v-model="LoginForm.name" />
      </el-form-item>
      <el-form-item label="学号">
        <el-input v-model="LoginForm.stuNum" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="LoginForm.password" />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="LoginForm.PhoneNumber" />
      </el-form-item>
      <div class="validationCode">
        <el-form-item >
          <el-input placeholder="请输入验证码" v-model="LoginForm.PhoneNumber" />
        </el-form-item>
        <el-button type="primary">获取验证码</el-button>
      </div>

      <div class="button">
        <el-form-item >
          <el-button type="primary" @click="onSubmit">注册</el-button>
          <el-button>取消</el-button>
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
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
.el-menu-demo{
  background-color: #242424;
  height: 75px;
}

</style>

