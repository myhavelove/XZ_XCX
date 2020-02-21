<template>
  <view class="container">
    <view class="example-body">
      <iv-nav-bar
        left-icon="phone-filled"
        color="white"
        background-color="#2ea8ab"
        title="修畸之家"
        @clickLeft="serverBtn"
      />
    </view>
    <!-- 搜索11 -->
    <view class="search-bar">
      <view class="search-bar-form">
        <view class="search-bar-box">
          <!-- #ifdef APP-PLUS || MP-->
          <icon class="icon-search-in-box" type="search" :size="16"></icon>
          <!-- #endif -->
          <input
            confirm-type="search"
            class="search-bar-input"
            placeholder="请输入姓名/手机号/案例号"
            placeholder-class="phcolor"
            v-model="inputVal"
          />
          <view class="icon-clear" v-if="inputShowed" @tap="clearInput">
            <!-- #ifdef APP-PLUS || MP-->
            <icon type="clear" :size="15"></icon>
            <!-- #endif -->
          </view>
        </view>
      </view>
      <button class="btn-primary" hover-class="btn-hover" @tap="searchTap">
        搜索
      </button>
    </view>
    <!-- 搜索 -->
    <!--banner-->
    <view class="xz-banner-box">
      <swiper
        :indicator-dots="true"
        :autoplay="true"
        :interval="5000"
        :duration="150"
        class="xz-banner-swiper"
        :circular="true"
        indicator-color="rgba(255, 255, 255, 0.8)"
        indicator-active-color="#fff"
      >
        <swiper-item
          v-for="(item, index) in banner"
          :key="index"
            @tap="detailTZ(item.DbKey)"
          class="xz-banner-item"
        >
          <image
            :src="imgUrl + item.ImagerUrl"
            class="xz-slide-image"
            mode="scaleToFill"
          />
        </swiper-item>
      </swiper>
    </view>

    <!--banner-->
    <!-- 消息通知 -->
    <view class="xz-news">
      <view class="xz-news-dynamic">
        <view class="physician-name">尊敬的医生，{{ dateName }}</view>
        <view class="disease-title">
          <view @tap="caseTap" class="orthodonticsNum"
            ><view class="fl">正畸案例</view><i>{{ diseaseNumber==0?'0':diseaseNumber }}</i
            ><view class="fl">例</view>
          </view>
          <view @tap="repairTap" class="stateNum"
            ><view class="fl">修复案例</view><i>{{ repairNumber==0?'0': repairNumber}}</i>
            <view class="fl">例</view>
          </view>
        </view>
      </view>
      <view class="xz-news-load">
        <image
          src="../../static/images/index/operated.png"
          class="xz-news-icon"
        />
      </view>
    </view>
    <!-- 消息通知 -->
    <!-- 滚动消息 -->
    <view class="xz-notice-board">
      <view class="xz-rolling-news">
        <iv-icons
          class="input-uni-icon"
          type="sound"
          size="22"
          color="#2ea8ab"
        />
        <swiper autoplay circular :interval="3000" class="xz-swiper">
          <swiper-item
            v-for="(item, index) in newsList"
            :key="index"
            class="xz-swiper-item"
             @tap="detailTZ(item.DbKey)"
          >
            <view class="xz-news-item">{{
              item.Title
            }}</view>
          </swiper-item>
        </swiper>
      </view>
    </view>
    <!-- 滚动消息 -->
    <!-- 菜单模型 -->
    <!-- <view class="bottom-container">
      <view class="ul-item">
        <view
          @tap="tapPerfect"
          data-index="2"
          data-key="待完善案例"
          class="item"
          hover-class="opcity"
          :hover-stay-time="150"
        >
          <image
            class="item-img"
            src="../../static/images/index/basic/chuangjiandanju.png"
          ></image>
          <text class="item-name">待完善案例</text>
        </view>
        <view
          @tap="tapVisit"
          class="item"
          hover-class="opcity"
          data-key="初诊案例"
          :hover-stay-time="150"
        >
          <image
            class="item-img"
            src="../../static/images/index/basic/chaxun.png"
          ></image>
          <text class="item-name">初诊案例</text>
        </view>
        <view
          @tap="tapConfirm"
          data-index="2"
          data-key="处理中案例"
          class="item"
          hover-class="opcity"
          :hover-stay-time="150"
        >
          <image
            class="item-img"
            src="../../static/images/index/basic/queren.png"
          ></image>
          <text class="item-name">处理中案例</text>
        </view>
      </view>
      <view class="ul-item ul-item-box">
        <view
          @tap="tapPay"
          data-index="2"
          data-key="账单列表"
          class="item"
          hover-class="opcity"
          :hover-stay-time="150"
        >
          <image
            class="item-img"
            src="../../static/images/index/basic/fukuan.png"
          ></image>
          <text class="item-name">账单列表</text>
        </view>
        <view
          @tap="tapCargo"
          class="item"
          data-key="生产单列表"
          hover-class="opcity"
          :hover-stay-time="150"
        >
          <image
            class="item-img"
            src="../../static/images/index/basic/tubiaolunkuo.png"
          ></image>
          <text class="item-name">生产单列表</text>
        </view>
        <view
          class="item"
          @tap="onClick"
          data-key="新增案例"
          hover-class="opcity"
          :hover-stay-time="150"
        >
          <image
            class="item-img"
            src="../../static/images/index/basic/addimg.png"
          ></image>
          <text class="item-name">新增案例</text>
        </view>
      </view>
    </view> -->

    <!-- 菜单盒子 -->
  		<view class="example-menu">
			<iv-grid :column="3" :show-border="false" :highlight="true" @change="menuChange">
				<iv-grid-item v-for="(item, index) in menuList" :index="index" :key="index">
					<view class="grid-item-box">
						<image :src="item.url" class="image" mode="aspectFill" />
						<text class="text">{{ item.text }}</text>
					</view>
				</iv-grid-item>
			</iv-grid>
		</view>
    <!-- 菜单模型 -->
    <!-- 在线客服 -->
    <iv-modal :show="contactModal" @cancel="hideModal" :custom="true">
      <view class="tui-modal-custom">
        <view class="xz-custom-text">{{ contactPhone }}</view>
        <iv-button type="green" shape="circle" @click="dialClick(contactPhone)"
          >拨号</iv-button
        >
      </view>
    </iv-modal>
    <!-- 在线客服 -->
  </view>
