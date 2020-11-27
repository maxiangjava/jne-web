<template>
  <div class="main">
    <top></top>
    <div class="search-box" >
      <div class="search-item">
        <div class="search-name">姓名</div>
        <input type="text" v-model="personName">
      </div>
      <div class="search-item">
        <div class="search-name">登记时间</div>
        <input type="text" v-model="personName">
      </div>
      <div class="search-item">
        <div class="search-name">授权类型</div>
        <el-select v-model="gender" placeholder="全部" style="width: 17em" size="small">

          <el-option label="身份" value="1"></el-option>
          <el-option label="女" value="2"></el-option>
        </el-select>
      </div>
      <div class="search-but">
        <button class="red-button" @click="search">查询</button>
        <button @click="reset">重置</button>
      </div>
    </div>
    <operate>
      <div slot="left">
        <button class="white-button">
          <img class="button-icon-text" src="@/assets/common/refresh.png">重新处理权限
        </button>
      </div>
    </operate>

    <div class="table-box">
      <el-table :data="$dataTest.tableData" border style="width: 100%" stripe="true" :cell-style="{padding:'8px'}"
                :header-cell-style="{color: 'black',background: '#ebebeb',padding:'10px'}">
        <el-table-column fixed="left" prop="name" label="姓名" width="150"> </el-table-column>
        <el-table-column prop="gender" label="性别" width="120"> </el-table-column>
        <el-table-column prop="organization" label="所属组织" width="150"> </el-table-column>
        <el-table-column prop="papersType" label="证件类型" width="100"> </el-table-column>
        <el-table-column prop="papersNum" label="证件号码" width="180"> </el-table-column>
        <el-table-column prop="workNum" label="工号" width="150"> </el-table-column>
        <el-table-column prop="mobile" label="手机号" width="150"> </el-table-column>
        <el-table-column prop="speck" label="拼音" width="150"> </el-table-column>
        <el-table-column fixed="right" label="生物特征" width="180" >
          <img class="table-icon" src="@/assets/common/mgz.png">0
          <img class="table-icon" src="@/assets/common/zhiwen.png">0
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <img class="table-icon" src="@/assets/common/edit.png">
          <img class="table-icon" src="@/assets/common/remove.png">
        </el-table-column>
      </el-table>
    </div>
    <div class="paging">
      <paging></paging>
    </div>
  </div>
</template>

<script>
import Top from "@/views/components/top/Top";
import Operate from "@/views/components/operate/Operate";
import Paging from "@/views/components/paging/Paging";
import axios from "axios";

export default {
  name: "VisitorJurisdictionDownload",
  components:{
    Top,
    Operate,
    Paging
  },
  data(){
    return {
      tableData:[],
      personName:'',
      gender:''
    }
  },
  created() {
    this.getData()
  },
  methods:{

    search(){
      console.log(this.gender)
      this.getData()
    },
    reset(){
      this.personName = ''
      this.gender = ''
      this.getData()
    },

    getData(){
      axios.get('/api/visitor/visitorEvents',{params:{
          personName:this.personName,
          gender:this.gender
        }}).then((resp) => {
        console.log(resp)
        if(200 == resp.data.code){
          console.log("成功")
          this.tableData = resp.data.data
          console.log(this.tableData)
        }
      }).catch(function (error) {
        console.log(error);
      });
    }
  }
}
</script>

<style scoped>

</style>