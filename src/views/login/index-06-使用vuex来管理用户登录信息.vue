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
        v-validate="'required'"
        name="mobile"
        :error-message="errors.first('mobile')"
      />

      <van-field
        v-model="code"
        left-icon="lock"
        type="password"
        label="验证码"
        placeholder="请输入验证码"
        required
        v-validate="'required'"
        name="code"
        :error-message="errors.first('code')"
      />
      <!-- 登录按钮 -->
      <div class="mybtn">
        <van-button type="info" size="large" @click="login">登录</van-button>
      </div>
    </van-cell-group>
  </div>
</template>

<script>
//请求登录接口
import { uselogin } from "@/api/user";

//导入author
import { setAuthor } from "@/utils/author";
export default {
  data() {
    return {
      mobile: "18888888888",
      code: "246810"
    };
  },
  methods: {
    //设置自己的校验规则
    myRules() {
      //验证对象
      const dict = {
        //验证规则
        custom: {
          mobile: {
            required: "请输入电话号码~~"
          },
          code: {
            required: () => "请输入验证码~~"
          }
        }
      };
      //使用校验规则
      this.$validator.localize("zh_CN", dict);
    },

    login() {
      this.$validator.validate().then(async valid => {
        if (valid) {
          // console.log("校验成功");
          //异常处理
          try {
            //请求登录接口，提交数据
            //通过异步请求提交数据到服务器
            let res = await uselogin({
              mobile: this.mobile,
              code: this.code
            });
            console.log(res);
            //保存到localStorage
            this.$store.commit("setUse", res);
            this.$router.push("/home");
          } catch (error) {
            console.log("出错了...");
          }
        }
      });
    }
  },
  mounted() {
    this.myRules();
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