</template>
<script>
import ivIcons from "@/components/uni-icons/uni-icons.vue";
import ivGrid from "@/components/grid/uni-grid";
import ivGridItem from "@/components/grid-item/uni-grid-item";
import ivNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
import ivModal from "@/components/modal/modal";
import ivButton from "@/components/button/button";

export default {
  components: {
    ivIcons,
    ivGrid,
    ivGridItem,
    ivNavBar,
    ivModal,
    ivButton
  },
  data() {
    return {
      banner: [], //轮播图
      imgUrl: this.tui.imgUrl(), //图片地址
      current: 1, //页面默认展示的图片
      animation: false, //默认状态
      physician: "", //医生姓名
      diseaseNumber: "", //病例数
      repairNumber: "", //修复案例数
      contactModal: false, //modal弹框
      inputVal: "", //搜索内容
      inputShowed: false, // 输入框是否显示
      contactPhone: this.tui.serverPhone(), //客服手机号
      menuList:[
        {
          url:'../../static/images/index/basic/chuangjiandanju.png',
          text:"待完善案例"
        },
        {
          url:'../../static/images/index/basic/chaxun.png',
          text:"待确认方案"
        },
        {
          url:'../../static/images/index/basic/queren.png',
          text:"处理中案例"
        },
        {
          url:'../../static/images/index/basic/fukuan.png',
          text:"账单列表"
        },
        {
          url:'../../static/images/index/basic/tubiaolunkuo.png',
          text:"生产单列表"
        },
        {
          url:'../../static/images/index/basic/addimg.png',
          text:"新增案例"
        },
      ],
      // 滚动消息
      newsList: [],
      dateName: "", //时间段名称
    };
  },
  onLoad: function(options) {
    setTimeout(() => {
      this.animation = true;
    }, 600);
  },
    onShow() {
    this.getUserData(); //获取用户信息
  },
  mounted() {
    this.noticeList(); //获取通知公告或者banner
    this.getTime(); //判断当前时间段
  },
  // 主页面右边侧滑
  onBackPress() {
    return true;
  },
  methods: {

    //   轮播
    change: function(e) {
      this.current = e.detail.current;
    },

    // 点击添加按钮
    onClick() {
      let _token = wx.getStorageSync("token");
      if(_token!=''){
           uni.navigateTo({
        url: "../caseBox/addCase",
        success: res => {},
        fail: () => {},
        complete: () => {}
      });
      }else{
         this.tui.toast("请登录操作~");
        return false;
      }
   
    },
    // 获取医生信息
    getUserData() {
      let _this = this;
      // #ifdef  APP-PLUS || H5
      uni.getStorage({
        key: "phone",
        success: function(res) {
          _this.phone = res.data.phone;
        }
      });
      uni.removeStorage({
        key: "casecode",
        success: function(res) {
        }
      });
      uni.removeStorage({
        key: "currentTab",
        success: function(res) {
        }
      });
      uni.removeStorage({
        key: "inputVal",
        success: function(res) {
        }
      });

      uni.request({
        url: _this.tui.interfaceUrl() + "/api/My/LookUserInfo",
        data: { phone: _this.phone },
        header: { "content-type": "application/x-www-form-urlencoded" },
        method: "POST",
        success: res => {
          let data = res.data.data;
          _this.physician = data.RealName;
          _this.diseaseNumber = data.casebooksCount;
          _this.repairNumber = data.impCaseBooksCount;
          let MemberCode = data.MemberCode;
        }
      });
      // #endif
      // #ifdef   MP-WEIXIN
      wx.getStorage({
        key: "phone",
        success(res) {
          _this.phone = res.data.phone;
        }
      });
      wx.removeStorage({
        key: "currentTab",
        success(res) {
        }
      });
      wx.removeStorage({
        key: "casecode",
        success(res) {
        }
      });
      wx.removeStorage({
        key: "inputVal",
        success(res) {
        }
      });
       wx.removeStorage({
        key: "imgPrtt",
        success(res) {
        }
      });
         wx.removeStorage({
        key: "parameter",
        success(res) {
        }
      });
           wx.removeStorage({
        key: "patientcode",
        success(res) {
        }
      });
             wx.removeStorage({
        key: "twCase",
        success(res) {
        }
      });
      let _token = wx.getStorageSync("token");
      let headconfig = {
        "content-type": "application/x-www-form-urlencoded"
      };
      if (_token != "") {
        headconfig["token"] = _token;
      }
      if(_token!=''){
            wx.request({
        url: _this.tui.interfaceUrl() + "/api/My/LookUserInfo",
        header: headconfig,
        method: "POST",
        success: res => {
          let data = res.data;
          if(data.status==200){
            _this.physician = data.data.RealName;
          _this.diseaseNumber = data.data.casebooksCount;
          _this.repairNumber = data.data.impCaseBooksCount;
          let MemberCode = data.data.MemberCode;
          }
          
        }
      });
      }
  
      // #endif
    },
    // 主页面展示
    menuChange(e){
      let {
					index
				} = e.detail
				this.menuList[index].badge && this.menuList[index].badge++
        if(index==0){
          this.tapPerfect();
          return false;
        }else if(index==1){
          this.tapVisit();
          return false;
        }else if(index==2){
          this.tapConfirm();
          return false;
        }else if(index==3){
          this.tapPay();
          return false;
        }else if(index==4){
          this.tapCargo();
          return false;
        }else if(index==5){
          this.onClick();
          return false;
        }
    },
    // 获取账单信息
    tapPay() {
      uni.setStorage({
        key: "currentTab",
        data: { currentTab: 1 },
        success: function() {}
      });
      uni.navigateTo({
        url: "../personalInfor/billList"
      });
    },
    // 收货信息
    tapCargo() {
      uni.navigateTo({
        url: "logistics/index"
      });
    },
    // 待完善案例
    tapPerfect() {
      uni.navigateTo({
        url: "pending/index"
      });
    },
    //待确认案例
    tapConfirm() {
      uni.navigateTo({
        url: "confirmCase/index"
      });
    },
    // 正畸案例
    caseTap() {
  wx.setStorageSync("currentTab", 0);
      uni.reLaunch({
        url: "../caseBox/index"
      });
    },
    // 修复案例
    repairTap() {
       wx.setStorageSync("currentTab", 1);
      uni.reLaunch({
        url: "../caseBox/index"
      });
    },
    // 待完善案例
    tapVisit() {
      uni.navigateTo({
        url: "visit/firstDiagnose"
      });
    },
    // 关闭modal
    hideModal() {
      this.contactModal = false;
    },
    // 打开modal
    serverBtn() {
      this.contactModal = true;
    },
    // 拨打电话
    dialClick(phone) {
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
    },
    //获取通知公告orbanner
    noticeList() {
      let _this = this;
      //banner
      uni.request({
        url: _this.tui.interfaceUrl() + "/api/My/GetBannerAndList",
        data: { type: 1 },
        header: { "content-type": "application/x-www-form-urlencoded" },
        method: "POST",
        success: res => {
          let data = res.data;
          if (data.status == "200") {
            _this.banner = [...data.data[0]];
          }
        }
      });
      //通知公告
      uni.request({
        url: _this.tui.interfaceUrl() + "/api/My/GetBannerAndList",
        data: { type: 0 },
        header: { "content-type": "application/x-www-form-urlencoded" },
        method: "POST",
        success: res => {
          let data = res.data;
          _this.newsList = [...data.data[0]];
        }
      });
    },

    // 搜索功能开发
    searchTap() {
      let _this = this;
       // #ifdef  APP-PLUS || H5

      uni.setStorage({
        key: "inputVal",
        data: { inputVal: _this.inputVal },
        success: function() {}
      });
      uni.navigateTo({
        url: "../caseBox/index"
      });
      // #endif
      // #ifdef   MP-WEIXIN
       wx.setStorageSync("inputVal", _this.inputVal);
        wx.navigateTo({
        url: "confirmCase/index"
      });
      // #endif

    },
    // 通知公告
    detailTZ(id) {
      // #ifdef  APP-PLUS || H5

      uni.setStorage({
        key: "DbKey",
        data: { DbKey: id },
        success: function() {}
      });
      uni.navigateTo({
        url: "newsContent"
      });
      // #endif
      // #ifdef   MP-WEIXIN
      wx.setStorageSync("DbKey", id);
        uni.navigateTo({
        url: "newsContent"
      });
      // #endif

    },
    //判断上下午
    getTime() {
      let _this = this;
      let timeNow = new Date();
      // 获取当前小时
      let hour = timeNow.getHours();
      if (hour < 6) {
        _this.dateName = "凌晨好！";
      } else if (hour < 9) {
        _this.dateName = "早上好！";
      } else if (hour < 12) {
        _this.dateName = "上午好！";
      } else if (hour < 14) {
        _this.dateName = "中午好！";
      } else if (hour < 17) {
        _this.dateName = "下午好！";
      } else if (hour < 19) {
        _this.dateName = "傍晚好！";
      } else if (hour < 22) {
        _this.dateName = "晚上好！";
      } else {
        _this.dateName = "夜里好！";
      }
    }
  }
};
</script>

