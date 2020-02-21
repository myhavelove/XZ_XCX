<template>
  <view class="container">
    <view class="example-title">账单详情</view>
    <view :class="{'tui-order-list':scrollTop>=0}">
      <view class="xz-order-item" v-for="item in payArr" :key="item.id">
        <iv-list-cell :hover="false" :lineLeft="false">
          <view class="xz-goods-title">
            <view>订单号：{{item.cardId}}</view>
            <view class="xz-order-status">{{item.type==1?"已完成":"未支付"}}</view>
          </view>
        </iv-list-cell>
        <block>
          <iv-list-cell padding="0" @click="detail">
            <view class="xz-goods-item">
              <view class="xz-goods-center">
                <view class="xz-goods-name">{{item.title}}</view>
                <!-- <view class="xz-goods-attr">黑色，50ml</view> -->
              </view>
              <view class="xz-price-right">
                <view>物流信息：{{item.SentByExpress}}</view>
              </view>
            </view>
          </iv-list-cell>
        </block>
        <iv-list-cell :hover="false" :last="true">
          <view class="xz-goods-price">
            <view>合计：</view>
            <view class="xz-size-24">￥</view>
            <view class="xz-price-large">1192</view>
            <view class="xz-size-24">.00</view>
          </view>
        </iv-list-cell>
      </view>
    </view>
  </view>
</template>
<script>
import ivButton from "@/components/extend/button/button";
import ivLoadmore from "@/components/loadmore/loadmore";
import ivNomore from "@/components/nomore/nomore";
import ivListCell from "@/components/list-cell/list-cell";
import ivSticky from "@/components/sticky/sticky";
export default {
  components: {
    ivButton,
    ivLoadmore,
    ivNomore,
    ivListCell,
    ivSticky
  },
  data() {
    return {
      scrollTop: 0,
      payArr: [
        {
          id: "1",
          title: "订单一",
          cardId: "231413",
          SentByExpress: "ems",
          CaseCode: "AL1900001",
          type: "2"
        },
        {
          id: "2",
          title: "订单二",
          cardId: "231413",
          SentByExpress: "ems",
          CaseCode: "AL1900005",
          type: "1"
        },
        {
          id: "3",
          title: "订单三",
          cardId: "231413",
          SentByExpress: "ems",
          CaseCode: "AL1900004",
          type: "2"
        },
        {
          id: "4",
          title: "订单四",
          cardId: "231413",
          SentByExpress: "ems",
          CaseCode: "AL1900003",
          type: "1"
        },
        {
          id: "5",
          title: "订单五",
          cardId: "231413",
          SentByExpress: "ems",
          CaseCode: "AL1900002",
          type: "2"
        }
      ]
    };
  }
};
</script>
<style scoped>
page {
  background: #f3f3f3;
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
.xz-order-list {
}

.xz-order-item {
  margin-top: 20rpx;
  border-radius: 10rpx;
  overflow: hidden;
}

.xz-goods-title {
  width: 100%;
  font-size: 28rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.xz-order-status {
  color: #888;
  font-size: 26rpx;
}

.xz-goods-item {
  width: 100%;
  padding: 20rpx 30rpx;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}

.xz-goods-img {
  width: 180rpx;
  height: 180rpx;
  display: block;
  flex-shrink: 0;
}

.xz-goods-center {
  flex: 1;
  padding: 20rpx 8rpx;
  box-sizing: border-box;
}

.xz-goods-name {
  max-width: 310rpx;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 26rpx;
  line-height: 32rpx;
}

.xz-goods-attr {
  font-size: 22rpx;
  color: #888888;
  line-height: 32rpx;
  padding-top: 20rpx;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.xz-price-right {
  text-align: right;
  font-size: 24rpx;
  color: #888888;
  line-height: 30rpx;
  padding-top: 20rpx;
}

.xz-color-red {
  color: #e41f19;
  padding-right: 30rpx;
}

.xz-goods-price {
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  font-size: 24rpx;
}

.xz-size-24 {
  font-size: 24rpx;
  line-height: 24rpx;
}

.xz-price-large {
  font-size: 32rpx;
  line-height: 30rpx;
  font-weight: 500;
}


</style>