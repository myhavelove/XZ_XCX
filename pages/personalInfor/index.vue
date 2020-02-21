<template>
  <view class="container">
    <view class="example-body">
      <iv-nav-bar
        color="white"
        background-color="#2ea8ab"
        title="我的"
        fixed="true"
      />
    </view>
    <!-- 底部菜单 -->
    <!-- 顶部图片和信息 -->

    <view class="xz-bg-box">
      <image
        src="../../static/images/personalInfor/top_bj.png"
        class="xz-bg-img"
      ></image>
      <!-- <view class="details-btn" @click="toInfor">
        个人信息>
      </view> -->
      <view v-if="isLogin == false" class="user-wrapper">
        <navigator
          url="../loginBox/index"
          hover-class="opcity"
          :hover-stay-time="150"
          class="user"
        >
          <image
            class="avatar-img"
            src="../../static/images/personalInfor/mine_def_touxiang_3x.png"
          ></image>
          <text class="user-info-mobile">请登录</text>
        </navigator>
      </view>
      <view class="box-info" @click="toInfor" v-if="isLogin == true">
        <image
          src="../../static/images/personalInfor/info-img.png"
          class="xz-info-img"
        ></image>
      </view>
      <view class="box-details" @click="toInfor" v-if="isLogin == true">
        <view class="portrait"
          ><image :src="portrait" class="xz-portrait"></image
        ></view>
        <view class="infor">
          <view class="user_name">{{ userName }}医生</view>
          <view class="userid">医生编号：{{ doctorNumber }}</view>
        </view>
        <!-- <view class="clinic-Name">
          <view v-if="clinicName">{{ clinicName }}</view>
          <view v-if="!clinicName">暂未绑定诊所</view>
        </view> -->
      </view>
      <view class="boxList">
        <!-- <view class="box-list" @click="exchangeClick">
          <iv-icon name="attestation" color="#f19d3c"></iv-icon>
          <text class="xz-list-cell-name">券码核销</text>
        </view> -->
        <!-- <view class="box-list" @click="billClick">
          <iv-icon name="wealth-fill" color="#ff7900"></iv-icon>
          <text class="xz-list-cell-name">账单记录</text>
        </view> -->
      </view>
      <view class="fub-box" v-show="isLogin"> </view>
    </view>

    <!-- 盒子列表 -->

    <!-- 功能菜单 -->
    <iv-list-view class="xz-list-view">
      <iv-list-cell @click="billClick" :arrow="true" class="xz-list">
        <iv-icon name="wealth-fill" class="icon-llsi" color="#ff7900"></iv-icon>
        <view class="xz-list-cell-name">账单记录</view>
      </iv-list-cell>
      <iv-list-cell @click="binding" :arrow="true" class="xz-list">
        <iv-icon name="house" class="icon-llsi" color="#46bec1"></iv-icon>
        <view class="xz-list-cell-name">挂靠诊所</view>
      </iv-list-cell>
      <iv-list-cell @click="address" :arrow="true" class="xz-list">
        <iv-icon
          name="position-fill"
          class="icon-llsi"
          color="#5677fc"
        ></iv-icon>
        <view class="xz-list-cell-name">收货地址</view>
      </iv-list-cell>
      <iv-list-cell @click="helpClick" :arrow="true" class="xz-list">
        <iv-icon name="explain" color="#19be6b"></iv-icon>
        <view class="xz-list-cell-name">帮助中心</view>
      </iv-list-cell>
      <!-- <iv-list-cell @click="feedback" :arrow="true" class="xz-list">
        <iv-icon name="message-fill" color="#ed3f14"></iv-icon>
        <view class="xz-list-cell-name">反馈建议</view>
      </iv-list-cell> -->
      <!-- <iv-list-cell @click="pwdback" :arrow="true" class="xz-list">
        <iv-icon name="pwd"  class="icon-llsi" color="#1296db"></iv-icon>
        <view class="xz-list-cell-name">修改密码</view>
      </iv-list-cell> -->
    </iv-list-view>
    <button
      class="xz-btn xz-btn-block xz-green"
      hover-class="xz-green-hover"
      @click="quitBtn"
      v-if="isLogin == true"
    >
      退出
    </button>
    <iv-actionsheet
      :show="showActionSheet"
      :tips="tips"
      :item-list="itemList"
      :mask-closable="maskClosable"
      :color="color"
      :size="size"
      :is-cancel="isCancel"
      @click="itemClick"
      @cancel="closeActionSheet"
    ></iv-actionsheet>
  </view>
