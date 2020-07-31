<template>
    <div class="wrapper">
        <v-head></v-head>
        <!-- 中间部分 -->
        <div class="bg">
            <div class="con">
                <p @click="goBooking" class="toBooking"></p>
                <p @click="isOpenDoor" class="toAccess"></p>
                <p @click="isGoInternalManage" class="toInternal"></p>
            </div>
        </div>
        <!-- 内部管理输入密码弹框 -->
        <van-dialog 
            class="access"
            v-model="showPsdDialog" 
            show-cancel-button 
            confirm-button-text="确定"
            :beforeClose="confirmPsdMethod">
             <!-- 使用 left-icon 插槽来标题 -->
            <template slot="title">
                <div class="access_title">内部管理</div>
            </template>

            <van-field
                v-model="main.password"
                type="password"
                name="password"
                placeholder="请输入内部管理密码"
                >
                 <!-- 使用 left-icon 插槽来自定义图标 -->
                <template slot="left-icon">
                    <van-icon class="iconfont" class-prefix='icon' name='yanzhengma' />
                </template>
            </van-field>
        </van-dialog>
        <!-- 验证码输入弹框 -->
        <van-dialog 
            class="access"
            v-model="showCodeDialog" 
            show-cancel-button 
            confirm-button-text="开门"
            :beforeClose="confirmCodeMethod">
             <!-- 使用 left-icon 插槽来标题 -->
            <template slot="title">
                <div class="access_title">请输入验证码</div>
            </template>
            
            <van-field
                v-model="main.code"
                type="text"
                name="code"
                placeholder="请填写您的验证码"
                >
                 <!-- 使用 left-icon 插槽来自定义图标 -->
                <template slot="left-icon">
                    <van-icon class="iconfont" class-prefix='icon' name='yanzhengma' />
                </template>
            </van-field>

            <div class="access_tips">
               <img src="~/assets/images/access/tips.png" alt="">
                验证码单次有效
            </div>
        </van-dialog>
    </div>
</template>
<script>
import vHead from '@/components/common/Header'
export default {
  name: "GoMain",
  data() {
    return {
        main:{},
        enterpriseId:this.$store.state.enterpriseId,
        robotUuid:this.$store.state.robUuid,
        showPsdDialog: false,//内部管理密码框
        showCodeDialog:false//开门验证码框
    }
  },
  components:{
      vHead
  },
  methods:{
    //进入访客预约页面
    goBooking() {
        this.$router.push('/informationEntry');
    },
     //是否打开输入开门验证码弹框
    isOpenDoor() {
        this.main = {}//清空
        this.showCodeDialog = true
    },
    // 是否开启门禁方法
    confirmCodeMethod(action, done) {
      if(action === 'confirm') {
        if(!this.main.code) {
            this.$toast("请输入您的验证码")
            done(false) //不关闭弹框
            return
        }
        let params = {
            code:this.main.code,
            robotUuid:this.robotUuid
        }
        this.$post('/ztjgOrderManage/autoUnlock', params).then(data => {
            if(data.rs === 1) {
                done() //关闭
                 this.$toast.success("正在为您开门请您耐心等待");
            } else {
                done(false) //不关闭弹框
                if(data.data && data.data.errorMsg){
                    this.$toast.fail(data.data.errorMsg);
                }else{
                    this.$toast.fail(data.errorMsg);
                }
            }
        })
      } else if(action === 'cancel') {
        done() //关闭
      }
    },
      //是否进入内部管理
    isGoInternalManage() {
        this.main = {}//清空
        this.showPsdDialog = true
    },
    // 是否关闭内部管理密码弹框
    confirmPsdMethod(action, done) {
      if(action === 'confirm') {
        if(!this.main.password) {
            this.$toast("请输入内部管理密码")
            done(false) //不关闭弹框
            return
        }
        let params = {
            enterpriseId:this.enterpriseId,
            pwd:this.$md5(this.main.password)//md5加密
        }
        this.$post('/internalManage/login', params).then(data => {
            if(data.rs === 1) {
                done() //关闭
                // 将用户token保存到vuex中
                this.$store.commit('refreshCurrentUserInfo',
                { token: data._token_iben})
                // 进入到内部管理页面
                this.$router.push('/internalManage')
            } else {
                done(false) //不关闭弹框
                if(data.data && data.data.errorMsg){
                    this.$toast.fail(data.data.errorMsg);
                }else{
                    this.$toast.fail(data.errorMsg);
                }
            }
        })
      } else if(action === 'cancel') {
        done() //关闭
      }
    }
  }
}
</script>
<style scoped>
</style>