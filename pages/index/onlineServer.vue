<template>
  <view class="container">
    <view class="serverList" v-for="(item, index) in card" :key="index">
      <iv-card :image="item.img" :title="item.title">
        <template v-slot:body>
          <view class="xz-default">
            <view class="title-phone" @tap="makePhone(item.phone)"> <iv-icon name="voipphone" :size="24" color="#45afa4"></iv-icon>{{ item.phone }}

              
            </view>
           
          </view>
        </template>
      </iv-card>
    </view>
  </view>
</template>
<script>
import ivIcon from "@/components/icon/icon";
import ivCard from "@/components/card/card";
export default {
  components: {
    ivCard,
    ivIcon
  },
  data() {
    return {
     card:[]
    };
  },
    mounted() {
    this.dataList();
  },
  methods: {
       // 获取数据
    dataList() {
     var data = require("../../static/json/serverPhone.json");
      this.card = data.card;
    },
    // 点击拨打电话
    makePhone(phone) {
      uni.makePhoneCall({
        // 手机号
        phoneNumber: phone,
        // 成功回调
        success: res => {
          console.log("调用成功!");
        },
        // 失败回调
        fail: res => {
          console.log("调用失败!");
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
.container{
   background-color: #f3f3f3 !important;
}
.xz-default {
  padding: 20upx 30upx;
      overflow: hidden;
}
.tui-card-class {
  margin: 30px;
}
a {
  color: #333;
  text-decoration: none;
}
.tui-icon {
  float: right;
}
.title-phone{
    width: 100%;
    float: left;
}
</style>
