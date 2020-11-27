<template>
  <div class="main">
    <top></top>
    <div class="content">
      <div class="info">
        <div class="info-item">
          <h3>策略名称</h3>
          <el-input v-model="strategyName" placeholder="请输入内容"></el-input>
        </div>
        <div class="info-item">
          <h3>策略说明</h3>
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="explain"></el-input>
        </div>
        <div class="info-item">
          <h3>策略类型</h3>
          <el-radio v-model="strategyType" label="通行策略">通行策略</el-radio>
          <el-radio v-model="strategyType" label="禁止策略">禁止策略</el-radio>
        </div>
        <div class="info-item">
          <h3>策略期限</h3>
          <el-tabs v-model="timeType" @tab-click="handleClick" style="padding: 10px">
            <el-tab-pane label="按日管理" name="day" >
              <span>开始时间</span><el-time-picker v-model="startTime" size="small"></el-time-picker>
              <span>结束时间</span><el-time-picker v-model="endTime" size="small"></el-time-picker>
              <el-button type="primary" size="small" @click="aa" style="margin-left: 50px">确定</el-button>
            </el-tab-pane>
            <el-tab-pane label="按周管理" name="week">
              <div style="display: flex;align-items: center">
                <div>
                  <el-checkbox-group v-model="checkList">
                    <el-checkbox label="周一"></el-checkbox>
                    <el-checkbox label="周二"></el-checkbox>
                    <el-checkbox label="周三"></el-checkbox>
                    <el-checkbox label="周四"></el-checkbox>
                    <el-checkbox label="周五"></el-checkbox>
                    <el-checkbox label="周六"></el-checkbox>
                    <el-checkbox label="周日"></el-checkbox>
                  </el-checkbox-group>
                </div>
                <div>
                  <el-button type="primary" size="small" @click="aa" style="margin-left: 50px">确定</el-button>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="按月管理" name="month">每月1号到20号</el-tab-pane>
            <el-tab-pane label="按年管理" name="year">每年3月到5月</el-tab-pane>
            <el-tab-pane label="指定期限" name="assign">
              <span>开始时间</span><el-date-picker v-model="startTime" size="small" type="date"></el-date-picker>&nbsp;&nbsp;&nbsp;&nbsp;
              <span>结束时间</span><el-date-picker v-model="endTime" size="small" type="date"></el-date-picker>
              <el-button type="primary" size="small" @click="aa" style="margin-left: 50px">确定</el-button>
            </el-tab-pane>
          </el-tabs>
          <p>{{ timeLimit.timeType }} - {{ timeLimit.startTime }} - {{ timeLimit.endTime }}</p>
        </div>
        <div class="info-item">
          <h3>适用区域</h3>
          <div style="padding-right: 10px;margin-top: 10px;width: 20vw">
            <el-tree :data="regionList" :props="regionProps" @check-change="areaClick" show-checkbox></el-tree>
          </div>
        </div>
        <div class="info-item" style="margin-top: 100px;text-align: center">
          <el-button type="primary" @click="save" style="margin-left: 10px">确定</el-button>
          <el-button @click="cancel" style="margin-left: 10px">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Top from "@/views/components/top/Top";

  export default {
    name: "StrategyAdd",//添加策略
    components:{
      Top
    },
    data() {
      return {
        regionList:JSON.parse(sessionStorage.getItem('regionList')),//可访问园区选择数据
        regionProps: {label:'name'},//可访问园区选择显示字段
        strategyName:'',
        explain:'',
        strategyType:'通行策略',
        timeType: 'day',
        timeLimit:{},
        checkList:[],
        area:[],
        props: {label:'orgName'},
        startTime: new Date(),
        endTime: new Date()
      };
    },
    methods: {
      aa(){
        this.timeLimit = {timeType:this.timeType,startTime:this.startTime,endTime:this.endTime}
      },


      areaClick(value){
        this.area.push(value.indexCode)
      },

      async save(){
        try {
          await this.$api.post('/api/strategy/addStrategy',{
            strategyName:this.strategyName,
            strategyType:this.strategyType,
            timeType:this.timeType,
            startTime:this.startTime,
            endTime:this.endTime,
            timeLimit:this.timeLimit,
            area:this.area,
            explain:this.explain,
            strategyStatus:1
          })
          this.$message.success('保存成功')
          this.$router.back()
        }catch (error){
          this.$message.error('错误信息：' + error.message)
        }
      },

      cancel(){
        this.$router.back()
      },

      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content{
    height: 91vh;
    overflow: auto;
    .info{
      span{
        margin-left: 20px;
        margin-right: 10px
      }
      width: 50vw;
      margin: 0 auto;
      margin-bottom: 20px;
      .info-item{
        margin-top: 50px;
      }
    }
  }


</style>