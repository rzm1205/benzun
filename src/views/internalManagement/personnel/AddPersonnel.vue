<template>
  <div class="main">
      <!-- 新增工作人员 -->
      <div class="personnel_form enter_form">
        <van-form @submit="addInfoMethod">
          <van-field
            v-model="addInfo.name"
            required
            name="name"
            label="姓名"
            placeholder="请输入姓名"
            :rules="[{ required: true, message: '请输入姓名' }]"
          />
          <van-field
            v-model="addInfo.phone"
            required
            name="phone"
            label="手机号"
            type="tel"
            placeholder="请输入手机号"
            :rules="[
            { required: true, message: '请输入手机号' },
            { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式错误'}
            ]"
          />
          <van-field
            v-model="addInfo.dept"
            required
            name="dept"
            label="部门"
            placeholder="请输入部门"
            :rules="[{ required: true, message: '请输入部门' }]"
          />
          <van-field
            v-model="addInfo.position"
            required
            name="position"
            label="职位"
            placeholder="请输入职位"
            :rules="[{ required: true, message: '请输入职位' }]"
          />
          <div class="btn_positionFixed">
            <van-button round block type="info" native-type="submit" >
              保存
            </van-button>
          </div>
        </van-form>
      </div>
  </div>
</template>
<script>
export default {
  name: "AddPersonnel",
  data() {
    return {
      addInfo:{}
    }
  },
  methods: {
     // 新增
    addInfoMethod(values) {
        console.log(values);
        this.$post('/ztjgPersonnel/addPersonnel', values).then(data => {
          if(data.rs === 1) {
            this.$toast.success("新增成功");
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
  }
}
</script>
<style scoped>
</style>