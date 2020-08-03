<template>
  <div class="main">
      <div class="wallet_top">
        <div class="wallet_bg">
            <div class="wallet_title_left">
              <div class="wallet_name">
                <span>{{$t('用户名称')}}:</span>
                <font>{{name}}</font>
              </div>
              <div class="wallet_money">
                <span>{{$t('钱包余额')}}:</span>
                <font v-if="amount">RM {{amount}}</font>
              </div>
            </div>
            <div class="wallet_title_right">
              {{getNameFn}}
              <!-- <img src="~/assets/images/profile/user.png" alt=""> -->
            </div>
        </div>
      </div>
      <div class="wallet_main">
        <h4 v-if="pageInfo.total>0">{{$t('消费记录')}}</h4>
        <div class="wallet_record"  >
           <van-list
              v-model="loading"
              :finished="finished"
              :finished-text="$t('没有更多了')"
              :immediate-check="false"
              @load="onLoad"
              v-if="pageInfo.total>0"
            >
            <div class="wallet_list"  v-for="item in itemList" :key="item.id" >
              <div class="wallet_order">
                  <div class="record_name">
                    <!-- <span>{{$t('订单号')}}:</span> -->
                    <font style="margin-left:0;">{{item.con}}</font>
                  </div>
                  <div class="record_money">
                    ￥{{item.amount}}
                  </div>
                </div>
                <div class="record_time">
                  <span>{{$t('消费时间')}}:</span>
                  <font>{{item.ctime}}</font>
                </div>
              </div>
            </van-list>
           <div v-if="pageInfo.total === 0">
            <van-empty :description="$t('暂无数据')" />
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
      itemList:[],//列表查询
      amount:{},//查询余额
      name:this.$store.state.name,
      header_name:''//头像上的昵称显示
    }
  },
  computed:{
    getNameFn: function(){
        //头像是动态的以橙色背景圆形图，里面的内容是昵称，如果昵称是汉字就取第一个汉字，如果是英文就取第一个字母，不论大小写，转化为大写字母
        this.header_name = this.name.substr(0,1);
        // if(/.*[\u4e00-\u9fa5]+.*$/.test(this.header_name)) { 
          return this.header_name.toUpperCase(); 
        // }
    }
  },
  created(){
    this.queryAmountInfo();//查询余额
    this.queryPageInfo();//查记录
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
             this.pageInfo = data;
            let rows = data.dataList; //请求返回当页的列表
            this.loading = false;
            this.pageInfo.total = data.total; //总数
            if (rows == null || rows.length === 0) {
              // 加载结束
              this.finished = true;
              return;
            }
            // 将新数据与老数据进行合并
            this.itemList = this.itemList.concat(rows);
          
          //如果列表数据条数>=总条数，不再触发滚动加载
            if (this.itemList.length >= this.pageInfo.total) {
              this.finished = true;
            }
            // 如果加载完毕，显示没有更多了
          } else {
            if(data && data.msg){
              this.$toast.fail(data.msg);
            }
          }
        })
    },
    //onload事件
    onLoad(state){
      this.current++;
      this.queryPageInfo();
    }
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