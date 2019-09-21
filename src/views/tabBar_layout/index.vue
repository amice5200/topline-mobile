<template>
  <div>
    <router-view></router-view>
    <!-- 封装底部tabbar -->
    <!-- 底部tabbar -->
    <van-tabbar v-model="tabBarActive" route>
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="search">视频</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/test">问答</van-tabbar-item>
      <van-tabbar-item icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
    <!-- {{tabActive}} -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabBarActive: 0
    };
  }
};
</script>

<style>
</style>