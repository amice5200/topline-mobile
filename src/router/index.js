import Vue from "vue";
import Router from "vue-router";
// import test from "@/views/test";
// import login from "@/views/login";

Vue.use(Router);

export default new Router({
  routes: [
    {
      name: "test",
      path: "/test",
      //导入一个组件
      component: () => import("@/views/test")
      // component: test
    },
    {
      name: "login",
      path: "/login",
      component: () => import("@/views/login")
      // component: login
    }
  ]
});
