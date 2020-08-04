<template>
  <div id="app">
    <!--路由组件位置-->
    <router-view />
  </div>
</template>
<script>
// window.οnlοad=function(){
//   setTimeout(function() {
//     window.scrollTo(0, 1);
//     if(document.documentElement.scrollHeight <= document.documentElement.clientHeight) {
//       bodyTag = document.getElementsByTagName('body')[0];
//       bodyTag.style.height = document.documentElement.clientWidth / screen.width * screen.height + 'px';
//     }
//   }, 0);
// };
// var overscroll = function(el) {
//     el.addEventListener('touchstart', function() {
//     var top = el.scrollTop
//     , totalScroll = el.scrollHeight
//     , currentScroll = top + el.offsetHeight;
//     if(top === 0) {
//       el.scrollTop = 1;
//     } else if(currentScroll === totalScroll) {
//       el.scrollTop = top - 1;
//     }
//     });
//     el.addEventListener('touchmove', function(evt) {
//       if(el.offsetHeight < el.scrollHeight)
//         evt._isScroller = true;
//       });
//     };
//     document.body.addEventListener('touchmove', function(evt) {
//     if(!evt._isScroller) {
//       evt.preventDefault();
//     }
// });
//  //调用方法 
//  overscroll (el);
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
