<template>
  <div class="home">
    <!-- 头部标题 -->
    <van-nav-bar title="首页" />
    <!-- 频道区域 -->
    <van-tabs v-model="tabActive">
      <div class="myicon" slot="nav-right">
        <van-icon name="wap-nav" @click="openChannel" />
      </div>
      <van-tab v-for="(item,index) in channelList" :key="index" :title="item.name">
        <!-- 下拉刷新组件 -->
        <van-pull-refresh v-model="item.pullloading" @refresh="onRefresh">
          <!-- 列表项 -->
          <van-list
            v-model="item.uploading"
            :finished="item.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <!-- 新闻数据 -->
            <van-cell v-for="(artItem,index) in item.articles" :key="index" :title="artItem.title"></van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <channel v-model="show" />
  </div>
</template>

<script>
//导入频道相关的方法
import { getChannel } from "@/api/channel.js";
import { getArticle } from "@/api/article.js";
//导入组件
import channel from "@/views/home/channel";
export default {
  data() {
    return {
      tabActive: 0,
      // uploading: false,
      // finished: false,
      // pullloading: false,
      list: [],
      show: false,
      channelList: [],
      show: false //管理弹出层
    };
  },

  methods: {
    async onLoad() {
      // 当前激活的频道的对象
      let activeChannel = this.channelList[this.tabActive];
      //得到激活频道的id
      let channelid = activeChannel.id;

      //判断时间戳是否为null , 为null说明数据已经加载完成
      if (activeChannel.pre_timestamp === null) {
        // 将状态设置为结束
        activeChannel.finished = true;
        //已经加载完成
        activeChannel.uploading = false;
        return;
      }

      //判断是否第一次进入方法
      if (activeChannel.pre_timestamp === 0) {
        // 动态请求文章数据
        let res = await getArticle({
          channel_id: channelid,
          timestamp: Date.now(),
          with_top: 1
        });
        // 将文章数据保存到当前激活频道的 articles 中
        activeChannel.articles = res.results;

        //将页面上的数据动态变化
        this.channelList = [...this.channelList];

        activeChannel.pre_timestamp = res.pre_timestamp;
        this.pullloading = false;
      } else {
        //第二次进入
        let res = await getArticle({
          channel_id: channelid,
          timestamp: activeChannel.pre_timestamp,
          with_top: 1
        });
        //将得到的数据源进行追加
        activeChannel.articles = [...activeChannel.articles, ...res.results];

        //将页面上的数据动态变化
        this.channelList = [...this.channelList];
        activeChannel.pre_timestamp = res.pre_timestamp;
      }
      activeChannel.uploading = false;
    },
    async onRefresh() {
      //当前激活的频道对象
      let channel = this.channelList[this.tabActive];
      //重置属性
      channel.articles = [];
      //下拉刷新
      channel.pullloading = false;
      //添加上拉加载完毕
      channel.finished = false;
      //添加上拉加载更多
      channel.uploading = false;
      //添加属性:pre_timestamp , 上一页数据的时间戳
      channel.pre_timestamp = 0;
      //重新请求数据
      this.onLoad();
    },
    //展示弹出层
    openChannel() {
      this.show = true;
    },
    //获取频道数据
    async getChannel() {
      //判断是否登录
      //得到用户登录信息
      // console.log(this.$store.state.user);
      let { user } = this.$store.state;

      if (user) {
        //user存在即表示登录
        let res = await getChannel();
        // console.log(res);
        //将频道数据保存
        this.channelList = res.channels;
      } else {
        //获取localStorage中的频道数据,chanelCache:频道缓存数据
        let channelCache = JSON.parse(window.localStorage.getItem("channel"));
        if (channelCache) {
          //如果有缓存数据直接赋值
          this.channelList = channelCache;
        } else {
          //调用接口得到数据
          let res = await getChannel();
          this.channelList = res.channels;
        }
      }
      // 给频道数据动态添加其他属性
      this.setChannelItem();
    },
    //给频道数据中的内容添加属性
    setChannelItem() {
      this.channelList.forEach(item => {
        //bug:不会响应式的变化
        //添加文章列表
        this.$set(item, "articles", []);
        //添加下拉刷新
        this.$set(item, "pullloading", false);
        //添加上拉加载完毕
        this.$set(item, "finished", false);
        //添加上拉加载更多
        this.$set(item, "uploading", false);
        //添加属性:pre_timestamp , 上一页数据的时间戳
        this.$set(item, "pre_timestamp", 0);
      });
    }
  },

  mounted() {
    this.getChannel();
  },

  components: {
    channel
  }
};
</script>

<style lang="less" scoped>
.home {
  margin-top: 90px;
}

//深度选择器 /deep/ 在保留scoped条件下可以修改组件内部的元素样式
.home /deep/ .van-tabs__wrap {
  position: fixed;
  top: 46px;
  left: 0;
  z-index: 999;
  width: 92%;
}

.myicon {
  position: fixed;
  top: 58px;
  right: 8px;
}

.van-cell {
  height: 100px;
}
</style>