<template>
  <div>
    <div>
      <img class="icon" src="@/assets/common/add-bold.png" alt="" title="新增" @click="operate($event,'add')">
      <img class="icon" src="@/assets/common/edit.png" alt="" title="修改" @click="operate($event,'edit')">
      <img class="icon" src="@/assets/common/remove.png" alt="" title="修改" @click="operate($event,'del')">
      <img class="icon" src="@/assets/common/orderBy.png" alt="" title="修改" @click="operate">
      <img class="icon" src="@/assets/common/link.png" alt="" title="修改">
      <img class="icon" src="@/assets/common/attachment.png" alt="" title="修改">
      <img class="icon" src="@/assets/common/more.png" alt="" title="修改">
    </div>
    <div v-if="addStatus">
      <win :event="event" @cancel="addStatus = false" @confirm="confirm">
        <p>添加工作单位</p>
        <div style="text-align: left">
          <p style="font-size: 0.8em">上级部门：{{nodeName}}</p>
        </div>
        <div>
          <el-input v-model="orgName" placeholder="请输入节点名称" style="width: 200px" size="mini"></el-input>
        </div>
      </win>
    </div>

  </div>
</template>

<script>
  import Win from "@/views/components/win/Win";

  export default {
    name: "OrganizationOperate",
    components:{
      Win
    },
    props:{
      nodeName:{
        type:String,
        default:''
      },
      code:{
        type:String,
        default:''
      }
    },
    data(){
      return {
        currNode:'上级组织：默认组织',
        orgName:'',
        type:'',
        event:{},
        addStatus:false,
        form: {
          name: '',
          ps: ''
        }
      }
    },
    methods:{

      async save(){
        try {
          await this.$api.post('/api/emp/addOrg',{
            parentIndexCode:this.code,
            orgName:this.orgName
          })
          this.$message.success('保存成功')
          this.getData()
        }catch (error){
          this.$message.error('错误信息：' + error.message)
        }
      },

      async edit(){
        try {
          await this.$api.post('/api/emp/editOrg',{
            parentIndexCode:this.code,
            orgName:this.orgName
          })
          this.$message.success('保存成功')
          this.getData()
        }catch (error){
          this.$message.error('错误信息：' + error.message)
        }
      },

      async del(){
        try {
          await this.$api.post('/api/emp/delDpt',{
            parentIndexCode:this.code,
            orgName:this.orgName
          })
          this.$message.success('保存成功')
          this.getData()
        }catch (error){
          this.$message.error('错误信息：' + error.message)
        }
      },

      async getData(){
        sessionStorage.setItem('dptList',JSON.stringify([await this.$api.get('/api/emp/dptList')]))
        sessionStorage.setItem('personKeyList',JSON.stringify([await this.$api.get('/api/emp/personKeyList')]))
        sessionStorage.setItem('regionList',JSON.stringify([await this.$api.get('/api/emp/regionList')]))
        let dicList = await this.$api.get('/api/emp/dicList')
        dicList.forEach(item => {
          console.log(item)
          sessionStorage.setItem(item.type,JSON.stringify(item.list))
        })
      },

      confirm(){
        this.addStatus = false
        if(this.type == 'add'){
          this.save()
        }
        if(this.type == 'edit'){
          this.edit()
        }

      },

      operate(event,type){
        this.type = type;
        if(this.type == 'del'){
          this.del()
        }else{
          this.event = event;
          this.addStatus = true;
        }

      },

    }
  }
</script>

<style scoped>

</style>