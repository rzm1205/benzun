<template>
  <div class="main">
      <!-- 我的代运单页 -->
      <div class="waybill_main">
        <div class="waybill_tab">
          <!-- 0-待确认 1-待付款 2-运输中 3-已完成 -->
            <div :class="{'active_tab':curType===0}" @click="curType=0;changeQueryByState(0)">待确认</div>
            <div :class="{'active_tab':curType===1}" @click="curType=1;changeQueryByState(1)">待付款</div>
            <div :class="{'active_tab':curType===2}" @click="curType=2;changeQueryByState(2)">运输中</div>
            <div :class="{'active_tab':curType===3}" @click="curType=3;changeQueryByState(3)">已完成</div>
             <div :class="{'active_tab':curType===6}" @click="curType=6;reset(6)">重置数据</div>
            
            <!-- <div class="active_line" :style="{'transform': curType translateX(60px) translateX(-50%)}"></div> -->
        </div>
        <div class="waybill_box">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="queryPageInfo(curType)"
            
          >
            <div class="waybill_list"  v-for="item in pageInfo.dataList" :key="item.id" @click="goWaybillDetail(item.id,curType)">
              <div class="waybill_title">
                <span>订单号:</span>
                <font>{{item.orderNumber}}</font>
              </div>
              <div class="waybill_con">
                <div class="waybill_process">
                  <div class="waybill_start">
                    <!-- 收件人 -->
                    <span>{{item.addressee}}</span>
                    <span class="waybill_start_money" v-if="curType===0||curType==='0'">
                      RM 
                      <font>{{item.amountRm}}</font>
                    </span>
                  </div>
                  <div class="waybill_end">
                    <!-- 收货地区根据Id返显地区 -->
                    {{item.receivareaTextprefix}}·{{item.receivareaTextsuffix}}
                  </div>
                </div>
                <div class="waybill_time">
                  <span v-if="curType!=3">下单时间:</span>
                  <font v-if="curType!=3">{{item.ctime}}</font>
                  <span v-if="curType===3">完成时间:</span>
                  <font v-if="curType===3">{{item.ftime}}</font>
                </div>
                <div class="waybill_view" v-if="curType===2">
                  <span class="waybill_router" @click.stop="queryExpressRouter">查看物流</span>
                  <span class="waybill_confirm" @click.stop="receiptDialog(item.id)">确认签收</span>
                </div>
              </div>
            </div>
          </van-list>
          <div v-if="pageInfo.length>0">
            <van-empty description="暂无数据" />
          </div>
        </div>
        <!-- <van-tabs
           v-model="active" 
          line-width="25px"
          sticky
          offset-top="2.50667rem"
          @click="changeQueryByState"
          >
          <van-tab title="待付款">
            <div class="waybill_box">
              <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="queryPageInfo"
              >
                <div class="waybill_list"  v-for="item in pageInfo" :key="item.id" @click="goWaybillDetail(item.id,active)">
                  <div class="waybill_title">
                    <span>订单号:</span>
                    <font>9403948888829230</font>
                  </div>
                  <div class="waybill_con">
                    <div class="waybill_process">
                      <div class="waybill_start">
                        王宏宇{{item.id}}
                      </div>
                      <div class="waybill_end">
                        马来西亚·吉隆坡
                      </div>
                    </div>
                    <div class="waybill_time">
                      <span>下单时间:</span>
                      <font>2020-07-26 14:22:22</font>
                    </div>
                  </div>
                </div>
              </van-list>
            </div>
          </van-tab>
          <van-tab title="运输中">
            <div class="waybill_box">
              <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="queryPageInfo"
              >
                <div class="waybill_list"  v-for="item in pageInfo" :key="item.id" @click="goWaybillDetail(item.id,active)">
                  <div class="waybill_title">
                    <span>订单号:</span>
                    <font>9403948888829230</font>
                  </div>
                  <div class="waybill_con">
                    <div class="waybill_process">
                      <div class="waybill_start">
                        王宏宇{{item.id}}
                      </div>
                      <div class="waybill_end">
                        马来西亚·吉隆坡
                      </div>
                    </div>
                    <div class="waybill_time">
                      <span>下单时间:</span>
                      <font>2020-07-26 14:22:22</font>
                    </div>
                    <div class="waybill_view">
                      <span class="waybill_router" @click="queryExpressRouter">查看物流</span>
                      <span class="waybill_confirm" @click="confirmReceipt">确认签收</span>
                    </div>
                  </div>
                </div>
              </van-list>
            </div>
          </van-tab>
          <van-tab title="已完成">
            <div class="waybill_box">
              <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="queryPageInfo"
              >
                <div class="waybill_list"  v-for="item in pageInfo" :key="item.id" @click="goWaybillDetail(item.id,active)">
                  <div class="waybill_title">
                    <span>订单号:</span>
                    <font>9403948888829230</font>
                  </div>
                  <div class="waybill_con">
                    <div class="waybill_process">
                      <div class="waybill_start">
                        王宏宇{{item.id}}
                      </div>
                      <div class="waybill_end">
                        马来西亚·吉隆坡
                      </div>
                    </div>
                    <div class="waybill_time">
                      <span>完成时间:</span>
                      <font>2020-07-26 14:22:22</font>
                    </div>
                  </div>
                </div>
              </van-list>
            </div>
          </van-tab>
        </van-tabs> -->
      </div>
  </div>
