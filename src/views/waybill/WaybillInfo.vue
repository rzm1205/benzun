<template>
  <div class="main">
    <div class="waybillInfo_main" :style="{'padding-bottom':((curType != '3'||curType != 3)?'3.73333rem':'1.06667rem')}" >
      <div class="psd_title waybillInfo_header">
        <!-- 0-待确认，1-待付款，2-已付款，3-运输中，4-已完成，5-已取消 -->
        <div class="waybillInfo_name" :style="{'padding-top':(((curType != '0' || curType != 0 )&& (curType != '1' || curType != 1))?'0.22rem':'0.50667rem')}">
           <h4 v-if="curType === '0' || curType === 0">{{$t('等待平台确认')}}</h4>
           <h4 v-if="curType === '1' || curType === 1">{{$t('等待您付款')}}</h4>
           <h4 v-if="curType === '2' || curType === 2">{{$t('运输中')}}</h4>
           <h4 v-if="curType === '3' || curType === 3">{{$t('已完成')}}</h4>
           <div class="waybillInfo_order">
            <span>{{$t('订单号')}}:</span>
            <font>{{pageInfo_waybill.orderNumber}}</font>
          </div>
          <div class="waybillInfo_waybill" v-if="(curType != 0 || curType != '0') && (curType != 1 || curType != '1')">
            <span>{{$t('运单号')}}:</span>
            <font>{{pageInfo_waybill.waybillNumber}}</font>
          </div>
        </div>
        <div class="waybillInfo_shalou"  v-if="curType === '0' || curType === 0">
          <img src="~/assets/images/main/shalou.png" alt="">
        </div>
         <div class="waybillInfo_shalou"  v-if="curType === 1 || curType === '1'">
          <img src="~/assets/images/main/fukuan.png" alt="">
        </div>
        <div class="waybillInfo_yunshu"  v-if="curType === '2' || curType === 2">
          <img src="~/assets/images/main/yunshu.png" alt="">
        </div>
        <div class="waybillInfo_complete" v-if="curType === '3' || curType === 3">
          <img src="~/assets/images/main/complete.png" alt="">
        </div>
      </div>
      <div class="receiverInfo">
        <div class="receiver_header">
          <div class="receiver_name">
            <img src="~/assets/images/main/position.png" alt="">
            <span>{{$t('收货人')}}:</span>
            <font>{{pageInfo_waybill.addressee}}</font>
          </div>
          <div class="receiver_city">
            {{receivareaName}}
          </div>
        </div>
        <div class="receiver_detail">
          <div class="receiver_mode">
            <div>
              <span>{{$t('联系电话')}}:</span>
              <font>{{pageInfo_waybill.phone}}</font>
            </div>
            <div  v-if="curType!=0">
              <span>{{$t('运输金额')}}:</span>
              <font v-if="pageInfo_waybill.amountRm">RM{{pageInfo_waybill.amountRm}}</font>
              <!-- <font>RM{{pageInfo_waybill.amountRmb}}</font> -->
            </div>
          </div>
          <div class="receiver_mode">
            <div>
              <span>{{$t('邮编')}}:</span>
              <font>{{pageInfo_waybill.postcode}}</font>
            </div>
            <div>
              <span>{{$t('运输方式')}}:</span>
              <font>{{transtypeName}}</font>
            </div>
          </div>
          <div class="receiver_address">
            <div style="width:100%">
              <span>{{$t('详细地址')}}:</span>
              <font>{{pageInfo_waybill.detailedaddress}}</font>
            </div>
          </div>
          <div class="receiver_mode" v-if="curType===3 || curType==='3' ">
            <div style="width:100%;">
              <span>{{$t('创建时间')}}:</span>
              <font>{{pageInfo_waybill.ctime}}</font>
            </div>
          </div>
          <div class="receiver_mode" v-if="curType===3|| curType==='3'">
            <div style="width:100%;">
              <span>{{$t('完成时间')}}:</span>
              <font>{{pageInfo_waybill.ftime}}</font>
            </div>
          </div>
        </div>
      </div>
      <!-- 添加快递单按钮 -->
      <div class="form_sumit" v-if="curType===0 || curType==='0'">
        <van-button round block type="info" class="validate_activeBtn" 
        icon="plus" 
        @click="addExpress"
        >
          {{$t('添加快递单')}}
        </van-button>
      </div>
      <!-- 快递单号list -->
       <div class="waybillInfo_box" v-if="pageInfo_express.total > 0">
           <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="$t('没有更多了')"
            :immediate-check="false"
            @load="onLoad"
          >
            <div class="waybill_list waybillInfo_list"  v-for="item in itemList" :key="item.id">
              <div class="waybill_title">
                <span>{{$t('快递单号')}}:</span>
                <font>{{item.expressnum}}</font>
                <div class="waybillInfo_state" v-if="curType===0 || curType==='0' || curType===1 || curType==='1'">
                  <img v-if="item.state === '0'"  src="~/assets/images/main/storage_wait.png" alt="">
                  <img v-if="item.state === '1'"  src="~/assets/images/main/storage_already.png" alt="">
                </div>
              </div>
              <div class="receiver_detail waybillInfo_detail"  
               :style="{'padding-bottom':(curType===0||curType==='0')?'0.64rem':'0.26667rem'}">
                <div class="receiver_mode expressInfo">
                  <div>
                    <span>{{$t('快递公司')}}:</span>
                    <font>{{item.companyText}}</font>
                  </div>
                  <div>
                    <span>{{$t('物品名称')}}:</span>
                    <font>{{item.name}}</font>
                  </div>
                </div>
                <div class="receiver_mode expressInfo">
                  <div>
                    <span>{{$t('物品数量')}}:</span>
                    <font>{{item.num}}</font>
                  </div>
                  <!-- 状态是未入库时，不显示查看图片按钮和重量体积，状态是已入库时才显示 -->
                  <div v-if="item.state === '1'">
                    <span>
                      <a href="javascript:void(0);"
                        @click.stop="viewImagePreview(item.img)"
                        class="active_img"
                        >
                        {{$t('查看图片')}}
                      </a>
                     </span>
                  </div>
                </div>
                 <div class="receiver_mode expressInfo" >
                  <div>
                    <span>{{$t('重量体积')}}:</span>
                    <font v-if="item.state === '1'">{{item.weightvolume}}</font>
                  </div>
                </div>
                <div @click.stop="deleteExpressDialog(item.id)" class="express_deleteBtn"  v-if="curType===0 || curType==='0'">
                  <span>{{$t('删除')}}</span>
                </div>
              </div>
            </div>
          </van-list>
        </div>
        <div class="waybillInfo_box" v-if="pageInfo_express.total === 0">
          <van-empty :description="$t('暂无数据')" />
        </div>
        <!-- 待确认0 -->
        <!-- 待确认的取消订单与待付款的取消订单接口一致 -->
        <div class="waybillInfo_pay" v-if="curType===0 || curType==='0'">
          <div class="payInfo_sumit">
            <!-- <div class="receive_tips">
            </div> -->
            <div class="form_sumit">
              <van-button round block type="default"
              @click="cancelOrder"
              >
                {{$t('取消订单')}}
              </van-button>
            </div>
          </div>
        </div>
         <!-- 待付款1 -->
        <div class="waybillInfo_pay" v-if="curType===1 || curType==='1'">
          <div class="payInfo_money">
            <span>{{$t('共计')}}: RM</span>
            <font>{{pageInfo_waybill.amountRm}}</font>
            <!-- <font>{{pageInfo_waybill.amountRmb}}</font> -->
          </div>
          <div class="payInfo_sumit">
            <div class="form_sumit">
              <van-button round block type="info" 
              class="validate_activeBtn" 
              @click="payDialog"
              >
                {{$t('确认付款')}}
              </van-button>
            </div>
            <div class="form_sumit">
              <van-button round block type="default" 
              @click="cancelOrder"
              >
               {{$t('取消订单')}} 
              </van-button>
            </div>
          </div>
        </div>
        <div class="waybillInfo_pay waybillInfo_receive" v-if="curType===2 || curType==='2'">
          <div class="payInfo_sumit">
            <div class="receive_tips">
              {{$t('注：15日后自动确认签收')}}
            </div>
            <div class="form_sumit">
              <van-button round block type="info" class="validate_activeBtn" 
              @click="receiptDialog"
              >
                {{$t('确认签收')}}
              </van-button>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import {ImagePreview} from "vant";
