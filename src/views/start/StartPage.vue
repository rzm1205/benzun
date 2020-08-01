<template>
  <div class="main_start">
      <div class="start_logo" >
        <img class="animate__animated animate__swing" src="~/assets/images/start/start_logo.png" alt="">
      </div>
      <div class="start_headline">
          <h4 class="animate__animated animate__bounceInLeft animate__delay-0.5s">{{$t('本尊快递')}}</h4>
          <div class="animate__animated animate__bounceInRight animate__delay-0.5s">{{$t('子弹火车的速度')}}</div>
      </div>
  </div>
</template>
<script>
export default {
  name: "StartPage",
  data() {
    return {
    }
  },
  created() {
    this.autoGoLoginMethod();
  },
  methods:{
    //自动跳转到登录页
    autoGoLoginMethod(){
      setTimeout(() => {
        this.$router.push('/login');
      }, 2000);
    }
  }
}
</script>
<style scoped>
</style>