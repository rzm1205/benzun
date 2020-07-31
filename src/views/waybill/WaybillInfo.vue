<template>
  <div class="main">
    <div class="waybillInfo_main" :style="{'padding-bottom':((curType != '3'||curType != 3)?'3.73333rem':'1.06667rem')}" >
      <div class="psd_title waybillInfo_header">
        <!-- 0-待确认，1-待付款，2-已付款，3-运输中，4-已完成，5-已取消 -->
        <div class="waybillInfo_name" :style="{'padding-top':(((curType != '0' || curType != 0 )&& (curType != '1' || curType != 1))?'0.22rem':'0.50667rem')}">
           <h4 v-if="curType === '0' || curType === 0">等待平台确认</h4>
           <h4 v-if="curType === '1' || curType === 1">等待您付款</h4>
           <h4 v-if="curType === '2' || curType === 2">运输中</h4>
           <h4 v-if="curType === '3' || curType === 3">已完成</h4>
           <div class="waybillInfo_order">
            <span>订单号:</span>
            <font>{{pageInfo_waybill.orderNumber}}</font>
          </div>
          <div class="waybillInfo_waybill" v-if="(curType != 0 || curType != '0') && (curType != 1 || curType != '1')">
            <span>运单号:</span>
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
            <span>收货人:</span>
            <font>{{pageInfo_waybill.addressee}}</font>
          </div>
          <div class="receiver_city">
            {{receivareaName}}
          </div>
        </div>
        <div class="receiver_detail">
          <div class="receiver_mode">
            <div>
              <span>联系电话:</span>
              <font>{{pageInfo_waybill.phone}}</font>
            </div>
            <div  v-if="curType!=0">
              <span>运输金额:</span>
              <font>RM{{pageInfo_waybill.amountRm}}</font>
              <!-- <font>RM{{pageInfo_waybill.amountRmb}}</font> -->
            </div>
          </div>
          <div class="receiver_mode">
            <div>
              <span>邮编:</span>
              <font>{{pageInfo_waybill.postcode}}</font>
            </div>
            <div>
              <span>运输方式:</span>
              <font>{{transtypeName}}</font>
            </div>
          </div>
          <div class="receiver_address">
            <div style="width:100%">
              <span>详细地址:</span>
              <font>{{pageInfo_waybill.detailedaddress}}</font>
            </div>
          </div>
          <div class="receiver_mode" v-if="curType===3 || curType==='3' ">
            <div style="width:100%;">
              <span>创建时间:</span>
              <font>{{pageInfo_waybill.ctime}}</font>
            </div>
          </div>
          <div class="receiver_mode" v-if="curType===3|| curType==='3'">
            <div style="width:100%;">
              <span>完成时间:</span>
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
          添加快递单
        </van-button>
      </div>
      <!-- 快递单号list -->
       <div class="waybillInfo_box">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="queryPageList_express"
          >
            <div class="waybill_list waybillInfo_list"  v-for="item in pageInfo_express.dataList" :key="item.id">
              <div class="waybill_title">
                <span>快递单号:</span>
                <font>{{item.expressnum}}</font>
                <div class="waybillInfo_state" v-if="curType===0 || curType==='0' || curType===1 || curType==='1'">
                  <img v-if="item.state === 0"  src="~/assets/images/main/storage_wait.png" alt="">
                  <img v-if="item.state === 1"  src="~/assets/images/main/storage_already.png" alt="">
                </div>
              </div>
              <div class="receiver_detail waybillInfo_detail"  
               :style="{'padding-bottom':(curType===0||curType==='0')?'0.64rem':'0.26667rem'}">
                <div class="receiver_mode expressInfo">
                  <div>
                    <span>快递公司:</span>
                    <font>{{item.companyText}}</font>
                  </div>
                  <div>
                    <span>物品名称:</span>
                    <font>{{item.name}}</font>
                  </div>
                </div>
                <div class="receiver_mode expressInfo">
                  <div>
                    <span>物品数量:</span>
                    <font>{{item.num}}</font>
                  </div>
                  <!-- 状态是未入库时，不显示查看图片按钮和重量体积，状态是已入库时才显示 -->
                  <div v-if="item.state === 0">
                    <span>
                      <a href="javascript:void(0);"
                        @click.stop="viewImagePreview"
                        class="active_img"
                        >
                        查看图片
                      </a>
                     </span>
                  </div>
                </div>
                 <div class="receiver_mode expressInfo" >
                  <div>
                    <span>重量体积:</span>
                    <font v-if="item.state === 0">{{item.weightvolume}}</font>
                  </div>
                </div>
                <div @click.stop="deleteExpressDialog(item.id)" class="express_deleteBtn"  v-if="curType===0 || curType==='0'">
                  <span>删除</span>
                </div>
              </div>
            </div>
          </van-list>
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
                取消订单
              </van-button>
            </div>
          </div>
        </div>
         <!-- 待付款1 -->
        <div class="waybillInfo_pay" v-if="curType===1 || curType==='1'">
          <div class="payInfo_money">
            <span>共计: RM</span>
            <font>{{pageInfo_waybill.amountRm}}</font>
            <!-- <font>{{pageInfo_waybill.amountRmb}}</font> -->
          </div>
          <div class="payInfo_sumit">
            <div class="form_sumit">
              <van-button round block type="info" 
              class="validate_activeBtn" 
              @click="payDialog"
              >
                确认付款
              </van-button>
            </div>
            <div class="form_sumit">
              <van-button round block type="default" 
              @click="cancelOrder"
              >
                取消订单
              </van-button>
            </div>
          </div>
        </div>
        <div class="waybillInfo_pay waybillInfo_receive" v-if="curType===2 || curType==='2'">
          <div class="payInfo_sumit">
            <div class="receive_tips">
              注：15日后自动确认签收
            </div>
            <div class="form_sumit">
              <van-button round block type="info" class="validate_activeBtn" 
              @click="receiptDialog"
              >
                确认签收
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
      pageInfo_waybill:{},//代运单详情
      pageInfo_express:{},//快递单列表
      receivareaName:'',//收货地区名称
      transtypeName:'',//运输方式名称
      loading: false,//列表加载
      finished: false,//是否还有数据
      imgurl:'https://img.yzcdn.cn/vant/cat.jpeg'
    }
  },
  created(){
    console.log('id',this.id)
    console.log('type',this.curType)
    this.queryInfo_waybill();//查询代运单详情
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
         size:1000
       };
      this.$post('/expressbill/queryExpressbillList',params).then(data => {
        if(data.code === '0') {
            // 加载状态结束
          this.loading = false;
          this.pageInfo_express = data;
          this.finished = true;
        } else {
          if(data && data.msg){
              this.$toast.fail(data.msg);
           }
        }
      })
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
        message: '确定要删除该快递单吗？',
         confirmButtonText:'确定'
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
          this.$toast.success("删除成功");
          this.queryPageList_express(this.curType);//查询快递单列表
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
          this.$toast.success("取消订单成功");
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
        message: '确定要付款吗？',
         confirmButtonText:'确定'
      }).then(() => {
        //付款方法
        this.confirmPay(id);
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
          this.$toast.success("付款成功");
          // this.queryInfo_waybill();
           this.$router.push('/myWaybill');
          // this.queryPageList_express(this.curType);//查询快递单列表
        } else {
          if(data && data.msg){
              this.$toast.fail(data.msg);
           }
        }
      })
      console.log("付款");
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
    confirmReceipt(){
      console.log("确认签收");
      let params = {
        id:this.id
      };
      this.$post('/waybill/signWaybill', params).then(data => {
        if(data.code === '0') {
          this.$toast.success("签收成功");
          this.$router.push('/myWaybill');
          // this.queryPageList_express(this.curType);//查询快递单列表
        } else {
          if(data && data.msg){
              this.$toast.fail(data.msg);
           }
        }
      })
    },
    //查看图片
    viewImagePreview(){
      ImagePreview({
        images: [
          this.imgurl
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