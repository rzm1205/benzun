<template>
  <div class="main_start">
      <div class="form_Info register_form" >
        <div class="form_title">重置密码</div>
        <div class="psd_form">
          <van-form @failed="onFailed" @submit="onSubmit">
              <van-field
                v-model="newPwd"
                name="newPwd"
                required
                type="password"
                label="密码"
                placeholder="请输入密码"
                :rules="[{ required: true, message: '请输入密码' }]"
              />
              <van-field
                v-model="newPwd2"
                required
                name="newPwd2"
                type="password"
                label="确认密码"
                placeholder="请再次输入密码"
                @blur="validatePass2" 
                :error-message="errMsg" 
                :rules="[
                  { required: true, message: '请再次输入密码' }
                ]"
              />
              <div class="form_sumit">
                  <van-button round block type="info" class="validate_activeBtn"  native-type="submit">
                    确认
                  </van-button>
              </div>
            </van-form>

        </div>
        
      </div>
  </div>
</template>
<script>
// sha256加密
const sha256 = require("js-sha256").sha256; 
export default {
  name: "ResetPsd",
  data() {
    return {
      username:this.$route.params.username,
      newPwd:'',
      newPwd2:'',
      errMsg:''
    }
  },
  methods:{
    // 校验函数返回 true 表示校验通过，false 表示不通过
    validatePass2(){
      if(this.newPwd !== this.newPwd2) {
        this.errMsg = '两次输入密码不一致'
        return false
      } else {
        this.errMsg = '';
        return true
      }
    },
    //登录校验不通过
    onFailed(errorInfo){
       console.log('failed', errorInfo);
    },
    //重置
    onSubmit() {
      let params = {
        username:this.username,
        password:sha256(this.newPwd),//不用传后台。前端做一下密码是否输入一致
        // password:sha256(this.newPwd2)//sha256加密
      }
      console.log('resetPWD', params);
      this.$post('/resetPWD', params).then(data => {
        if(data.code === '0') {
          this.$toast.success("重置成功");
          this.$router.push('/login');
        } else {
          if(data && data.msg){
              this.$toast.fail(data.msg);
          }
        }
      })
    }
  }
}
</script>
<style scoped>
</style>