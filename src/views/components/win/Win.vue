<template>
  <div>
    <div class="mx-win-triangle" :style="triangleCoordinate"></div>
    <div class="mx-win-content" :style="contentCoordinate">
      <div style="text-align: center">
        <slot></slot>
      </div>
      <div style="text-align: center;margin-top: 20px">
        <el-button type="primary" @click="confirm" size="mini">确定</el-button>
        <el-button type="info" @click="cancel" size="mini">取消</el-button>
      </div>
    </div>
    <div class="shadow"></div>
  </div>
</template>

<script>
  export default {
    name: "Win",
    props:{
      event:{
        type:MouseEvent,
        default(){
          return {}
        }
      }
    },
    data(){
      return {
        triangleCoordinate: {},
        contentCoordinate:{}
      }
    },
    created() {
      let left = this.event.clientX - this.event.offsetX + 4
      let top = this.event.clientY - this.event.offsetY + 15
      this.triangleCoordinate = {left:left + 'px',top:top + 'px'}
      this.contentCoordinate = {top:top + 20 + 'px'}
    },
    methods:{
      confirm(){
        this.$emit('confirm')
      },
      cancel(){
        this.$emit('cancel')
      }
    }
  }
</script>

<style scoped>
  .mx-win-triangle{
    position: absolute;
    z-index: 9;
    width: 1px;
    height: 1px;
    border-style: solid;
    border-color: transparent transparent white transparent;
    border-width: 10px;
  }

  .mx-win-content{
    padding: 10px;
    position: absolute;
    left: 14vw;
    z-index: 9;
    background-color: #fff;
    border-radius: 5px;
  }

  .shadow{
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: 8;
    top:0;
    left: 0;
    background-color: black;
    opacity:0.5;
  }
</style>