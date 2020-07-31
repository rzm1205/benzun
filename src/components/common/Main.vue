<template>
    <div class="wrapper">
        <v-head></v-head>
         <!--路由组件位置-->
        <keep-alive>
            <transition>
                <router-view></router-view>
            </transition>
        </keep-alive>
        <v-footer></v-footer>
    </div>
</template>
<script>
import vHead from '@/components/common/Header'
import vFooter from '@/components/common/Footer'
// 引进退出方法
import { quitMethod } from 'network/login'

export default {
  name: "Main",
  data() {
    return {
    }
  },
  components:{
      vHead,vFooter
  },
  methods:{
   
  }
  // 基于路线变化的动态设置路由切换动画
  // watch: {
  //     $route(to, from) {
  //         const toDepth = to.path.split("/").length;
  //         const fromDepth = from.path.split("/").length;
  //         if (toDepth != fromDepth) {
  //             this.transitionName =
  //             toDepth < fromDepth ? "slide-right" : "slide-left";
  //         } else {
  //             this.transitionName = "fade";
  //         }
  //     }
  // }
}
</script>
<style scoped>
.wrapper{
    width: 100%;
    height: 100%;
    padding-top: 94px;
    position: relative;
    overflow: hidden;
    background: #F2F2F2;
}
.slide-left-enter,
.slide-right-leave-active {
  transform: translate(100%, 0);
  z-index: 1000;
}
/*解决页面层级显示在滑动上层问题*/
.slide-left-leave-active,
.slide-left-leave-to {
  z-index: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
/* 切换时候 */
/* .v-enter{
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to{
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}
.v-enter-active,.v-leave-active{
  transition: all .5s ease-in-out;
} */
</style>