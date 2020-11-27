<template>
  <div class="content-top">
    <div>
      <el-tooltip effect="dark" content="返回" placement="top">
        <i class="el-icon-d-arrow-left icon-button" v-if="back" @click="$router.back()"></i>
      </el-tooltip>

      {{$route.name}}
    </div>
    <div>
      <slot name="topOne"></slot>
      <slot name="topTwo"></slot>
      <slot name="topThree"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Top",
    props :{
      back:{
        type:Boolean,
        default : false
      }
    }
  }
</script>

<style scoped>
  .content-top{
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid #ebebeb;
    height: 4vh
  }

  .back-icon{
    margin-right: 10px;
    width: 1.2em;
    height: 1.2em;
    vertical-align: -4px;
  }
</style>