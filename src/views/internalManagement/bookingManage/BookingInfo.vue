<template>
  <div class="main">
      <!-- 预约信息，预约还没同意的列表 -->
      <!-- 下拉刷新 -->
    <!-- <van-pull-refresh v-model="refreshing" @refresh="onRefresh"> -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="queryPageInfo"
      >
        <div class="bookList" v-for="item in pageInfo" :key="item.id" >
          <div class="bookInfo_left">
            <div>访&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;客: <span>{{item.name}}</span> </div>
            <div>电&#12288;&#12288;&#12288;&#12288;话: <span>{{item.phone}}</span></div>
            <div>公&#12288;&#12288;&#12288;&#12288;司: <span>{{item.company}}</span></div>
            <div>拜访时间: <span>{{item.visitDate | dateFormat('YYYY-MM-DD HH:mm')}}</span></div>
            <div>拜&#12288;访&#12288;人: <span>{{item.visitName}}</span></div>
          </div>
          <div class="bookInfo_right">
            <div class="agree"><van-button type="info"  @click="agreeDialog(item)" size="mini">同意</van-button></div>
            <div class="reject"><van-button type="danger" @click="rejectDialog(item.id)" size="mini">拒绝</van-button></div>
          </div>
        </div>
      </van-list>
    <!-- </van-pull-refresh> -->
    <!-- 同意预约申请后的弹框 -->
    <div class="showAgreeDialog">
      <van-dialog 
        v-model="showAgreeDialog" 
        title="请选择定位" 
        show-cancel-button 
        :beforeClose="agreeMethod"
        >
        <div class="positionList">
          <div class="positionInfo" :class="{activePosition: curPositionId == item.slocId }" v-for="item in positionList" :key="item.slocId" @click="selectPositionMethod(item.slocId)">
            {{item.slocName}}
            <van-field
              v-model="positionBroadcast"
              type="text"
              placeholder="请输入贵宾点位迎宾语"
              v-if="item.isVIP"
            />
          </div>
        </div>
      </van-dialog>

    </div>
    
  </div>
</template>
<script>
export default {
  name: "BookingInfo",
  data() {
    return {
      main:{},
      robUuid:this.$store.state.robUuid,
      bookingInfo:{},//单个预约信息
      curPositionId:null,//选择的当前点位
      positionBroadcast:'',//贵宾点位迎宾语
      positionList:[],//点位数据
      pageInfo:[],//预约信息的列表
      loading: false,
      finished: false,
      refreshing: false,
      showAgreeDialog: false //同意后的弹框
    }
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
    // 获取分页信息
    queryPageInfo() {
        let params = {
        }
        this.$post('/ztjgOrderManage/listToBereviewedOrderRecord',params).then(data => {
          if (this.refreshing) {
            this.pageInfo = [];
            this.refreshing = false;
          }
          if(data.rs === 1) {
             // 加载状态结束
            this.loading = false;
            
            this.pageInfo = data.data;
            this.finished = true;
          } else {
            if(data.data && data.data.errorMsg){
                this.$toast.fail(data.data.errorMsg);
            }else{
                this.$toast.fail(data.errorMsg);
            }
          }
        })
    },
    //下拉刷新
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.queryPageInfo();
    },
    //选择点位
    selectPositionMethod(slocId){
      this.curPositionId = slocId;
      console.log(this.curPositionId)
    },
    // 同意弹框
    agreeDialog(info) {
      this.curPositionId = null;
      this.bookingInfo = info;
      this.showAgreeDialog = true;
      this.queryPositionList(this.robUuid);//查询当前机器人地图的点位
    },
    // 拒绝弹框
    rejectDialog(id) {
      this.$dialog.confirm({
        message: '确定要拒绝该拜访人员吗？',
      }).then(() => {
        //确认拒绝
        this.rejectMethod(id)
        // on confirm
      }).catch(() => {
        console.log('点击了取消')
        // on cancel
      }); 
    },
    // 同意后是否关闭内部管理密码弹框
    agreeMethod(action, done) {
      if(action === 'confirm') {
        // if(!this.curPositionId || this.curPositionId == null) {
        //     this.$toast("请选择定点")
        //     done(false) //不关闭弹框
        //     return
        // }
        let params = {
          id:this.bookingInfo.id,
          positionId:this.curPositionId==null?'':this.curPositionId,
          positionBroadcast:this.positionBroadcast
        }
        this.$post('/ztjgOrderManage/agree', params).then(data => {
          if(data.rs === 1) {
              done() //关闭
              this.queryPageInfo();//查询列表
              this.$toast.success("同意成功");
          } else {
              done(false) //不关闭弹框
              if(data.data && data.data.errorMsg){
                  this.$toast.fail(data.data.errorMsg);
              }else{
                  this.$toast.fail(data.errorMsg);
              }
          }
        })
      } else if(action === 'cancel') {
        done() //关闭
      }
    },
    // 拒绝方法
    rejectMethod(id) {
      let params = {
          id:id
        }
      this.$post('/ztjgOrderManage/reject',params).then(data => {
        if(data.rs === 1) {
          this.queryPageInfo();//查询列表
           this.$toast.success("拒绝成功");
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