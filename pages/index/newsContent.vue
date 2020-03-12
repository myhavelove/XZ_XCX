<template>
  <view class="container">
    <view class="example-body">
      <iv-nav-bar
        color="white"
        left-icon="back"
        background-color="#2ea8ab"
        title="修畸之家"
        @clickLeft="backChange"
      />
    </view>
    <view class="content-box">
      <view class="xz-news-title">
        {{ contentList.Title==undefined?'':contentList.Title }}
      </view>
      <view class="xz-news-content">
        <image
          :src="imgUrl + contentList.ImagerUrl"
          class="xz-article-pic"
          mode="widthFix"
          @tap="previewImg"
          v-if="contentList.ImagerUrl != ''"
        ></image>
        <view class="xz-article">
          {{ contentList.Content==undefined?'': contentList.Content}}
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import ivNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
const util = require("@/utils/util.js");
export default {
  components: {
    ivNavBar
  },
  data() {
    return {
      DbKey: "", //key
      contentList: {}, //内容数据
      imgUrl: this.tui.imgUrl() //图片地址
    };
  },
  mounted() {
    this.getData(); //获取数据层
  },
  methods: {
    // 返回上一页
    backChange() {
      wx.reLaunch({
        url: "index"
      });
    },
    // more弹出层窗口
    moreChange() {},
    getData() {
      let _this = this;
      // #ifdef  APP-PLUS || H5

      uni.getStorage({
        key: "DbKey",
        success: function(res) {
          _this.DbKey = res.data.DbKey;
        }
      });
      uni.request({
        url: _this.tui.interfaceUrl() + "/api/My/GetNewInfo",
        data: { DbKey: _this.DbKey },
        header: { "content-type": "application/x-www-form-urlencoded" },
        method: "POST",
        success: res => {
          let data = res.data;
          _this.contentList = data.data;
          _this.contentList.AddTime = util.dateFormat(
            _this.contentList.AddTime,
            "yyyy-MM-dd hh:mm"
          );
          if (
            _this.contentList.ImagerUrl == "/Content/css/images/default.png"
          ) {
            _this.contentList.ImagerUrl = "";
            return false;
          }
        }
      });
      // #endif
      // #ifdef   MP-WEIXIN
      wx.showNavigationBarLoading();
      _this.DbKey = wx.getStorageSync("DbKey");
      let _token = wx.getStorageSync("token");
      let headconfig = {
        "content-type": "application/x-www-form-urlencoded"
      };
      if (_token != "") {
        headconfig["token"] = _token;
      }
      wx.request({
        url: _this.tui.interfaceUrl() + "/api/My/GetNewInfo",
        data: { DbKey: _this.DbKey },
        header: headconfig,
        method: "POST",
        success: res => {
          let data = res.data;
          if(data.status==200 && data!=null && data!=undefined){
                  _this.contentList = data.data;
            _this.contentList.AddTime = util.dateFormat(
              _this.contentList.AddTime,
              "yyyy-MM-dd hh:mm"
            );
            if (
              _this.contentList.ImagerUrl == "/Content/css/images/default.png"
            ) {
              _this.contentList.ImagerUrl = "";
              return false;
            }
          }
        
        },      complete(res) {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
      }
      });
      // #endif
    },
    previewImg(event){
     let  _this=this;
      var src = _this.imgUrl+_this.contentList.ImagerUrl;//获取data-src
     var imgList = [_this.imgUrl+_this.contentList.ImagerUrl];//获取data-list
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
    }
  }
};
</script>
<style scoped>
page {
  background: #fff;
  color: #333;
}

.content-box {
  padding: 40rpx 30rpx 110rpx 30rpx;
  box-sizing: border-box;
}
.xz-sub-info {
  text-align: center;
  font-size: 14px;
  padding: 10px;
}
.xz-author {
  color: #5677fc;
  padding-right: 20rpx;
}
.xz-news-title {
  font-size: 48rpx;
  font-weight: 500;
}

.xz-article {
  /* text-indent: 2em; */
  font-size: 28rpx;
  padding-bottom: 40rpx;
  line-height: 60rpx;
  text-align: justify;
  word-break: break-all;
  word-wrap: break-word;
  text-indent: 25px;
}
.xz-article-pic {
  width: 100%;
  display: block;
  margin-bottom: 40rpx;
}
.xz-news-content {
  padding-top: 40rpx;
}
</style>
