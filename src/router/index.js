import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//本尊快递(中英文双语)
//0启动页； 1登录;2我的代运单；3推广链接；4创建代运单；5我的钱包；6修改密码；7通知公告
//

// 懒加载
const Main = () => import('components/common/Main')
// const GoMain = () => import('components/common/GoMain')

//0启动页；
const StartPage = () => import('views/start/StartPage')
//1登录,注册，忘记密码
const Login = () => import('views/start/Login')
const Register = () => import('views/start/Register')
const ForgetPsd = () => import('views/start/ForgetPsd')
const ResetPsd = () => import('views/start/ResetPsd')
//2我的代运单（待付款、运输中、已完成）
const MyWaybill = () => import('views/waybill/MyWaybill')
//2-1代运单详情
const WaybillInfo = () => import('views/waybill/WaybillInfo')
//2-2添加快递单
const AddExpress = () => import('views/waybill/AddExpress')
//4创建代运单
const AddWaybill = () => import('views/waybill/AddWaybill')
//3推广链接；
const PromotionLink = () => import('views/promotionLink/PromotionLink')
//5我的钱包
const MyWallet = () => import('views/myWallet/MyWallet')
//6修改密码
const ModifyPassword = () => import('views/modifyPsd/ModifyPassword')
//7通知公告
const Notice = () => import('views/notice/Notice')
const NoticeInfo = () => import('views/notice/NoticeInfo')

const routes = [
  {
    path: '',
    redirect: '/startPage'
  },
  {//启动页
    path: '/startPage',
    name: 'StartPage',
    component: StartPage
  },
  {//登录页
    path: '/login',
    name: 'Login',
    component: Login
  },
  {//注册
    path: '/register',
    name: 'Register',
    component: Register
  },
  {//忘记密码
    path: '/forgetPsd',
    name: 'ForgetPsd',
    component: ForgetPsd
  },
  {//重置密码
    path: '/resetPsd/:username',
    name: 'ResetPsd',
    component: ResetPsd
  },
  {
    path: '/main',
    name: 'Main',
    component: Main,
    meta:{
      title:'本尊快递'
    },
    children:[
      {//我的代运单
        path: '/myWaybill',
        name: 'MyWaybill',
        component: MyWaybill,
        meta:{
          title:'我的代运单'
        }
      },
      {//代运单详情
        path: '/waybillInfo/:id/:type',
        name: 'WaybillInfo',
        component: WaybillInfo,
        meta:{
          title:'代运单详情'
        }
      },
      {//添加快递单
        path: '/addExpress/:id',
        name: 'AddExpress',
        component: AddExpress,
        meta:{
          title:'添加快递单'
        }
      },
      {//创建代运单
        path: '/addWaybill',
        name: 'AddWaybill',
        component: AddWaybill,
        meta:{
          title:'创建代运单'
        }
      },
      {//推广链接
        path: '/promotionLink',
        name: 'PromotionLink',
        component: PromotionLink,
        meta:{
          title:'推广链接'
        }
      },
      {//我的钱包
        path: '/myWallet',
        name: 'MyWallet',
        component: MyWallet,
        meta:{
          title:'我的钱包'
        }
      },
      {//修改密码
        path: '/modifyPassword',
        name: 'ModifyPassword',
        component: ModifyPassword,
        meta:{
          title:'修改密码'
        }
      },{//通知公告
        path: '/notice',
        name: 'Notice',
        component: Notice,
        meta:{
          title:'通知公告'
        }
      },{//通知公告详情
        path: '/noticeInfo/:id',
        name: 'NoticeInfo',
        component: NoticeInfo,
        meta:{
          title:'公告详情'
        }
      }
    ]
  }
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})
// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  window.scrollTo(0,0);//针对页面跳转后，滚动条不在顶部
  // if (to.path === '/login') {
  //   next();
  // } else {
  //   let token = localStorage.getItem('token');
  //   if (token === null || token === '') {
  //     // token不存在
  //     Message.error('登录超时，请重新登录!');
  //     next('/login');
  //   } else {
  //     next();
  //   }
  // }
  //修改document的标题
  // if (to.meta.title) {
  //   document.title = to.meta.title;
  // }
  next();
});

export default router
