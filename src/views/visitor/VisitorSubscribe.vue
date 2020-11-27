<template>
  <div class="main">
    <top></top>


    <el-form inline :model="form" ref="form" label-width="90px" class="demo-form" size="small" style="margin-top:10px">
      <el-form-item label="车牌号码" prop="personName">
        <el-input v-model="form.personName" placeholder="请输入车牌号码"></el-input>
      </el-form-item>
      <el-form-item label="开始时间" prop="startTime">
        <el-date-picker v-model="form.startTime" type="datetime" size="small" placeholder="选择开始时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="endTime">
        <el-date-picker v-model="form.endTime" type="datetime" size="small" placeholder="选择开始时间"></el-date-picker>
      </el-form-item>
    </el-form>



    <div class="operate">
      <div>
        <el-button type="primary" icon="el-icon-plus" size="small" @click="addSubscribe">添加</el-button>
      </div>
      <div>
        <el-button type="danger" icon="el-icon-search" @click="submitForm('form')" size="small">查询</el-button>
        <el-button type="warning" icon="el-icon-refresh" @click="resetForm('form')" size="small">重置</el-button>
      </div>
    </div>
    <div class="table-box">
      <el-table :data="tableData" border style="width: 100%" :stripe="true" :cell-style="{padding:'8px'}"
                :header-cell-style="{color: 'black',background: '#ebebeb',padding:'10px'}">
        <el-table-column prop="targetName" label="姓名" width="150"></el-table-column>
        <el-table-column prop="schoolArea" label="可访问园区" width="180" :formatter="$format.schoolAreaFormat"></el-table-column>
        <el-table-column prop="type" label="状态" width="100" :formatter="$format.typeFormat"></el-table-column>
        <el-table-column prop="startTime" label="开始时间" width="180" :formatter="$format.startTimeFormat"></el-table-column>
        <el-table-column prop="endTime" label="结束时间" width="180" :formatter="$format.endTimeFormat"></el-table-column>
        <el-table-column prop="visitingReason" label="来访事由"></el-table-column>
        <el-table-column label="访客信息">
          <template slot-scope="scope">
            <el-link type="primary" @click="look(scope.row.visitorInfoEntities)">查看访客信息</el-link>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="edit(scope.row)"></el-button>
            <el-popconfirm confirm-button-text='删掉它' cancel-button-text='不用了' icon="el-icon-info"  icon-color="red"
                           title="您确定要删除吗？" @onConfirm="remove(scope.row.appointRecordId)" style="margin-left: 10px">
              <el-button type="danger" icon="el-icon-delete" circle size="mini" slot="reference"></el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: right;margin-top: 10px">
        <el-pagination :current-page="1"
                       :page-sizes="[10, 20, 50, 100]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="400">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="访客信息" :visible.sync="isShow" width="40%">
      <el-table :data="list">
        <el-table-column property="name" label="姓名" width="150"></el-table-column>
        <el-table-column property="gender" label="性别" width="150" :formatter="$format.genderFormat"></el-table-column>
        <el-table-column property="idNo" label="身份证号"></el-table-column>
        <el-table-column property="phoneNo" label="手机号"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
  import Top from "@/views/components/top/Top";

  export default {
    name: "VisitorSubscribe",//访客预约
    components:{
      Top,
    },
    data(){
      return {
        tableData:[],
        list:[],
        isShow:false,
        personName:'',
        gender:'',
        form:{
          personName:'',
          startTime:'',
          endTime:''
        }
      }
    },
    created() {
      this.getData()
    },
    methods:{
      edit(){
        let a = 'root000000,7d89ccf5-c9c4-445f-bf46-7030581084b2,35c0b06e-ff37-481a-9598-9675d890763d'
        console.log(a)
        let b = a.split(',')
        console.log(b)
        console.log(b.length)
        let c = '35c0b06e-ff37-481a-9598-9675d890763d'
        console.log(c)
        let d = c.split(',')
        console.log(d)
        console.log(d.length)
      },

      look(value){
        this.list = value
        this.isShow = true
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

      addSubscribe(){
        this.$router.push('addVisitorSubscribe')
      },


      async remove(appointRecordId){
        try {
          await this.$api.get('/api/visitor/delAppointment',{
            appointRecordId
          })
          this.getData()
          this.$message.success('删除成功')
        }catch (error){
          this.$message.error('删除错误，错误信息：' + error.message)
        }
      },

      async getData(){
        this.tableData = await this.$api.get('/api/visitor/visitorAppointmentList',this.form)
      },

    }
  }
</script>

<style scoped>

</style>