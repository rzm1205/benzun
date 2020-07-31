import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入vant ui 
import Vant from 'vant';
import 'vant/lib/index.css';
import 'vant/lib/icon/local.css'; //解决离线无网络环境中使用icon不显示的问题
Vue.use(Vant);// vant 注册使用
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

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
