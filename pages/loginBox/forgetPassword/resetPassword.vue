<template>
  <view class="container">
    <view class="xz-bg-box">
		<image src="../../../static/images/login/bg_login.png" class="tui-bg-img"></image>
      <image src="../../../static/images/login/login.png" class="xz-photo"></image>
	</view>
    <form @submit="formForget">
      <view class="xz-login-from">
        <view class="xz-line-cell">
          <input
            placeholder-class="phcolor"
            class="xz-input"
            name="password"
            v-model="form.password"
            placeholder="请输入密码"
            maxlength="11"
            type="password"
          />
        </view>
        <button class="btn-primary xz-btn-submit" hover-class="btn-hover" form-type="submit">确定</button>
      </view>
    </form>
  </view>
</template>

<script>
const util = require("@/utils/util.js");
export default {
  data() {
    return {
      disabled: false, //确定按钮默认状态
      // 表单信息
      form: {
        phone: "", //手机号
        password: "" //密码
      }
    };
  },
  methods: {
    //提交忘记密码
    formForget() {
      let _this = this;
      if (util.isNullOrEmpty(_this.form.password)) {
        this.tui.toast("请输入密码");
        return;
      }
      // 获取本地存储的手机号
      uni.getStorage({
        key: "phone",
        success: function(res) {
          _this.form.phone = res.data.phone;
        }
      });
      let postData = {
        phone: _this.form.phone,
        pwd: _this.form.password
      };
      debugger;
      uni.request({
        url: this.tui.interfaceUrl() + "/api/Login/PwdReset",
        data: postData,
        header: { "content-type": "application/x-www-form-urlencoded" },
        method: "POST",
        success: res => {
          let data = res.data;
          this.tui.toast(data.message);
          if (data.status === "Success") {
            setTimeout(() => {
              uni.navigateTo({
                url: "../login/index"
              });
            }, 500);
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.xz-bg-box {
  width: 100%;
  box-sizing: border-box;
  position: relative;
  min-height: 220px;
}

.xz-photo {
  height: 90px;
  width: 90px;
  display: block;
  margin: 5px auto 0 auto;
  position: relative;
  z-index: 2;
  top: 20px;
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

.xz-login-from {
  width: 100%;
  padding: 18px 42px 0 42px;
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
</style>
