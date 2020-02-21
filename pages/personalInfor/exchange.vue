<template>
  <view class="container">
    <view class="form-box">
      <view class="xz-input">
        <label>案例编号</label
        ><input
          placeholder-style="color:#333;"
          v-model="bindingBox"
          class="input-cl"
          placeholder="请输入案例编号"
        />
      </view>
      <view class="xz-input">
        <label>核销券码</label
        ><input
          placeholder-style="color:#333;"
          v-model="bindingId"
          class="input-cl"
          placeholder="请输入券码"
        />
      </view>
    </view>

    <iv-button
      shape="circle"
      class="xz-green xz-btn-block xz-btn xz-green-hover"
      @click="handleClick"
      >确认核销</iv-button
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
      bindingBox: "", //绑定诊所
      bindingId: "", //诊所id
      newsModal: false, //窗口状态
      phone: "" ,//手机号
      state:0,//状态
    };
  },
  mounted(){
  },
  methods: {
    // 劵码核销
    handleClick() {
      let _this = this;
      // 获取本地存储的手机号
      uni.getStorage({
        key: "phone",
        success: function(res) {
          _this.phone = res.data.phone;
        }
      });
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
.xz-input label {
  float: left;
  line-height: 45px;
  font-weight: 600;
}
/*  #ifdef  MP-WEIXIN  || APP-PLUS*/
.input-cl{
  padding: 10px;

}
/*  #endif  */
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
</style>
