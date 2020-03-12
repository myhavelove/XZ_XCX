<template>
  <view class="container">
    <!--  #ifdef  APP-PLUS || H5 -->
    <view class="xz-bg-box">
      <image
        src="../../static/images/login/bg_login.png"
        class="tui-bg-img"
      ></image>
      <image src="../../static/images/login/login.png" class="xz-photo"></image>
    </view>
    <view class="box_form">
      <tui-tabs
        :tabs="navbar"
        :currentTab="currentTab > 1 ? 0 : currentTab"
        @change="change"
        itemWidth="50%"
      ></tui-tabs>
      <view v-if="currentTab === 0" class="form-box">
        <form @submit="formLogin">
          <view class="tui-login-from">
            <view class="tui-line-cell">
              <tui-icon name="mobile" :size="20" color="#2ea8ab"></tui-icon>
              <input
                placeholder-class="phcolor"
                class="tui-input"
                name="mobile"
                placeholder="请输入手机号码"
                maxlength="11"
                v-model="form.mobile"
                type="number"
              />
            </view>
            <view class="tui-line-cell tui-top28">
              <tui-icon name="pwd" :size="20" color="#2ea8ab"></tui-icon>
              <input
                placeholder-class="phcolor"
                class="tui-input"
                name="smsCode"
                v-model="form.password"
                placeholder="请输入密码"
                maxlength="11"
                type="password"
              />
            </view>
            <button
              class="btn-primary tui-btn-submit"
              hover-class="btn-hover"
              form-type="submit"
            >
              {{ btn }}
            </button>
            <!-- <view
              class="tui-protocol"
              hover-class="opcity"
              :hover-stay-time="150"
            >
              <text class="login-green fl" @tap="register"
                >还没账号？立即注册</text
              >
              <text class="login-blue fr" @tap="protocol">忘记密码？</text>
            </view> -->
          </view>
        </form>
      </view>
      <view v-if="currentTab === 1" class="form-box">
        <form @submit="codeLogin">
          <view class="tui-login-from">
            <view class="tui-line-cell">
              <tui-icon name="mobile" :size="20" color="#2ea8ab"></tui-icon>
              <input
                placeholder-class="phcolor"
                class="tui-input"
                name="mobile"
                placeholder="请输入手机号码"
                maxlength="11"
                v-model="form.mobile"
                type="number"
              />
            </view>
            <view class="tui-line-cell tui-top28">
              <tui-icon name="pwd" :size="20" color="#2ea8ab"></tui-icon>
              <input
                placeholder-class="phcolor"
                class="tui-input"
                name="smsCode"
                placeholder="请输入验证码"
                maxlength="6"
                type="number"
                v-model="form.code"
              />
              <tui-button
                size="mini"
                :type="type"
                shape="circle"
                :plain="true"
                :disabled="disabled"
                @click="btnSend"
                >{{ btnText }}</tui-button
              >
            </view>
            <button
              class="btn-primary tui-btn-submit"
              hover-class="btn-hover"
              form-type="submit"
            >
              {{ btn }}
            </button>
          </view>
        </form>
      </view>
    </view>
    <!--  #endif -->
    <!--  #ifdef  MP-WEIXIN -->
    <view class="xz-bg-box">
      <image
        src="../../static/images/login/bg_login.png"
        class="tui-bg-img"
      ></image>
      <image src="../../static/images/login/login.png" class="xz-photo"></image>
    </view>
    <view class="box_form">
      <view class="wx-form-box">
        <form @submit="codeLogin">
          <view class="tui-login-from">
            <view class="tui-line-cell">
              <tui-icon name="mobile" :size="20" color="#2ea8ab"></tui-icon>
              <input
                placeholder-class="phcolor"
                class="tui-input"
                name="mobile"
                placeholder="请输入手机号码"
                maxlength="11"
                v-model="form.mobile"
                type="number"
              />
            </view>
            <view class="tui-line-cell tui-top28">
              <tui-icon name="pwd" :size="20" color="#2ea8ab"></tui-icon>
              <input
                placeholder-class="phcolor"
                class="tui-input"
                name="smsCode"
                placeholder="请输入验证码"
                maxlength="6"
                v-model="form.code"
              />
              <tui-button
                size="mini"
                :type="type"
                shape="circle"
                :plain="true"
                :disabled="disabled"
                @click="btnSend"
                >{{ btnText }}</tui-button
              >
            </view>
            <button
              class="btn-primary tui-btn-submit"
              hover-class="btn-hover"
              form-type="submit"
            >
              {{ btn }}
            </button>
          </view>
        </form>
      </view>
    </view>
    <!--  #endif -->
  </view>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import tuiIcon from "@/components/icon/icon";
