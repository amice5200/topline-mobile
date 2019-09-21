<template>
  <div class="channel">
    <!-- 操作频道 -->
    <!-- 添加弹出层 -->
    <van-popup
      :value="value"
      @input="$emit('input',$event)"
      position="bottom"
      :style="{ height: '90%' }"
    >
      <div class="mybox">
        <div class="top">
          <div class="mychannel">
            我的频道
            <span>点击进入频道</span>
          </div>
          <div class="edit">
            <button>编辑</button>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  props: ["value"]
};
</script>

<style lang="less" scoped>
.van-popup.van-popup--bottom {
  padding: 10px;
  box-sizing: border-box;
}

.mybox {
  .top {
    display: flex;
    justify-content: space-between;

    .mychannel {
      font-size: 16px;

      span {
        font-size: 12px;
        color: #aaa;
      }
    }

    .edit {
      button {
        background-color: #fff;
        border: 1px solid hotpink;
        border-radius: 15px;
        color: hotpink;
        font-size: 14px;
      }
    }
  }
}
</style>