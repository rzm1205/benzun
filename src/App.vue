<template>
  <div id="app">
    <!--路由组件位置-->
    <router-view />
  </div>
</template>
<script>
window.οnlοad=function(){
  setTimeout(function() {
    window.scrollTo(0, 1);
    if(document.documentElement.scrollHeight <= document.documentElement.clientHeight) {
      bodyTag = document.getElementsByTagName('body')[0];
      bodyTag.style.height = document.documentElement.clientWidth / screen.width * screen.height + 'px';
    }
  }, 0);
};
</script>
<style scoped>
#app{
    width: 100%;
     /*最小尺寸*/
    min-width: 320px;
    /*最大尺寸*/
    max-width: 640px;
    height: 100vh;
    margin: 0 auto;
    /* overflow: hidden; */
  }
</style>
