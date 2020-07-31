<template>
  <div class="main">
      <!-- 工作人员列表 -->
      <!-- 下拉刷新 -->
      <div class="personnel_list">
          <!-- <van-pull-refresh v-model="refreshing" @refresh="onRefresh"> -->
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="queryPageInfo"
            >
              <van-cell  is-link center v-for="item in pageInfo" :key="item.id" :to="'/personnelInfo/'+item.id">
                <!-- 使用 title 插槽 -->
                <template #title>
                  <span class="personnel_name">{{item.name}}</span>
                  <span class="personnel_phone">{{item.phone}}</span>
                </template>
                <!-- 使用 label 插槽 -->
                <template #label>
                  <span class="custom-title personnel_label">{{item.dept}}</span>
                  <span class="custom-title personnel_phone">{{item.position}}</span>
                </template>
              </van-cell>
            </van-list>
          <!-- </van-pull-refresh> -->
      </div>
      
      <div class="add_btn">
        <van-button
          type="info" 
          size="normal" 
          block
          to="/addPersonnel"
          >新增工作人员</van-button>
      </div>
  </div>
</template>
<script>
export default {
  name: "PersonnelList",
  data() {
    return {
      search:{
        enterpriseId:this.$store.state.enterpriseId
      },
      pageInfo:[],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    // 获取分页信息
    queryPageInfo() {
        let params = {
        }
        this.$post('/ztjgPersonnel/listPersonnel',params).then(data => {
          // if (this.refreshing) {
          //   this.pageInfo = [];
          //   this.refreshing = false;
          // }
          if(data.rs === 1) {
             // 加载状态结束
            this.loading = false;
            
            this.pageInfo = data.data;
            this.finished = true;
          } else {
            if(data.data && data.data.errorMsg){
                this.$toast.fail(data.data.errorMsg);
            }else{
                this.$toast.fail(data.errorMsg);
            }
          }
        })
    },
    //下拉刷新
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.queryPageInfo();
    }
  }
}
</script>
<style scoped>
.add_btn{
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;
}
.add_btn .van-button--info{
  border-radius: 0;
}
</style>