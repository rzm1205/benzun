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
        :immediate-check="false"
        @load="onLoad"
        v-if="pageInfo.total>0"
      >
        <van-cell class="notice_list"  v-for="item in itemList" :key="item.id" :to="'/noticeInfo/'+item.id">
          <div class="notice_title">{{item.title}}</div>
          <div class="notice_time">{{item.ctime}}</div>
        </van-cell>
      </van-list>
      <div class="main_notice" v-if="pageInfo.total ===0">
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
      current:1,//当前页,默认1
      size:10,//每页记录数，默认10
      pageInfo:{
        dataList:[]
      },
      itemList:[],//数据列表
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
      this.itemList = [];//先清空
      this.current = 1;
      this.loading = true;
      this.finished = false;
      this.queryPageInfo();//查询列表
    },
    //查询列表
    queryPageInfo(){
       let params = {
         keyword:this.value,
         current:this.current,
         size:this.size
       };
      this.$post('/notice/queryNoticeList',params).then(data => {
        if(data.code === '0') {
          this.pageInfo = data;
          let rows = data.dataList; //请求返回当页的列表
          this.loading = false;
          this.pageInfo.total = data.total; //总数
          if (rows == null || rows.length === 0) {
            // 加载结束
            this.finished = true;
            return;
          }
          // 将新数据与老数据进行合并
          this.itemList = this.itemList.concat(rows);
        //如果列表数据条数>=总条数，不再触发滚动加载
          if (this.itemList.length >= this.pageInfo.total) {
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
    //list加载
    onLoad(){
      this.current++;
      this.queryPageInfo();
    }
  }
}
</script>
<style scoped>
</style>