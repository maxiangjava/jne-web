<template>
  <div class="main">
    <top></top>
    <div class="content-left-right">
      <div class="left-box">
        <organization-operate></organization-operate>
        <organization></organization>
      </div>
      <div class="right-box">
        <search-box></search-box>
        <operate>
          <div slot="left">
            <button class="white-button">
              <img class="button-icon-text" src="@/assets/common/add-bold.png">添加
            </button>
            <button class="white-button" disabled="true">
              <img class="button-icon-text" style="opacity:0.5;" src="@/assets/common/remove.png">删除
            </button>
            <button class="white-button" disabled="true">
              <img class="button-icon-text" style="opacity:0.5;" src="@/assets/common/qiyong.png">启用
            </button>
            <button class="white-button" disabled="true">
              <img class="button-icon-text" style="opacity:0.5;" src="@/assets/common/jinyong.png">禁用
            </button>
            <button class="white-button">
              <img class="button-icon-text" src="@/assets/common/import.png">导入用户
            </button>
            <button class="white-button">
              <img class="button-icon-text" src="@/assets/common/export.png">导出用户
            </button>
            <button class="white-button">
              <img class="button-icon-text" src="@/assets/common/caiji.png">从Windows域同步用户
            </button>
          </div>
        </operate>
        <div class="table-box-right">
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
        <div class="paging-right">
          <paging></paging>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Top from "@/views/components/top/Top";
  import OrganizationOperate from "@/views/components/organization/OrganizationOperate";
  import Organization from "@/views/components/organization/Organization";
  import SearchBox from "@/views/components/search/SearchBox";
  import Operate from "@/views/components/operate/Operate";
  import Paging from "@/views/components/paging/Paging";

  export default {
    name: "Manage",
    components:{
      Top,
      OrganizationOperate,
      Organization,
      SearchBox,
      Operate,
      Paging
    }
  }
</script>

<style scoped>

</style>