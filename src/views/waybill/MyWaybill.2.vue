<template>
  <div class="main">
      <!-- 我的代运单页 -->
      <div class="waybill_main">
        <div class="waybill_tab">
          <!-- 0-待确认 1-待付款 2-运输中 3-已完成 -->
            <div :class="{'active_tab':curType===0}" @click="curType=0;changeQueryByState(0)">{{$t('待确认')}}</div>
            <div :class="{'active_tab':curType===1}" @click="curType=1;changeQueryByState(1)">{{$t('待付款')}}</div>
            <div :class="{'active_tab':curType===2}" @click="curType=2;changeQueryByState(2)">{{$t('运输中')}}</div>
            <div :class="{'active_tab':curType===3}" @click="curType=3;changeQueryByState(3)">{{$t('已完成')}}</div>
             <!-- <div :class="{'active_tab':curType===6}" @click="curType=6;reset(6)">重置数据</div> -->
            
            <!-- <div class="active_line" :style="{'transform': curType translateX(60px) translateX(-50%)}"></div> -->
        </div>
        <div class="waybill_box container" ref="container">
          <ul class="content">
          <van-list
            class="content"
            v-model="loading"
            :finished="finished"
            :finished-text="$t('没有更多了')"
            :immediate-check="false"
            @load="onLoad(curType)"
            v-if="pageInfo.total>0"
          >
            <li class="waybill_list"  v-for="item in itemList" :key="item.id" @click="goWaybillDetail(item.id,curType)">
                <div class="waybill_title">
                  <span>{{$t('订单号')}}:</span>
                  <font>{{item.orderNumber}}</font>
                </div>
                <div class="waybill_con">
                  <div class="waybill_process">
                    <div class="waybill_start">
                      <!-- 收件人 -->
                      <span>{{item.addressee}}</span>
                      <!-- 只有待付款状态1才显示 -->
                      <span class="waybill_start_money" v-if=" (curType===1||curType==='1') && item.amountRm">
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
                    <span v-if="curType!=3">{{$t('下单时间')}}:</span>
                    <font v-if="curType!=3">{{item.ctime}}</font>
                    <span v-if="curType===3">{{$t('完成时间')}}:</span>
                    <font v-if="curType===3">{{item.ftime}}</font>
                  </div>
                  <div class="waybill_view" v-if="curType===2">
                    <span class="waybill_router" @click.stop="queryExpressRouter(item.waybillNumber)">{{$t('查看物流')}}</span>
                    <span class="waybill_confirm" @click.stop="receiptDialog(item.id)">{{$t('确认签收')}}</span>
                  </div>
                </div>
            </li>
            </van-list>
           </ul>
          
          <div v-if="pageInfo.total===0">
            <van-empty :description="$t('暂无数据')" />
          </div>
        </div>
      </div>
  </div>
</template>
<script> 
import BScroll from 'better-scroll';//引进滚动插件
export default {
  name: "MyWaybill",
  data() {
    return {
      scroll:null,
      active:0,
      current:1,//当前页
      size:10,//每页记录数
      curType:this.$store.state.waybillState || 0,//当前显示待确认状态
      pageInfo:{},
      itemList:[],
      receivareaName:'',//收货地区
      expressRouter:{},//获取的物流地址
      loading: false,//列表加载
      finished: false//是否还有数据
    }
  },
  watch: {
    $route(to, from) {
      console.log(from);
      console.log(to);
      if(to.path.indexOf('/waybillInfo')>=0){
        this.$store.commit('refreshWaybillState',{waybillState: this.curType});
        // this.curType = $store.state.waybillState;
      }else{
        let state = 0;
        this.$store.commit('refreshWaybillState',{waybillState: state});
      }
    }
  },
  created(){
    this.$nextTick(() => {
      this.initScroll();
        //这里放初始化函数，我还没写，后面补充
    });

    // console.log('from,',from.path);
    console.log('curType',this.curType);
    this.changeQueryByState(this.curType);
  },
  mounted(){
    // console.log(document.querySelector('.container'))
    this.scroll = new BScroll(this.$refs.container,{
      click: true,  // 元素可触发点击事件
      scrollX: false,  // 横向可滑动，默认为false
      scrollY: true,  // 纵向可滑动，默认为true
      bounce: false  // 当滚动超过边缘的时候无回弹动画
    })
    console.log(this.scroll);
  },
  methods:{
    initScroll() {
      new BScroll(this.$refs.container, {
        click: true
      });
    },
    reset(){
      // console.log('重置数据接口');
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
         state:state,
         current:this.current,//当前页
         size:this.size//每页记录数
       };
      this.$post('/waybill/queryWaybillList',params).then(data => {
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
      this.queryPageInfo(state);
    },
    //切换代运单状态查询各列表
    changeQueryByState(state){
       // 将代运单状态保存到vuex中
      this.$store.commit('refreshWaybillState',{waybillState: state});
      console.log('waybillState,',this.$store.state.waybillState)
      this.current = 1;//恢复第一页
      this.itemList = [];//先清空
      this.loading = true;//加载中
      this.finished = false;//未结束
      this.queryPageInfo(state);
    },
    //去代运单详情
    goWaybillDetail(id,curType){
      //去详情页传参id及代运单状态
      this.$router.push({
        name:'WaybillInfo',
        params: {id:id,type:curType}
      });
    },
    //查看物流信息
    queryExpressRouter(waybillNumber){
      console.log('waybillNumber',waybillNumber);
      let params = {
         sign:'queryWaybillURL'
       };
      this.$post('/dic/queryDics',params).then(data => {
        if(data.code === '0') {
          //获取的物流地址
          if(data.dataList && data.dataList.length>0){
            this.expressRouter = data.dataList[0];
            if(this.expressRouter.textCn){
              let reg = new RegExp(/{platform.waybillNumber}/,'g');//g代表全部
               //跳转到马来西亚的网址
              let newMsg = this.expressRouter.textCn.replace(reg,waybillNumber).replace('$','');
              // window.open(newMsg);
              // window.location.href = newMsg;
              let open = window.open('about:blank');
              if (open === null || typeof(open) === 'undefined') {
                window.location.href = newMsg
                return
              }
              setTimeout(() => {
                open.location = newMsg
              }, 300)
              console.log(newMsg);
            }
          }
        } else {
          if(data && data.msg){
              this.$toast.fail(data.msg);
           }
        }
      })
    },
    //签收确认框
    receiptDialog(id) {
      this.$dialog.confirm({
        message:this.$t('确认要签收该代运单吗？'),
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
          this.$toast.success(this.$t('签收成功'));
          this.changeQueryByState(this.curType);
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