<template>
  <div class="backg">
    <div class="con">
      <h2>登陆页面</h2>
      <el-input v-model="user.username"></el-input>
      <el-input type="password" v-model="user.password" show-password></el-input>
      <el-button type="primary" @click="login">登陆</el-button>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex"
import {requestLogin} from "../../utils/request"
import {successAlert,warningAlert} from "../../utils/alert"
export default {
  data() {
    return {
      user:{
        username: "",
        password: "",
      }
      
    };
  },
  methods: {
    ...mapActions({
      "requestUesr":"userActions"
    }),
    login() {
      if(this.user.username != "" || this.user.password != ""){
        //请求
        requestLogin(this.user).then(res=>{
          successAlert(res.data.msg);
          //将数据存入vuex中
          this.requestUesr(res.data.list)
          this.$router.push("/index");
        })
        
      }else{
        warningAlert('请输入名户名或者密码')

      }
      
    },
  },
};
</script>

<style scoped>
.backg {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(#563443, #2f3d60);
  position: fixed;
  top: 0;
  left: 0;
}
.con {
  width: 400px;
  height: 300px;
  background: #ffffff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
}
h2 {
  text-align: center;
  margin: 10px;
}
.el-input,
.el-button {
  margin: 20px;
  width: 90%;
}
.el-button {
  color: #ffffff;
}
</style>