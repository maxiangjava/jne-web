<template>
  <div class="index">
    <div class="index-head">
      <div style="font-size: 1.5em;margin-left: 1vw">科大营门出入管理系统</div>
      <div style="margin-right: 1vw;display: flex">
        <div>
          <img class="icon-img" style="margin-right: 10px" src="@/assets/common/user-white.png" alt="">
        </div>
        <div>
          <el-dropdown>
            <span class="el-dropdown-link">
              {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item>关于我们</el-dropdown-item>
              <el-dropdown-item>意见反馈</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div @click="exit">
          <img class="icon-img" style="margin-left: 10px" src="@/assets/common/exit.png" alt="">
        </div>
      </div>
    </div>
    <div class="index-body">
      <div class="index-menu">
        <el-menu class="el-menu-vertical-left" text-color="#fff" active-text-color="#ffd04b"
                 :unique-opened="true" style="height: 100%">
          <el-submenu :index="oneIndex + ''" v-for="(oneMenu,oneIndex) in menuList" :key="oneIndex">
            <template slot="title">
              <i :class="oneMenu.icon"></i><span>{{oneMenu.menuName}}</span>
            </template>
            <el-menu-item :index="oneIndex + '-' + twoIndex" v-for="(twoMenu,twoIndex) in oneMenu.childMenu"
                          :key="twoIndex" @click="clickMenu(twoMenu.path)">
              <span style="margin-left: 30px">{{twoMenu.menuName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <div class="index-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import DATA from "@/views/data"

  export default {
    name: "Index",
    data(){
      return {
        userName:sessionStorage.getItem('userName'),
        menuTwoShow:false,
        currMenu:0,
        currSonMenu:0,
        menuList:DATA.menuList
      }
    },
    created() {
      this.getData()
    },
    methods:{

      clickMenu(path){
        this.$router.push(path);
      },

      exit(){
        this.$router.push("/login")
        sessionStorage.clear()
      },

      //缓存一些数据，如字典表、类型、状态
      async getData(){
        this.$store.commit('setDptList',[await this.$api.get('/api/emp/dptList')]);
        this.$store.commit('setRegionList',[await this.$api.get('/api/emp/regionList')]);
        this.$store.commit('setStatusKeyList',[await this.$api.get('/api/emp/statusKeyList')]);
        let dicList = await this.$api.get('/api/emp/dicList');
        dicList.forEach(item => {
          sessionStorage.setItem(item.type,JSON.stringify(item.list))
        })
      },

    }
  }
</script>

<style lang="scss" scoped>
  .index{
    .index-head{
      height: 5vh;
      width: 100vw;
      background-image: linear-gradient(-20deg, #2b5876 0%, #4e4376 100%);
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .el-dropdown-link {
        cursor: pointer;
        color: #fff;
      }
      .el-icon-arrow-down {
        font-size: 12px;
      }
      .icon-img{
        width: 1em;
        height: 1em;
        vertical-align: -2px;
      }
    }
    .index-body{
      display: flex;
      height: 95vh;
      .index-menu{
        height: 100%;
        width: 14vw;
      }
      .index-content{
        height: 100%;
        width: 86vw;
        background-color: white;
      }
    }
  }
</style>