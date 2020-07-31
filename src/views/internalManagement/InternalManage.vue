<template>
  <div class="main">
      <!-- 内部管理 -->
      <div class="internal_title"></div>
      <div class="internal_cell">
          <van-cell is-link to="/personnelList" size="large">
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <!-- <van-icon name="setting-o" /> -->
            <img src="~/assets/images/internal/internal1.png" alt="">
            <span class="custom-title">工作人员</span>
          </template>
        </van-cell>
        <van-cell is-link to="/bookingManage" size="large">
          <template #title>
            <img src="~/assets/images/internal/internal2.png" alt="">
            <span class="custom-title">预约管理</span>
          </template>
        </van-cell>
        <van-cell is-link to="/activeGuide" size="large">
          <template #title>
            <img src="~/assets/images/internal/internal3.png" alt="">
            <span class="custom-title">主动引领</span>
          </template>
        </van-cell>
        <van-cell is-link to="/messageNotification" size="large">
          <template #title>
            <img src="~/assets/images/internal/internal4.png" alt="">
            <span class="custom-title">短信通知</span>
          </template>
        </van-cell>
        <van-cell is-link to="/viewBooking" size="large">
          <template #title>
          <img src="~/assets/images/internal/internal5.png" alt="">
            <span class="custom-title">已有预约</span>
          </template>
        </van-cell>
        <van-cell is-link to="/modifyPassword" size="large">
          <template #title>
            <img src="~/assets/images/internal/internal6.png" alt="">
            <span class="custom-title">密码修改</span>
          </template>
        </van-cell>

      </div>
      
  </div>
</template>
<script>
export default {
  name: "InternalManage",
  data() {
    return {
    }
  }
}
</script>
<style scoped>
</style>