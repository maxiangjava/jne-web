<template>
  <div>
    <div style="margin-left: 10px;height: 4vh;line-height: 4vh">{{$route.name}}</div>
    <el-tabs type="border-card" style="height: 91vh">
      <el-tab-pane label="按身份分配">
        <el-button type="primary" icon="el-icon-share" size="small" @click="relevance">关联策略</el-button>
        <div style="padding-right: 10px;margin-top: 10px">
          <el-tree :data="personKeyList" :props="identityTypeProps" @node-click="aa" show-checkbox></el-tree>
        </div>
      </el-tab-pane>
      <el-tab-pane label="按管理单位分配">
        <el-button type="primary" icon="el-icon-share" size="small" @click="relevance">关联策略</el-button>
        <div style="padding-right: 10px;margin-top: 10px">
          <el-tree :data="$dataTest.manageUnit" :props="props" @node-click="aa" show-checkbox></el-tree>
        </div>
      </el-tab-pane>
      <el-tab-pane label="按组分配">
        <el-button type="primary" icon="el-icon-share" size="small" @click="relevance">关联策略</el-button>
        <el-button type="primary" icon="el-icon-plus" size="small" @click="groupAdd">新建分组</el-button>
        <el-table :data="teamList" border style="width: 100%;margin-top: 5px" stripe="true" :cell-style="{padding:'8px'}"
                  :header-cell-style="{color: 'black',background: '#ebebeb',padding:'10px'}">
          <el-table-column prop="teamId" label="id" width="60"> </el-table-column>
          <el-table-column prop="teamName" label="组名称" width="200"> </el-table-column>
          <el-table-column prop="teamDesc" label="组说明"> </el-table-column>
          <el-table-column label="组人员" width="400">
            <template slot-scope="scope">
              <el-link type="primary" @click="empShowClick(scope.row.emps)">查看组成员</el-link>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="按人员分配">
        <el-button type="primary" icon="el-icon-share" size="small" @click="relevance">关联策略</el-button>
        <el-table :data="empList" border style="width: 100%;margin-top: 5px" height="500" :cell-style="{padding:'8px'}"
                  :header-cell-style="{color: 'black',background: '#ebebeb',padding:'10px'}">
          <el-table-column type="selection"  width="55"> </el-table-column>
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
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="策略列表" :visible.sync="strategyShow" width="70%">
      <el-table :data="$dataTest.strategyList" border style="width: 100%" stripe="true" :cell-style="{padding:'8px'}"
                :header-cell-style="{color: 'black',background: '#ebebeb',padding:'10px'}">
        <el-table-column prop="strategyId" type="selection" width="60"> </el-table-column>
        <el-table-column prop="strategyName" label="策略名称" width="100"> </el-table-column>
        <el-table-column prop="strategyType" label="策略类型" width="100"> </el-table-column>
        <el-table-column prop="timeType" label="时间类型" width="100"> </el-table-column>
        <el-table-column prop="timeLimit" label="时间期限" width="230"> </el-table-column>
        <el-table-column prop="area" label="适用地区" width="200"> </el-table-column>
        <el-table-column prop="explain" label="策略说明"> </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="strategyShow = false">取 消</el-button>
        <el-button type="primary" @click="strategyShow = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="组内成员" :visible.sync="empShow" width="40%">
      <el-table :data="groupEmpList">
        <el-table-column property="userName" label="姓名" width="150"></el-table-column>
        <el-table-column property="gender" label="性别" width="150" :formatter="$format.genderFormat"></el-table-column>
        <el-table-column property="idNo" label="身份证号"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "JurisdictionSet",//权限配置
    components:{
    },
    data(){
      return {
        personKeyList:JSON.parse(sessionStorage.getItem('personKeyList')),//身份类型
        empList:[],
        teamList:[],
        groupEmpList:[],
        strategyShow:false,
        empShow:false,
        identityTypeProps:{label:'comment'},
        props: {label:'orgName'}
      }
    },
    created() {
      this.getData()
    },
    methods:{
      empShowClick(value){
        this.groupEmpList = value
        this.empShow = true
      },

      relevance(){
        this.strategyShow = true
      },

      groupAdd(){
        this.$router.push('/entrance/groupAdd')
      },

      async getData(){
        this.empList = await this.$api.get('/api/emp/empList')
        this.teamList = await this.$api.get('/api/strategy/teamList')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content{

  }

</style>