<template>
  <view class="container">
    <view class="form-box">
     
      <view class="xz-input">
        <label>诊所编号</label
        ><input
          placeholder-style="color:#333;"
          v-model="bindingId"
          class="input-cl"
          v-if="state == 0"
          placeholder="请输入诊所编号"
          @input="clickInput"
        />
        <input
          placeholder-style="color:#333;"
          v-model="bindingId"
          class="input-cl"
          v-if="state == 1"
          disabled
          placeholder="请输入诊所编号"
        />
            <input
          placeholder-style="color:#333;"
          v-model="bindingId"
          class="input-cl"
          v-if="state == 3"
          disabled
          placeholder="请输入诊所编号"
        />
        
      </view>
       <view class="xz-input">
        <label>诊所名称</label
        ><input
          placeholder-style="color:#333;"
          v-model="bindingBox"
          disabled
          class="input-name"
        />
      </view>
    </view>

    <iv-button
      shape="circle"
      class="xz-green xz-btn-block xz-btn xz-green-hover"
      @click="handleClick"
      v-if="state == 0"
      >绑定</iv-button
    >
    <iv-button
      shape="circle"
      class="xz-green xz-btn-block xz-btn xz-green-hover"
      @click="removeClick"
      v-if="state == 1"
      >解除绑定</iv-button
    >
      <iv-button
      shape="circle"
      class="xz-green xz-btn-block xz-btn xz-green-hover"
      @click="removeClick"
      v-if="state == 3"
      >待审核</iv-button
    >

    <iv-toast ref="toast"></iv-toast>
  </view>
