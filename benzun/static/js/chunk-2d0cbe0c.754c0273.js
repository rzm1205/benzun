(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0cbe0c"],{"4c18":function(t,i,n){"use strict";n.r(i);var a=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{staticClass:"main"},[n("div",{staticClass:"main_notice"},[n("header",[n("span",{staticClass:"ball ball1"}),t._v(" "+t._s(t.modifyInfo.title)+" "),n("span",{staticClass:"ball ball2"})]),n("div",{staticClass:"notice_con",domProps:{innerHTML:t._s(t.modifyInfo.con)}},[t._v(" "+t._s(t.modifyInfo.con)+" ")])])])},o=[],s={name:"NoticeInfo",data:function(){return{id:this.$route.params.id,modifyInfo:{}}},created:function(){this.queryDetailInfo()},methods:{queryDetailInfo:function(){var t=this,i={id:this.id};this.$post("/notice/loadNotice",i).then((function(i){"0"===i.code?t.modifyInfo=i.data:i&&i.msg&&t.$toast.fail(i.msg)}))}}},e=s,c=n("2877"),l=Object(c["a"])(e,a,o,!1,null,"c1e71642",null);i["default"]=l.exports}}]);
//# sourceMappingURL=chunk-2d0cbe0c.754c0273.js.map