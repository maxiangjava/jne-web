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
          <el-form-item label="姓名" prop="gender">
            <el-select v-model="form.gender" placeholder="全部" style="width: 100%">
              <el-option :label="item.label" :value="item.value" v-for="(item,index) in $dataTest.genderType" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="来访时间" prop="startTime">
            <el-date-picker v-model="form.startTime" type="datetime" placeholder="选择开始时间" style="width: 190px"></el-date-picker>
          </el-form-item>
          <el-form-item label="离开时间" prop="endTime">
            <el-date-picker v-model="form.endTime" type="datetime" placeholder="选择开始时间" style="width: 190px"></el-date-picker>
          </el-form-item>
        </el-form>
        <div class="operate">
          <div>

          </div>
          <div>
            <el-button type="danger" icon="el-icon-search" @click="submitForm('form')" size="small">查询</el-button>
            <el-button type="warning" icon="el-icon-refresh" @click="resetForm('form')" size="small">重置</el-button>
          </div>
        </div>
        <div class="table-box-right">
          <el-table :data="tableData" border style="width: 100%" :cell-style="{padding:'8px'}"
                    :header-cell-style="{color: 'black',background: '#ebebeb',padding:'10px'}">
            <el-table-column prop="doorName" label="序号" width="150"> </el-table-column>
            <el-table-column prop="personName" label="姓名" width="150"> </el-table-column>
            <el-table-column prop="gender" label="性别" width="100"> </el-table-column>
            <el-table-column prop="certificateNo" label="身份证类型" width="200"> </el-table-column>
            <el-table-column prop="certificateNo" label="身份证号码" width="200"> </el-table-column>
            <el-table-column prop="jobNo" label="工作单位" width="150"> </el-table-column>
            <el-table-column prop="personPhoto" label="手机号码" width="150"> </el-table-column>
            <el-table-column prop="personPhoto" label="管理单位" width="150"> </el-table-column>
            <el-table-column prop="personPhoto" label="营门" width="150"> </el-table-column>
            <el-table-column prop="personPhoto" label="出入类别" width="150"> </el-table-column>
            <el-table-column prop="personPhoto" label="出入时间" width="150"> </el-table-column>
            <el-table-column prop="personPhoto" label="出入状态" width="150"> </el-table-column>
            <el-table-column prop="personPhoto" label="出入照片" width="150"> </el-table-column>
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
  name: "EmployeeOutIn",
  components:{
    Top,
    Organization,
  },
  data(){
    return {
      tableData:[],
      form:{
        dptChangeList:[],
        personName:'',
        gender:'',
        startTime:new Date(),
        endTime:new Date()
      }
    }
  },
  created() {
    this.getData()
  },
  methods:{

    //组织选择改变时处理
    dptChange(list){
      console.log(list)
      this.form.dptChangeList = list
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
      this.tableData = await this.$api.get('/api/event/inoutEvents',this.form)
    }
  }
}
</script>

<style scoped>

</style>