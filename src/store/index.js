import Vue from "vue";
import Vuex from "vuex";
//导入 author
import * as author from "@/utils/author";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: author.getAuthor()
  },
  mutations: {
    //设置user
    setUser(state, user) {
      author.setAuthor(user);
      //将用户信息更新到user
      state.user = user;
    }
  },
  actions: {}
});

//状态管理模式
// state ---> 组件 ---> action (异步) ---> mutations (同步)
