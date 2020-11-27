<template>
  <div class="search-box" >
    <div class="search-item">
      <div class="search-name">{{ item.label }}</div>
      <input type="text" v-model="aaaa">
    </div>

    <div class="search-but">
      <button class="red-button">查询</button>
      <button>重置</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SearchBox",
    props:{
      searchList:{
        type:Array,
        default(){
          return [{prop:'personName',label:'姓名'}]
        }
      }
    },
    data(){
      return {
        aaaa:''
      }
    }
  }
</script>

<style lang="scss" scoped>

  .search-box{
    display: flex;
    margin: 10px;
    flex-wrap: wrap;
    border-bottom: 2px solid #ebebeb;
    .search-item{
      width: 248px;
      height: 54px;
      margin:0 20px 10px 0;
    }
    .search-but{
      margin:20px 20px 10px 0;
    }
  }

</style>