</template>
<script>
export default {
  name: "MyWaybill",
  data() {
    return {
      active:0,
      current:1,//当前页
      size:10,//每页记录数
      curType:0,//当前显示待确认状态
      pageInfo:{},
      receivareaName:'',//收货地区
      loading: false,//列表加载
      finished: false//是否还有数据
    }
  },
  created(){
  },
  methods:{
    reset(){
      console.log('重置数据')
      let params ={};
      this.$post('/waybill/addWaybillTestData',params).then(data => {
        if(data.code === '0') {
          //将获取到的收货地区，
        } else {
          if(data && data.msg){
              this.$toast.fail(data.msg);
           }
        }
      })
    },
    //收货地区、根据Id返显地区
    queryloadDicById(id){
       let params = {
         id:id
       };
      this.$post('/dic/loadDic',params).then(data => {
        if(data.code === '0') {
          this.receivareaName = data.data.text;
          //将获取到的收货地区，
          console.log(this.receivareaName)
        } else {
          if(data && data.msg){
              this.$toast.fail(data.msg);
           }
        }
      })
    },
    //查询列表
    queryPageInfo(state){
       let params = {
         state:state
       };
      this.$post('/waybill/queryWaybillList',params).then(data => {
        if(data.code === '0') {
            // 加载状态结束
          this.loading = false;
          this.pageInfo = data;
          // if(this.pageInfo.dataList && this.pageInfo.dataList.length>0){
          //   this.pageInfo.dataList.some(item =>{
          //     this.queryloadDicById(item.receivareaId);//查询收货地区名称
          //     return true ;
          //   })
          // }
          this.finished = true;
        } else {
          if(data && data.msg){
              this.$toast.fail(data.msg);
           }
        }
      })
    },
    //切换代运单状态查询各列表
    changeQueryByState(state){
      console.log(state);
      this.queryPageInfo(state);
    },
    //去代运单详情
    goWaybillDetail(id,type){
      //去详情页传参id及代运单状态
      this.$router.push({
        name:'WaybillInfo',
        params: {id:id,type:type}
      });
    },
    //查看物流信息
    queryExpressRouter(){
      //跳转到马来西亚的网址
      console.log('查看物流')
    },
    //签收确认框
    receiptDialog(id) {
      this.$dialog.confirm({
        message: '确定要签收该代运单吗？',
         confirmButtonText:'确定'
      }).then(() => {
        //签收方法
        this.confirmReceipt(id);
        // on confirm
      }).catch(() => {
        console.log('点击了取消');
        // on cancel
      });  
    },
    //确认签收
    confirmReceipt(id){
      console.log('确认签收');
      let params = {
         id:id
       };
      this.$post('/waybill/signWaybill',params).then(data => {
        if(data.code === '0') {
          this.$toast.success("签收成功");
          this.queryPageInfo(this.curType);
        } else {
          if(data && data.msg){
              this.$toast.fail(data.msg);
           }
        }
      })
    }
  }
}
</script>
<style scoped>
</style>