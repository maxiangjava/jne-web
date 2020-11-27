<template>
  <div>
    <div style="margin-top: 5px">
      <el-tooltip effect="dark" content="添加子节点" placement="top">
        <i class="el-icon-plus icon-button" @click="append"></i>
      </el-tooltip>
      <el-tooltip effect="dark" content="修改当前节点" placement="top">
        <i class="el-icon-edit icon-button" @click="update"></i>
      </el-tooltip>
      <el-tooltip effect="dark" content="删除当前节点" placement="top">
        <el-popconfirm confirm-button-text='删掉它' cancel-button-text='不用了' icon="el-icon-info"  icon-color="red"
                       :title="'您确定要删除 '+nodeName+' 节点吗？'"  @onConfirm="remove">
          <i class="el-icon-delete icon-button" slot="reference"></i>
        </el-popconfirm>
      </el-tooltip>
      <el-tooltip effect="dark" content="刷新节点" placement="top">
        <i class="el-icon-refresh icon-button" @click="treeRefresh"></i>
      </el-tooltip>
    </div>

    <div style="margin-right: 10px;margin-top: 5px">
      <el-input placeholder="请输入内容" v-model="searchInput" suffix-icon="el-icon-search" clearable size="small"></el-input>
    </div>

    <div style="padding-right: 10px;margin-top: 10px">
      <el-tree :data="dptList" :props="props" node-key="1" @node-click="dptNodeClick" @check="dptChange" show-checkbox></el-tree>
    </div>

    <div style="padding-right: 10px;margin-top: 10px">
      <el-tree :data="regionList" :props="regionProps" show-checkbox></el-tree>
    </div>

    <div style="padding-right: 10px;margin-top: 10px">
      <el-tree :data="statusKeyList" :props="identityTypeProps" @node-click="personKeyNodeClick" show-checkbox></el-tree>
    </div>

    <div v-if="isShow">
      <win :event="event" @cancel="isShow = false" @confirm="confirm">
        <div>
          <span v-if="type == 'add'">添加节点</span>
          <span v-else>修改节点</span>
        </div>
        <div style="text-align: left">
          <p style="font-size: 0.8em">
            <span v-if="type == 'add'">上级节点：{{nodeName}}</span>
            <span v-else>当前节点：{{nodeName}}</span>
          </p>
        </div>
        <div>
          <el-input v-model="orgCode" placeholder="请输入节点编码" style="width: 200px" size="mini" :disabled="flag"></el-input>
        </div>
        <div style="margin-top: 5px">
          <el-input v-model="orgName" placeholder="请输入节点名称" style="width: 200px" size="mini"></el-input>
        </div>
      </win>
    </div>


  </div>
</template>

<script>
  import Win from "@/views/components/win/Win";


  export default {
    name: "Organization",
    components:{
      Win
    },
    data(){
      return {
        identityTypeProps:{label:'comment'},
        regionProps: {label:'name'},//可访问园区选择显示字段
        props: {label:'orgName'},
        isShow:false,
        flag:false,
        searchInput:'',
        event:{},
        nodeCode:'',
        nodeName:'',
        statusKey:'',
        statusComment:'',
        statusType:'',
        type:'',//增加、删除
        treeType:'',//数类型，组织、身份类型
        orgName:'',
        orgCode:'',
        dptChangeList:[]
      }
    },
    computed:{
      dptList(){
        return this.$store.state.dptList
      },
      statusKeyList(){
        return this.$store.state.statusKeyList
      },
      regionList(){
        return this.$store.state.regionList
      }
    },
    methods :{

      dptNodeClick(node){
        this.nodeCode = node.orgIndexCode
        this.nodeName = node.orgName
        this.orgCode = node.orgIndexCode
        this.orgName = node.orgName
        this.treeType = 'dpt'
      },
      personKeyNodeClick(node){
        this.nodeName = node.comment
        this.nodeCode = node.statusKey
        this.orgCode = node.statusKey
        this.orgName = node.comment
        this.statusType = node.type
        this.treeType = 'personKey'
      },


      append(event) {
        this.event = event
        this.isShow = true
        this.flag = false
        this.orgCode = ''
        this.orgName = ''
        this.type = 'add'
      },

      update(event) {
        this.event = event
        this.isShow = true
        this.flag = true
        this.type = 'edit'
      },

      remove() {

        if(this.treeType == 'dpt'){
          this.del()
        }
        if(this.treeType == 'personKey'){
          this.delStatusKey()
        }
      },

      confirm(){
        console.log('确定',this.treeType,this.type)
        if(this.treeType == 'dpt' && this.type == 'add'){
          this.add()
        }
        if(this.treeType == 'dpt' && this.type == 'edit'){
          this.edit()
        }
        if(this.treeType == 'personKey' && this.type == 'add'){
          this.statusVal = this.nodeCode
          this.addStatusKey()
        }
        if(this.treeType == 'personKey' && this.type == 'edit'){
          this.statusVal = this.nodeCode
          this.addStatusKey()
        }
      },

      dptChange(a,b){
        b.checkedNodes.forEach(item => {
          this.dptChangeList.push(item.orgIndexCode)
        })
        this.$emit('dptChange',this.dptChangeList)
      },

      async add(){
        try {
          await this.$api.post('/api/emp/addOrg',{
            parentIndexCode:this.nodeCode,
            orgCode:this.orgCode,
            orgName:this.orgName
          })
          this.getData()
          this.$message.success('保存成功')
          this.isShow = false
        }catch (error){
          this.$message.error('错误信息：' + error.message)
        }
      },


      async addStatusKey(){
        try {
          await this.$api.post('/api/emp/addStatusKey',{
            statusKey:this.orgCode,
            statusVal:this.orgCode,
            comment:this.orgName,
            type:this.statusType
          })
          this.getData()
          this.$message.success('保存成功')
          this.isShow = false
        }catch (error){
          this.$message.error('错误信息：' + error.message)
        }
      },

      async edit(){
        try {
          await this.$api.post('/api/emp/editOrg',{
            orgIndexCode:this.nodeCode,
            orgName:this.orgName
          })
          this.getData()
          this.$message.success('修改成功')
          this.isShow = false
          this.orgName = ''
        }catch (error){
          this.$message.error('错误信息：' + error.message)
        }
      },

      async del(){
        try {
          await this.$api.get('/api/emp/delDpt',{
            orgIndexCode:this.nodeCode,
          })
          this.getData()
          this.$message.success('删除成功')
        }catch (error){
          console.log(error)
          this.$message.error('错误信息：' + error.message)
        }
      },
      async delStatusKey(){
        try {
          await this.$api.get('/api/emp/delStatusKey',{
            statusKey:this.nodeCode,
          })
          this.getData()
          this.$message.success('删除成功')
        }catch (error){
          console.log(error)
          this.$message.error('错误信息：' + error.message)
        }
      },

      //刷新树型节点数据
      treeRefresh(){
        this.getData()
      },

      async getData(){
        this.$store.commit('setDptList',[await this.$api.get('/api/emp/dptList')])
        this.$store.commit('setStatusKeyList',[await this.$api.get('/api/emp/statusKeyList')]);
      },

    }
  }
</script>

<style scoped>




</style>