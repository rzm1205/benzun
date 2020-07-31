<template>
  <div class="mian">
      <!-- 添加快递单，编辑的代运单的时候才能跳到这里 -->
      <div class="psd_form addWaybillInfo">
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
              label="快递公司"
              placeholder="请选择"
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
                title="请选择快递公司"
                show-toolbar
                :columns="companyList_name"
                @cancel="showCompanyDialog = false"
                @confirm="confirmyDicsMethod"
              />
            </van-popup>
            <van-field
              v-model="expressInfo.expressnum"
              required
              name="expressnum"
              type="text"
              label="快递单号"
              placeholder="请输入"
               :rules="[{ required: true, message: '请输入快递单号' }]"
            />
            <van-field
              v-model="expressInfo.name"
              required
              name="name"
              type="text"
              label="物品名称"
              placeholder="请输入"
              :rules="[{ required: true, message: '请输入物品名称' }]"
            />
            <van-field
              v-model="expressInfo.num"
              required
              name="num"
              type="number"
              label="物品数量"
              placeholder="请输入"
              :rules="[{ required: true, type:'number', message: '请输入物品数量' }]"
            />
            <div class="waybillInfo_pay">
              <div class="payInfo_sumit">
                <div class="form_sumit">
                  <van-button round block 
                  type="info" 
                  class="validate_activeBtn" 
                  native-type="submit" 
                  >
                    确认添加
                  </van-button>
                </div>
                <div class="form_sumit">
                  <van-button round block type="default" 
                  @click="cancelExpress"
                  >
                    取消
                  </van-button>
                </div>
              </div>
            </div>
        </van-form>
      </div>
  </div>
</template>
<script>
export default {
  name: "AddExpress",
  data() {
    return {
      waybillId:this.$route.params.id,//代运单Id
      expressInfo:{},//单个快递单集合
      companyList:[],//查询运输公司
      showCompanyDialog: false,//弹出运输公司下拉框
      companyInfo:{},//运输公司内容
      companyList_name:[],//展示下拉列表
    }
  },
  created(){
    this.queryDicsList('company');//查询运输公司
  },
  methods:{
    // 查询运输方式或收货地区、运输公司
    queryDicsList(sign){
      let params = {
        sign:sign
      };
      this.$post('/dic/queryDics', params).then(data => {
        if(data.code === '0') {
          if(sign === 'company'){
            this.companyList = data.dataList;
          }
          this.companyList_name = [];//name列表
          this.companyList.map(item =>{
            let set =  {"keyId":'',"text":''}
            set.keyId = item.id;
            set.text = item.text;
            this.companyList_name.push(set);
          })
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
    confirmyDicsMethod(value){
      console.log(value);
      this.companyInfo.id = value.keyId;
      this.companyInfo.text= value.text;
      this.showCompanyDialog = false;//弹出运输公司下拉框
    },
    //确认下单---快递单
    onSubmitExpress(values) {
      let params = {
        companyId:this.companyInfo.id,//运输公司
        expressnum:this.expressInfo.expressnum,//快递单号
        name:this.expressInfo.name,//物品
        num:this.expressInfo.num,//数量
        waybillId:this.waybillId,//代运单Id
      }
      console.log('express', values);
      this.$post('/expressbill/addExpressbill', params).then(data => {
        if(data.code === '0') {
          this.$toast.success("创建成功");
          //返回代运单详情页-待确认页面
          this.$router.push('/waybillInfo/'+this.waybillId+'/0');
        } else {
          if(data && data.msg){
              this.$toast.fail(data.msg);
          }
        }
      })
    },
    //取消快递单
    cancelExpress(){
      //暂时跳到我的代运单
      this.$router.push('/waybillInfo/'+this.waybillId+'/0');
    },
  }
}
</script>
<style scoped>
</style>