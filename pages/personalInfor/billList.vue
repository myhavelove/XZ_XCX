<template>
  <view class="container">
    <view>
      <iv-tabs
        :tabs="navbar"
        :currentTab="currentTab > 1 ? 0 : currentTab"
        @change="changeTab"
        itemWidth="50%"
      ></iv-tabs>
      <view v-if="currentTab === 0">
        <view v-for="(item, index) in billArr" :key="index" class="box-list">
          <view class="item-title co-text">{{ item.CaseCode }}</view>
          <view class="co-text item-pay">
            <view class="time fl">付款时间</view>
            <view class="time-des fr">{{ item.PayTime }}</view>
          </view>
          <view class="co-text item-txt">
            <view class="time fl">付款项目：{{ item.PayForTypeName }}</view>
            <view
              class="star_01 fr"
            
              >{{ item.PayMainStatusName=='已收款'?'已付款': item.PayMainStatusName}}</view
            >
          </view>
          <view class="co-text item-payt"
            ><view class="txt-iets fl">共计</view
            ><view
              class="pay fr"
              style="color:#da4d3a"
              >￥{{ item.ShouldPayPrice }}</view
            >
          </view>
        </view>
      </view>
      <view v-if="currentTab === 1">
        <view
          v-for="(item, index) in waitBillArr"
          :key="index"
          class="box-list"
            @tap="handlerButton(item.PayMainStatusName)"
        >
          <view class="item-title co-text">{{ item.CaseCode }}</view>
          <!-- <view class="co-text item-pay">
            <view class="time fl">付款发起日期</view>
            <view class="time-des fr">{{ item.PayTime }}</view>
          </view> -->
          <view class="co-text item-txt">
            <view class="time fl">付款项目：{{ item.PayForTypeName }}</view>
            <view
              class="star_02 fr"
              
              >{{ item.PayMainStatusName }}</view
            >
          </view>
          <view class="co-text item-payt"
            ><view class="txt-iets fl">共计</view
            ><view
              class="pay fr"
              :style="
                item.PayMainStatusName == '待付款'
                  ? 'color:#da4d3a'
                  : 'color:#2fca91'
              "
              >￥{{ item.ShouldPayPrice }}</view
            >
          </view>
        </view>
      </view>
      <iv-scroll-top :scrollTop="scrollTop"></iv-scroll-top>
    </view>
      <iv-loadmore :visible="loadding"></iv-loadmore>
    <iv-nomore :visible="!pullUpOn"></iv-nomore>
  </view>
