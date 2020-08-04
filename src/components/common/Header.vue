<template>
  <div class="header">
      <!-- 导航栏 -->
      <van-nav-bar 
        @click-left='goBack()' 
        fixed
      >
        <template #left v-if="this.$route.path!='/main'">
          <van-icon name="arrow-left" />{{$t('返回')}}
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
              <div class="profile_Headername">{{getNameFn}}</div>
              <!-- <img src="~/assets/images/profile/user.png" alt=""> -->
              <div class="profile_name">{{name}}</div>
            </div>
            <div class="profile_menu">
                <van-cell is-link @click="goMenu('/myWaybill')"  size="large">
                <!-- 使用 title 插槽来自定义标题 -->
                <template #title>
                  <!-- <van-icon name="setting-o" /> -->
                  <img src="~/assets/images/profile/menu1.png" alt="">
                  <span class="custom-title">{{$t('我的代运单')}}</span>
                </template>
              </van-cell>
              <van-cell is-link  @click="goMenu('/promotionLink')" size="large">
                <template #title>
                  <img src="~/assets/images/profile/menu2.png" alt="">
                  <span class="custom-title">{{$t('推广链接')}}</span>
                </template>
              </van-cell>
              <van-cell is-link @click="goMenu('/addWaybill')" size="large">
                <template #title>
                  <img src="~/assets/images/profile/menu3.png" alt="">
                  <span class="custom-title">{{$t('创建代运单')}}</span>
                </template>
              </van-cell>
              <van-cell is-link @click="goMenu('/myWallet')"  size="large">
                <template #title>
                  <img src="~/assets/images/profile/menu4.png" alt="">
                  <span class="custom-title">{{$t('我的钱包')}}</span>
                </template>
              </van-cell>
              <van-cell is-link @click="goMenu('/modifyPassword')" size="large">
                <template #title>
                <img src="~/assets/images/profile/menu5.png" alt="">
                  <span class="custom-title">{{$t('修改密码')}}</span>
                </template>
              </van-cell>
              <van-cell is-link @click="goMenu('/notice')"  size="large">
                <template #title>
                  <img src="~/assets/images/profile/menu6.png" alt="">
                  <span class="custom-title">{{$t('通知公告')}}</span>
                </template>
              </van-cell>
              <div></div>
            </div>
            <div class="form_sumit quit_btn">
              <van-button round block type="info" class="validate_activeBtn" @click="quitDialog">
              {{$t('退出登录')}}
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
      name:this.$store.state.name,
      header_name:'',//头像上的昵称显示
      popupShow:false,
      title:this.$route.meta.title,// 动态获取导航栏navbar的title信息
    }
  },
  computed:{
    getNameFn: function(){
        //头像是动态的以橙色背景圆形图，里面的内容是昵称，如果昵称是汉字就取第一个汉字，如果是英文就取第一个字母，不论大小写，转化为大写字母
        this.header_name = this.name.substr(0,1);
        // if(/.*[\u4e00-\u9fa5]+.*$/.test(this.header_name)) { 
          return this.header_name.toUpperCase(); 
        // }
    }
  },
  created() {
    //  console.log(this.$route.meta.title)
    //刷新后title的变化
    // console.log(this.$route.path);
    if(this.$route.path ==='/myWaybill'){
      this.title = this.$t('我的代运单');
    }else if(this.$route.path ==='/main'){
      this.title = this.$t('本尊快递');
    }else if(this.$route.path ==='/promotionLink'){
      this.title = this.$t('推广链接');
    }else if(this.$route.path ==='/addWaybill'){
      this.title = this.$t('创建代运单');
    }else if(this.$route.path.indexOf('/addExpress')!=-1){
      this.title = this.$t('添加快递单');
    }else if(this.$route.path ==='/myWallet'){
      this.title = this.$t('我的钱包');
    }else if(this.$route.path ==='/modifyPassword'){
      this.title = this.$t('修改密码');
    }else if(this.$route.path ==='/notice'){
      this.title = this.$t('通知公告');
    }else if(this.$route.path.indexOf('/noticeInfo')!=-1){
      this.title = this.$t('公告详情');
    }
    // console.log(this.$route.path.indexOf('/personnelInfo')!=-1)
  },
  // 基于路线变化的动态设置路由切换 meta.title，
  watch: {
      $route(to, from) {
        // console.log(from);
        // console.log(to);
        // if(from.path.indexOf('/waybillInfo')>=0 ){
        //   let state = 0;
        //   this.$store.commit('refreshWaybillState',{waybillState: state});
        // }
        this.title = this.$t(this.$route.meta.title);
        // console.log('title',this.title);
        //关闭popup弹框，当路由切换时关闭
        this.popupShow = false;
      }
  },
  methods:{
    //显示我的tab个人页
    showMyProfileMethod(){
      this.popupShow = true;
    },
    //前往菜单页
    goMenu(router){
      this.$router.push(router);
      this.popupShow = false;
    },
    // 返回一个特定的 DOM 节点，作为挂载的父节点
    getContainer() {
      return document.querySelector('.main');
    },
     //退出弹框
    quitDialog() {
      this.$dialog.confirm({
        message: this.$t('确定要退出吗？'),
      }).then(() => {
        //删除方法
        this.quitFu();
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
          localStorage.removeItem('name');// name值
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
