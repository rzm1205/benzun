<template>
  <div id="app">
    <!--路由组件位置-->
    <router-view />
  </div>
</template>
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
