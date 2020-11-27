<template>
  <div class="main">
    <top></top>
    <el-button type="primary" icon="el-icon-plus" size="small" style="margin: 5px 0" @click="strategyAdd">添加</el-button>
    <div class="table-box">
      <el-table :data="strategyList" border style="width: 100%" :stripe="true" :cell-style="{padding:'8px'}"
                :header-cell-style="{color: 'black',background: '#ebebeb',padding:'10px'}">
        <el-table-column prop="strategyId" label="id" width="60"> </el-table-column>
        <el-table-column prop="strategyName" label="策略名称" width="100"> </el-table-column>
        <el-table-column prop="strategyType" label="策略类型" width="100"> </el-table-column>
        <el-table-column prop="timeType" label="时间类型" width="100"> </el-table-column>
        <el-table-column prop="timeLimit" label="时间期限" width="230"> </el-table-column>
        <el-table-column prop="area" label="适用地区" width="200">
          <template slot-scope="scope">
            <el-link type="primary" @click="empShowClick(scope.row.emps)">适用地区</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="explain" label="策略说明"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="270">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle size="mini"></el-button>
            <el-popconfirm confirm-button-text='删掉它' cancel-button-text='不用了' icon="el-icon-info"  icon-color="red"
                           title="您确定要删除吗？" @onConfirm="remove(scope.row.teamId)" style="margin-left: 10px">
              <el-button type="danger" icon="el-icon-delete" circle size="mini" slot="reference"></el-button>
            </el-popconfirm>
          </template>
          <el-switch v-model="strategyStatus" active-text="启用" inactive-text="禁用" style="margin-left: 20px"> </el-switch>
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
  name: "StrategyManage",//策略管理
  components:{
    Top,
  },
  data(){
    return {
      strategyList:[],
      strategyStatus:true
    }
  },
  created() {
    this.getData()
  },
  methods:{

    strategyAdd(){
      this.$router.push('/entrance/strategyAdd')
    },

    async getData(){
        this.strategyList = await this.$api.get('/api/strategy/strategyList')
    },
  }

}
</script>

<style scoped>

</style>