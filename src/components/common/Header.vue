<template>
  <div class="header">
      <!-- 导航栏 -->
      <van-nav-bar 
        @click-left='goBack()' 
        fixed
      >
        <template #left v-if="this.$route.path!='/main'">
          <van-icon name="arrow-left" />返回
        </template>
        <template #title>
          <div class="header_title">{{title}}</div>
        </template>
      </van-nav-bar>
      <!-- 本尊logo -->
      <div class="home_bar">
        <div class="home_btn" @click="showMyProfileMethod">
          <img src="~/assets/images/start/home.png" alt="">
        </div>
        <div class="home_logo">
          <img src="~/assets/images/start/main_logo.png" alt="">
        </div>
      </div>
      <div class="popUp_bar main">
        <!-- 个人导航页侧面 -->
        <!-- close-on-popstate=true是否在页面回退时关闭弹框 -->
        <van-popup
         v-model="popupShow"
         position="left" 
        :style="{ width: '71%',height: '100%'}"
         >
          <div class="profileInfo">
            <div class="profile_user">
              <img src="~/assets/images/profile/user.png" alt="">
              <div class="profile_name">用户名用户名</div>
            </div>
            <div class="profile_menu">
                <van-cell is-link to="/myWaybill" size="large">
                <!-- 使用 title 插槽来自定义标题 -->
                <template #title>
                  <!-- <van-icon name="setting-o" /> -->
                  <img src="~/assets/images/profile/menu1.png" alt="">
                  <span class="custom-title">我的代运单</span>
                </template>
              </van-cell>
              <van-cell is-link to="/promotionLink" size="large">
                <template #title>
                  <img src="~/assets/images/profile/menu2.png" alt="">
                  <span class="custom-title">推广链接</span>
                </template>
              </van-cell>
              <van-cell is-link to="/addWaybill" size="large">
                <template #title>
                  <img src="~/assets/images/profile/menu3.png" alt="">
                  <span class="custom-title">创建代运单</span>
                </template>
              </van-cell>
              <van-cell is-link to="/myWallet" size="large">
                <template #title>
                  <img src="~/assets/images/profile/menu4.png" alt="">
                  <span class="custom-title">我的钱包</span>
                </template>
              </van-cell>
              <van-cell is-link to="/modifyPassword" size="large">
                <template #title>
                <img src="~/assets/images/profile/menu5.png" alt="">
                  <span class="custom-title">修改密码</span>
                </template>
              </van-cell>
              <van-cell is-link to="/notice" size="large">
                <template #title>
                  <img src="~/assets/images/profile/menu6.png" alt="">
                  <span class="custom-title">通知公告</span>
                </template>
              </van-cell>
              <div></div>
            </div>
            <div class="form_sumit quit_btn">
              <van-button round block type="info" class="validate_activeBtn" @click="quitDialog">
              退出登录
            </van-button>
            </div>
          </div>
        </van-popup>
      </div>
  </div>
</template>

<script>

// 引进方法
import { quitMethod } from 'network/login'

export default {
  name: 'Header',
  data() {
    return {
      popupShow:false,
      title:this.$route.meta.title,// 动态获取导航栏navbar的title信息
    }
  },
  computed:{
  },
  created() {
    //  console.log(this.$route.meta.title)
    console.log(this.$route.path);
    // console.log(this.$route.path.indexOf('/personnelInfo')!=-1)
  },
  // 基于路线变化的动态设置路由切换 meta.title，
  watch: {
      $route(to, from) {
        this.title = this.$route.meta.title;
        //关闭popup弹框，当路由切换时关闭
        this.popupShow = false;
      }
  },
  methods:{
    //显示我的tab个人页
    showMyProfileMethod(){
      this.popupShow = true;
    },
    // 返回一个特定的 DOM 节点，作为挂载的父节点
    getContainer() {
      return document.querySelector('.main');
    },
     //退出弹框
    quitDialog() {
      this.$dialog.confirm({
        message: '确定要退出吗？',
         confirmButtonText:'确定'
      }).then(() => {
        //删除方法
        this.quitFu()
        // on confirm
      }).catch(() => {
        console.log('点击了取消');
        // on cancel
      });  
    },
    //退出方法
    quitFu(){
       //退出方法
      quitMethod().then( () => {
          // 清除localStorage token值
          localStorage.removeItem('token');// token值
          localStorage.removeItem('username');// username值
          this.$router.push('/login');
      })
    },
    goBack(){
      //如果已经进入内部管理，退出的时候，要走接口，并清除token
      // if(this.$route.path.indexOf('/internalManage')!=-1){
      //   //退出方法
      //   quitMethod(this.$store.state.token).then( () => {
      //     // 清除localStorage token值
      //     localStorage.removeItem('token');// token值
      //     this.$router.push('/home');
      //   })
      // }
      // else if(this.$route.path.indexOf('/personnelList')!=-1){//工作人员列表
      //     this.$router.push('/internalManage')
      // }else if(this.$route.path.indexOf('/personnelInfo')!=-1){//工作人员信息
      //     this.$router.push('/personnelList')
      // }else if(this.$route.path.indexOf('/bookingManage')!=-1){//预约管理
      //     this.$router.push('/internalManage')
      // }else if(this.$route.path.indexOf('/activeGuide')!=-1){//主动引领
      //     this.$router.push('/internalManage')
      // }else if(this.$route.path.indexOf('/messageNotification')!=-1){//短信通知
      //     this.$router.push('/internalManage')
      // }else if(this.$route.path.indexOf('/viewBooking')!=-1){//已有预约
      //     this.$router.push('/internalManage')
      // }else if(this.$route.path.indexOf('/modifyPassword')!=-1){//密码修改
      //     this.$router.push('/internalManage')
      // }else{
      //   // this.$router.go(-1)
      //    window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/home')
      // }
        window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/startPage')
    },
     // 编辑确认
    // modifyInfoMethod(values) {
    //   console.log(values);
    //   let params = {
    //     id:this.id,
    //     name:this.modifyInfo.name,
    //     phone:this.modifyInfo.phone,
    //     dept:this.modifyInfo.dept,
    //     position:this.modifyInfo.position
    //   };
    //   this.$post('/ztjgPersonnel/updatePersonnel', params).then(data => {
    //     if(data.rs === 1) {
    //       this.$toast.success("修改成功");
    //       // 添加成功后，跳转到工作人员列表
    //       this.$router.push('/personnelList')
    //     } else {
    //       if(data.data && data.data.errorMsg){
    //           this.$toast.fail(data.data.errorMsg);
    //       }else{
    //           this.$toast.fail(data.errorMsg);
    //       }
    //     }
    //   })
    // },
  }
}
</script>
<style scoped>
</style>
