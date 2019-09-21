<template>
  <div class="test">
    <h1>使用 vant</h1>
    <h3>1.0 使用 button 组件</h3>
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <h3>2.0 使用 icon</h3>
    <van-icon name="fire" />
    <van-icon name="fire" />
    <van-icon name="fire" />
    <h3>3.0 vant中表单的验证</h3>
    <van-field
      v-model="mobile"
      left-icon="phone"
      required
      clearable
      label="手机号码"
      placeholder="请输入手机号"
      :error-message="mobile_msg"
      @click-right-icon="$toast('question')"
    />
    <van-button @click="checkvalue" type="info" size="large">大号按钮</van-button>
    <h3>4.0 VeeValidate 的基本使用</h3>
    <input type="text" v-validate="'required'" name="myname" />
    <span>{{errors.first('myname')}}</span>
    <br />
    <input v-validate="'min:3'" data-vv-as="field" name="min_field" type="text" />
    <span>{{errors.first('min_field')}}</span>
    <h3>5.0 添加其他语言包</h3>
    <input v-validate="'min:3'" data-vv-as="field" name="min_field" type="text" />
    <span>{{errors.first('min_field')}}</span>
    <h3>6.0 VeeValidate 自定义验证规则</h3>
    <input type="text" v-validate="'required'" name="age" />
    <span>{{errors.first('age')}}</span>
    <h3>7.0 VeeValidate 自定义校验事件</h3>
    <input type="text" v-validate="'email'" name="myemail" />
    <span>{{errors.first('myemail')}}</span>
    <h3>8.0 VeeValidate 在点击按钮时才应该触发的校验</h3>
    <input type="text" v-validate="'email'" name="myemail22" />
    <span>{{errors.first('myemail22')}}</span>
    <van-button @click="setValidate" type="danger">点击验证</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mobile: "",
      //验证提示信息
      mobile_msg: ""
    };
  },
  methods: {
    checkvalue() {
      //验证mobile是否为空
      if (this.mobile.trim().length === 0) {
        this.mobile_msg = "电话号码不能为空";
      } else {
        this.mobile_msg = "";
      }
    },
    //设置校验事件
    setValidate() {
      this.$validator.validate().then(valid => {
        if (!valid) {
          console.log("校验失败");
        } else {
          console.log("校验成功");
        }
      });
    },

    myRules() {
      const dict = {
        //指定义规则
        custom: {
          //定义age的规则
          age: {
            required: "对不起,年龄是必须的!!!"
          }
        }
      };
      this.$validator.localize("zh_CN", dict);
    },
    mounted() {
      this.myRules();
    }
  }
};
</script>

<style>
.test {
  margin-bottom: 500px;
}
</style>