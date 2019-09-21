//封装所有频道相关的请求
import request from "@/utils/request.js";

function getChannel() {
  return request({
    url: "app/v1_0/user/channels",
    method: "get"
    //这里不需要设置请求头了,在 axios 请求拦截器中设置好了
  });
}

//暴露
export { getChannel };