<style  scoped>
page {
  background: #f3f3f3 !important;
}
.container {
  color: #333;
  background-color: #f3f3f3 !important;
}
/*banner*/

.xz-banner-box {
  width: 100%;
  padding-top: 20rpx;
  box-sizing: border-box;
  background: #fff;
  padding-bottom: 20rpx;
}

.xz-banner-swiper {
  width: 100%;
  height: 290rpx;
}

.xz-banner-item {
  padding: 0 16rpx;
  box-sizing: border-box;
}

.xz-slide-image {
  width: 100%;
  height: 290rpx;
  display: block;
  border-radius: 12rpx;
  /* transition: all 0.1s linear; */
}

.xz-banner-scale {
  transform: scaleY(0.9);
  transform-origin: center center;
}

/* #ifdef APP-PLUS || MP */
.xz-banner-swiper .wx-swiper-dot {
  width: 8rpx;
  height: 8rpx;
  display: inline-flex;
  background: none;
  justify-content: space-between;
}

.xz-banner-swiper .wx-swiper-dot::before {
  content: "";
  flex-grow: 1;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 16rpx;
  overflow: hidden;
}

.xz-banner-swiper .wx-swiper-dot-active::before {
  background: #fff;
}

.xz-banner-swiper .wx-swiper-dot.wx-swiper-dot-active {
  width: 16rpx;
}