</template>
<script>
import ivTabs from "@/components/tui-tabs/tui-tabs";
import ivScrollTop from "@/components/scroll-top/scroll-top";
import ivLoadmore from "@/components/loadmore/loadmore";
import ivNomore from "@/components/nomore/nomore";
const util = require("@/utils/util.js");
export default {
  components: {
    ivTabs,
    ivScrollTop,ivLoadmore,ivNomore
  },
  data() {
    return {
      scrollTop: 0,
      billArr: [], //账单数据
      waitBillArr: [], //待付款
      phone: "", //手机号
      current: 0,
      disabled: false,
      timePay: "", //交易时间
      currentTab: 0,
      scrollTop: 0, //返回顶部
      pageNum:1,
      pageNum2:1,
      PageCountZJ:"",//已付款
      PageCountDZ:"",//待付款
      loadding: false,
      pullUpOn: true,
      navbar: [
        {
          name: "已付款"
        },
        { name: "待付款" }
      ]
    };
  },
  mounted() {
    this.loadList();
  },
    // 页面上拉触底事件的处理函数
  onReachBottom: function() {
    if (!this.pullUpOn) return;
    this.loadding = true;
    if (this.pageNum == this.PageCountZJ) {
      this.loadding = false;

      this.pullUpOn = false;
    }  else{
      this.billArr = this.billArr.concat(this.billArr);
      this.pageNum = this.pageNum + 1;
      this.loadList();
    }
     if (this.pageNum2 == this.PageCountZJ){
         this.loadding = false;
      this.pullUpOn = false;
    }else{
      this.waitBillArr = this.waitBillArr.concat(this.waitBillArr);
      this.pageNum = this.pageNum2 + 1;
    }
  },
  methods: {
    changeTab(e) {
      
      this.currentTab = e.index;
      
    },
    // 获取列表数据
    loadList() {
      let _this = this;
      // #ifdef APP-PLUS || H5
      uni.getStorage({
        key: "phone",
        success: function(res) {
          _this.phone = res.data.phone;
        }
      });
         uni.getStorage({
        key: "currentTab",
        success: function(res) {
          _this.currentTab = res.data.currentTab;
        }
      });
      uni.request({
        url: _this.tui.interfaceUrl() + "/api/Order/GetOrderList",
        data: { PageIndex:_this.pageNum },
        header: { "content-type": "application/x-www-form-urlencoded" },
        method: "post",
        async: "true",
        success: res => {
          let data = res.data;
          _this.billArr = [...data.data.Items[0]];
          _this.PageCountZJ=data.data.TotalPages;
          for (let item of _this.billArr) {
            item.PayTime = util.dateFormat(item.PayTime, "yyyy-MM-dd hh:mm");
          }
        }
      });
      uni.request({
        url: _this.tui.interfaceUrl() + "/api/Order/GetOrderList",
        data: { userName: _this.phone, status: "Paying" },
        header: { "content-type": "application/x-www-form-urlencoded" },
        method: "post",
        async: "true",
        success: res => {
          let data = res.data;
          _this.waitBillArr = [...data.data.Items[0]];
          _this.PageCountDZ=data.data.TotalPages;
          for (let item of _this.waitBillArr) {
            item.PayTime = util.dateFormat(item.PayTime, "yyyy-MM-dd hh:mm");
          }
        }
      });
        // #endif
      // #ifdef MP-WEIXIN
         let _token = wx.getStorageSync("token");
      let headconfig = {
        "content-type": "application/x-www-form-urlencoded"
      };
      if (_token != "") {
        headconfig["token"] = _token;
         wx.request({
        url: _this.tui.interfaceUrl() + "/api/Order/GetOrderList",
        data:{PageIndex:_this.pageNum},
        header: headconfig,
        method: "POST",
        async: "true",
        success: res => {
          let data = res.data;
          if(data.status=='Success'){
                _this.billArr = [...data.data.Items[0]];
          _this.PageCountZJ=data.data.TotalPages;

          for (let item of _this.billArr) {
            item.PayTime = util.dateFormat(item.PayTime, "yyyy-MM-dd hh:mm");
          }
          }
         
        }
       })
             wx.request({
        url: _this.tui.interfaceUrl() + "/api/Order/GetOrderList",
        data:{status: "Paying",PageIndex:_this.pageNum2 },
        header: headconfig,
        method: "POST",
        async: "true",
        success: res => {
          let data = res.data;
          if(data.status=='Success'){
               _this.waitBillArr = [...data.data.Items[0]];
          _this.PageCountDZ=data.data.TotalPages;

          for (let item of _this.waitBillArr) {
            item.PayTime = util.dateFormat(item.PayTime, "yyyy-MM-dd hh:mm");
          }
          }
          
        }
       })
      }else{
         _this.tui.toast("请登录查看~");
        return false;
      }
      
        // #endif

    },
     handlerButton(state){
    if(state=="待付款"){
        this.tui.toast("请前往PC端查看详情~");
        return false;
    }
  },
  },
 
  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  }
};
</script>
<style scoped>
page {
  background: #f6f6f6;
}
.container {
   background-color: #f3f3f3 !important;
  padding-bottom: env(safe-area-inset-bottom);
}
.box-list {
  background: #fff;
  margin-top: 10px;
  overflow: hidden;
  padding: 10px 20px;
}
.item-title {
  font-size: 18px;
  font-weight: 600;
}
.co-text {
  height: 30px;
  line-height: 30px;
}
.item-pay {
  font-size: 16px;
  color: #ababab;
}
.item-payt {
  float: right;
  width: 125px;
}
.item-txt {
  font-size: 16px;
}
.star_01{
      border: 1px solid;
    background: #2fca91;
    color: #fff;
    border-radius: 12px;
    padding: 0 5px;
    height: 20px;
    line-height: 20px;
}
.star_02{
      border: 1px solid;
    background: #da4d3a;
    color: #fff;
    border-radius: 12px;
    padding: 0 5px;
    height: 20px;
    line-height: 20px;
}
</style>
