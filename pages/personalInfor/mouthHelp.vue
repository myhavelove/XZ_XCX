<template>
  <view class="container">
    <view class="example-title">关于口扫</view>
    <view class="example-body">
      <view v-for="item in helpArr" :key="item.id" class="example-box">
        <iv-card
          :title="item.title"
          :is-shadow="item.shadow"
          :note="item.note"
          :extra="item.extra"
          :thumbnail="item.thumbnail"
          @click="clickCard"
        >{{ item.content }}</iv-card>
      </view>
    </view>
  </view>
</template>
<script>
import ivCard from "@/components/card/card-help";
export default {
  components: {
    ivCard
  },
  data() {
    return {
      helpArr: [] //帮助文档记录
    };
  },
  mounted() {
    this.dataList();
  },
  methods: {
    // 获取数据
    dataList() {
      var data = require("../../static/json/Mouth.json");
      this.helpArr = data.Doubt;
    },
    // 点击查看详情
    clickCard() {}
  }
};
</script>
<style scoped>
page {
  background: #fff;
}
.example-title {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  font-size: 16px;
  color: #464e52;
  padding: 15px 15px 15px 25px;
  margin-top: 10px;
  position: relative;
  background-color: #fdfdfd;
  border-bottom: 1px #f5f5f5 solid;
}
.example-title:after {
  content: "";
  position: absolute;
  left: 15px;
  margin: auto;
  top: 0;
  bottom: 0;
  width: 3px;
  height: 16px;
  background-color: #cccccc;
}
.example-body {
  padding: 30upx 0;
}

.example-box {
  margin-bottom: 30upx;
}

.example-box:last-child {
  margin-bottom: 0;
}
</style>