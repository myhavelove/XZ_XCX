<template>
  <view class="container">
    <view class="uni-textarea">
      <textarea
        placeholder-style="color:#c2c2c2"
        v-model="feedbackBox"
        placeholder="请输入反馈的问题"
      />
    </view>
    <view class="xz-input">
      <input
        type="text"
        placeholder-style="color:#c2c2c2;"
        placeholder="请输入联系方式"
        v-model="phone"
      />
    </view>
    <iv-button
      shape="circle"
      class="xz-green xz-btn-block xz-btn xz-green-hover"
      @click="handleClick"
      >提交</iv-button
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
      feedbackBox: "", //反馈意见
      phone:"",//手机号
      newsModal: false //提示框
    };
  },
  methods: {
    handleClick() {
      let _this = this;
      let params = {
        title: "提交成功",
        imgUrl: "../../static/images/notice/check-circle.png",
        icon: true
      };
      _this.$refs.toast.show(params);
      let postData={
        feedbackBox:_this.feedbackBox,
        phone:_this.phone
      }

    }
  }
};
</script>
<style scoped>
page {
  background: #ededed;
}
.uni-textarea {
  margin: 50px 35px 20px 35px;
  border: 1px solid #dedede;
  background: #fff;
  padding: 10px;
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
  width: 80%;
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

.xz-input {
  margin: 0 35px 15px 35px;
  background: #fff;
  padding: 10px;
}
</style>
