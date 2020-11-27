<template>
  <div class="paging-bar">
    <div>
      共10条
      <el-select v-model="pageSize" placeholder="10条/页" style="width: 100px" size="small">
        <el-option label="10条/页" value="10"></el-option>
        <el-option label="20条/页" value="20"></el-option>
        <el-option label="50条/页" value="50"></el-option>
        <el-option label="100条/页" value="100"></el-option>
      </el-select>
    </div>
    <div>
      <input style="width: 4em" type="text"> / 1页
      <button class="mini-button" style="margin-left: 5px">跳转</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Paging",
    data(){
      return {
        pageSize:'10条/页'
      }
    }

  }
</script>

<style scoped>
  .paging-bar{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

</style>