</template>

<script>
import ivListView from "@/components/list-view/list-view";
import ivListCell from "@/components/list-cell/list-cell";
import ivIcon from "@/components/icon/icon";
import ivModal from "@/components/modal/modal";
import ivNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
import ivActionsheet from "@/components/actionsheet/actionsheet";

import { mapState } from "vuex";
export default {
  components: {
    ivListView,
    ivListCell,
    ivIcon,
    ivModal,
    ivNavBar,
    ivActionsheet
  },
  data() {
    return {
      portrait: "../../static/images/custom/user.png", //头像
      userName: "", //用户姓名
      doctorNumber: "", //医师编号
      clinicName: "", //诊所名称
      phone: "", //手机号
      quitModal: false, //退出modal
      isLogin: false,

      // 退出
      showActionSheet: false,
      maskClosable: true,
      tips: "退出登录会清除您的登录信息，确认退出吗？",
      itemList: [],
      color: "",
      size: "",
      isCancel: true
    };
  },
  mounted() {
    this.getData();
  },
  // 主页面右边侧滑
  onBackPress() {
    return true;
  },
  methods: {
    // 获取医生信息
    getData() {
      let _this = this;
      // #ifdef  APP-PLUS || H5
      uni.getStorage({
        key: "phone",
        success: function(res) {
          _this.phone = res.data.phone;
        }
      });
      uni.removeStorage({
        key: "currentTab",
        success: function(res) {}
      });
      uni.request({
        url: _this.tui.interfaceUrl() + "/api/My/LookUserInfo",
        data: { phone: _this.phone },
        header: { "content-type": "application/x-www-form-urlencoded" },
        method: "POST",
        success: res => {
          let data = res.data.data;
          _this.userName = data.RealName;
          _this.doctorNumber = data.MemberCode;
          _this.clinicName = data.addressName;
        }
      });
      // #endif
      // #ifdef   MP-WEIXIN
              wx.removeStorage({
        key: "imgPrtt",
        success(res) {
        }
      });
              wx.removeStorage({
        key: "twCase",
        success(res) {
        }
      });
         wx.removeStorage({
        key: "casecode",
        success(res) {
        }
      });
               wx.removeStorage({
        key: "patientcode",
        success(res) {
        }
      });
            wx.removeStorage({
        key: "parameter",
        success(res) {
        }
      });
      let _token = wx.getStorageSync("token");
      let headconfig = {
        "content-type": "application/x-www-form-urlencoded"
      };
      if (_token != "") {
        headconfig["token"] = _token;
      }
      if (_token != "") {
        wx.request({
          url: _this.tui.interfaceUrl() + "/api/My/LookUserInfo",
          header: headconfig,
          method: "POST",
          success: res => {
            let data = res.data;
            if (data.status == 200) {
              _this.isLogin = true;
              _this.userName = data.data.RealName;
              _this.doctorNumber = data.data.MemberCode;
              _this.clinicName = data.data.addressName;
            }
          }
        });
      }

      // #endif
    },
    // 个人信息详情
    toInfor() {
      uni.navigateTo({
        url: "inforDetails?phone=" + this.phone
      });
    },
    // 反馈意见
    feedback() {
      uni.navigateTo({
        url: "feedback?phone=" + this.phone
      });
    },
    // 绑定诊所
    binding() {
      uni.navigateTo({
        url: "binding?phone=" + this.phone
      });
    },
    // 个人账单详情
    billClick() {
      uni.navigateTo({
        url: "billList?phone=" + this.phone
      });
    },
    // 帮助中心
    helpClick() {
      uni.navigateTo({
        url: "help"
      });
    },
    // 劵码核销
    exchangeClick() {
      uni.navigateTo({
        url: "exchange"
      });
    },
    //收货地址
    address() {
      uni.navigateTo({
        url: "mailing/mailing?phone=" + this.phone
      });
    },
    // 修改密码
    pwdback() {
      uni.navigateTo({
        url: "../loginBox/forgetPassword/index"
      });
    },
    // 退出提示
    quitBtn() {
      let itemList = [
        {
          text: "退出登录",
          color: "#1a1a1a"
        }
      ];
      let maskClosable = true;
      let tips = "退出登录会清除您的登录信息，确认退出吗？";
      let color = "#9a9a9a";
      let size = 26;
      let isCancel = true;
      setTimeout(() => {
        this.showActionSheet = true;
        this.itemList = itemList;
        this.maskClosable = maskClosable;
        this.tips = tips;
        this.color = color;
        this.size = size;
        this.isCancel = isCancel;
      }, 0);
    },
    closeActionSheet() {
      this.showActionSheet = false;
    },
    itemClick() {
      wx.clearStorage();
      wx.reLaunch({
        url: "../loginBox/index"
      });
    }
  }
};
</script>

