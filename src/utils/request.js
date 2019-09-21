//封装 axios 请求
import axios from "axios";
import store from "@/store";

const myrequest = axios.create({
  baseURL: "http://ttapi.research.itcast.cn/"
});

//设置请求拦截器
myrequest.interceptors.request.use(
  config => {
    //config:请求头的相关信息
    //判断用户是否登录,如果登录添加一个信息 token (store中)
    //得到token
    let user = store.state.user;
    if (user && user.token) {
      //在请求头中设置token
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//设置响应拦截器
myrequest.interceptors.response.use(
  response => {
    //将响应的内容进行过滤处理
    return response.data.data || response.data;
  },
  error => {
    return Promise.reject(error);
  }
);

//暴露对象
export default myrequest;
