<template>
  <!-- this.$t('用户')或者$t('用户名') -->
  <div class="main_start">
      <!-- <select @change="changeLangFn" v-model="lang">
        <option value="">选择语言</option>
        <option value="cn">中文</option>
        <option value="en">马来西亚-English</option>
      </select> -->
      <div class="form_Info" >
        <div class="form_title">{{this.$t('欢迎您登录！')}}</div>
        <van-form @failed="onFailed" @submit="onSubmit">
          <van-field
            v-model="username"
            name="username"
            :placeholder="this.$t('用户名')"
            :rules="[{ required: true, message:  this.$t('请输入用户名')}]"
          />
          <van-field
            v-model="password"
            type="password"
            name="password"
            :placeholder="this.$t('请输入密码')"
            :rules="[{ required: true, message: this.$t('请输入密码') }]"
          />
          <div class="form_sumit">
              <van-button round block type="info" class="validate_activeBtn" native-type="submit">
                {{$t('登录')}}
              </van-button>
          </div>
        </van-form>
        <div class="registAndForgets">
          <div class="regist" @click="goRegist">
            {{$t('注册')}}
          </div>
          <div class="forgetPsd">
            <a href="javascript:void(0);" class="active_img" @click="goForgetPsd">{{$t('忘记密码')}}?</a>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
// sha256加密
const sha256 = require("js-sha256").sha256; 
//切换vant国际化组件语言
import { vantLocales} from '../../lang/index';

export default {
  name: "Login",
  data() {
    return {
      lang:'',//语言
      username: '',
      password: '',
    }
  },
  mounted(){
    // this.$i18n.locale 要传key
    this.lang = this.$i18n.locale;
    console.log('登录页挂载时候语言',this.$i18n.locale);
    this.changeLangFn();
  },
  methods:{
    changeLangFn(){
      //更改vant组件的中英文语言
      vantLocales(this.lang);
      this.$i18n.locale = this.lang;
      console.log('此时此刻语言',this.$i18n.locale);
      //如果切换用显示这个 
      //  window.localStorage.setItem("langType", this.lang);
    },
    //登录校验不通过
    onFailed(errorInfo){
       console.log('failed', errorInfo);
    },
    //登录方法
    onSubmit() {
      let params = {
        username:this.username,
        // password:this.password
        password:sha256(this.password)//sha256加密
      }
      console.log('submit', params);
      this.$post('/login', params).then(data => {
        if(data.code === '0') {
          this.$toast.success(this.$t('登录成功'));
          // 登录成功后，跳到main
          // setTimeout(() =>{
            // 将用户token,menuList,userName保存到vuex中
            this.$store.commit('refreshCurrentUserInfo',
            {token: data.token,
            username:this.username,//用户名
            name:data.name//昵称
            });
            //暂时跳到我的代运单页
            this.$router.push('/myWaybill');
            // this.$router.push('/main');
            
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