<style scoped>
/* 底部菜单 */
.xz-mtop {
  left: 0;
  bottom: 0;
  padding-bottom: env(safe-area-inset-bottom);
  width: 100%;
}

.xz-bg-box {
  width: 100%;
  box-sizing: border-box;
  position: relative;
  padding-top: 50upx;
  height: 150px;
}
.xz-bg-img {
  width: 100%;
  height: 190px;
  display: block;
  position: absolute;
  top: 0;
}
.portrait {
  position: relative;
  z-index: 2;
  left: 10%;
  float: left;
}
.xz-portrait {
  height: 70px;
  width: 70px;
  display: block;
  border-radius: 25%;
}
.infor {
  position: relative;
  z-index: 2;
  float: left;
  color: #fff;
  right: -14%;
  top: 15px;
}
.userid {
  opacity: 0.8;
  border-radius: 12px;
  font-size: 12px;
  color: #333;
}
.user_name {
  font-size: 20px;
  font-family: cursive;
  padding: 5px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 129px;
  color: #000;
  font-weight: 600;
}
/* 盒子信息 */
.boxList {
  height: 70px;
  width: 85%;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  border-radius: 12px;
  line-height: 70px;
  top: -172px;
}

/* 菜单列表 */
.xz-list-view {
  position: relative;
  z-index: 1;
}

.xz-list-cell-name {
  padding-left: 20upx;
  vertical-align: middle;
  line-height: 30upx;
}
.xz-list {
  height: 60px;
}
.xz-list::after {
  left: 94upx !important;
}
/* 按钮 */
.xz-green {
  background: #2ea8ab !important;
  color: #fff;
}
.xz-btn-block {
  font-size: 18px;
  height: 45px;
  line-height: 45px;
}
.xz-btn {
  width: 90%;
  position: relative;
  border: 0 !important;
  border-radius: 5px;
  display: inline-block;
  margin-top: 20px;
}
.xz-green-hover {
  background: #2ea8ab !important;
  color: #e5e5e5;
}
.tui-icon {
  font-size: 24px !important;
}

/* 新2.0 */
.box-info {
  width: 90%;
  overflow: hidden;
  background: #fff;
  position: relative;
  z-index: 1;
  margin: 0 auto;
  margin-top: 15px;
  border-radius: 10px;
}
.xz-info-img {
  width: 101%;
  height: 115px;
  overflow: hidden;
}
.box-details {
  position: relative;
  top: -105px;
  overflow: hidden;
}
.clinic-Name {
  float: right;
  position: relative;
  z-index: 2;
  font-size: 14px;
  right: 30px;
  width: 100px;
  background: #22a9ac;
  color: #fff;
  border-radius: 12px;
  text-align: center;
  height: 22px;
  line-height: 22px;
  font-family: sans-serif;
}
.box-list {
  height: 60px;
  width: 50%;
  float: left;
  text-align: center;
}
.fub-box {
  background: #f6f6f6;
  position: relative;
  top: -175px;
  height: 30px;
}
.details-btn {
  position: relative;
  z-index: 2;
  float: right;
  padding: 5px 0;
  background: #e2c46d;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  width: 100px;
  font-size: 14px;
  text-align: center;
  color: #fff;
  margin-bottom: 5px;
}
.example-body {
  height: 73px;
}

/* denglu */
.user-wrapper {
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 2;
}
.user {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 2;
}
.avatar-img {
  width: 160upx;
  height: 160upx;
  border-radius: 50%;
  align-self: center;
}
.user-info {
  display: flex;
  flex-direction: row;
  margin-top: 30upx;
  align-items: center;
}

.user-info-mobile {
  margin-top: 30upx;
  position: relative;
  font-size: 28upx;
  color: #fefefe;
  line-height: 28upx;
  align-self: center;
  padding: 0 50upx;
}
</style>
