<template>
  <div class="main">
      <!-- 主动引领 -->
      <div class="message guide">
        <h4 class="guide_title">欢迎语</h4>
        <van-field
          v-model="active.commonBroadcast"
          rows="3"
          autosize
          placeholder="请输入通用迎宾语"
          type="textarea"
          :rules="[{ required: true, message: '请输入通用迎宾语' }]"
        />
      </div>
      <div class="message guide">
        <h4 class="guide_title">请选择定位</h4>
        <div class="positionBox">
          <div class="positionArr" :class="{activePosition: curPositionId == item.slocId }" v-for="item in positionList" :key="item.slocId" @click="selectPositionMethod(item.slocId)">
            {{item.slocName}}
            <van-field
              v-model="active.positionBroadcast"
              placeholder="请输入贵宾点位迎宾语"
              :rules="[{ required: true, message: '请输入贵宾点位迎宾语' }]"
              v-if="item.isVIP"
            />
          </div>
        </div>
      </div>
       <div class="btn_positionFixed" >
        <van-button block type="info" @click="activeOpenDoorMethod" >
          开门
        </van-button>
      </div>
  </div>
</template>
<script>
export default {
  name: "ActiveGuide",
  data() {
    return {
      active:{},
      robUuid:this.$store.state.robUuid,
      bookingInfo:{},//单个预约信息
      curPositionId:null,//选择的当前点位
      positionBroadcast:'',//贵宾点位迎宾语
      positionList:[]//点位数据
    }
  },
  created(){
    this.queryPositionList(this.robUuid)//查询当前地图第定点列表
  },
   methods: {
    //获取当前机器人的当前地图定位点
    queryPositionList(robUuid) {
      let params = {
        robUuid :robUuid
        }
      this.$post('/scene/listPointsByRobUuid',params).then(data => {
        if(data.rs === 1) {
          this.positionList = data.data;
          //添加一个无的点位
          var set = {slocId:'',slocName:'无',isVIP:false}
          this.positionList.unshift(set);
          this.positionList.map((item,index) =>{
            if(index === this.positionList.length-1){
              item.isVIP = true;
            }else{
              item.isVIP = false;
            }
          })
          //目前没有贵宾室点位，先写死一个
          console.log(this.positionList)
        } else {
          if(data.data && data.data.errorMsg){
              this.$toast.fail(data.data.errorMsg);
          }else{
              this.$toast.fail(data.errorMsg);
          }
        }
      })
    },
    //选择点位
    selectPositionMethod(slocId){
      this.curPositionId = slocId;
      console.log(this.curPositionId)
    },
    //主动引领开门方法
    activeOpenDoorMethod() {
      if(!this.active.commonBroadcast){
          this.$toast.fail('请输入通用迎宾语');
          return false;
      }
      if(this.curPositionId==null){
          this.$toast.fail('请选择定位');
          return false;
      }
      let params = {
          robotUuid :this.robUuid,
          commonBroadcast:this.active.commonBroadcast?this.active.commonBroadcast:'',
          positionBroadcast:this.active.positionBroadcast?this.active.positionBroadcast:'',
          positionId:this.curPositionId
        }
      this.$post('/ztjgOrderManage/manualUnlock',params).then(data => {
        if(data.rs === 1) {
          this.$toast.success("已通知机器人开门请您耐心等待");
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