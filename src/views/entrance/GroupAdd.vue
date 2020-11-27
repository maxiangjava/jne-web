<template>
  <div class="main">
    <top :back=true></top>
    <div class="content">
      <div class="info">
        <div style="margin-top: 50px"></div>
        <el-form :model="form" :rules="rules" ref="form" label-width="120px" class="demo-form">
          <el-form-item label="组名称" prop="teamName" required>
            <el-input v-model="form.teamName" placeholder="请输入组名称"></el-input>
          </el-form-item>
          <el-form-item label="组成员" prop="personIds" required>
            <el-transfer filterable :filter-method="filterMethod" filter-placeholder="请输入姓名查询" :props="props"
                         :data="empList" v-model="form.personIds" :titles="['待选人员', '已选人员']" :button-texts="['删除', '添加']">
            </el-transfer>
          </el-form-item>
          <el-form-item label="组描述" prop="teamDesc" required>
            <el-input type="textarea" v-model="form.teamDesc" placeholder="请输入组描述"></el-input>
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
    name: "GroupAdd",
    components:{
      Top
    },
    data() {
      return {
        empList: [],
        props: {label:'personName',key:'personId'},
        filterMethod(query, item) {
          return item.personName.indexOf(query) > -1;
        },
        form:{
          teamName:'',
          teamDesc:'',
          personIds: [],
        },
        rules: {
          teamName: [
            { required: true, message: '请输入组名称', trigger: 'blur' },
          ],
          personIds: [
            { required: true, message: '请选择成员', trigger: 'change' }
          ],
          teamDesc: [
            { required: true, message: '请填写组描述', trigger: 'blur' }
          ]
        }
      };
    },

    created() {
      this.getData()
    },
    methods:{
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
          await this.$api.post('/api/strategy/addTeam',this.form);
          this.$message.success('保存成功');
          this.$router.back();
        }catch (error){
          this.$message.error('错误信息：' + error.message);
        }
      },
      async getData(){
        this.empList = await this.$api.get('/api/emp/empList')
      }

    }


  }
</script>

<style lang="scss" scoped>

  .content{
    height: 91vh;
    overflow: auto;
    .info{
      width: 50vw;
      margin: 0 auto;
      .info-item{
        margin-top: 50px;
      }
    }
  }

</style>