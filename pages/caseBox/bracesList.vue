<template>
  <view class="container">
    <view class="info_list">
      <view class="fl fl_box">
        <view class="fl bbox-bbe">
          <view class="title color_title_1">
            单个牙套
          </view>
          <view class="fub_title" style="color:#7ea5e0;"
            >每个{{ oneBraces }}元</view
          >
        </view>
        <view class="icon_01"
          ><iv-icon name="redpacket-fill" color="#cfca32"></iv-icon
        ></view>
      </view>
      <view class="fl fr_box">
        <view class="fl bbox-bbe">
          <view class="title color_title_2">
            整副牙套
          </view>
          <view class="fub_title" style="color:#85c5a0;"
            >每副{{ sunBraces }}元</view
          >
        </view>
        <view class="icon_01"
          ><iv-icon name="redpacket-fill" color="#cfca32"></iv-icon
        ></view>
      </view>
    </view>
    <view class="if_title_box">
      <view>
        <iv-icon name="feedback" class="icon-name" size="24"></iv-icon>
        <view class="addies">收货地址</view>
      </view>
    </view>
    <!-- 地址 -->
    <view class="address-box">
      <view class="make"></view>
      <view class="fl box-bbe ">
        <view class="fl add-name">{{ addList.name }}</view>
        <view class="fl add-phone">{{ addList.phone }}</view>
        <view class="fl add-addName">{{ addList.addName }}</view>
      </view>
      <view class="icon_02">
        <iv-icon name="addressbook" class="icon-name2 fl" size="24"></iv-icon
        ><view class="fl add-info">地址簿</view></view
      >
    </view>
    <view class="choice-braces">
      <view class="fl">
        选择需补寄的牙套
      </view>
      <view class="x-mmpo">
        <input
          placeholder-class="xz-phcolor"
          class="xz-input"
          disabled
          name="city"
          @tap="showBraces"
          maxlength="50"
          type="text"
        />
      </view>
    </view>
    <view class="xz-btn-box">
      <button
        class="btn-green btn-class"
        hover-class="btn-hover"
        @tap="submitTap"
      >
        发起申请
      </button>
    </view>
  </view>
</template>
<script>
import ivIcon from "@/components/icon/icon";

export default {
  components: { ivIcon },
  data() {
    return {
      oneBraces: 400, //单个牙套价格
      sunBraces: 800, //整套牙套价格
      addList: {
        name: "张三",
        phone: "1988888888",
        addName: "安徽省合肥市蜀山区天鹅湖2号写字楼"
      }
    };
  },
  methods:{
      submitTap(){

      },
      showBraces(){

      }
  }
};
</script>
<style scoped>
page {
  background: #f3f3f3 !important;
}
.container {
  background-color: #f3f3f3 !important;
}
.info_list {
  background: #fff;
  overflow: hidden;
  padding: 10px;
}
.bbox-bbe{
    padding-left: 10px;
}
.fl_box {
  width: 45%;
  padding-left: 10px;
  float: left;
  background: #e9f0fa;
  margin: 0 5px 0 0;
  padding: 10px 0px 10px 10px;
}
.fr_box {
  width: 45%;
  padding-left: 10px;
  float: left;
  background: #e9f6ef;
  margin: 0 0 0 5px;
  padding: 10px 0px 10px 10px;
}
.fub_title {
  font-size: 16px;
}
.color_title_1 {
  color: #4d86d5;
}
.color_title_2 {
  color: #59b681;
}
.icon_01 {
  float: right;
  padding: 10px 10px 10px 0px;
}
.if_title_box {
  padding: 10px;
  overflow: hidden;
}
.icon-name {
  float: left;
}
.addies {
  color: #333;
  float: left;
  padding-left: 10px;
}
/* 收货地址 */
.make {
  width: 10px;
  height: 10px;
  float: left;
  background: #2ea8ab;
  border-radius: 50%;
  margin-right: 15px;
  margin-top: 5px;
}
.box-bbe {
  width: 60%;
}
.address-box {
  padding: 10px;
  background: #fff;
}
.add-phone {
  font-size: 16px;
  height: 30px;
  line-height: 30px;
  padding-left: 15px;
  color: #6b6868;
}
.add-addName {
  font-size: 16px;
}
.icon_02 {
  height: 30px;
  overflow: hidden;
  float: right;
  padding-right: 15px;
}
.add-info {
  font-size: 14px;
  line-height: 23px;
}
.choice-braces {
  background: #fff;
  margin-top: 10px;
  padding: 15px;
  height: 36px;
  line-height: 36px;
      margin-bottom: 20px;
}
.x-mmpo {
  overflow: hidden;
  position: relative;
  height: 36px;
}
.xz-input:before {
  content: " ";
  height: 11px;
  width: 11px;
  border-width: 2px 2px 0 0;
  border-color: #b2b2b2;
  border-style: solid;
  -webkit-transform: matrix(0.5, 0.5, -0.5, 0.5, 0, 0);
  transform: matrix(0.5, 0.5, -0.5, 0.5, 0, 0);
  position: absolute;
  top: 50%;
  margin-top: -7px;
  right: 15px;
}
.xz-btn-box{
    width: 90%;
    margin: 0 auto;
}
.btn-green{
    background: #2ea8ab;
    color: #fff;
}
</style>
