<template>
  <div class="main_start">
      <div class="form_Info" >
        <div class="form_title">欢迎您登录！</div>
        <van-form @failed="onFailed" @submit="onSubmit">
          <van-field
            v-model="username"
            name="username"
            placeholder="用户名"
            :rules="[{ required: true, message: '请输入用户名' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="password"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '请输入密码' }]"
          />
          <div class="form_sumit">
              <van-button round block type="info" class="validate_activeBtn" native-type="submit">
                登录
              </van-button>
          </div>
        </van-form>
        <div class="registAndForgets">
          <div class="regist" @click="goRegist">
            注册
          </div>
          <div class="forgetPsd">
            <a href="javascript:void(0);" class="active_img" @click="goForgetPsd">忘记密码?</a>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
// sha256加密
const sha256 = require("js-sha256").sha256; 
export default {
  name: "Login",
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods:{
    //登录校验不通过
    onFailed(errorInfo){
       console.log('failed', errorInfo);
    },
    //登录方法
    onSubmit() {
      let params = {
        username:this.username,
        password:sha256(this.password)//sha256加密
      }
      console.log('submit', params);
      this.$post('/login', params).then(data => {
        if(data.code === '0') {
          this.$toast.success("登录成功");
          // 登录成功后，跳到main
          // setTimeout(() =>{
            // 将用户token,menuList,userName保存到vuex中
            this.$store.commit('refreshCurrentUserInfo',{token: data.token,username:this.username});
            this.$router.push('/main');
          // },2000);
        } else {
          if(data && data.msg){
              this.$toast.fail(data.msg);
          }
        }
      })
    },
    //前往注册页
    goRegist() {
      this.$router.push('/register');
    },
    //前往忘记密码页
    goForgetPsd() {
      this.$router.push('/forgetPsd');
    }

  }
}
</script>
<style scoped>
</style>