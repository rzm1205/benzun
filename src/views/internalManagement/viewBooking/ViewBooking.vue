<template>
  <div class="main">
      <!-- 查看预约列表 -->
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
        </div>
      </van-list>
    <!-- </van-pull-refresh> -->
  </div>
</template>
<script>
export default {
  name: "ViewBooking",
  data() {
    return {
      pageInfo:[],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    // 获取分页信息
    queryPageInfo() {
        let params = {
        }
        this.$post('/ztjgOrderManage/listPassedOrderRecord',params).then(data => {
          // if (this.refreshing) {
          //   this.pageInfo = [];
          //   this.refreshing = false;
          // }
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
    }
  }
}
</script>
<style scoped>
</style>