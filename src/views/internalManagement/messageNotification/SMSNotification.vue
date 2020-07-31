<template>
  <div class="main">
    <div class="message">
      <h4 class="message_title">请编辑您的同意短信</h4>
      <p class="message_tips">此短信为同意短信</p>
      <van-field
        v-model="messageInfo.agreeMsg"
        rows="4"
        type="textarea"
      />
    </div>
    <div class="message">
      <h4 class="message_title">请编辑您的拒绝短信</h4>
      <p class="message_tips">此短信为拒绝短信</p>
      <van-field
        v-model="messageInfo.rejectMsg"
        rows="4"
        type="textarea"
      />
    </div>
    <div class="btn_positionFixed" >
      <van-button block type="info" @click="saveMsgMethod" >
        保存修改
      </van-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "SMSNotification",
  data() {
    return {
      messageInfo:{}
    }
  },
  created(){
    this.queryMsgInfo()
  },
  methods:{
    //查询短信模板
    queryMsgInfo(){
      let params = {}
      this.$post('/messageTemplate/query', params).then(data => {
        if(data.rs === 1) {
          this.messageInfo = data.data
        } else {
          if(data.data && data.data.errorMsg){
              this.$toast.fail(data.data.errorMsg);
          }else{
              this.$toast.fail(data.errorMsg);
          }
        }
      })
    },
    //保存短信模板
    saveMsgMethod() {
      let params = {
        agreeMsg:this.messageInfo.agreeMsg,
        rejectMsg:this.messageInfo.rejectMsg
      }
      this.$post('/messageTemplate/save', params).then(data => {
        if(data.rs === 1) {
          this.$toast.success("保存成功");
          // 添加成功后，跳转到内部管理
          this.$router.push('/internalManage')
        } else {
          if(data.data && data.data.errorMsg){
              this.$toast.fail(data.data.errorMsg);
          }else{
              this.$toast.fail(data.errorMsg);
          }
        }
      })
    }
  }

}
</script>
<style scoped>
</style>