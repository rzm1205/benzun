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
                复制链接
              </van-button>
          </div>
      </div>
    </div>
    <div class="main_notice" v-if="!modifyInfo.text">
      <van-empty description="暂无推广内容" />
    </div>
  </div>
</template>
<script>

export default {
  name: "PromotionLink",
  data() {
    return {
      message:'http://58.87.127.217:8081/#/register?recoId=',//注册页的地址
      modifyInfo:{}
    }
  },
  created(){
    this.queryPageInfo();
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
              this.message = this.message + this.modifyInfo.userId;
          } else {
              if(data && data.msg){
                  this.$toast.fail(data.msg);
              }
          }
      })
    },
    //复制方法
    onCopy: function (e) {
       this.$toast.success("复制成功");
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