<template>
  <view class="container">
    <tui-tabs
      :tabs="navbar"
      :currentTab="currentTab > 1 ? 0 : currentTab"
      @change="change"
      itemWidth="50%"
    ></tui-tabs>
    <view v-if="currentTab === 0">
      <block v-if="videosrc == ''">
        <!-- 暂无视频 -->
        <image
          src="../../static/images/index/case/video-img.png"
          class="imgs"
        ></image>
        <text class="none">暂无相关视频~</text>
        <!-- 暂无视频结束 -->
      </block>
      <video
        v-if="videosrc != ''"
        class="video"
        enable-danmu
        danmu-btn
        controls
      ></video>
      <view v-for="(item, index) in videosrc" :key="index">
        <button
          class="subBtn "
          :class="index == 0 ? '' : 'btn'"
          bindtap="changevideo"
        >
          视频{{ index + 1 }}
        </button>
      </view>
    </view>
    <view v-if="currentTab === 1">
      <view class="case-list">
        <view>
          <text class="left">是否前置治疗</text>
          <text class="right">{{caseList.PreTreatment==0?"否":"是"}}</text>
        </view>
      </view>
      <view class="case-list">
        <view>
          <text class="left">所需上牙期数</text>
          <text class="right">{{caseList.UpBracesNumber}}</text>
        </view>
      </view>
      <view class="case-list">
        <view>
          <text class="left">所需下牙期数</text>
          <text class="right">{{caseList.DownBracesNumber}}</text>
        </view>
      </view>
      <view class="case-list">
        <view>
          <text class="left">所需复查期数</text>
          <text class="right">{{caseList.CycleNumber}}</text>
        </view>
      </view>
      <view class="program">
        <view>治疗方案</view>
        <text class="reason">{{caseList.SchemeContent}}</text>
      </view>
    </view>
  </view>
</template>
<script>
import ivNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
import tuiTabs from "@/components/tui-tabs/tui-tabs";
export default {
  components: { ivNavBar, tuiTabs },
  data() {
    return {
      currentTab: 0,
      videosrc: [], //相关地址
      caseList:{},//治疗方案
      casecode: "", //相关案例数据
      navbar: [
        {
          name: "模型数据"
        },
        {
          name: "治疗方案"
        }
      ]
    };
  },
  mounted() {
    this.videoSList(); //获取数据
        this.treatmentList();
  },
  methods: {
    // tab切换
    change(e) {
      this.currentTab = e.index;
    },
    // 获取相关视频
    videoSList() {
      let _this = this;
           _this.casecode  = wx.getStorageSync("casecode");

           uni.getStorage({
        key: "currentTab",
        success: function(res) {
          _this.currentTab = res.data.currentTab;
        }
      });
      uni.request({
        url: _this.tui.interfaceUrl() + "/api/Case/GetCaseBookTchemeFile",
        data: { casecode: _this.casecode },
        header: { "content-type": "application/x-www-form-urlencoded" },
        method: "POST",
        success: res => {
          let data = res.data;
          if (data.status == "Success") {
            _this.videosrc = [...data.data];
          }
        }
      });
    },
    // 获取治疗方案
    treatmentList() {
      let _this = this;
        _this.casecode  = wx.getStorageSync("casecode");
           uni.getStorage({
        key: "currentTab",
        success: function(res) {
          _this.currentTab = res.data.currentTab;
        }
      });
      uni.request({
        url: _this.tui.interfaceUrl() + "/api/Case/GetCaseScheme",
        data: { casecode: _this.casecode },
        header: { "content-type": "application/x-www-form-urlencoded" },
        method: "POST",
        success: res => {
          let data = res.data;
          if (data.status == "Success") {
            _this.caseList = data.data;
          }
        }
      });
    }
  }
};
</script>
<style scoped>
/* 暂无视频 */
.imgs {
  width: 180rpx;
  height: 180rpx;
  display: block;
  margin: 0 auto;
  margin-top: 40rpx;
}
.none {
  font-size: 30rpx;
  text-align: center;
  color: #aaa;
  display: block;
  margin-top: 20rpx;
}
/* 治疗方案 */

.case-list view {
  display: flex;
  font-size: 30rpx;
  height: 90rpx;
  line-height: 90rpx;
  border-bottom: 1px solid #f4f4f4;
}

.left {
  margin-left: 20rpx;
}

.right {
  margin-left: 60rpx;
  color: #999
}

.program {
  font-size: 30rpx;
  padding-left: 20rpx;
  margin-top: 20rpx;
  border-bottom: 1px solid #f4f4f4;
}

.program text {
  display: block;
  color: #999;
  margin-right: 20rpx;
  margin-top: 20rpx;
  margin-bottom: 20rpx;
}
.reason {
  font-size: 28rpx;
  color: #999;
  margin-left: 20rpx;
  display: block;
  margin-top: 10rpx;
  word-wrap: break-word;
}
</style>
