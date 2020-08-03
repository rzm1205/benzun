<template>
  <div class="main_start">
      <div class="start_logo" >
        <!-- class="animate__animated animate__swing" -->
        <img  src="~/assets/images/start/start_logo.png" alt="">
      </div>
      <div class="start_headline" style="display:none">
        <!-- class="animate__animated animate__bounceInLeft animate__delay-0.5s" -->
          <h4 >{{$t('本尊快递')}}</h4>
          <!-- class="animate__animated animate__bounceInRight animate__delay-0.5s" -->
          <div >{{$t('子弹火车的速度')}}</div>
      </div>
  </div>
</template>
<script>
import {animateFn} from '@/util/common.js';
animateFn();//执行动画效果
export default {
  name: "StartPage",
  data() {
    return {
    }
  },
  created() {
    this.autoGoLoginMethod();
  },
  mounted(){
    animateFn();//执行动画效果
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
.start_headline{
  /*隐藏转换的元素的背面-无效*/
  backface-visibility:hidden;
  -webkit-backface-visibility: hidden; 
   -webkit-transform-style: preserve-3d; 
   /*使被转换的元素的子元素保留其 3D 转换-无效*/
  -webkit-transform-style: preserve-3d;
}
</style>