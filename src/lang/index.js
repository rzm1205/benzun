import Vue from 'vue';
import VueI18n from 'vue-i18n';

import {Locale} from 'vant';

Vue.use(VueI18n);
// Vue.locale = () => {};

/**
 * 导入vant通用语言包
 */

import enUS from 'vant/lib/locale/lang/en-US';
import zhCN from 'vant/lib/locale/lang/zh-CN';

/**
 * 导入自己整理的 Json语言包
 */

import app_zh from '../lang/cn/zh-CN';
import app_en from '../lang/en/en-US';

/**
 * 多语言配置  
 * 整合vant和自己整理的语言包
 */
const messages = {
    en: Object.assign(app_en, enUS),
    cn: Object.assign(app_zh, zhCN)
};

// 自动设置语言
//获取本机系统语言
// const navLang = navigator.language;  
// console.log(navLang)//zh-CN
// const localLang = (navLang === 'zh-CN'?'cn':'') || navLang === 'en' ? navLang : false;
// console.log(localLang)//zh-CN
//  const lang = window.localStorage.getItem('lang') || localLang || 'en';

 const lang = window.localStorage.getItem('langType') || 'cn';
 

// 更新vant组件库本身的语言变化，支持国际化
function vantLocales (lang) {
    if (lang === 'en') {
      Locale.use(lang, enUS);
    } else if (lang === 'cn') {
      Locale.use(lang, zhCN);
    }
    console.log('当前语言',lang);
  }
  //调用vant语言方法
  vantLocales(lang);

const i18n =  new VueI18n({
    locale: lang,  // set locale
    messages,  // set locale messages
    silentTranslationWarn: true // 控制台去掉警告语
});
//导出
export {
    i18n, vantLocales
}