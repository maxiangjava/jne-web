<template>
  <div class="login">
    <div class="sys-name">科大营门出入管理系统</div>
    <div class="login-input">
      <div style="margin: 40px">
        <div class="title">欢迎登录</div>
        <div style="margin-top: 15px">
          <el-input v-model="loginName" placeholder="请输入您的用户名"></el-input>
        </div>
        <div style="margin-top: 10px">
          <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
          <div>
            <input type="checkbox" style="width: 1.2em;height: 1.2em;vertical-align: -2px;">记住用户名
          </div>
        </div>
        <div class="but"><button @click="login">登录</button></div>
        <div style="margin-top: 10px">
          <img class="icon-img" src="@/assets/common/arrow-double-right.png" alt="">
          <span style="color: gray;font-size: 0.9em"> 为了保证您的账号安全，请安装根证书！如已安装，请忽略！</span>
          <a href="#" style="color: red">下载</a>
        </div>
      </div>

    </div>


  </div>
</template>

<script>

  export default {
    name: "Login",
    data(){
      return {
        loginName:'',
        password:'',
      }
    },
    created() {
      var _this = this;
      document.onkeydown = function(e) {
        if(e.code == 'Enter'){
          _this.login()
        }
      };
    },
    methods:{

      async login(){
        try {
          await this.$api.post('/api/login/userLogin',{
            loginName:this.loginName,
            password:this.password
          })
          sessionStorage.setItem('userName',this.loginName)
          this.$router.push("/index")
        }catch (error){
          alert(error.message)
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .login{
    width: 100vw;
    height: 100vh;
    background-image: url("../assets/login.png");
    background-repeat:no-repeat;
    background-size:100% 100%;
    -moz-background-size:100% 100%;

    .sys-name{
      color: white;
      font-size: 1.5em;
      position: absolute;
      left: 3vw;
      top:3vh;
    }

    .login-input{
      background-color: white;
      border-radius: 5px;
      width: 400px;
      height: 350px;
      position: absolute;
      right: 12vw;
      top:calc((100vh - 350px) / 2);

      input{
        width: 100%;
        height: 2em;
        font-size: 1em;
        margin-top: 10px;
      }
      input:focus {
        outline: none;
      }



      .title{
        width: 100%;
        height: 15%;
        font-size: 1.2em;
        padding-top: 10px;
      }
      .but{
        width: 100%;
        height: 20%;

        button{
          margin-top: 30px;
          padding: 0;
          width: 102%;
          height: 2.6em;
          font-size: 1.1em;
          background-color: #e72528;
          border: none;
          color: white;
        }
      }
      .icon-img{
        width: 1em;
        height: 1em;
        vertical-align: -2px;
      }


    }
  }
</style>