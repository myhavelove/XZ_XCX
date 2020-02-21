<template>
  <view class="container">
    <view class="xz-bg-box">
      <image src="../../../static/images/login/bg_login.png" class="tui-bg-img"></image>
      <image src="../../../static/images/login/login.png" class="xz-photo"></image>
    </view>
    <view class="box_form">
       <tui-tabs
      :tabs="navbar"
      :currentTab="currentTab>1?0:currentTab"
      @change="change"
      itemWidth="50%"
    ></tui-tabs>
    <view v-if="currentTab===0" class="form-box">
      <form @submit="physicianRegister">
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
            >{{btnText}}</tui-button>
          </view>
          <button class="btn-primary tui-btn-submit" hover-class="btn-hover" form-type="submit">{{btn}}</button>
        </view>
      </form>
    </view>
    <view v-if="currentTab===1" class="form-box">
      <form @submit="clinicRegister">
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
            >{{btnText}}</tui-button>
          </view>
          <button class="btn-primary tui-btn-submit" hover-class="btn-hover" form-type="submit">{{btn}}</button>
        </view>
      </form>
    </view>
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
      type: "primary", //按钮type
      currentTab: 0, //当前展示
      form: {
        mobile: "", //手机号
        code: "" //验证码
      },
      //   tab标题
      navbar: [
        {
          name: "医师"
        },
        { name: "诊所" }
      ],
      btn:"注册",//按钮默认文字
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
      //获取验证码
      uni.request({
        url: this.tui.interfaceUrl() + "/api/Login/GetRegisterSendSmsCode",
        data: { phone: this.form.mobile },
        header: { "content-type": "application/x-www-form-urlencoded" },
        method: "post",
        success: res => {
          let data = res.data;
          if(data.status=='Error'){
            this.btnText='获取验证码';
            return false;
          }
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
      uni.request({
        url: this.tui.interfaceUrl() + "/api/Login/UserNameExist",
        data: { phone: this.form.mobile },
        header: { "content-type": "application/x-www-form-urlencoded" },
        method: "POST",
        success: res => {
          let data = res.data;
          this.tui.toast(data.message);
          if (data.status === "Success") {
            setTimeout(() => {
              this.doLoop(60);
            }, 500);
          } else {
            this.btnText = "获取验证码";
            this.disabled = false;
            this.type = "primary";
            return false;
          }
        }
      });
    },
    // 医师注册
    physicianRegister: function(e) {
      let loginCode = e.detail.value.smsCode;
      let mobile = e.detail.value.mobile;
      if (util.isNullOrEmpty(mobile)) {
        this.tui.toast("请输入手机号码");
        return;
      } else if (!util.isMobile(mobile)) {
        util.toast("请输入正确的手机号码");
        return;
      } else if (util.isNullOrEmpty(loginCode)) {
        this.tui.toast("请输入验证码");
        return;
      } else if (loginCode != this.form.code) {
        this.tui.toast("验证码不正确");
        return;
      }
      this.btn="请稍后。。。";
          let postDate = {
        UserName: this.form.mobile,
        SmsCode: this.form.code,
        RoleTag: 'CoopClinic'
      };
         uni.request({
        url: this.tui.interfaceUrl() + "/api/Login/CheckReg",
        data: postDate,
        header: { "content-type": "application/x-www-form-urlencoded" },
        method: "POST",
        success: res => {
          let data = res.data;
          this.tui.toast(data.message);
          if (data.status === "Success") {
                    // 将手机号存储到本地
            uni.setStorage({
              key: "phone",
              data: { phone: this.form.mobile },
              success: function() {
                console.log("success");
              }
            });
            setTimeout(() => {
              uni.navigateTo({
                url: "physician"
              });
               this.btn = "注册";
            }, 500);
          }
          this.btn = "注册";
         
        }
      });

    },
    // 诊所注册
    clinicRegister(e) {
      let loginCode = e.detail.value.smsCode;
      let mobile = e.detail.value.mobile;
      if (util.isNullOrEmpty(mobile)) {
        this.tui.toast("请输入手机号码");
        return;
      } else if (!util.isMobile(mobile)) {
        util.toast("请输入正确的手机号码");
        return;
      } else if (util.isNullOrEmpty(loginCode)) {
        this.tui.toast("请输入验证码");
        return;
      } else if (loginCode != this.form.code) {
        this.tui.toast("验证码不正确");
        return;
      }
      this.btn="请稍后。。。";
          let postDate = {
        UserName: this.form.mobile,
        SmsCode: this.form.code,
        RoleTag: 'CoopDr'
      };
      //7.	手机号注册提交
         uni.request({
        url: this.tui.interfaceUrl() + "/api/Login/CheckReg",
        data: postDate,
        header: { "content-type": "application/x-www-form-urlencoded" },
        method: "POST",
        success: res => {
          let data = res.data;
           this.tui.toast(data.message);
          if (data.status === "Success") {
                // 将手机号存储到本地
            uni.setStorage({
              key: "phone",
              data: { phone: this.form.mobile },
              success: function() {
                console.log("success");
              }
            });
            setTimeout(() => {
              uni.navigateTo({
                url: "clinic"
              });
            }, 500);
          }
           this.btn = "注册";
         
        }
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
.tui-tabs-view {
  position: relative;
    margin-bottom: 10px;
    width: 88%;
    margin: 0 auto;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
}

.tui-login-name {
  width: 128upx;
  height: 40upx;
  font-size: 30upx;
  color: #fff;
  margin: 36upx auto 0 auto;
  text-align: center;
  position: relative;
  z-index: 2;
}
.box_form{
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
.form-box{
      width: 88%;
    position: relative;
    z-index: 1;
    background: #fff;
    margin: 0 auto;
}
.tui-login-from {
  width: 100%;
  padding: 20px 25px 0 25px;
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
