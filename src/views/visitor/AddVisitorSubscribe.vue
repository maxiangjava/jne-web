<template>
  <div class="main">
    <top :back=true></top>
    <div class="content">
      <div class="info">
        <div style="margin-top: 20px"></div>
        <el-form :model="form" :rules="rules" ref="form" label-width="120px" class="demo-form">
          <el-form-item label="被访对象" prop="receptionistId" required>
            <el-select v-model="form.receptionistId" placeholder="请选择人员" style="width: 40%">
              <el-option :label="item.userName" :value="item.personId" v-for="(item,index) in empList" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="可访问园区" prop="schoolArea" required>
            <el-cascader v-model="form.schoolArea" :options="regionList" :props="regionProps" style="width: 40%"></el-cascader>
          </el-form-item>
          <el-form-item label="来访时间" prop="visitStartTime" required>
            <el-date-picker v-model="form.visitStartTime" type="datetime" placeholder="选择日期时间" style="width: 40%"></el-date-picker>
          </el-form-item>
          <el-form-item label="离开时间" prop="visitStartTime" required>
            <el-date-picker v-model="form.visitEndTime" type="datetime" placeholder="选择日期时间" style="width: 40%"></el-date-picker>
          </el-form-item>
          <el-form-item label="来访事由" prop="visitPurpose" required>
            <el-input type="textarea" v-model="form.visitPurpose" placeholder="请输入来访事由"></el-input>
          </el-form-item>
          <el-divider content-position="left">访客信息</el-divider>
          <el-button type="primary" icon="el-icon-plus" size="small" @click="addVisitor" style="margin-bottom: 10px">添加</el-button>
          <el-table :data="form.visitorInfoList" border style="width: 100%" :cell-style="{padding:'8px'}"
                    :header-cell-style="{color: 'black',background: '#ebebeb',padding:'10px'}">
            <el-table-column prop="visitorName" label="访客姓名" width="150"> </el-table-column>
            <el-table-column prop="gender" label="性别" width="100"> </el-table-column>
            <el-table-column prop="phoneNo" label="手机号码" width="150"> </el-table-column>
            <el-table-column prop="plateNo" label="车牌号码" width="150"> </el-table-column>
            <el-table-column prop="certificateNo" label="证件号码" width="200"> </el-table-column>
            <el-table-column prop="visitorWorkUnit" label="来访单位" > </el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
              <template slot-scope="scope">
                <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="delVisitor(scope.row.certificateNo)"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-form-item style="text-align: center;margin-top: 100px">
            <el-button type="primary" @click="submitForm('form')">保存</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
            <el-button @click="$router.back()">返回</el-button>
          </el-form-item>
        </el-form>
      </div>


      <el-dialog title="访客信息" :visible.sync="visitorInfoShow" width="50%">
        <el-form :model="visitorInfo" :rules="visitorInfoRules" ref="visitorInfo" label-width="80px">
          <el-form-item label="访客姓名" prop="visitorName" required>
            <el-input v-model="visitorInfo.visitorName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender" required>
            <el-select v-model="visitorInfo.gender" placeholder="请选择性别" style="width: 100%">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码" prop="certificateNo" required>
            <el-input v-model="visitorInfo.certificateNo"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="phoneNo" required>
            <el-input v-model="visitorInfo.phoneNo"></el-input>
          </el-form-item>
          <el-form-item label="车牌号码">
            <el-input v-model="visitorInfo.plateNo"></el-input>
          </el-form-item>
          <el-form-item label="来访单位">
            <el-input v-model="visitorInfo.visitorWorkUnit"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="visitorInfoShow = false">取 消</el-button>
          <el-button type="primary" @click="submitVisitorForm('visitorInfo')">保存</el-button>
        </div>
      </el-dialog>



    </div>
  </div>
</template>

<script>
  import Top from "@/views/components/top/Top";

  export default {
    name: "AddVisitorSubscribe",//访客添加
    components:{
      Top
    },
    data(){
      return {
        empList:[],
        regionList:JSON.parse(sessionStorage.getItem('regionList')),//可访问园区选择数据
        regionProps: {label:'name',value:'indexCode',checkStrictly:true},//可访问园区选择显示字段
        visitorInfoShow:false,
        visitorInfo:{
          visitorName:'',
          gender:'',
          phoneNo:'',
          plateNo:'',
          certificateType:'111',
          certificateNo:'',
          visitorWorkUnit:''
        },
        visitorInfoRules:{
          visitorName: [
            { required: true, message: '请输入访客姓名', trigger: 'blur' }
          ],
          gender: [
            { required: true, message: '请选择访客性别', trigger: 'blur' }
          ],
          phoneNo: [
            { required: true, message: '请输入访客手机号码', trigger: 'blur' },
            { pattern: /^1[3456789]\d{9}$/,message: '请输入正确的手机号码', trigger: 'blur' }
          ],
          certificateNo: [
            { required: true, message: '请输入访客身份证号', trigger: 'blur' },
            { pattern: /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
              message: '请输入正确的身份证号码', trigger: 'blur' }
          ]
        },
        form:{
          receptionistId1:'',
          schoolArea:[],
          visitStartTime:new Date(),
          visitEndTime:new Date(),
          visitPurpose:'',
          visitorInfoList:[],
        },
        rules: {
          receptionistId: [
            { required: true, message: '请选择被访对象', trigger: 'blur' }
          ],
          schoolArea: [
            { required: true, message: '请选择组织', trigger: 'change' }
          ],
          visitStartTime: [
            { type: 'date', required: true, message: '请选择来访时间', trigger: 'change' }
          ],
          visitEndTime: [
            { type: 'date', required: true, message: '请选择离开时间', trigger: 'change' }
          ],
          visitPurpose: [
            { required: true, message: '请输入来访事由', trigger: 'blur' }
          ]
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
            this.save();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      submitVisitorForm(formName) {
        console.log(formName)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let info = JSON.stringify(this.visitorInfo)
            this.form.visitorInfoList.push(JSON.parse(info))
            this.visitorInfoShow = false
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      addVisitor(){
        this.visitorInfoShow = true
      },
      delVisitor(id){
        console.log(id)
        this.form.visitorInfoList = this.form.visitorInfoList.filter((item)=>{
          console.log(item.certificateNo)
          return item.certificateNo != id
        })
      },


      async getData(){
        this.empList = await this.$api.get('/api/emp/empList')
      },

      async save(){
        this.tableData = await this.$api.post('/api/visitor/addVisitorAppointment',this.form)
        this.$router.back()
      },

    }
  }
</script>

<style lang="scss" scoped>

  .content{
    height: 91vh;
    overflow: auto;
    .info{
      width: 70vw;
      margin: 0 auto;
      .info-input{
        width: 40vw;
      }
      .input-item{
        margin-top: 30px;
      }
    }
  }
  .show{
    position: absolute;
    width: 400px;
    border: 1px solid gray;
    background-color: #fff;
  }
  .show-item{
    margin: 3px;
  }
  .show-item:hover{
    background-color: #e2d9d9;
  }


  span{
    color: red;
    margin-left: 5px;
  }
</style>