//封装所有用户相关的网络请求

import request from "@/utils/request.js";

//添加一个登录方法
// function login(options){ //将option结构成下面形式,利于代码的可读性
function uselogin({ mobile, code }) {
  //返回一个promise对象
  return request({
    url: "app/v1_0/authorizations",
    method: "post",
    data: {
      mobile: mobile,
      code: code
    }
  });
}

//暴露出去
// default只能暴露一个
export { uselogin };