/* #endif */

/* #ifdef H5 */
.xz-banner-swiper .uni-swiper-dot {
  width: 8rpx;
  height: 8rpx;
  display: inline-flex;
  background: none;
  justify-content: space-between;
}

.xz-banner-swiper .uni-swiper-dot::before {
  content: "";
  flex-grow: 1;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 16rpx;
  overflow: hidden;
}

.xz-banner-swiper .uni-swiper-dot-active::before {
  background: #fff;
}

.xz-banner-swiper .uni-swiper-dot.uni-swiper-dot-active {
  width: 16rpx;
}

/* #endif */
/*banner*/
/* 消息通知 */
.xz-icon-bg {
  background: #fff;
  padding-left: 30upx;
  position: relative;
  z-index: 10;
}
.input-uni-icon {
  padding-right: 5px;
}
.xz-notice-board {
  width: 100%;
  padding-right: 30upx;
  box-sizing: border-box;
  font-size: 28upx;
  height: 80upx;
  background: #fff;
  display: flex;
  align-items: center;
  /* #ifdef H5 */
  /* #endif */
  z-index: 999;
  background: #fff;
  line-height: 80upx;
  margin: 10px 0;
}

.xz-rolling-news {
  width: 100%;
  padding: 12upx 30upx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
}

.xz-swiper {
  font-size: 28upx;
  height: 50upx;
  flex: 1;
}

