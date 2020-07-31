<template>
  <div class="main">
      <div class="wallet_top">
        <div class="wallet_bg">
            <div class="wallet_title_left">
              <div class="wallet_name">
                <span>用户名称:</span>
                <font>{{username}}</font>
              </div>
              <div class="wallet_money">
                <span>钱包余额:</span>
                <font>RM {{amount}}</font>
              </div>
            </div>
            <div class="wallet_title_right">
              <img src="~/assets/images/profile/user.png" alt="">
            </div>
        </div>
      </div>
      <div class="wallet_main">
        <h4 v-if="pageInfo.length>0">消费记录</h4>
        <div class="wallet_record"  >
           <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="queryPageInfo"
              v-if="pageInfo.length>0"
            >
            <div class="wallet_list"  v-for="item in pageInfo.dataList" :key="item.id" >
              <div class="wallet_order">
                  <div class="record_name">
                    <span>订单号:</span>
                    <font>{{item.con}}</font>
                  </div>
                  <div class="record_money">
                    {{item.amount}}
                  </div>
                </div>
                <div class="record_time">
                  <span>消费时间:</span>
                  <font>{{item.ctime}}</font>
                </div>
              </div>
            </van-list>
           <div class="" >
            <van-empty description="暂无消费记录" />
          </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MyWallet",
  data() {
    return {
      current:1,//当前页
      size:10,//每页记录数
      pageInfo:{},
      loading: false,
      finished: false,
      refreshing: false,
      amount:{},//查询余额
      username:this.$store.state.username
    }
  },
  created(){
    this.queryAmountInfo();//查询余额
    this.queryPageInfo();
  },
  methods:{
    // 查询余额
    queryAmountInfo() {
        let params = {}
        this.$post('/paymentrecord/loadUserAmount',params).then(data => {
          if(data.code === '0') {
            this.amount = data.amount;
          } else {
            if(data && data.msg){
              this.$toast.fail(data.msg);
            }
          }
        })
    },
    // 获取分页信息
    queryPageInfo() {
        let params = {
          current:this.current,
          size:this.size
        }
        this.$post('/paymentrecord/queryPaymentrecordList',params).then(data => {
          if(data.code === '0') {
             // 加载状态结束
            this.loading = false;
            this.pageInfo = data;
            this.finished = true;
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
.main{
  width: 100%;
  height: calc(100% - 46px);
  overflow: hidden;
  overflow-y: auto;
  /* padding-bottom: 40px; */
}
</style>