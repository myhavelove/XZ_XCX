<template>
  <view>
    <button
      class
      open-type="getUserInfo"
      @getuserinfo="wxGetUserInfo"
      withCredentials="true"
    >微信授权获取用户信息</button>
  </view>
</template>
<script>
export default {
  methods: {
    wxGetUserInfo: function(res) {
      if (!res.detail.iv) {
        uni.showToast({
          title: "您取消了授权,登录失败",
          icon: "none"
        });
        return false;
      }
      console.log("-------用户授权，并获取用户基本信息和加密数据------");
      console.log(res.detail);
    }
  }
};
</script>
