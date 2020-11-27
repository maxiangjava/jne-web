<template>
  <div class="main">
    <top></top>
    <div class="content">
      <div class="info">
        <div style="margin-top: 50px"></div>
        <el-form :model="form" :rules="rules" ref="form" label-width="120px" class="demo-form">
          <el-form-item label="车牌号" prop="plateNo" required>
            <el-input v-model="form.plateNo" placeholder="请输入车牌号码"></el-input>
          </el-form-item>
          <el-form-item label="车主" prop="personId" required>
            <el-select v-model="form.personId" placeholder="请选择人员" style="width: 100%">
              <el-option :label="item.personName" :value="item.personId" v-for="(item,index) in empList" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="车主电话" prop="ownerPhone" required>
            <el-input v-model="form.ownerPhone" placeholder="请输入车主电话"></el-input>
          </el-form-item>
          <el-form-item label="车牌类型" prop="plateType" required>
            <el-select v-model="form.plateType" placeholder="请选择车牌类型" style="width: 100%">
              <el-option :label="item.value" :value="item.key" v-for="(item,index) in plateTypeDict" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="车牌颜色" prop="plateColor" required>
            <el-select v-model="form.plateColor" placeholder="请选择车牌颜色" style="width: 100%">
              <el-option :label="item.value" :value="item.key" v-for="(item,index) in plateColorDict" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="车辆类型" prop="vehicleType" required>
            <el-select v-model="form.vehicleType" placeholder="请选择车辆类型" style="width: 100%">
              <el-option :label="item.value" :value="item.key" v-for="(item,index) in carTypeDict" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="车辆颜色" prop="vehicleColor" required>
            <el-select v-model="form.vehicleColor" placeholder="请选择车辆颜色" style="width: 100%">
              <el-option :label="item.value" :value="item.key" v-for="(item,index) in carColorDict" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="允许的营区" prop="permitGate" required>
            <el-select v-model="form.permitGate" placeholder="请选择车辆通行的营区" style="width: 100%">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="失效时间" required>
            <el-date-picker type="date" placeholder="选择失效日期" v-model="form.endTime" style="width: 100%"></el-date-picker>
          </el-form-item>
          <el-form-item label="担保人姓名" prop="guarantorName">
            <el-input v-model="form.guarantorName" placeholder="请输入担保人姓名"></el-input>
          </el-form-item>
          <el-form-item label="担保人电话" prop="guarantorPhone">
            <el-input v-model="form.guarantorPhone" placeholder="请输入担保人电话"></el-input>
          </el-form-item>
          <el-form-item label="担保人身份证" prop="guarantorIDNo">
            <el-input v-model="form.guarantorIDNo" placeholder="请输入担保人身份证号"></el-input>
          </el-form-item>
          <el-form-item label="车辆描述" prop="description" required>
            <el-input type="textarea" v-model="form.description" placeholder="请输入车辆描述"></el-input>
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
    name: "VehicleAdd", //车辆添加
    components:{
      Top
    },
    data() {
      return {
        carColorDict:JSON.parse(sessionStorage.getItem('carColor')) ,
        carTypeDict:JSON.parse(sessionStorage.getItem('carType')),
        plateColorDict:JSON.parse(sessionStorage.getItem('plateColor')),
        plateTypeDict:JSON.parse(sessionStorage.getItem('plateType')),
        empList:[],
        form: {
          plateNo: '',//车牌号码
          personId: '',//人员ID
          ownerPhone: '',//车主电话
          plateType: '',//车牌类型
          plateColor: '',//车牌颜色
          vehicleType: '',//车辆类型
          vehicleColor: '',//车辆颜色
          permitGate: '',//允许的营区
          endTime: '',//失效时间
          guarantorName: '',//担保人名字
          guarantorPhone: '',//担保人电话
          guarantorIDNo: '',//担保人身份证
          description: ''//车辆描述
        },
        rules: {
          plateNo: [
            { required: true, message: '请输入车牌号码', trigger: 'blur' },
            { min: 7, max: 8, message: '长度在 7 到 8 个字符', trigger: 'blur' }
          ],
          ownerPhone: [
            { required: true, message: '请输入身份证号码', trigger: 'blur' },
            { pattern: /^1[3456789]\d{9}$/,message: '请输入正确的手机号码', trigger: 'blur' }
          ],
          plateType: [
            { required: true, message: '请选择车牌类型', trigger: 'change' }
          ],
          plateColor: [
            { required: true, message: '请选择车牌颜色', trigger: 'change' }
          ],
          vehicleType: [
            { required: true, message: '请选择车辆类型', trigger: 'change' }
          ],
          vehicleColor: [
            { required: true, message: '请选择车辆颜色', trigger: 'change' }
          ],
          permitGate: [
            { required: true, message: '请选择营区', trigger: 'change' }
          ],
          endTime: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          description: [
            { required: true, message: '请填写车辆描述', trigger: 'blur' }
          ]
        }
      };
    },
    created() {
      this.getData()
      this.form = this.$route.query.vehicle
    },
    methods: {
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
          await this.$api.post('/api/car/addCar',this.form)
          this.$message.success('保存成功')
          this.$router.back()
        }catch (error){
          this.$message.error('错误信息：' + error.message)
        }
      },
      async getData(){
          this.empList = await this.$api.get('/api/emp/empList',{
              value:this.value
          })
      },

    }

  }
</script>

<style lang="scss" scoped>
  .content{
    height: 91vh;
    overflow: auto;
    .info{
      width: 40vw;
      margin: 0 auto;
    }
  }
</style>