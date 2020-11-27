<template>
  <div class="main">
    <top></top>

    <el-form inline :model="form" ref="form" label-width="90px" class="demo-form" size="small" style="margin-top:10px">
      <el-form-item label="车牌号码" prop="plateNo">
        <el-input v-model="form.plateNo" placeholder="请输入车牌号码"></el-input>
      </el-form-item>
      <el-form-item label="车牌类型" prop="plateType">
        <el-select v-model="form.plateType" placeholder="请选择车牌类型" style="width: 177px">
          <el-option :label="item.value" :value="item.key" v-for="(item,index) in plateTypeDict" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="车牌颜色" prop="plateColor">
        <el-select v-model="form.plateColor" placeholder="请选择车牌类型" style="width: 177px">
          <el-option :label="item.value" :value="item.key" v-for="(item,index) in plateColorDict" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="车辆类型" prop="vehicleType">
        <el-select v-model="form.vehicleType" placeholder="请选择车辆类型" style="width: 177px">
          <el-option :label="item.value" :value="item.key" v-for="(item,index) in carTypeDict" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="车辆颜色" prop="vehicleColor">
        <el-select v-model="form.vehicleColor" placeholder="请选择车牌类型" style="width: 177px">
          <el-option :label="item.value" :value="item.key" v-for="(item,index) in carColorDict" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="车主姓名" prop="personName">
        <el-input v-model="form.personName" placeholder="请输入车牌号码"></el-input>
      </el-form-item>
    </el-form>

    <div class="operate">
      <div>
        <el-button type="primary" icon="el-icon-plus" size="small" @click="vehicleAdd">添加</el-button>
      </div>
      <div>
        <el-button type="danger" icon="el-icon-search" @click="submitForm('form')" size="small">查询</el-button>
        <el-button type="warning" icon="el-icon-refresh" @click="resetForm('form')" size="small">重置</el-button>
      </div>
    </div>
    <div class="table-box">
      <el-table :data="tableData" border style="width: 100%" :cell-style="{padding:'8px'}"
                :header-cell-style="{color: 'black',background: '#ebebeb',padding:'10px'}">
        <el-table-column fixed="left" prop="plateNo" label="车牌号码" width="150"> </el-table-column>
        <el-table-column prop="plateType" label="车牌类型" width="120" :formatter="$format.plateTypeFormat"> </el-table-column>
        <el-table-column prop="plateColor" label="车牌颜色" width="150" :formatter="$format.plateColorFormat"></el-table-column>
        <el-table-column prop="vehicleType" label="车辆类型" width="100" :formatter="$format.vehicleTypeFormat"></el-table-column>
        <el-table-column prop="vehicleColor" label="车辆颜色" width="180" :formatter="$format.carColorFormat"></el-table-column>
        <el-table-column prop="description" label="描述" width="150"> </el-table-column>
        <el-table-column prop="personName" label="车主姓名" width="150"> </el-table-column>
        <el-table-column prop="personId" label="证件号码" width="150"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="edit(scope.row)"></el-button>
            <el-popconfirm confirm-button-text='删掉它' cancel-button-text='不用了' icon="el-icon-info"  icon-color="red"
                           title="您确定要删除吗？" @onConfirm="remove(scope.row.vehicleId)" style="margin-left: 10px">
              <el-button type="danger" icon="el-icon-delete" circle size="mini" slot="reference"></el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: right;margin-top: 10px">
        <el-pagination :current-page="1" :page-sizes="[10, 20, 50, 100]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="400">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import Top from "@/views/components/top/Top";

  export default {
    name: "CarInfo",
    components:{
      Top,
    },
    data(){
      return {
        carColorDict:JSON.parse(sessionStorage.getItem('carColor')) ,
        carTypeDict:JSON.parse(sessionStorage.getItem('carType')),
        plateColorDict:JSON.parse(sessionStorage.getItem('plateColor')),
        plateTypeDict:JSON.parse(sessionStorage.getItem('plateType')),
        tableData:[],
        form:{
          plateNo:'',
          plateType:'',
          plateColor:'',
          vehicleType:'',
          vehicleColor:'',
          personName:''
        }
      }
    },
    created() {
      this.getData()
    },
    methods:{
      edit(vehicle){
        console.log(vehicle)
        this.$router.push({path:'/vehicle/vehicleEdit',query:{vehicle}})
      },

      vehicleAdd(){
        this.$router.push('/vehicle/vehicleAdd')
      },

      search(){
        console.log(this.gender)
        this.getData()
      },
      reset(){
        this.plateNo = ''
        this.plateType = ''
        this.vehicleType = ''
        this.personName = ''
        this.getData()
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

      async remove(vehicleId){
        try {
          await this.$api.get('/api/car/delCar',{
            vehicleId
          })
          this.getData()
          this.$message.success('删除成功')
        }catch (error){
          this.$message.error('删除错误，错误信息：' + error.message)
        }
      },

      async getData(){
        this.tableData = await this.$api.get('/api/car/carList',this.form)
      },



    }
  }
</script>

<style scoped>

</style>