<template>
  <div style="margin: 10px">
    <div>
      <el-input class="base-input" v-model="loginName" placeholder="登录名"></el-input>
      <el-input class="base-input" v-model="userName" placeholder="用户姓名"></el-input>
      <el-input class="base-input" v-model="mobile" placeholder="手机号"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      <el-button type="info" @click="reset">重置</el-button>
    </div>
    <div style="margin: 20px 0 10px 0">
      <el-button type="primary" icon="el-icon-plus" size="small" @click="dialogFormVisible = true">添加用户</el-button>
      <el-button  icon="el-icon-refresh" size="small" @click="refresh">刷新</el-button>
    </div>
    <div style="width: 100%">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="userId" label="id" width="180"></el-table-column>
        <el-table-column prop="loginName" label="登录名" width="180"></el-table-column>
        <el-table-column prop="userName" label="用户姓名" width="280"></el-table-column>
        <el-table-column label="操作">
          <el-button size="mini" type="primary">编辑</el-button>
          <el-button size="mini" type="danger" >禁用</el-button>
          <el-button size="mini" type="success" >启用</el-button>
          <el-button size="mini" >重置密码</el-button>
        </el-table-column>
      </el-table>
    </div>


    <div>

      <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="登录名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="登录密码" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户角色" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="管理员" value="shanghai"></el-option>
              <el-option label="业务员" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户姓名" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>

    </div>


  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "User",
    data(){
      return {
        input:"",
        loginName:'',
        userName:'',
        mobile:'',
        dialogFormVisible:false,
        formLabelWidth:'100px',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        tableData: []
      }
    },
    created() {
      this.getData()
      this.title = this.$route.query.title
      console.log(this.title)
    },
    methods:{
      search(){
        this.getData()
      },
      reset(){
        this.loginName = ""
        this.userName = ""
        this.mobile = ""
      },
      refresh(){
        this.getData()
      },
      getData(){
        axios.post('/api/user/userList',{
          loginName : this.loginName,
          username : this.userName,
          mobile : this.mobile
        }).then((resp) => {
          console.log(resp)
          console.log(resp.data.code)
          if(200 == resp.data.code){
            console.log("成功")
            this.tableData = resp.data.data
          }
        }).catch(function (error) {
          console.log(error);
        });
      }
    }
  }
</script>

<style scoped>
  .base-input{
    width: 200px;
    margin-right: 10px;
  }
</style>