<template>
  <div class="main">
      <!-- 创建代运单页 -->
      <div class="addWaybillInfo_main">
        <div class="psd_form addWaybillInfo" v-if="showType==='waybill'">
          <van-form @submit="onSubmitWaybill" label-width="2.2rem">
            <van-field
              name="address"
              v-model="address" 
              :label="$t('常用地址')"
              @click="showAddressDialog = true"
            >
              <template #input v-if="showType==='waybill'">
               <span class="ofenAddress_btn">
                <img src="~/assets/images/main/add_sel.png" alt="">
                 {{ $t('从历史地址簿中选择')}}
                </span>
              </template>
            </van-field>
            <van-field
              v-model="addressee"
              required
              name="addressee"
              type="text"
              :label="$t('收件人')"
              :placeholder="$t('请输入')"
              :rules="[{ required: true, message: $t('请输入收件人')}]"
            />
            <van-field
              v-model="phone"
              required
              name="phone"
              type="tel"
              :label="$t('联系电话')"
              :placeholder="$t('请输入')"
              :rules="[{ required: true, message: $t('请输入联系电话')}]"
            />
            <!-- <van-field
              readonly
              required
              clickable
              is-link 
              arrow-direction="down" 
              type="text"
              name="transtypeId"
              :value="transTypeInfo.text"
              :label="$t('运输方式')"
              :placeholder="$t('请选择')"
              @click="showTranstypeDialog = true"
            /> -->
            <!-- 运输方式列表弹出层 -->
            <!-- <van-popup 
              v-model="showTranstypeDialog"
              round 
              position="bottom">
              <van-picker
                item-height='45'
                visible-item-count='4'
                :title="$t('运输方式')"
                show-toolbar
                :columns="transtypeList_name"
                @cancel="showTranstypeDialog = false"
                @confirm="confirmyDicsMethod_transtype"
              />
            </van-popup> -->
            <van-field
              readonly
              required
              clickable
              is-link 
              arrow-direction="down" 
              name="receivareaId"
              :value="receivareaInfo.text"
              type="text"
              :label="$t('收货地区')"
              :placeholder="$t('请输入')"
              @click="showReceivareaDialog = true"
            />
            <!-- 收货地区列表弹出层 -->
            <van-popup 
              v-model="showReceivareaDialog"
              round 
              position="bottom">
              <van-picker
                item-height='45'
                visible-item-count='4'
                :title="$t('收货地区')"
                show-toolbar
                :columns="receivareaList_name"
                @cancel="showReceivareaDialog = false"
                @confirm="confirmyDicsMethod_receivarea"
              />
            </van-popup>
            <van-field
              required
              v-model="detailedaddress"
              name="detailedaddress"
              type="text"
              :label="$t('详细地址')"
              :placeholder="$t('请输入')"
              :rules="[{ required: true, message: $t('请输入详细地址')}]"
            />
            <van-field
              v-model="postcode"
              name="postcode"
              type="text"
              :label="$t('邮编')"
              :placeholder="$t('请输入')"
            />
            <van-field
              v-model="description"
              name="description"
              rows="2"
              autosize
              type="textarea"
              maxlength="100"
              :label="$t('订单备注')"
              show-word-limit
              :placeholder="$t('请输入')"
            />
            <!-- 确认下单 -->
            <div class="waybillInfo_pay">
              <div class="payInfo_sumit">
                <!-- <div class="receive_tips">
                </div> -->
                <div class="form_sumit">
                  <van-button round block 
                  type="info" 
                  class="validate_activeBtn" 
                  native-type="submit" 
                  >
                    {{$t('确认下单')}}
                  </van-button>
                </div>
              </div>
            </div>
        </van-form>
      </div>
      <!-- 添加快递单页，出现快递单表单 -->
      <div class="form_sumit addExpress" v-if="showType==='waybill'">
        <van-button round block type="info" 
        class="validate_activeBtn" 
        icon="plus"
        @click="addExpress"
        >
         {{$t('添加快递单')}}
        </van-button>
      </div>
      <div class="expressInfo_list" v-if="showType==='waybill'">
        <!-- 快递单列表 -->
        <div class="waybill_list waybillInfo_list"  v-for="(item,index) in expressbillList" :key="index">
          <div class="waybill_title">
            <span>{{$t('快递单号')}}:</span>
            <font>{{item.expressnum}}</font>
            <!-- 待入库的不能查看照片 -->
            <div class="waybillInfo_state">
              <!-- <img v-if="item.curType === 0" src="~/assets/images/main/storage_wait.png" alt="">
              <img v-if="item.curType != 0" src="~/assets/images/main/storage_already.png" alt=""> -->
              <img  src="~/assets/images/main/order_wait.png" alt="">
            </div>
          </div>
          <div class="receiver_detail waybillInfo_detail"  
            style="padding-bottom:0.64rem;">
            <div class="receiver_mode expressInfo">
              <div>
                <span>{{$t('快递公司')}}:</span>
                <font>{{item.companyName}}</font>
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
              <div>
                 <!-- 状态是未入库时，不显示查看图片按钮和重量体积，状态是已入库时才显示 -->
                <span>
                  <a href="javascript:void(0);"
                  >
                  {{$t('查看图片')}}
                  </a>
                  </span>
              </div>
            </div>
            <div class="receiver_mode expressInfo">
              <div>
                <span>{{$t('重量体积')}}:</span>
                <!-- 后台录入重量体积 -->
                <font>-</font>
              </div>
            </div>
            <div  class="express_deleteBtn" @click="deleteExpress(index)">
              <span>{{$t('删除')}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 创建快递单页 -->
      <div class="psd_form addWaybillInfo" v-if="showType==='express'">
          <van-form @submit="onSubmitExpress" label-width="2.2rem">
            <van-field
              readonly
              clickable
              required
              is-link 
              arrow-direction="down" 
              :value="companyInfo.text"
              type="text"
              name="companyId"
              :label="$t('快递公司')"
              :placeholder="$t('请选择')"
              @click="showCompanyDialog = true"
            />
            <!-- 快递公司列表弹出层 -->
            <van-popup 
              v-model="showCompanyDialog"
              round 
              position="bottom">
              <van-picker
                item-height='45'
                visible-item-count='4'
                :title="$t('快递公司')"
                show-toolbar
                :columns="companyList_name"
                @cancel="showCompanyDialog = false"
                @confirm="confirmyDicsMethod_company"
              />
            </van-popup>
            <van-field
              v-model="expressInfo.expressnum"
              required
              name="expressnum"
              type="text"
              :label="$t('快递单号')"
              :placeholder="$t('请输入')"
              :rules="[{ required: true, message: $t('请输入快递单号')}]"
            />
            <van-field
              v-model="expressInfo.name"
              required
              name="name"
              type="text"
              :label="$t('物品名称')"
              :placeholder="$t('请输入')"
              :rules="[{ required: true, message: $t('请输入物品名称')}]"
            />
            <van-field
              v-model="expressInfo.num"
              required
              name="num"
              type="number"
              :label="$t('物品数量')"
              :placeholder="$t('请输入')"
              :rules="[{ required: true, type:'number', message: $t('请输入物品数量') }]"
            />
            <div class="waybillInfo_pay">
              <div class="payInfo_sumit">
                <div class="form_sumit">
                  <van-button round block 
                  type="info" 
                  class="validate_activeBtn" 
                  native-type="submit" 
                  >
                   {{ $t('确认添加')}}
                  </van-button>
                </div>
                <div class="form_sumit">
                  <van-button round block type="default" 
                  @click="cancelExpress"
                  >
                     {{ $t('取消')}}
                  </van-button>
                </div>
              </div>
            </div>
        </van-form>
      </div>
    </div>
    <!-- 常用地址列表弹框 -->
    <van-dialog 
      class="address_dialog"
      v-model="showAddressDialog" 
      show-cancel-button 
      :beforeClose="confirmAddressMethod">
        <!-- 使用 left-icon 插槽来标题 -->
      <template slot="title">
        <div class="access_title">{{$t('历史地址簿')}}</div>
      </template>
      <div class="address_box" >
        <div v-if="addressList.length>0">
           <div class="address_list"  v-for="item in addressList" :key="item.id">
              <van-radio-group v-model="addressInfo">
                <div class="address_title">
                  <van-radio :name="item">
                    <template #icon="props">
                      <img class="img-icon" :src="props.checked ? require('@/assets/images/main/radio_sel.png') : require('@/assets/images/main/radio_nor.png')" />
                    </template>
                    <span class="address_name">{{item.addressee}}</span>
                    <span class="address_phone"> {{item.phone}}</span>
                  </van-radio>
                </div>
                <div class="address_detail">
                    {{item.detailedaddress}}
                </div>
              </van-radio-group>
            </div>
        </div>
        <div class="main_notice" v-if="addressList.length ===0">
          <van-empty :description="$t('暂无数据')" />
        </div>
      </div>
    </van-dialog>
  </div>
</template>
<script>

//将电话号码中间的几位数隐藏显示
import {starPhone} from '@/util/common.js';

export default {
  name: "AddWaybill",
  data() {
    return {
      radio: '1',
      // activeIcon: '..',
      // inactiveIcon: 'https://img.yzcdn.cn/vant/user-inactive.png',
      showType:"waybill",
      addressInfo:{},//获取常用地址框的内容
      address:'',//
      addressee:'',//收件人
      phone:'',
      transtypeId:'',//运输方式
      receivareaId:'',//收货地区
      detailedaddress:'',//详细地址
      postcode:'',//邮编
      description:'',//代运单描述
      expressbillList:[],//快递单数组
      expressInfo:{},//单个快递单集合
      transtypeList:[],//存储运输方式，
      receivareaList:[],//查询收货地区，
      companyList:[],//查询运输公司
      showAddressDialog:false,//常用地址弹框
      showTranstypeDialog: false,//弹出运输方式下拉框
      showReceivareaDialog: false,//弹出收货地区下拉框
      showCompanyDialog: false,//弹出运输公司下拉框
      transTypeInfo:{},//运输方式内容
      receivareaInfo:{},//收货地区内容
      companyInfo:{},//运输公司内容
      transtypeList_name:[],//展示下拉列表
      receivareaList_name:[],//展示下拉列表
      companyList_name:[],//展示下拉列表
      addressList:[],//常用地址
    }
  },
  created(){
    this.queryAddressList();//常用地址查询
    // this.queryDicsList('transtype');//查询运输方式
    this.queryDicsList('receivarea');//查询收货地区
    this.queryDicsList('company');//查询运输公司
  },
  methods:{
    //收货地区、根据Id返显地区
    queryloadDicById(id){
       let params = {
         id:id
       };
      this.$post('/dic/loadDic',params).then(data => {
        if(data.code === '0') {
          this.receivareaInfo.text = data.data.text;
          //将获取到的收货地区，
          console.log(this.receivareaInfo.text);
        } else {
          if(data && data.msg){
              this.$toast.fail(data.msg);
           }
        }
      })
    },
    // 查询常用地址
    queryAddressList(userId){
      let params = {
      };
      this.$post('/waybill/queryAddrsList', params).then(data => {
        if(data.code === '0') {
           this.addressList = data.dataList;
          //  this.addressList.map((item)=>{
          //    //手机号中间几位加星号
          //    item.phone = starPhone(item.phone);
          //  })
        } else {
          if(data && data.msg){
              this.$toast.fail(data.msg);
          }
        }
      })
    },
    // 是否关闭常用地址弹框-关闭前的判断
    confirmAddressMethod(action, done) {
      if(action === 'confirm') {
        console.log(this.addressInfo);
        if(this.addressList && this.addressList.length>0){
          if(this.addressInfo.addressee === undefined) {
              this.$toast(this.$t('请选择一条历史地址簿'))
              done(false) //不关闭弹框
              return
          }
        }
        //赋值给页面上显示
        if(this.addressInfo.addressee){
          this.addressee = this.addressInfo.addressee;//收件人
          this.phone = this.addressInfo.phone;
          this.receivareaInfo.id = this.addressInfo.receivarea_id;//收货地区
          this.receivareaInfo.text = this.addressInfo.prefix + '·' + this.addressInfo.suffix;//收货地区
          //  this.queryloadDicById(this.receivareaInfo.id);//根据id反显收货地区名称
          this.detailedaddress = this.addressInfo.detailedaddress;//详细地址
          console.log( '收货地区',this.receivareaInfo.id);
        }
         done() //关闭

      } else if(action === 'cancel') {
        done() //关闭
      }
    },
    // 查询运输方式或收货地区、运输公司
    queryDicsList(sign){
      let params = {
        sign:sign
      };
      this.$post('/dic/queryDics', params).then(data => {
        if(data.code === '0') {
          if(sign === 'transtype'){
            this.transtypeList = data.dataList;
          }else if(sign === 'receivarea'){
            this.receivareaList = data.dataList;
          }else if(sign === 'company'){
            this.companyList = data.dataList;
          }
          this.transtypeList_name = [];//name列表
          this.receivareaList_name = [];//name列表
          this.companyList_name = [];//name列表
          //  {"keyId":2,"text":"测试1"},
          this.transtypeList.map(item =>{
            let set =  {"keyId":'',"text":''}
            set.keyId = item.id;
            set.text = item.text;
            this.transtypeList_name.push(set);
          })
          this.receivareaList.map(item =>{
            let set =  {"keyId":'',"text":''}
            set.keyId = item.id;
            // 马来西亚·吉隆坡
            set.text = item.text+'·'+item.other;
            this.receivareaList_name.push(set);
          })
          this.companyList.map(item =>{
            let set =  {"keyId":'',"text":''}
            set.keyId = item.id;
            set.text = item.text;
            this.companyList_name.push(set);
          })
          console.log(this.transtypeList_name)
          console.log(this.receivareaList_name)
          console.log(this.companyList_name);
        } else {
          if(data && data.msg){
              this.$toast.fail(data.msg);
          }
        }
      })
    },
     //下拉框
    //确认选择运输方式、收货地区、运输公司
    confirmyDicsMethod_transtype(value){
      this.transTypeInfo.id = value.keyId;
      this.transTypeInfo.text= value.text;
      this.showTranstypeDialog = false;//关闭弹出层
    },
    confirmyDicsMethod_receivarea(value){
       // text黑点前面 other黑点后面   马来西亚·吉隆坡
      this.receivareaInfo.id = value.keyId;
      this.receivareaInfo.text = value.text;
      // this.receivareaInfo.other= value.other;
      this.showReceivareaDialog = false;//弹出收货地区下拉框
    },
    confirmyDicsMethod_company(value){
      this.companyInfo.id = value.keyId;
      this.companyInfo.text= value.text;
      this.showCompanyDialog = false;//弹出运输公司下拉框
    },
    //确认下单---代运单
    onSubmitWaybill() {
      // if( this.transTypeInfo.id === undefined ||  this.transTypeInfo.id===''){
      //   this.$toast.fail('请选择运输方式');
      //   return;
      // }
      let params = {
        addressee:this.addressee,//收件人
        phone:this.phone,
        // transtypeId:this.transTypeInfo.id,//运输方式
        receivareaId:this.receivareaInfo.id,//收货地区
        detailedaddress:this.detailedaddress,//详细地址
        postcode:this.postcode,//邮编
        description:this.description,//代运单描述
        expressbillList:JSON.stringify(this.expressbillList),//快递单数组
      }
      console.log('addWaybill', params);
      this.$post('/waybill/addWaybill', params).then(data => {
        if(data.code === '0') {
          this.$toast.success(this.$t('创建成功'));
          //跳转到我的代运单
          this.$router.push('/myWaybill');
        } else {
          if(data && data.msg){
              this.$toast.fail(data.msg);
          }
        }
      })
    },
    //添加快递单
    addExpress(){
      // 展示快递单
      this.showType = "express";
      this.expressInfo = {};//清空快递单内容
      this.companyInfo = {};//清空快递公司
    },
    //取消快递单
    cancelExpress(){
      // 展示代运单
      this.showType = "waybill";
    },
   //确认下单---快递单
    onSubmitExpress(values) {
       console.log('express', values);
      //  0-待确认 1-待付款 2-运输中 3-已完成
       //将curType赋值为0。0的时候不显示图片及重量体积
       values.curType = 0;
       values.companyName = this.companyInfo.text;
       values.companyId = this.companyInfo.id;
       //将快递单内容添加到pageInfo数组中
       this.expressbillList.push(values);
       //添加完快递单后显示代运单页
        this.showType = "waybill";
    },
    //删除快递单
    deleteExpress(index){
      console.log(index);
      this.expressbillList.splice(index,1);
    }
  }
}
</script>
<style scoped>
</style>