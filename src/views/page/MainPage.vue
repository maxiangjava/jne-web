<template>
  <div style="margin-left: 10px">
    <div class="content-top">
      <div>{{title}}</div>
      <div>
       <slot name="topOne"></slot>
       <slot name="topTwo"></slot>
       <slot name="topThree"></slot>
      </div>
    </div>
    <div style="height: 91vh">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MainPage",
    data(){
      return {
        title:''
      }
    },
    created() {
      this.title = this.$route.query.title
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

</style>