export default {
  name: "WaybillInfo",
  data() {
    return {
      id:this.$route.params.id,
      curType:this.$route.params.type,
      current:1,//当前页
      size:10,//每页记录数
      loading: false,
      finished: false,
      pageInfo_waybill:{},//代运单详情
      pageInfo_express:{},//快递单
      itemList:[],//快递单列表
      receivareaName:'',//收货地区名称
      transtypeName:'',//运输方式名称
      loading: false,//列表加载
      finished: false//是否还有数据
    }
  },
  created(){
    console.log('id',this.id)
    console.log('type',this.curType)
    this.queryInfo_waybill();//查询代运单详情
    this.queryPageList_express();//查询快递单
  },
  methods:{
    //收货地区、根据Id返显地区
    queryloadDicById(id,type){
       let params = {
         id:id
       };
      this.$post('/dic/loadDic',params).then(data => {
        if(data.code === '0') {
          if(type === 'receivarea'){
             this.receivareaName = data.data.text;
          }else if(type === 'transtype'){
             this.transtypeName = data.data.text;
          }else if(type === 'company'){
             this.companyName = data.data.text;
          }
          // console.log(this.companyNameArr);
          //将获取到的收货地区，
          // console.log(this.receivareaName)
        } else {
          if(data && data.msg){
              this.$toast.fail(data.msg);
           }
        }
      })
    },
    //查询代运单详情
    queryInfo_waybill(){
       let params = {
         id:this.id
       };
      this.$post('/waybill/loadWaybill',params).then(data => {
        if(data.code === '0') {
            // 加载状态结束
          this.loading = false;
          this.pageInfo_waybill = data.data;
          if(this.pageInfo_waybill.receivareaId != null){
            this.queryloadDicById(this.pageInfo_waybill.receivareaId,'receivarea');//返显收货地区名称，
          }
          if(this.pageInfo_waybill.transtypeId != null){
            this.queryloadDicById(this.pageInfo_waybill.transtypeId,'transtype');//返显收货地区名称，运输方式名称
          }
          this.finished = true;
        } else {
          if(data && data.msg){
              this.$toast.fail(data.msg);
           }
        }
      })
    },
    //查询快递单列表
    queryPageList_express(){
       let params = {
         waybillId:this.id,
         current:this.current,
         size:this.size,
       };
      this.$post('/expressbill/queryExpressbillList',params).then(data => {
        if(data.code === '0') {
            // 加载状态结束
          this.loading = false;
          this.pageInfo_express = data;
          let rows = data.dataList; //请求返回当页的列表
          this.loading = false;
          this.pageInfo_express.total = data.total; //总数
          if (rows == null || rows.length === 0) {
            // 加载结束
            this.finished = true;
            return;
          }
          // 将新数据与老数据进行合并
          this.itemList = this.itemList.concat(rows);
        
        //如果列表数据条数>=总条数，不再触发滚动加载
          if (this.itemList.length >= this.pageInfo_express.total) {
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
    //加载快递单列表
    onLoad(){
      this.current++;
      this.queryPageList_express();
    },
    //初始化快递单查询列表
    initExpressList(){
      this.current = 1;
      this.itemList = [];//清空
      this.loading = true;
      this.finished = false;
      this.queryPageList_express();
    },
    //添加快递单，跳转到快递单表单页
    addExpress(){
      this.$router.push({
        name:'AddExpress',
        params: {id:this.id}
      });
    },
    //删除快递单弹框
    deleteExpressDialog(id){
      this.$dialog.confirm({
        message: this.$t('确认要删除该快递单吗？'),
      }).then(() => {
        //删除方法
        this.deleteExpressMethod(id);
        // on confirm
      }).catch(() => {
        console.log('点击了取消');
        // on cancel
      });  
    },
    //删除快递单方法
    deleteExpressMethod(id){
      let params = {
        id:id
      };
      console.log('点击了删除');
      this.$post('/expressbill/deleteExpressbillById', params).then(data => {
        if(data.code === '0') {
          this.$toast.success(this.$t('删除成功'));
          this.initExpressList();//查询快递单列表
        } else {
          if(data && data.msg){
              this.$toast.fail(data.msg);
           }
        }
      })
    },
    //取消订单
    cancelOrder(){
      console.log("取消订单");
      let params = {
        id:this.id
      };
      this.$post('/waybill/cancelWaybill', params).then(data => {
        if(data.code === '0') {
          this.$toast.success(this.$t('取消订单成功'));
          this.$router.push('/myWaybill');
          // this.queryPageList_express(this.curType);//查询快递单列表
        } else {
          if(data && data.msg){
              this.$toast.fail(data.msg);
           }
        }
      })
    },
    //确认付款的弹框
    payDialog(){
      this.$dialog.confirm({
        message: this.$t('确认要付款该代运单吗？'),
      }).then(() => {
        //付款方法
        this.confirmPay();
        // on confirm
      }).catch(() => {
        console.log('点击了取消');
        // on cancel
      }); 
    },
    //确认付款
    confirmPay(){
      let params = {
        id:this.id
      };
      this.$post('/waybill/payWaybill', params).then(data => {
        if(data.code === '0') {
          this.$toast.success(this.$t('付款成功'));
          // this.queryInfo_waybill();
           this.$router.push('/myWaybill');
        } else {
          if(data && data.msg){
              this.$toast.fail(data.msg);
           }
        }
      })
    },
    //签收确认框
    receiptDialog() {
      this.$dialog.confirm({
        message: this.$t('确认要签收该代运单吗？'),
      }).then(() => {
        //签收方法
        this.confirmReceipt();
        // on confirm
      }).catch(() => {
        console.log('点击了取消');
        // on cancel
      });  
    },
    //确认签收
    confirmReceipt(){
      console.log("确认签收");
      let params = {
        id:this.id
      };
      this.$post('/waybill/signWaybill', params).then(data => {
        if(data.code === '0') {
          this.$toast.success(this.$t('签收成功'));
          this.$router.push({
            name:"MyWaybill"
          });
        } else {
          if(data && data.msg){
              this.$toast.fail(data.msg);
           }
        }
      })
    },
    //查看图片-图片预览
    viewImagePreview(imgurl){
      ImagePreview({
        images: [
          imgurl
        ],
        closeable: true,
        showIndex:false,//是否显示页码
        closeIconPosition:'top-right'//关闭图标显示位置
      });
    }
  }
}
</script>
<style scoped>
</style>