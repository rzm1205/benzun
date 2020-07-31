<template>
  <div class="main">
    <div class="main_notice">
      <header>
        <span class="ball ball1"></span>
        {{modifyInfo.title}}
        <span class="ball ball2"></span>
      </header>
      <div class="notice_con" v-html="modifyInfo.con">
        {{modifyInfo.con}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "NoticeInfo",
  data() {
    return {
        id: this.$route.params.id,//获取路由传参
        modifyInfo:{}
    }
  },
  created(){
      this.queryDetailInfo();
  },
  methods:{
      //获取详情
    queryDetailInfo() {
        let params = {
            id:this.id
        };
        this.$post('/notice/loadNotice', params).then(data => {
            if(data.code === '0') {
                this.modifyInfo = data.data;
            } else {
                if(data && data.msg){
                    this.$toast.fail(data.msg);
                }
            }
        })
    },
  }
}
</script>
<style scoped>
</style>