.xz-swiper-item {
  display: flex;
  align-items: center;
}

.xz-news-item {
  line-height: 28upx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
/* 底部菜单 */
.xz-mtop {
  /* position: fixed; */
  left: 0;
  bottom: 0;
  padding-bottom: env(safe-area-inset-bottom);
  width: 100%;
}
/* 消息通知 */
.xz-news {
  min-height: 140rpx;
  background: #fff;
}
.xz-news-load {
  float: left;
  width: 20%;
}
.xz-news-icon {
  width: 60px;
  height: 60px;
  float: left;
  padding: 0px 10px 5px 15px;
}
.xz-news-dynamic {
  float: right;
  width: 75%;
  overflow: hidden;
  height: 140rpx;
}
.physician-name {
  font-size: 16px;
  height: 30px;
  line-height: 30px;
  font-weight: 600;
}
.disease-title {
  font-size: 14px;
  overflow: hidden;
}
.disease-title i {
  color: #45afa4;
  padding: 0 5px;
  font-style: normal;
  float: left;
  text-decoration: underline;
}
.disease-title span {
}
/* 九宫格 */
.example-menu{
  flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
}
	.grid-item-box {
		flex: 1;
		/* position: relative;
 */
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
	}
	.image {
	width: 95rpx;
height: 95rpx;

	}
  	.text {
		font-size: 26rpx;
		margin-top: 10rpx;
	}

/* tb */
.bottom-container {
  height: 480rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 60rpx 74rpx 40rpx 95rpx;
  background-color: #ffffff;
  border-radius: 10rpx;
  box-sizing: border-box;
  /* box-shadow: 0 0 10rpx #efefef; */
}

.ul-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
 width: 130rpx;
height: 180rpx;


}

.item-img {
  width: 100rpx;
  height: 95rpx;
}

.item-name {
  padding-top: 13rpx;
  font-size: 24rpx;
  color: #666666;
  min-width: 80rpx;
  text-align: center;
}

.btn-feedback {
  background: transparent !important;
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
}
/* modal客服手机号 */
.xz-custom-text {
  text-align: center;
  padding: 10px;
}

/* 搜索功能 */

.search-bar {
  display: flex;
  align-items: center;
  position: relative;
  padding: 20upx 30upx 0upx;
  background-color: #fff;
  /* box-shadow: 0 2px 2px #ccc;*/
}

.search-bar-form {
  flex: 1;
  position: relative;
  border-radius: 32upx;
  background: #f2f5f7;
}

.search-bar-box {
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 20upx;
  padding-right: 20upx;
  height: 64upx;
  z-index: 1;
}

.search-bar-input {
  line-height: normal;
  width: 100%;
  padding-left: 20upx;
  font-size: 30upx;
  color: #333;
}
.btn-primary {
  height: 62upx;
  width: 122upx;
  font-size: 30upx;
  line-height: 62upx;
  margin-left: 30upx;
  background: linear-gradient(-90deg, #1fc4d7, #1fc4d7);
  border-radius: 22px;
  color: #fff;
}
/* 数字消息 */
.orthodonticsNum,
.stateNum {
  padding: 3px 3px;
  overflow: hidden;
  float: left;
}
</style>
