<template>
  <div class="main">
      <!-- 工作人员信息 -->
      <div class="header_personnelInfo">
          <van-nav-bar 
            @click-left='goBack()'
            fixed 
          >
            <template #left v-if="this.$route.path!='/home'">
              <van-icon name="arrow-left" />
            </template>
            <template #title>
              <div>{{title}}</div>
            </template>
            <template #right >
              <van-tag  size="large"  v-if="!isShowTag">完成</van-tag>
              <van-tag type="primary" size="large" v-if="isShowTag" @click="modifyInfoMethod">完成</van-tag> 
            </template>
          </van-nav-bar>
          <!-- <van-icon name="arrow-left" color="#1989fa"  size="18" @click='goBack()'/>
          <van-tag  size="large"  v-if="!isShowTag">完成</van-tag>
          <van-tag type="primary" size="large" v-if="isShowTag" @click="modifyInfoMethod">完成</van-tag>  -->
      </div>
      <div class="personnel_form enter_form">
        <van-form @submit="modifyInfoMethod">
          <van-field
            v-model="modifyInfo.name"
            name="name"
            required
            label="姓名"
            placeholder="请输入姓名"
            @input="changeTag"
            :rules="[{ required: true, message: '请输入姓名' }]"
          />
          <van-field
            v-model="modifyInfo.phone"
            name="phone"
            required
            label="手机号"
            type="tel"
            placeholder="请输入手机号"
            @input="changeTag"
             :rules="[
            { required: true, message: '请输入手机号' },
            { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式错误'}
            ]"
          />
          <van-field
            v-model="modifyInfo.dept"
            required
            @input="changeTag"
            name="dept"
            label="部门"
            placeholder="请输入部门"
            :rules="[{ required: true, message: '请输入部门' }]"
          />
          <van-field
            v-model="modifyInfo.position"
            @input="changeTag"
            required
            name="position"
            label="职位"
            placeholder="请输入职位"
            :rules="[{ required: true, message: '请输入职位' }]"
          />
        </van-form>
        <div class="btn_positionFixed">
          <van-button  block type="danger" @click="deleteDialog">
            删除该人员
          </van-button>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  name: "PersonnelInfo",
  data() {
    return {
      title:'人员信息',
      isShowTag:false,//一进入页面，完成按钮显示灰色，如果有编辑信息，则显示蓝色
      modifyInfo:{},
      id: this.$route.params.id,//获取路由传参
    }
  },
  created() {
    this.queryModifyInfo();
    
  },
  methods: {
    //信息是否发生变化，tag标签更改颜色；
    changeTag(value){
      console.log('发生变化');
      this.isShowTag = true;
    },
    // 编辑回显
    queryModifyInfo() {
      //console.log(this.id)
      let params = {
        id:this.id
      };
      this.$post('/ztjgPersonnel/getPersonnel', params).then(data => {
        if(data.rs === 1) {
          this.modifyInfo = data.data;
        } else {
          if(data.data && data.data.errorMsg){
              this.$toast.fail(data.data.errorMsg);
          }else{
              this.$toast.fail(data.errorMsg);
          }
        }
      })
    },
     // 编辑确认
    modifyInfoMethod(values) {
      console.log(values);
      let params = {
        id:this.id,
        name:this.modifyInfo.name,
        phone:this.modifyInfo.phone,
        dept:this.modifyInfo.dept,
        position:this.modifyInfo.position
      };
      this.$post('/ztjgPersonnel/updatePersonnel', params).then(data => {
        if(data.rs === 1) {
          this.$toast.success("修改成功");
          // 添加成功后，跳转到工作人员列表
          this.$router.push('/personnelList')
        } else {
          if(data.data && data.data.errorMsg){
              this.$toast.fail(data.data.errorMsg);
          }else{
              this.$toast.fail(data.errorMsg);
          }
        }
      })
    },
    //删除弹框
    deleteDialog() {
      this.$dialog.confirm({
        message: '确定要删除该人员吗？',
         confirmButtonText:'确定'
      }).then(() => {
        //删除方法
        this.deleteInfoMethod()
        // on confirm
      }).catch(() => {
        console.log('点击了取消')
        // on cancel
      });  
    },
    //删除方法
    deleteInfoMethod() {
      let params = {
        id:this.id
      };
      this.$post('/ztjgPersonnel/deletePersonnel', params).then(data => {
        if(data.rs === 1) {
          this.$toast.success("删除成功");
          // 添加成功后，跳转到工作人员列表
          this.$router.push('/personnelList')
        } else {
          if(data.data && data.data.errorMsg){
              this.$toast.fail(data.data.errorMsg);
          }else{
              this.$toast.fail(data.errorMsg);
          }
        }
      })
    },
    //取消返回操作
    goBack() {
      this.$dialog.confirm({
        message: '确定要放弃此次编辑吗？',
        confirmButtonText:'确定'
      }).then(() => {
        //确认返回上一级
        this.$router.push('/personnelList')
        // on confirm
      }).catch(() => {
        console.log('点击了取消')
        // on cancel
      });  
    }
  }
}
</script>
<style scoped>
.header_personnelInfo{
  width: 100%;
  /* display: flex;
  justify-content: space-between;
  align-items: center; */
  background: transparent;
  /* height: 54px;
  line-height: 54px; */
  position: fixed;
  top: -4px;
  right: 10px;
  z-index: 999;
}
</style>