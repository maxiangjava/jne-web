<template>
  <div class="main">
    <top></top>
    <el-tabs type="border-card" style="height: 90vh">
      <el-tab-pane label="部门管理">{{dict}}



      </el-tab-pane>
      <el-tab-pane label="营门管理">营门管理</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import Top from "@/views/components/top/Top";
  export default {
    name: "TypeInfo",
    components:{
      Top
    },
    data(){
      return {
        dptList:[],
        personKeyList:[],
        regionList:[],
        activeNames: ['1'],
        props: {label:'orgName'}
      }
    },
    computed:{
      dict(){
        return this.$store.state.dict
      }
    },
    created() {
      this.getData()
    },
    methods:{





      async getData(){
        this.dptList = [await this.$api.get('/api/emp/dptList')]
        this.personKeyList = [await this.$api.get('/api/emp/personKeyList')]
        this.regionList = [await this.$api.get('/api/emp/regionList')]
      }
    }
  }
</script>

<style scoped>

</style>