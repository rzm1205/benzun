<template>
  <div class="main_start">
      <div class="form_Info register_form" >
        <div class="form_title">{{$t('欢迎您注册！')}}</div>
        <div class="psd_form">
           <van-form @failed="onFailed" @submit="onSubmit">
              <van-field
                v-model="username"
                required
                :label="$t('用户名')"
                name="username"
                :placeholder="$t('请输入用户名')"
                @blur="checkIsStoreDataBase('username')"
                :error-message="errMsg_username" 
                :rules="[{ required: true, message: this.$t('请输入用户名')}]"
              />
              <van-field
                v-model="name"
                required
                :label="$t('昵称')"
                name="name"
                :placeholder="$t('请输入昵称')"
                :rules="[{ required: true, message: this.$t('请输入昵称') }]"
              />
              <van-field
                v-model="password"
                required
                type="password"
                :label="$t('密码')"
                name="password"
                :placeholder="$t('请输入密码')"
                :rules="[{ required: true, message: this.$t('请输入密码')}]"
              />
              <van-field
                v-model="password2"
                required
                type="password"
                :label="$t('确认密码')"
                name="password2"
                @blur="validatePass2" 
                :placeholder="$t('请再次输入密码')"
                :error-message="errMsg" 
                :rules="[{ required: true, message: this.$t('请再次输入密码')}]"
              />
              <van-field
                v-model="phone"
                required
                type="tel"
                :label="$t('手机号')"
                name="phone"
                :placeholder="$t('请输入手机号')"
                @blur="checkIsStoreDataBase('phone')"
                :error-message="errMsg_phone" 
                :rules="[{ required: true, message: this.$t('请输入手机号')}]"
              />
              <van-field
                v-model="email"
                required
                type="email"
                :label="$t('邮箱地址')"
                name="email"
                @blur="checkIsStoreDataBase('email')"
                :placeholder="$t('请输入邮箱地址')"
                :error-message="errMsg_email" 
                :rules="[{ required: true, message: this.$t('请输入邮箱地址') },
                { pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/, message: this.$t('邮箱地址格式错误')}
                ]"
              />
              <div class="form_sumit">
                  <van-button round block type="info" class="validate_activeBtn" native-type="submit" >
                    {{$t('注册')}}
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
//获取地址栏参数
import { getUrlKey } from '@/util/common.js';

export default {
  name: "Login",
  data() {
    return {
      username: '',//用户名
      name:'',//昵称
      password: '',
      password2: '',
      errMsg:'',
      errMsg_username:'',
      errMsg_phone:'',
      errMsg_email:'',
      phone:'',
      email:'',
      recoId:''//推荐人id====如果是点击别的用户的推广链接进来的注册用户界面，肯定会带一个recoId，这个是推广人id，如果有的话，就传，没有就不传
    }
  },
  created(){
    // console.log(getUrlKey('recoId',window.location.href));
  },
  methods:{
     // 校验函数返回 true 表示校验通过，false 表示不通过
    validatePass2(){
      if(this.password !== this.password2) {
        this.errMsg = this.$t('两次输入密码不一致');
        return false
      } else {
        this.errMsg = '';
        return true
      }
    },
    // 校验用户名手机号，邮箱是否重复，是否注册过
    checkIsStoreDataBase(info){
      let url = '';
      let params = {};
      if(info === 'username'){
        url = '/validataUsername';
        params = {
          username:this.username
        }
      }else if(info === 'phone'){
        url = '/validataPhone';
        params = {
          phone:this.phone
        }
      }else if(info === 'email'){
        url = '/validataEmail';
        params = {
          email:this.email
        }
      }
      this.$post(url, params).then(data => {
        if(data.code === '0') {
          // this.$toast.success("注册成功");
        } else {
          if(data && data.msg){
              this.$toast.fail(data.msg);
              // if(info === 'username'){
              //  this.errMsg_username = data.msg;
              // }else if(info === 'phone'){
              //   this.errMsg_phone = data.msg;
              // }else if(info === 'email'){
              //   this.errMsg_emial = data.msg;
              // }
          }
        }
      })
    },
    //登录校验不通过
    onFailed(errorInfo){
       console.log('failed', errorInfo);
    },
    //注册方法
    onSubmit() {
      //推荐人id 从地址栏中获取
      this.recoId = getUrlKey('recoId',window.location.href);
      let params = {
        username:this.username,
        name:this.name,
        password:sha256(this.password),//sha256加密
        // password2:sha256(this.password2),//不用传后台。前端做一下密码是否输入一致
        phone:this.phone,
        email:this.email,
        recoId:this.recoId?this.recoId:''
      }
      console.log('register', params);
      this.$post('/register', params).then(data => {
        if(data.code === '0') {
          this.$toast.success( this.$t('注册成功'));
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