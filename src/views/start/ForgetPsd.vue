<template>
  <div class="main_start">
      <div class="form_Info register_form" >
        <div class="form_title">{{$t('找回密码')}}</div>
        <div class="psd_form">
          <van-form @failed="onFailed"  @submit="onSubmit">
            <van-field
              v-model="username"
              required
              :label="$t('用户名')"
              name="username"
              :placeholder="$t('请输入用户名')"
              :rules="[{ required: true, message: this.$t('请输入用户名') }]"
            />
            <van-field
              v-model="phone"
              required
              :label="$t('手机号')"
              type="tel"
              name="phone"
              :placeholder="$t('请输入手机号')"
              :rules="[{ required: true, message: this.$t('请输入手机号') }]"
            />
            <van-field
              v-model="email"
              required
              type="email"
              :label="$t('邮箱地址')"
              name="email"
              :placeholder="$t('请输入邮箱地址')"
              :rules="[{ required: true, message: $t('请输入邮箱地址') },
              { pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/, message: $t('邮箱地址格式错误')}
              ]"
            />
            <div class="form_sumit">
                <van-button round block type="info" class="validate_activeBtn"  native-type="submit">
                  {{$t('下一步')}}
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
  name: "Login",
  data() {
    return {
      username: '',
      phone:'',
      email:''
    }
  },
  methods:{
    //登录校验不通过
    onFailed(errorInfo){
       console.log('failed', errorInfo);
    },
    //前往下一步重置密码
    onSubmit() {
      let params = {
        username:this.username,
        phone:this.phone,
        email:this.email
      }
      console.log('lostPWD', params);
      this.$post('/lostPWD', params).then(data => {
        if(data.code === '0') {
          // this.$toast.success("登录成功");
            // 将用户userName保存到vuex中
            this.$router.push('/resetPsd/'+this.username);
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