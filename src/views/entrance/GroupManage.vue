<template>
  <div class="main">
    <top></top>
    <search-box></search-box>
    <el-button type="primary" icon="el-icon-plus" size="small" style="margin: 5px 0" @click="groupAdd">添加</el-button>
    <div class="table-box">
      <el-table :data="teamList" border style="width: 100%" stripe="true" :cell-style="{padding:'8px'}"
                :header-cell-style="{color: 'black',background: '#ebebeb',padding:'10px'}">
        <el-table-column prop="teamId" label="id" width="60"> </el-table-column>
        <el-table-column prop="teamName" label="组名称" width="200"> </el-table-column>
        <el-table-column prop="teamDesc" label="组说明"> </el-table-column>
        <el-table-column label="组人员" width="400">
          <template slot-scope="scope">
            <el-link type="primary" @click="empShowClick(scope.row.emps)">查看组成员</el-link>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="270">
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
    <el-dialog title="组内成员" :visible.sync="empShow" width="40%">
      <el-table :data="empList">
        <el-table-column property="userName" label="姓名" width="150"></el-table-column>
        <el-table-column property="gender" label="性别" width="150" :formatter="$format.genderFormat"></el-table-column>
        <el-table-column property="idNo" label="身份证号"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import Top from "@/views/components/top/Top";
import SearchBox from "@/views/components/search/SearchBox";

export default {
  name: "GroupManage",//分组管理
  components:{
    Top,
    SearchBox,
  },
  data(){
    return {
      teamList:[],
      empList: [],
      aa:'',
      empShow:false,
      strategyStatus:true
    }
  },
  created() {
    this.getData()
  },
  methods:{
    async remove(id){
      console.log(id)
      await this.$api.get('/api/strategy/delTeam',{
        teamId:id
      })
      this.getData()
    },

    empShowClick(value){
      this.empList = value
      this.empShow = true
    },

    groupAdd(){
      this.$router.push('/entrance/groupAdd')
    },
    async getData(){
        this.teamList = await this.$api.get('/api/strategy/teamList')
    }
  }

}
</script>

<style scoped>

</style>