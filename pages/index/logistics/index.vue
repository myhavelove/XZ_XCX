<template>
  <view class="container">
    <view class="example-body">
      <view v-for="item in logisticsArr" :key="item.id" class="example-box">
        <iv-card
          :title="item.CaseCode"
          :is-shadow="item.shadow"
          :note="item.note"
          :extra="item.extra"
          :thumbnail="item.thumbnail"
          
        ><view class="text-list">
          物流编号：{{ item.ExpressCode }}
          </view>
          <view class="text-list">
            发货快递：{{item.SentByExpressName}}
          </view>
          <view class="text-list">
            发货时间：{{item.SentTime}}
          </view>
          </iv-card>
       
      </view>
    </view>
    <!-- 2 -->
     <!-- 当页面没有数据时 -->
    	<iv-tips :fixed="false" v-if="tipList" imgUrl="/static/images/404/img_nodata.png">暂无数据</iv-tips>
    <!-- 当页面没有数据时 -->
  </view>
</template>
<script>
import ivCard from "@/components/card/card-help";
import ivTips from "@/components/extend/tips/tips"

const util = require("@/utils/util.js");

export default {
  components: {
    ivCard,ivTips
  },
  data() {
    return {
      logisticsArr: [],//数组
      tipList:false,//暂无数据时展示

      pageNum: 1 //数值
    };
  },
  mounted() {
    this.dataList();
  },
  methods: {
    // 获取数据
    dataList() {
      let _this = this;
      // #ifdef  APP-PLUS || H5

      uni.request({
        url: _this.tui.interfaceUrl() + "/api/Order/GetFacingProduceList",
        data: { pageIndex: _this.pageNum },
        header: { "content-type": "application/x-www-form-urlencoded" },
        method: "POST",
        success: res => {
          let data = res.data;
          if (data.status == "Success") {
            _this.logisticsArr=[...data.data.Items[0]];
            for(let item of _this.logisticsArr){
              item.SentTime=util.dateFormat(item.SentTime, "yyyy-MM-dd hh:mm");
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
        url: _this.tui.interfaceUrl() + "/api/Case/GetFacingProduceList",
        data: { pageIndex: _this.pageNum },
        header: headconfig,
        method: "POST",
        success: res => {
          let data = res.data;
            if (data.status == "Success") {
              if(data.data==''){
                 _this.tipList=true;

              return false;
              }
            _this.logisticsArr=[...data.data];
            for(let item of _this.logisticsArr){
              item.SentTime=util.dateFormat(item.SentTime, "yyyy-MM-dd hh:mm");
            }
            return false;
          }
        }
      })
      }else{
         _this.tui.toast("请登录查看~");
        return false;
      }

      // #endif

    },
    // 点击查看详情
    clickCard(id) {
      uni.navigateTo({
        url: "express",
        success: res => {},
        fail: () => {},
        complete: () => {}
      });
    }
  }
};
</script>
<style scoped>
page {
  background: #fff;
}
.example-title {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  font-size: 16px;
  color: #464e52;
  padding: 15px 15px 15px 25px;
  margin-top: 10px;
  position: relative;
  background-color: #fdfdfd;
  border-bottom: 1px #f5f5f5 solid;
}
.example-title:after {
  content: "";
  position: absolute;
  left: 15px;
  margin: auto;
  top: 0;
  bottom: 0;
  width: 3px;
  height: 16px;
  background-color: #cccccc;
}
.example-body {
  padding: 30upx 0;
}

.example-box {
  margin-bottom: 30upx;
}

.example-box:last-child {
  margin-bottom: 0;
}
  .text-list{
    font-size: 16px;
        padding: 3px 0;
  }
</style>
