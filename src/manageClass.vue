<script lang="ts" setup>
import {GetUserList} from "@/api/user.js";
import {ref} from 'vue'
import {UseTokenStore} from '@/stores/token'
import type {UploadProps, UploadUserFile} from 'element-plus'
import {ElMessage, ElMessageBox} from 'element-plus'

const stuTable = ref({//标准返回值示范
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
  }
  ]
})
const Class_id = ref({
  class_id: 0
})
const GetStu = async function () {
  let msg = await GetUserList(Class_id.value)
  stuTable.value = msg.data
  console.log("学生列表：", stuTable.value)
}
GetStu()
const tokenStore = UseTokenStore()

const fileList = ref<UploadUserFile[]>([])

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile)
}

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
      `The limit is 1, you selected ${files.length} files this time, add up to ${
          files.length + uploadFiles.length
      } totally`
  )
}

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
      `Cancel the transfer of ${uploadFile.name} ?`
  ).then(
      () => true,
      () => false
  )
}
const handleSuccess = async function (response, file, fileList) {
  Class_id.value.class_id = response.class_id
  await GetStu()
  stuTable.value.students.Class = '1'
}

// const selectedFile = ref(null);
//
// const handleFileChange = (event) => {
//   const file = event.target.files[0];
//   if (file) {
//     selectedFile.value = file;
//   }
// };
//
// const uploadFile = async () => {
//   if (!selectedFile.value) {
//     alert('请先选择一个文件');
//     return;
//   }
//
//   const formData = new FormData();
//   formData.append('file', selectedFile.value);
//
//   try {
//     const response = await fetch('/api/class/auth/import', {
//       method: 'POST',
//       body: formData,
//       // 如果你不希望浏览器设置边界，可以显式地设置请求头
//       headers: {
//         // 'Content-Type': 'multipart/form-data',
//         'CallSystem-Token': tokenStore.token
//       }
//     });
//
//     const result = await response.json();
//     Class_id.value.class_id = result.class_id
//
//     console.log('上传成功:', result);
//     await GetStu()
//   } catch (error) {
//     console.error('上传失败:', error);
//   }
// };
console.log("reflesh")
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-main>

        <el-upload
            v-model:file-list="fileList"
            :auto-upload
            :before-remove="beforeRemove"
            :headers="{'CallSystem-Token':tokenStore.token}"
            :limit="1"
            :on-exceed="handleExceed"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            action="/api/class/auth/import"
            class="upload-demo"
        >
          <el-button type="primary">导入学生名单</el-button>

        </el-upload>
        <!--        <div>-->
        <!--          <input type="file" @change="handleFileChange"/>-->
        <!--          <button @click="uploadFile">上传文件</button>-->
        <!--        </div>-->
        <hr>
        <el-table :data="stuTable.students" border style="width: 100%;height: 100vh">
          <el-table-column label="姓名" prop="name" width="120"/>
          <el-table-column label="班级" prop="Class" width="120"/>
          <el-table-column label="学号" prop="student_number" width="120"/>
          <el-table-column label="状态" prop="status" width="600"/>
          <el-table-column fixed="right" label="Operations" min-width="120">
            <template #default>
              <el-button link size="small" type="danger" @click="deleteStu">
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer>
        <el-button type="primary">刷新</el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<style scoped>

</style>