import tuiButton from "@/components/button/button";
import tuiTabs from "@/components/tui-tabs/tui-tabs";
const util = require("@/utils/util.js");
export default {
  components: {
    tuiIcon,
    tuiButton,
    tuiTabs
  },
  data() {
    return {
      disabled: false,
      btnText: "获取验证码",
      form: {
        mobile: "", //手机号
        password: "", //密码
        code: "" //验证码
      },
      type: "primary",

      currentTab: 0,
      navbar: [
        {
          name: "手机号登陆"
        },
        { name: "验证码登陆" }
      ],
      btn: "登录" //登录按钮样式
    };
  },
  methods: {
    ...mapMutations(["login"]),

    getRandom: function(u) {
      let rnd = "";
      u = u || 6;
      for (var i = 0; i < u; i++) {
        rnd += Math.floor(Math.random() * 10);
      }
      return Number(rnd);
    },
    // 获取验证码
    doLoop: function(seconds) {
      seconds = seconds ? seconds : 60;
      this.btnText = seconds + "s后获取";
      // #ifdef  APP-PLUS || H5
      uni.request({
        url: this.tui.interfaceUrl() + "/api/Login/GetRegisterSendSmsCode",
        data: { phone: this.form.mobile },
        header: { "content-type": "application/x-www-form-urlencoded" },
        method: "get",
        success: res => {
          let data = res.data;
          this.tui.toast(data.message);
        }
      });
      // #endif
      // #ifdef  MP-WEIXIN

      wx.request({
        url: this.tui.interfaceUrl() + "/api/Login/SendSmsCode",
        data: { phone: this.form.mobile },
        header: { "content-type": "application/x-www-form-urlencoded" },
        method: "post",
        success: res => {
          let data = res.data;
          this.tui.toast(data.message);
        }
      });
      // #endif

      let countdown = setInterval(() => {
        if (seconds > 0) {
          this.btnText = seconds + "s后获取";
          --seconds;
        } else {
          this.btnText = "获取验证码";
          this.disabled = false;
          this.type = "primary";
          clearInterval(countdown);
        }
      }, 1000);
    },
    // 点击获取验证码按钮
    btnSend: function() {
      let _this = this;
      if (util.isNullOrEmpty(_this.form.mobile)) {
        _this.tui.toast("请输入手机号码");
        return;
      } else if (!util.isMobile(_this.form.mobile)) {
        _this.tui.toast("请输入正确的手机号码");
        return;
      }
      _this.disabled = true;
      _this.btnText = "请稍候...";
      _this.type = "gray";

      setTimeout(() => {
        _this.doLoop(60);
      }, 500);
    },
    // 账号密码
    async formLogin(e) {
     
    },
    // 验证码登录
    codeLogin() {
      let _this = this;
         if (util.isNullOrEmpty(_this.form.mobile)) {
        _this.tui.toast("请输入手机号码");
        return;
      } else if (!util.isMobile(_this.form.mobile)) {
        _this.tui.toast("请输入正确的手机号码");
        return;
      } else if (util.isNullOrEmpty(_this.form.code)) {
        _this.tui.toast("请输入验证码");
        return;
      }
      _this.btn = "请稍等...";
      // #ifdef  APP-PLUS || H5
      let postDate = {
        UserName: _this.form.mobile,
        SmsCode: _this.form.code,
        VerCode: 2
      };
      uni.request({
        url: _this.tui.interfaceUrl() + "/api/Login/CheckLogin",
        data: postDate,
        header: { "content-type": "application/x-www-form-urlencoded" },
        method: "POST",
        success: res => {
          let data = res.data;
          _this.tui.toast(data.message);
          if (data.status === "Success") {
            // 将手机号存储到本地
            uni.setStorage({
              key: "phone",
              data: { phone: _this.form.mobile },
              success: function() {
                console.log("phone");
              }
            });
            setTimeout(() => {
              uni.navigateTo({
                url: "../../index/index"
              });
              _this.btn = "登录";
            }, 500);
          }
          _this.btn = "登录";
        }
      });
      // #endif
      // #ifdef  MP-WEIXIN
      wx.request({
        url: _this.tui.interfaceUrl() + "/api/Login/Login",
        data: {
          phone: _this.form.mobile,
          smsCode: _this.form.code,
          openid: wx.getStorageSync("openid")
        },
        header: { "content-type": "application/x-www-form-urlencoded" },
        method: "POST",
        success: res => {
          let data = res.data;
          if (data.status === "Success") {
            _this.tui.toast("登录成功~");
            let token = data.data.Token;
            wx.setStorageSync("token", token);
            wx.setStorageSync("phone", _this.form.mobile);
              setTimeout(() => {
					wx.reLaunch({
						url: '/pages/index/index'
					})
				}, 200);
              _this.btn = "登录";
          } else {

            _this.tui.toast('登录失败,请确认账号密码是否正确！');
            _this.btn = "登录";
          }
        }
      });
      // #endif
    },
    protocol: function() {
      uni.navigateTo({
        url: "forgetPassword/index"
      });
    },
    // 点击注册
    register: function() {
      uni.navigateTo({
        url: "register/index"
      });
    },
    change(e) {
      this.currentTab = e.index;
    }
  }
};
</script>

