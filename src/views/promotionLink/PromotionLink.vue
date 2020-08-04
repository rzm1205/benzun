<template>
  <div class="main">
     <div class="main_notice" v-if="modifyInfo.text">
      <header>
        <span class="ball ball1"></span>
        {{modifyInfo.title}}
        <span class="ball ball2"></span>
      </header>
      <div class="notice_con" v-html="modifyInfo.text">
       {{modifyInfo.text}}
      </div>
      <div class="linkInfo">
          <div class="link_copy">
            {{message}}
            <input type="hidden" v-model="message">
          </div>
          <div class="form_sumit link_btn">
              <van-button round block type="info" class="validate_activeBtn"
                v-clipboard:copy="message"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
              >
                {{$t('复制链接')}}
              </van-button>
          </div>
      </div>
    </div>
    <div class="main_notice" v-if="!modifyInfo.text">
      <van-empty :description="$t('暂无数据')" />
    </div>
  </div>
</template>
<script>

export default {
  name: "PromotionLink",
  data() {
    return {
      message:'?recoId=',//注册页的地址
      modifyInfo:{}
    }
  },
  created(){
    this.queryPageInfo();
    // console.log(window.location.href);
  },
  methods:{
     //获取详情
    queryPageInfo() {
      let params = {
      };
      this.$post('/extension/queryExtension', params).then(data => {
          if(data.code === '0') {
              this.modifyInfo = data.data;
              //注册页地址拼接
              let  href = window.location.href.replace('promotionLink','register');
              // console.log(href);
              this.message = href + this.message+ this.modifyInfo.userId;
              //  console.log(this.message);
          } else {
              if(data && data.msg){
                  this.$toast.fail(data.msg);
              }
          }
      })
    },
    //复制方法
    onCopy: function (e) {
       this.$toast.success(this.$t('复制成功'));
       console.log('复制的内容：',e.text);
    },
    onError: function (e) {
      this.$toast.success('Failed to copy texts');
    }
  }

}
</script>
<style scoped>
</style>