<template>
  <div class="main_start">
      <div class="start_logo">
        <img src="~/assets/images/start/start_logo.png" alt="">
      </div>
      <div class="start_headline">
          <h4>本尊快递</h4>
          <div>子弹火车的速度</div>
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
      }, 3000);
    }
  }
}
</script>
<style scoped>
</style>