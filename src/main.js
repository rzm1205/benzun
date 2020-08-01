import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// 引入第三方插件animate.min.css
import 'animate.css';
//引入vant ui 
import Vant from 'vant';
import 'vant/lib/index.css';
import 'vant/lib/icon/local.css'; //解决离线无网络环境中使用icon不显示的问题
// Vue.use(Vant);// vant 注册使用

import '@/assets/base.css'; // global css
// 引入自定义的图标样式
// import '@/assets/icon/iconfont.css'
import 'amfe-flexible/index.js';//适配手机端
// 引入jquery
import $ from 'jquery';
// 全局基本路径
import { baseUrl } from './util/urlUtil';
// 按钮权限
import { hasPermission } from './util/permissions';
//封装的get、postaxios，上传文件formdata格式方法
import {postRequest,getRequest,postRequest2} from './network/http';
//复制粘贴功能
import VueClipboard from 'vue-clipboard2';
Vue.use(VueClipboard);


//定义全局变量
Vue.prototype.$ = $;
Vue.prototype.$baseUrl = baseUrl;

Vue.prototype.$post = postRequest;
Vue.prototype.$post_ = postRequest2;
Vue.prototype.$get = getRequest;
//全局方法挂载
Vue.prototype.$_has = hasPermission;

// 引入时间插件
import moment from 'moment';
//定义时间格式全局过滤器
Vue.filter("dateFormat",function(daraStr,pattern = "YYYY-MM-DD HH:mm:ss"){
	return moment(daraStr).format(pattern)
});

// 导入资源文件
// import {i18n, vantLocales} from './lang';
// vant-ui组件国际化
import {i18n} from './lang/index.js' //整理好的国际化语言包

Vue.use(Vant,{
    i18n:(key,value)=>i18n.t(key,value), //记得添加，不然在会导致组件报错
});
// Vue.prototype.$vantLocales = vantLocales(i18n.locale);
console.log('当前的语言是：', i18n.locale);

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
