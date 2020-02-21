<template>
  <view class="container">
    <view class="xz-bg-box">
       <image src="../../../static/images/login/bg_login.png" class="tui-bg-img"></image>
      <image src="../../../static/images/login/login.png" class="xz-photo"></image>
    </view>
    <view class="form-box">
      <form @submit="formLogin">
        <view class="xz-login-from">
          <view class="xz-line-cell">
            <tui-icon name="mobile" :size="20" color="#2ea8ab"></tui-icon>
            <input
              placeholder-class="phcolor"
              class="xz-input"
              name="mobile"
              placeholder="请输入手机号码"
              maxlength="11"
              v-model="form.mobile"
              type="number"
            />
          </view>
          <view class="xz-line-cell xz-top28">
            <tui-icon name="pwd" :size="20" color="#2ea8ab"></tui-icon>
            <input
              placeholder-class="phcolor"
              class="xz-input"
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
            >{{btnText}}</tui-button>
          </view>
          <button
            class="btn-primary xz-btn-submit"
            hover-class="btn-hover"
            form-type="submit"
          >{{btn}}</button>
        </view>
      </form>
    </view>
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
      type: "primary",
      //表单数据
      form: {
        mobile: "", //手机号
        code: "" //验证码
      },
      btn: "下一步" //按钮
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
    doLoop: function(seconds) {
      seconds = seconds ? seconds : 60;
      this.btnText = seconds + "s后获取";
      uni.request({
        url: this.tui.interfaceUrl() + "/api/Login/GetSmsCode",
        data: { phone: this.form.mobile },
        header: { "content-type": "application/x-www-form-urlencoded" },
        method: "get",
        success: res => {
          let data = res.data;
        }
      });
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
    btnSend: function() {
      if (util.isNullOrEmpty(this.form.mobile)) {
        this.tui.toast("请输入手机号码");
        return;
      } else if (!util.isMobile(this.form.mobile)) {
        this.tui.toast("请输入正确的手机号码");
        return;
      }
      this.disabled = true;
      this.btnText = "请稍候...";
      this.type = "gray";

      setTimeout(() => {
        this.doLoop(60);
      }, 500);
    },
    formLogin: function(e) {
      let _this = this;
      let loginCode = e.detail.value.smsCode;
      let mobile = e.detail.value.mobile;
      if (util.isNullOrEmpty(_this.form.mobile)) {
        this.tui.toast("请输入手机号码");
        return;
      } else if (!util.isMobile(_this.form.mobile)) {
        util.toast("请输入正确的手机号码");
        return;
      } else if (util.isNullOrEmpty(loginCode)) {
        this.tui.toast("请输入验证码");
        return;
      } else if (loginCode != this.form.code) {
        this.tui.toast("验证码不正确");
        return;
      }
      _this.btn = "请等待。。。";

      let postData = {
        phone: _this.form.mobile,
        smsCode: _this.form.code
      };
      uni.request({
        url: this.tui.interfaceUrl() + "/api/Login/CheckSmsCode",
        data: postData,
        header: { "content-type": "application/x-www-form-urlencoded" },
        method: "POST",
        success: res => {
          let data = res.data;
          this.tui.toast(data.message);
          if (data.status === "Success") {
            // 将手机号存储到本地
            uni.setStorage({
              key: "phone",
              data: { phone: _this.form.mobile },
              success: function() {
                console.log("success");
              }
            });
            uni.navigateTo({
              url: "resetPassword"
            });
          }

          _this.btn = "下一步";
        }
      });
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

.xz-photo {
  height: 40px;
    width: 160px;
    display: block;
    margin: 5px auto 0 auto;
    position: relative;
    z-index: 2;
    top: 42px;
}

.tui-bg-img {
  width: 100%;
  height: 260px;
  position: absolute;
  top: 0;
}
.xz-tabs-view {
  position: relative;
  top: 25px !important;
  margin-bottom: 10px;
}
.xz-login-name {
  width: 128upx;
  height: 40upx;
  font-size: 30upx;
  color: #fff;
  margin: 36upx auto 0 auto;
  text-align: center;
  position: relative;
  z-index: 2;
}
.form-box{
      width: 88%;
    position: relative;
    top: -81px;
    z-index: 1;
    background: #fff;
    margin: 0 auto;
     border-top-left-radius: 8px;
    border-top-right-radius: 8px;
}
.xz-login-from {
  width: 100%;
  padding: 22px 42px 0 42px;
  box-sizing: border-box;
}

.xz-input {
  font-size: 32upx;
  flex: 1;
  display: inline-block;
  padding-left: 32upx;
  box-sizing: border-box;
  overflow: hidden;
}

.xz-line-cell {
  padding: 27upx 0;
  display: -webkit-flex;
  display: flex;
  -webkiit-align-items: center;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
}

.xz-line-cell::after {
  content: "";
  position: absolute;
  border-bottom: 1upx solid #e0e0e0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  bottom: 0;
  right: 0;
  left: 0;
}

.xz-top28 {
  margin-top: 28upx;
}

.xz-btn-class {
  width: 196upx !important;
  height: 54upx !important;
  border-radius: 27upx !important;
  font-size: 28upx !important;
  padding: 0 !important;
  line-height: 54upx !important;
}

.xz-btn-submit {
  margin-top: 100upx;
  background: #45afa4;
  color: #fff;
}

.xz-protocol {
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
.tui-btn-mini{
      width: auto;
    font-size: 12px;
    height: 28px;
    line-height: 28px;
}
</style>
