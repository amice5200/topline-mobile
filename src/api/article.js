//负责封装所有文章相关的服务请求

import request from "@/utils/request.js";

//获取文章数据
function getArticle({ channel_id, timestamp, with_top }) {
  return request({
    url: "app/v1_1/articles",
    method: "get",
    params: {
      channel_id,
      timestamp,
      with_top
    }
  });
}

//暴露
export { getArticle };