</template>
<script>
import ivButton from "@/components/button/button";
import ivModal from "@/components/modal/modal";
import ivToast from "@/components/extend/toast/toast";
export default {
  components: {
    ivModal,
    ivButton,
    ivToast
  },
  data() {
    return {
      bindingBox: "", //诊所名称
      bindingId: "", //诊所id
      newsModal: false, //窗口状态
      phone: "", //手机号
      state: 0, //状态
      MemberCode: "" ,//code状态
    };
  },
  mounted() {
    this.getData(); //获取诊所是否绑定
  },
  methods: {
    // 获取诊所是否绑定
    getData() {
      let _this = this;
      // #ifdef  APP-PLUS || H5
      uni.getStorage({
        key: "phone",
        success: function(res) {
          _this.phone = res.data.phone;
        }
      });
      uni.request({
        url: _this.tui.interfaceUrl() + "/api/My/LookUserClinicInfo",
        data: { phone: _this.phone },
        header: { "content-type": "application/x-www-form-urlencoded" },
        method: "POST",
        success: res => {
          let data = res.data;
          if (!data.data) {
            _this.tui.toast(data.message);
            // return false;
          } else if (data.Message) {
            console.log("出现错误~");
            return false;
          } else {
            if (data.data.BelongStatus == "") {
              _this.state = 0;
              return false;
            } else {
              _this.bindingId = data.data.WishClinicCode;
              _this.MemberCode = data.data.MemberCode;
              _this.state = 1;
              return false;
            }
            return false;
          }
        }
      });
      // #endif
      // #ifdef   MP-WEIXIN
      let _token = wx.getStorageSync("token");
      let headconfig = {
        "content-type": "application/x-www-form-urlencoded"
      };
      if (_token != "") {
        headconfig["token"] = _token;
          wx.request({
        url: _this.tui.interfaceUrl() + "/api/My/LookUserClinicInfo",
        header: headconfig,
        method: "POST",
        success: res => {
          let data = res.data;
          if (data.status == 200) {
            if (data.data.BelongStatus == "") {
              _this.state = 0;
              return false;
            } else if(data.data.BelongStatus==3){
              _this.bindingId = data.data.WishClinicCode;
              _this.MemberCode = data.data.MemberCode;
              _this.bindingBox=data.data.addressName;
              _this.state = 3;
              return false;
            } else{
              _this.bindingId = data.data.WishClinicCode;
              _this.MemberCode = data.data.MemberCode;
              _this.bindingBox=data.data.addressName;
              _this.state = 1;
              return false;
            }
          }
        }
      });
      }else{
        _this.tui.toast("请登录查看~");
        return false;
      }
      
    
      // #endif
    },
    // 提交绑定诊所信息
    handleClick() {
      let _this = this;
      // #ifdef  APP-PLUS || H5

      uni.getStorage({
        key: "phone",
        success: function(res) {
          _this.phone = res.data.phone;
        }
      });
      uni.request({
        url: _this.tui.interfaceUrl() + "/api/My/SubmitCoopDrBelong",
        data: { userName: _this.phone, memberCode: _this.bindingId },
        header: { "content-type": "application/x-www-form-urlencoded" },
        method: "POST",
        success: res => {
          let data = res.data;
          let params = {};
          
          if (data.status === "Error") {
            params = {
              title: data.message,
              imgUrl: "../../static/images/notice/fail-circle.png",
              icon: true
            };
          } else {
            params = {
              title: data.message,
              imgUrl: "../../static/images/notice/check-circle.png",
              icon: true
            };
          }
          _this.$refs.toast.show(params);
          _this.getData();
        }
      });
      // #endif
      // #ifdef   MP-WEIXIN
      let _token = wx.getStorageSync("token");
      let headconfig = {
        "content-type": "application/x-www-form-urlencoded"
      };
      if (_token != "") {
        headconfig["token"] = _token;
              wx.request({
        url: _this.tui.interfaceUrl() + "/api/My/SubmitCoopDrBelong",
        data: {  memberCode: _this.bindingId },
        header: headconfig,
        method: "POST",
        success: res => {
          let data = res.data;
          let params = {};
          if (data.status === "Error") {
            params = {
              title: data.message,
              imgUrl: "/static/images/notice/fail-circle.png",
              icon: true
            };
          } else {
            params = {
              title: data.message,
              imgUrl: "/static/images/notice/check-circle.png",
              icon: true
            };
          }
          _this.$refs.toast.show(params);
          // uni.navigateBack();
          _this.getData();
        }
      });
      }else{
        _this.tui.toast("请登录操作~");
        return false;
      }

      // #endif
    },
    // 解除绑定
    removeClick() {
      let _this = this;
      // #ifdef  APP-PLUS || H5

      uni.getStorage({
        key: "phone",
        success: function(res) {
          _this.phone = res.data.phone;
        }
      });
      uni.request({
        url: _this.tui.interfaceUrl() + "/api/My/SubmitRemoveCoopDrBelong",
        data: { coopdrcode: _this.MemberCode },
        header: { "content-type": "application/x-www-form-urlencoded" },
        method: "POST",
        success: res => {
          let data = res.data;
          let params = {};
          if (data.status === "Error") {
            params = {
              title: data.message,
              imgUrl: "/static/images/notice/fail-circle.png",
              icon: true
            };
          } else {
            params = {
              title: data.message,
              imgUrl: "/static/images/notice/check-circle.png",
              icon: true
            };
          }
          _this.$refs.toast.show(params);
          _this.getData();
        }
      });
      // #endif
      // #ifdef   MP-WEIXIN
      let _token = wx.getStorageSync("token");
      let headconfig = {
        "content-type": "application/x-www-form-urlencoded"
      };
      if (_token != "") {
        headconfig["token"] = _token;
      }
      wx.request({
        url: _this.tui.interfaceUrl() + "/api/My/SubmitRemoveCoopDrBelong",
        data: { coopdrcode: _this.MemberCode },
        header: headconfig,
        method: "POST",
        success: res => {
          let data = res.data;
          let params = {};
          if (data.status === "Error") {
            params = {
              title: data.message,
              imgUrl: "/static/images/notice/fail-circle.png",
              icon: true
            };
          } else {
            params = {
              title: data.message,
              imgUrl: "/static/images/notice/check-circle.png",
              icon: true
            };
          }
          _this.$refs.toast.show(params);
          _this.getData();
        }
      });
      // #endif
    },
    // 输入内容获取诊所名称
    clickInput(){
      let _this = this;
      if(_this.bindingId.length>8){
          let _token = wx.getStorageSync("token");
      let headconfig = {
        "content-type": "application/x-www-form-urlencoded"
      };
      wx.request({
        url: _this.tui.interfaceUrl() + "/api/My/GetCoopClinic",
        data: {  MemberCode: _this.bindingId },
        header: headconfig,
        method: "POST",
        success: res => {
          let data = res.data;
          if(data.status="Success"){
            _this.bindingBox=data.message;
            return false;
          }
        }
      })
      }
     

    }
  }
};
</script>

<style scoped>
page {
  background: #ededed;
}
uni-input {
  height: 45px;
  padding-left: 20px;
}
.form-box {
  background: #fff;
  margin: 10px 10px;
  border-radius: 12px;
}
.xz-input {
  background: #fff;
  margin: 10px 20px;
  padding: 0 10px;
  border-bottom: 1px solid #eee;
  height: 45px;
}
/*  #ifdef  MP-WEIXIN || APP-PLUS */
.input-cl {
  padding: 10px;
}
/*  #endif  */
.xz-input label {
  float: left;
  line-height: 45px;
  font-weight: 600;
}
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
  width: 95%;
  position: relative;
  border: 0 !important;
  display: inline-block;
  margin-top: 20px;
  margin: 0 auto;
  border-radius: 10px;
}
.xz-green-hover {
  background: #2ea8ab !important;
  color: #e5e5e5;
}
.input-name{
padding-top: 12px;padding-left: 10px;
}
</style>
