<script setup>
const handleClick = () => {
  console.log('click')
}

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
]
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-main>
        <div class="buttons">
          <el-button type="primary">查看所有学生</el-button>
          <el-button type="primary">发起签到</el-button>
          <el-button type="primary">查看签到记录</el-button>
          <el-button type="primary">发起随机提问</el-button>

        </div>
        <hr>
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column fixed prop="date" label="Date" width="150" />
          <el-table-column prop="name" label="Name" width="120" />
          <el-table-column prop="state" label="State" width="120" />
          <el-table-column prop="city" label="City" width="120" />
          <el-table-column prop="address" label="Address" width="600" />
          <el-table-column prop="zip" label="Zip" width="120" />
          <el-table-column fixed="right" label="Operations" min-width="120">
            <template #default>
              <el-button link type="primary" size="small" @click="handleClick">
                加分
              </el-button>
              <el-button link type="primary" size="small">减分</el-button>
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
