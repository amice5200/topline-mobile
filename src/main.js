import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//导入vant
import Vant from "vant";
//导入vant的样式
import "vant/lib/index.css";
//导入veevalidate
import VeeValidate, { Validator } from "vee-validate";
//导入方言包
import zh_CN from "vee-validate/dist/locale/zh_CN.js";

/* Vue.use(VeeValidate, {
  events: "blur"
}); */
Vue.use(VeeValidate, {
  events: "" //禁用校验事件
});
Vue.use(Vant);
//使用方言包
Validator.localize("zh_CN", zh_CN);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
