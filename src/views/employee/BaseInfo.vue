<template>
  <div class="main">
    <top></top>
    <div class="content-left-right">
      <div class="left-box">
        <organization @dptChange="dptChange"></organization>
      </div>
      <div class="right-box">
        <el-form inline :model="form" ref="form" label-width="90px" class="demo-form" size="small" style="margin-top:10px">
          <el-form-item label="姓名" prop="personName">
            <el-input v-model="form.personName" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="身份证号码" prop="certificateNo">
            <el-input v-model="form.certificateNo" placeholder="请输入身份证号码"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="phoneNo">
            <el-input v-model="form.phoneNo" placeholder="请输入手机"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-select v-model="form.gender" placeholder="请选择性别" style="width: 177px">
              <el-option :label="item.label" :value="item.value" v-for="(item,index) in $dataTest.genderType" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="operate">
          <div>
            <el-button type="primary" icon="el-icon-plus" size="small" @click="addEmployee">添加</el-button>
          </div>
          <div>
            <el-button type="danger" icon="el-icon-search" @click="submitForm('form')" size="small">查询</el-button>
            <el-button type="warning" icon="el-icon-refresh" @click="resetForm('form')" size="small">重置</el-button>
          </div>
        </div>
        <div class="table-box-right">
          <el-table :data="tableData" border style="width: 100%" height="500" :cell-style="{padding:'8px'}"
                    :header-cell-style="{color: 'black',background: '#ebebeb',padding:'10px'}">
            <el-table-column prop="userName" label="姓名" width="150"> </el-table-column>
            <el-table-column prop="gender" label="性别" width="100" :formatter="$format.genderFormat"></el-table-column>
            <el-table-column prop="idNo" label="身份证号码" width="200"></el-table-column>
            <el-table-column prop="cardNo" label="编号" width="150"></el-table-column>
            <el-table-column prop="nation" label="民族" width="150" :formatter="$format.nationFormat"></el-table-column>
            <el-table-column prop="orgPathName" label="工作单位" width="250"> </el-table-column>
            <el-table-column prop="phoneNo" label="手机号码" width="150"> </el-table-column>
            <el-table-column fixed="right" label="操作" width="110">
              <template slot-scope="scope">
                <el-tooltip effect="dark" content="编辑" placement="top">
                  <i class="el-icon-edit icon-button" @click="edit(scope.row)"></i>
                </el-tooltip>
                <el-tooltip effect="dark" content="删除" placement="top">
                  <el-popconfirm confirm-button-text='删掉它' cancel-button-text='不用了' icon="el-icon-info"  icon-color="red"
                                 title="您确定要删除吗？" @onConfirm="delEmp(scope.row.personId)">
                    <i class="el-icon-delete icon-button" slot="reference"></i>
                  </el-popconfirm>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
          <div style="text-align: right;margin-top: 10px">
            <el-pagination :current-page="1"
                           :page-sizes="[10, 20, 50, 100]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="400">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Top from "@/views/components/top/Top";
  import Organization from "@/views/components/organization/Organization";

  export default {
    name: "UserBaseInfo",
    components:{
      Top,
      Organization,
    },
    data(){
      return {
        tableData:[],
        value1:'',
        nodeName:'',
        code:'',
        form:{
          personName:'',
          certificateNo:'',
          jobNo:'',
          gender:'',
          phoneNo:'',
          orgIndexCode:[]
        }
      }
    },
    created() {
      this.getData()
    },
    methods:{

      edit(employee){
        console.log(employee)
        this.$router.push({path:'/employee/editEmployee',query:{employee}})
      },

      addEmployee(){
        this.$router.push('/employee/addEmployee')
      },

      //组织选择改变时处理
      dptChange(list){
        console.log(list)
        this.form.orgIndexCode = list
      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.getData()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.getData()
      },
      async getData(){
        this.tableData = await this.$api.get('/api/emp/empList',this.form)
      },
      async delEmp(value){
        try {
          await this.$api.get('/api/emp/delPerson',{
            personIds:value
          })
          this.getData()
          this.$message.success('删除成功')
        }catch (error){
          this.$message.error('保存错误，错误信息：' + error.message)
        }
      }
    }
  }
</script>

<style scoped>

</style>