<template>
  <div class="main">
    <top :back=true></top>
    <div class="content">
      <div class="info">
        <div style="margin-top: 50px"></div>
        <el-form :model="form" :rules="rules" ref="form" label-width="120px" class="demo-form">
          <el-form-item label="姓名" prop="personName" required>
            <el-input v-model="form.personName" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender" required>
            <el-select v-model="form.gender" placeholder="请选择性别" style="width: 100%">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="身份证件" prop="certificateNo" required>
            <el-input v-model="form.certificateNo" placeholder="请输入身份证号码"></el-input>
          </el-form-item>
          <el-form-item label="编号" prop="jobNo" required>
            <el-input v-model="form.jobNo" placeholder="请输入编号"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="phoneNo" required>
            <el-input v-model="form.phoneNo" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item label="工作单位" prop="orgIndex" required>
            <el-cascader v-model="form.orgIndex" :options="dptList" :props="dptListProps" @change="handleChange" style="width: 100%"></el-cascader>
          </el-form-item>
          <el-form-item label="身份类型" prop="statusKey" required>
            <el-cascader v-model="form.statusKey" :options="personKeyList" :props="personKeyProps" @change="handleChange" style="width: 100%"></el-cascader>
          </el-form-item>
          <el-form-item label="可访问园区" prop="passSchoolArea" required>
            <el-cascader v-model="form.passSchoolArea" :options="regionList" :props="regionProps" @change="handleChange" style="width: 100%"></el-cascader>
          </el-form-item>
          <el-form-item label="担保人姓名">
            <el-input v-model="form.guarantorName" placeholder="请输入担保人姓名"></el-input>
          </el-form-item>
          <el-form-item label="担保人电话" prop="guarantorOrgPhone">
            <el-input v-model="form.guarantorPhone" placeholder="请输入担保人电话"></el-input>
          </el-form-item>
          <el-form-item label="担保人身份证">
            <el-input v-model="form.guarantorIDNo" placeholder="请输入担保人身份证号"></el-input>
          </el-form-item>
          <el-form-item label="卡号">
            <el-input v-model="form.cardNo" placeholder="请输入卡号"></el-input>
          </el-form-item>
          <el-form-item label="失效时间" prop="endTime">
            <el-date-picker type="date" placeholder="选择失效日期" v-model="form.endTime" style="width: 100%"></el-date-picker>
          </el-form-item>
          <el-form-item label="用户头像">

            <el-upload class="avatar-uploader" action="#" :show-file-list="false" :on-change="handleAvatarSuccess">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>

          </el-form-item>

          <el-form-item style="text-align: center">
            <el-button type="primary" @click="submitForm('form')">保存</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
            <el-button @click="$router.back()">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import Top from "@/views/components/top/Top";
  export default {
    name: "AddEmployee",
    components:{
      Top
    },
    created() {
      this.form = this.$route.query.employee
    },
    data(){
      return {
        dptList:JSON.parse(sessionStorage.getItem('dptList')),//部门选择数据
        personKeyList:JSON.parse(sessionStorage.getItem('personKeyList')),//身份类型选择数据
        regionList:JSON.parse(sessionStorage.getItem('regionList')),//可访问园区选择数据
        dptListProps: {label:'orgName',value:'orgIndexCode',checkStrictly:true},//部门选择显示字段
        personKeyProps: {label:'comment',value:'statusKey',checkStrictly:true},//身份类型选择显示字段
        regionProps: {label:'name',value:'indexCode',checkStrictly:true},//可访问园区选择显示字段
        form:{
          personName:'',
          gender:'',
          certificateType:'1',
          certificateNo:'',
          jobNo:'',
          orgIndex:[],
          statusKey:[],
          passSchoolArea:[null,null,"ArmyOfficer"],
          guarantorName:'',
          guarantorOrgName:'',
          guarantorOrgPhone:'',
          cardNo:'',
          endTime:'',
          phoneNo:'',
          recognitionCode:null
        },
        rules: {
          personName: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          gender: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          certificateNo: [
            { required: true, message: '请输入身份证号码', trigger: 'blur' },
            { pattern: /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
              message: '请输入正确的身份证号码', trigger: 'blur' }
          ],
          jobNo: [
            { required: true, message: '请输入编号', trigger: 'blur' }
          ],
          phoneNo: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { pattern: /^1[3456789]\d{9}$/,message: '请输入正确的手机号码', trigger: 'blur' }
          ],
          orgIndex: [
            { required: true, message: '请输入部门', trigger: 'change' }
          ],
          statusKey: [
            { required: true, message: '请输入身份类型', trigger: 'change' }
          ],
          passSchoolArea: [
            { required: true, message: '请输入园区', trigger: 'change' }
          ]
        },

        imageUrl: ''

      }
    },
    methods:{

      handleChange(value) {
        console.log(value);
      },


      handleAvatarSuccess(res) {
        this.imageToBase64(res.raw)
        this.imageUrl = this.form.recognitionCode
      },

      imageToBase64 (file) {
        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          this.form.recognitionCode = reader.result
        }
        reader.onerror = function (error) {
          console.log('Error: ', error)
        }
      },


      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.save()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      async save(){
        try {
          await this.$api.post('/api/emp/addPerson',this.form);
          this.$message.success('保存成功');
          this.$router.back();
        }catch (error){
          this.$message.error('保存错误，错误信息：' + error.message)
        }
      }
    }
  }
</script>

<style scoped>

  .content{
    height: 91vh;
    overflow: auto;
  }
  .info{
    margin: 0 auto;
    width: 40vw;
  }
  input{
    width: 100%;
  }
  span{
    color: red;
    margin-left: 5px;
  }

</style>