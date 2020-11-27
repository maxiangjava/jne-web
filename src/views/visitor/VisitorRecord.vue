<template>
  <div class="main">
    <top></top>
    <el-form inline :model="form" ref="form" label-width="90px" class="demo-form" size="small" style="margin-top:10px">
      <el-form-item label="姓名" prop="personName">
        <el-input v-model="form.personName" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="来访时间" prop="value1">
        <el-date-picker v-model="form.value1" type="datetimerange" range-separator="至" :picker-options="pickerOptions"
                        start-placeholder="开始日期" end-placeholder="结束日期" style="width: 350px">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="离开时间" prop="value2">
        <el-date-picker v-model="form.value2" type="datetimerange" range-separator="至" :picker-options="pickerOptions"
                        start-placeholder="开始日期" end-placeholder="结束日期" style="width: 350px">
        </el-date-picker>
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

    <div class="table-box">
      <el-table :data="tableData" border style="width: 100%;" stripe="true" :cell-style="{padding:'8px'}"
                :header-cell-style="{color: 'black',background: '#ebebeb',padding:'10px'}">
        <el-table-column prop="visitorName" label="姓名" width="120"> </el-table-column>
        <el-table-column prop="gender" label="性别" width="100" :formatter="$format.genderFormat"></el-table-column>
        <el-table-column prop="phoneNo" label="手机号码" width="150"> </el-table-column>
        <el-table-column prop="verificationCode" label="访客验证码" width="120"> </el-table-column>
        <el-table-column prop="receptionistName" label="被访对象" width="100"> </el-table-column>
        <el-table-column prop="privilegeGroupNames" label="所属组织" width="150"> </el-table-column>
        <el-table-column prop="visitPurpose" label="来访事由" width="100"> </el-table-column>
        <el-table-column prop="visitorStatus" label="状态" width="80"> </el-table-column>
        <el-table-column prop="visitStartTime" label="来访时间" width="220"> </el-table-column>
        <el-table-column prop="visitEndTime" label="离开时间" width="220"> </el-table-column>
        <el-table-column prop="visitorGroupId" label="名单分组" width="150"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle size="mini"></el-button>
            <el-popconfirm confirm-button-text='删掉它' cancel-button-text='不用了' icon="el-icon-info"  icon-color="red"
                           title="您确定要删除吗？" @onConfirm="remove(scope.row.teamId)" style="margin-left: 10px">
              <el-button type="danger" icon="el-icon-delete" circle size="mini" slot="reference"></el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: right;margin-top: 10px">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1"
                       :page-sizes="[10, 20, 50, 100]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="400">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Top from "@/views/components/top/Top";

export default {
  name: "VisitorRecord",//来访记录
  components:{
    Top,
  },
  data(){
    return {
      tableData:[],
      form:{
        personName:'',
        value1: '',
        value2: '',
        gender:''
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      }
    }
  },
  created() {
    this.getData()
  },
  methods:{

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
        this.tableData = await this.$api.get('/api/visitor/visitorEvents',this.form)
    },
  }
}
</script>

<style scoped>

</style>