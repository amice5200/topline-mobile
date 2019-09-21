//对 token 操作的封装

//定义键
const Author_KEY = "user";

//数据的保存
function setAuthor(val) {
  window.localStorage.setItem(Author_KEY, JSON.stringify(val));
}
//数据的获取
function getAuthor() {
  return window.localStorage.getItem(Author_KEY)
    ? JSON.parse(window.localStorage.getItem(Author_KEY))
    : null;
}
//数据的清除
function removeAuthor() {
  window.localStorage.removeItem(Author_KEY);
}

//暴露接口
export { setAuthor, getAuthor, removeAuthor };
