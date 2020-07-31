<template>
  <div class="main">
    <!-- 信息录入 -->
    <div class="enter_title">
      <header>请填写以下个人信息</header>
      <p>请认真填写以下信息，申请通过会更加方便</p>
    </div>
    
    <div class="enter_form">
      <van-form @submit="onSubmit">
        <!-- <van-field
          v-model="name"
          required
          name="name"
          label-class="enter_label"
          label="姓名"
          placeholder="请输入姓名"
          @blur="checkPhone" 
          :error-message="errMsg.mobilePhone" 
        /> -->
        <van-field
          v-model="name"
          required
          name="name"
          label-class="enter_label"
          label="姓名"
          placeholder="请输入姓名"
          :rules="[{ required: true, message: '请输入姓名' }]"
        />
        <van-field
          v-model="phone"
          required
          name="phone"
          label-class="enter_label"
          label="手机号"
          type="tel"
          placeholder="请输入手机号"
          :rules="[
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式错误'}
          ]"
        />
        <van-field
          v-model="company"
          name="company"
          label-class="enter_label"
          label="公司名称"
          placeholder="请输入公司名称"
        />
        <van-field
          class="spec"
          readonly
          required
          clickable
          v-model="visitDate"
          name="visitDate"
          :value="visitDate"
          label-class="enter_label"
          label="拜访时间"
          placeholder="请选择拜访时间"
          is-link 
          arrow-direction="down" 
          @click="showVisitDate = true"
        />
        <!-- 选择拜访时间弹出层 -->
        <van-popup 
          v-model="showVisitDate"
          round 
          position="bottom">
          <van-datetime-picker
            item-height='45'
            visible-item-count='4'
            v-model="currentDate"
            type="datetime"
            title="请选择拜访时间"
            :min-date="minDate"
            :max-date="maxDate"
            :formatter="formatter"
            @cancel="showVisitDate = false"
            @confirm="confirmVisitDateMethod"
          />
        </van-popup>
        <van-field
          class="spec"
          readonly
          required
          clickable
          label="拜访人员"
          name="personnelId"
          :value="personnelName"
          label-class="enter_label"
          placeholder="请选择拜访人员"
          is-link 
          arrow-direction="down" 
          @click="showPersonnel = true"
        />
        <!-- 拜访人员列表弹出层 -->
        <van-popup 
          v-model="showPersonnel"
          round 
          position="bottom">
          <van-picker
            item-height='45'
            visible-item-count='4'
            title="请选择拜访人员"
            show-toolbar
            :columns="columns_name"
            @cancel="showPersonnel = false"
            @confirm="confirmPersonnelMethod"
          />
        </van-popup>
        <div class="enter_submit" >
          <van-button block type="info" native-type="submit" >
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
import { formatDate } from '@/util/date.js'

export default {
  name: "InformationEntry",
  data() {
    return {
      enterpriseId:this.$store.state.enterpriseId,
      name:'',
      phone:'',
      company:'',
      visitDate:'',
      showVisitDate:false,//弹出拜访时间弹框
      personnelId:'',//拜访人员对应的id
      personnelName:'',//拜访人员对应的名字
      showPersonnel: false,//弹出拜访人员弹框
      pageInfo:[],//工作人员列表
      columns_name:[],//工作人员名字列表
      minDate: new Date(),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date()
    }
  },

  created() {
    this.queryPageInfo();//查询工作人员列表
  },
  methods: {
    //时间插件
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`;
      }else if (type === 'month') {
        return `${val}月`;
      } else if (type === 'day') {
        return `${val}日`;
      }
      return val;
    },
    //查询工作人员列表
     queryPageInfo() {
        let params = {
          enterpriseId:this.enterpriseId
        }
        this.$post('/ztjgPersonnel/listPersonnel',params).then(data => {
          if(data.rs === 1) {
            this.pageInfo = data.data;
            this.columns_name = [];//工作人员name列表
            //  {"keyId":2,"text":"测试1"},
            this.pageInfo.map(item =>{
              let set =  {"keyId":'',"text":''}
              set.keyId = item.id;
              set.text = item.name;
              this.columns_name.push(set)
            })
            console.log(this.columns_name)
          } else {
            if(data.data && data.data.errorMsg){
                this.$toast.fail(data.data.errorMsg);
            }else{
                this.$toast.fail(data.errorMsg);
            }
          }
        })
    },
    //确认选择工作人员
    confirmPersonnelMethod(value){
      console.log(value)
      this.personnelId = value.keyId;
      this.personnelName= value.text;
      this.showPersonnel = false;//关闭弹出层
    },
    // 确认选择拜访时间
    confirmVisitDateMethod(value) {
      // console.log(value)
      // 转换为yyyy-MM-dd hh:mm:ss时间格式
      this.visitDate = formatDate(new Date(value), "yyyy-MM-dd hh:mm:ss");
      console.log(this.visitDate)
      this.showVisitDate = false;//关闭弹出层
    },
    //提交预约申请
    onSubmit(values) {
      // console.log(values);
      //追加参数
      values.personnelId = this.personnelId
      values.enterpriseId = this.enterpriseId
      this.$post('/ztjgOrderManage/addOrder', values).then(data => {
        if(data.rs === 1) {
          this.$toast.success("您的预约已提交\n请您耐心等待");
          // 添加成功后，跳转到工作人员列表
          setTimeout(() =>{
             this.$router.push('/home');
          },2000);
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