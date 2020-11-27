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
            <el-input v-model="form.phoneNo" placeholder="请输入手机号码"></el-input>
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
          <el-table :data="tableData" border style="width: 100%" :cell-style="{padding:'8px'}"
                    :header-cell-style="{color: 'black',background: '#ebebeb',padding:'10px'}">
            <el-table-column prop="personName" label="序号" width="150"> </el-table-column>
            <el-table-column prop="personName" label="车牌号码" width="150"> </el-table-column>
            <el-table-column prop="gender" label="车辆使用人员姓名" width="100"> </el-table-column>
            <el-table-column prop="gender" label="性别" width="100"> </el-table-column>
            <el-table-column prop="certificateNo" label="身份证类型" width="200"> </el-table-column>
            <el-table-column prop="certificateNo" label="身份证号码" width="200"> </el-table-column>
            <el-table-column prop="jobNo" label="工作单位" width="150"> </el-table-column>
            <el-table-column prop="personPhoto" label="手机号码" width="150"> </el-table-column>
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
    name: "VehicleOutIn",
    components:{
      Top,
      Organization
    },
    data(){
      return {
        tableData:[],
        props: {label:'orgName'},
        form:{
          personName:'',
          certificateNo:'',
          phoneNo:'',
          gender:''
        }
      }
    },
    created() {
      this.getData()
    },
    methods:{

      clickNodeName(name){
        console.log('66666' + name)
        this.nodeName = name
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
      }
    }
  }
</script>

<style scoped>

</style>