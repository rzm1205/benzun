<template>
  <div class="main">
      <!-- 修改密码 -->
      <div class="modifyPSD">
          <div class="psd_title">
            <!-- 昵称{{name}} -->
            <span>{{$t('请为您的账号')}}{{name}}{{$t('修改密码2')}}</span>
          </div>
          <div class="psd_form">
              <van-form @submit="onSubmit">
                <van-field
                  v-model="oldpass"
                  type="password"
                  name="oldpass"
                  :label="$t('旧密码')"
                  :placeholder="$t('请输入旧密码')"
                  :rules="[{ required: true, message: $t('请输入旧密码')}]"
                />
                <van-field
                  v-model="newpass"
                  name="newpass"
                  type="password"
                  :label="$t('新密码')"
                  :placeholder="$t('请输入新密码')"
                  :rules="[{ required: true, message: $t('请输入新密码')}]"
                />
                <van-field
                  v-model="newpass2"
                  name="newpass2"
                  type="password"
                  :label="$t('确认密码')"
                  :placeholder="$t('请再次输入新密码')"
                  @blur="validatePass2" 
                  :error-message="errMsg" 
                  :rules="[
                   { required: true, message: $t('请再次输入新密码')}
                  ]"
                />
                <div class="form_sumit psd_submit" >
                  <van-button round block type="info" class="validate_activeBtn" native-type="submit" >
                    {{$t('保存新密码')}}
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
  name: "ModifyPassword",
  data() {
    return {
      name:this.$store.state.name,//昵称
      oldpass:"",
      newpass:'',
      newpass2:'',
      errMsg:''
    }
  },
  created(){
    console.log(this.name)
  },
  methods:{
    // 校验函数返回 true 表示校验通过，false 表示不通过
    validatePass2(){
      if(this.newpass !== this.newpass2) {
        this.errMsg = this.$t('两次输入密码不一致');
        return false
      } else {
        this.errMsg = '';
        return true
      }
    },
    //提交修改
    onSubmit(values) {
      this.validatePass2();
      values.oldpass = sha256(values.oldpass);
      values.newpass = sha256(values.newpass);
      values.newpass2 = sha256(values.newpass2);
      // console.log(values);
      this.$post('/modifyPWD', values).then(data => {
        if(data.code === '0') {
          this.$toast.success(this.$t('修改成功,请重新登录'));
          // 修改成功后，跳转到工作人员列表
          // 跳转之前清除localStorage token值
          localStorage.removeItem('token');// token值
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