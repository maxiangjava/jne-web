<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {

  },
  data(){
    return {
      show:false
    }
  }
}
</script>

<style>
  @import "assets/css/base.css";
</style>