<style scoped>
page {
  background: #fff;
}

.xz-bg-box {
  width: 100%;
  box-sizing: border-box;
  position: relative;
  min-height: 220px;
}
.tui-bg-img {
  width: 100%;
  height: 225px;
  position: absolute;
  top: 0;
}
.xz-photo {
  height: 40px;
  width: 160px;
  display: block;
  margin: 5px auto 0 auto;
  position: relative;
  z-index: 2;
  top: 42px;
}

.xz-bg-img {
  width: 100%;
  height: 173px;
  display: block;
  position: absolute;
  top: 0;
}
.box_form {
  position: relative;
  top: -80px !important;
  background: #fff;
  width: 90%;
  margin: 0 auto;
  overflow: hidden;
  padding-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px #ded3d3;
  border: 1px solid #ecefec;
}
.tui-tabs-view {
  position: relative;
  margin-bottom: 10px;
  width: 88%;
  margin: 0 auto;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.tui-login-from {
  width: 100%;
  padding: 28px 25px 0 25px;
  box-sizing: border-box;
}

.tui-input {
  font-size: 32upx;
  flex: 1;
  display: inline-block;
  padding-left: 32upx;
  box-sizing: border-box;
  overflow: hidden;
}
.form-box {
  width: 88%;
  position: relative;
  /* top: -81px; */
  z-index: 1;
  background: #fff;
  margin: 0 auto;
}
.tui-line-cell {
  padding: 27upx 0;
  display: -webkit-flex;
  display: flex;
  -webkiit-align-items: center;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
}

.tui-line-cell::after {
  content: "";
  position: absolute;
  border-bottom: 1upx solid #e0e0e0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  bottom: 0;
  right: 0;
  left: 0;
}

.tui-top28 {
  margin-top: 28upx;
}

.tui-btn-class {
  width: 196upx !important;
  height: 48upx !important;
  border-radius: 27upx !important;
  font-size: 28upx !important;
  padding: 0 !important;
  line-height: 54upx !important;
}

.tui-btn-submit {
  margin-top: 100upx;
  background: #45afa4;
  color: #fff;
}

.tui-protocol {
  color: #333;
  font-size: 24upx;
  text-align: center;
  width: 100%;
  margin-top: 29upx;
}

.login-green {
  color: green;
}
.login-blue {
  color: blue;
}
</style>
