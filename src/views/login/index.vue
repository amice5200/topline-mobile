<template>
  <div class="login">
    <!-- 头部导航 -->
    <van-nav-bar title="登录" />
    <!-- 输入框 -->
    <van-cell-group>
      <van-field
        v-model="mobile"
        left-icon="phone"
        required
        clearable
        label="手机号码"
        placeholder="请输入手机号"
        @click-right-icon="$toast('question')"
      />

      <van-field
        v-model="code"
        left-icon="lock"
        type="password"
        label="验证码"
        placeholder="请输入验证码"
        required
      />
      <!-- 登录按钮 -->
      <div class="mybtn">
        <van-button type="info" size="large">大号按钮</van-button>
      </div>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mobile: "18888888888",
      code: "246810"
    };
  }
};
</script>

<style lang="less" scoped>
.van-nav-bar {
  background-color: #1989fa;

  .van-nav-bar__title {
    color: #fff;
  }
}
.mybtn {
  margin: 10px;

  .van-button {
    border-radius: 5px;
  }
}
</style>