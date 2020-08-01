<template>
  <div class="main">
    <div class="search_notice">
      <van-search 
        v-model="value" 
        :placeholder="$t('请输入您要搜索的关键字')" 
        @search="onSearch"
      >
        <template #left-icon>
          <img src="~/assets/images/main/search.png" alt="">
        </template>
      </van-search>
    </div>
    <div class="notice_box">
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="$t('没有更多了')"
        @load="queryPageInfo"
        v-if="pageInfo.dataList.length>0"
      >
        <van-cell class="notice_list"  v-for="item in pageInfo.dataList" :key="item.id" :to="'/noticeInfo/'+item.id">
          <div class="notice_title">{{item.title}}</div>
          <div class="notice_time">{{item.ctime}}</div>
        </van-cell>
      </van-list>
      <div class="main_notice" v-if="pageInfo.dataList.length<=0">
        <van-empty :description="$t('暂无数据')" />
      </div>
      </div>
  </div>
</template>
<script>
export default {
  name: "Notice",
  data() {
    return {
      value:'',
      current:'',//当前页,默认1
      size:'',//每页记录数，默认10
      pageInfo:{
        dataList:[]
      },
      loading: false,//列表加载
      finished: false//是否还有数据
    }
  },
  created(){
    this.queryPageInfo();
  },
  methods:{
    //搜索框方法
    onSearch(val) {
      console.log(val);
      this.queryPageInfo();//查询列表
    },
    //查询列表
    queryPageInfo(){
       let params = {
         keyword:this.value
        //  current:this.current,
        //  size:this.size
       };
      this.$post('/notice/queryNoticeList',params).then(data => {
        if(data.code === '0') {
            // 加载状态结束
          this.loading = false;
          this.pageInfo = data;
          this.finished = true;
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