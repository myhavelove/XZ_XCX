<template>
  <view class="container">
     <view class="example-body">
			<iv-nav-bar   color="white"  background-color="#2ea8ab" left-icon="back" title="收货地址"  fixed="true" @clickLeft="backClick" />
		</view>
    <view class="xz-address">
      <view class="list-item" v-for="(item, index) in dataList" :key="index">
        <view class="item-box">
          <view class="bbox-bbew">
            <view class="item-title"
              ><span>{{ item.Name }}</span
              ><span style="padding-left: 20px;">{{ item.Phone }}</span></view
            >
            <view class="item-title"
              ><span>{{
                item.Province + item.City + item.Area + item.Address
              }}</span></view
            >
          </view>
          <view class="item-time">
            <view class="edit-cll" @tap="editTap(item.DbKey)">
              <iv-icon name="edit" size="24" class="icon-name1 fl"></iv-icon
            ></view>
            <view class="delete-cll" @tap="deleteTap(item.DbKey)">
              <iv-icon name="delete" size="20" class="icon-name2 fl"></iv-icon
            ></view>
          </view>
        </view>
      </view>
    </view>
    <!-- 新增地址 -->
    <view class="xz-address-new">
      <iv-button type="green" height="88rpx" @click="editAddr"
        >+ 新增收货地址</iv-button
      >
    </view>
    <iv-modal
      :show="deleteBtn"
      @click="handleClick"
      content="确定删除该数据？"
      color="#333"
      :size="32"
    ></iv-modal>
  </view>
</template>
<script>
import ivButton from "@/components/extend/button/button";
import ivListCell from "@/components/list-cell/list-cell";
import ivSwipeAction from "@/components/swipe-action/swipe-action";
import ivIcon from "@/components/icon/icon";
import ivModal from "@/components/modal/modal";
import ivNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'

export default {
  components: {
    ivButton,
    ivListCell,
    ivSwipeAction,
    ivModal,
    ivIcon,ivNavBar
  },
  data() {
    return {
      memcode: "", //获取code值
      dataList: [], //地址信息数组
      deleteBtn: false, //删除操作提示框
      keyId: ""
    };
  },
  onShow() {
    this.loadList(); //返回上一页刷新页面
  },
  methods: {
    // 页面获取列表
    loadList() {
      let _this = this;
      // #ifdef  APP-PLUS || H5

      uni.getStorage({
        key: "phone",
        success: function(res) {
          _this.phone = res.data.phone;
        }
      });
      uni.removeStorage({
        key: "keyId",
        success: function(res) {}
      });
      uni.request({
        url: _this.tui.interfaceUrl() + "/api/My/LookUserInfo",
        header: { "content-type": "application/x-www-form-urlencoded" },
        method: "POST",
        success: res => {
          let data = res.data.data;
          _this.memcode = data.MemberCode;
          uni.request({
            url: _this.tui.interfaceUrl() + "/api/My/GetAddressList",
            data: { memcode: _this.memcode },
            header: { "content-type": "application/x-www-form-urlencoded" },
            method: "POST",
            async: "false",
            success: res => {
              let data = res.data.data;
              _this.dataList = [...data];
            }
          });
        }
      });
      // #endif
      // #ifdef   MP-WEIXIN
      wx.getStorage({
        key: "phone",
        success(res) {
          _this.phone = res.data;
        }
      });
      wx.removeStorage({
        key: "keyId",
        success: function(res) {}
      });
     
      let _token = wx.getStorageSync("token");
      let headconfig = {
        "content-type": "application/x-www-form-urlencoded"
      };
      if (_token != "") {
        headconfig["token"] = _token;
                wx.request({
        url: _this.tui.interfaceUrl() + "/api/My/LookUserInfo",
        header: headconfig,
        method: "POST",
        success: res => {
          let data = res.data;
          _this.memcode = data.data.MemberCode;
          wx.request({
            url: _this.tui.interfaceUrl() + "/api/My/GetAddressList",
            header: headconfig,
            method: "POST",
            async: "false",
            success: res => {
              let data = res.data.data;
              _this.dataList = [...data];
            }
          });
        }
      });
      }else{
        _this.tui.toast("请登录查看~");
        return false;
      }
       
    
      // #endif
    },
    // 新增
    editAddr() {
      uni.navigateTo({
        url: "addAddress"
      });
    },
    //操作
    handlerButton(e) {
      let index = e.index;
      let item = e.item;
      this.keyId = item.DbKey;
      uni.setStorage({
        key: "keyId",
        data: { keyId: this.keyId },
        success: function() {
        }
      });
      if (index == 0) {
        this.editObjs();
        return false;
      } else {
        this.deleteBtn = true;
        // this.deleteObjs(keyId);
      }
    },
    // 编辑
    editTap(keyId) {
      this.keyId = keyId;
      // #ifdef  APP-PLUS || H5

      uni.setStorage({
        key: "keyId",
        data: { keyId: this.keyId },
        success: function() {
        }
      });
      uni.navigateTo({
        url: "addAddress"
      });
       // #endif
      // #ifdef   MP-WEIXIN
      wx.setStorageSync("keyId", this.keyId);
        uni.navigateTo({
        url: "addAddress"
      });

       // #endif

    },
    // 删除
    deleteTap(id) {
      this.keyId = id;
      this.deleteBtn = true;
    },
    handleClick(e) {
      let index = e.index;
      if (index === 0) {
        this.deleteBtn = false;
      } else {
        this.deleteObjs(this.keyId);
      }
    },
    // 删除操作
    deleteObjs(id) {
      let _this = this;
      // #ifdef  APP-PLUS || H5

      uni.request({
        url: _this.tui.interfaceUrl() + "/api/My/DeleteAddress",
        data: { key: id, phone: _this.phone },
        header: { "content-type": "application/x-www-form-urlencoded" },
        method: "POST",
        success: res => {
          let data = res.data;
          _this.tui.toast(data.message);
          if (data.status == "Success") {
            _this.deleteBtn = false;
            _this.tui.toast("删除成功~");
            _this.loadList();
            return false;
          } else {
            _this.tui.toast("删除失败，请稍后再试~");
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
      }
      wx.request({
        url: _this.tui.interfaceUrl() + "/api/My/DeleteAddress",
        data: { key: id ,phone: _this.phone},
        header: headconfig,
        method: "POST",
        success: res => {
          let data = res.data;
            _this.tui.toast(data.message);
          if (data.status == "Success") {
            _this.deleteBtn = false;
            _this.tui.toast("删除成功~");
            _this.loadList();
            return false;
          } else {
            _this.tui.toast("删除失败，请稍后再试~");
            return false;
          }
        }
      })
       // #endif

    },
    // 返回
    backClick(){
        wx.reLaunch({
                url: "/pages/personalInfor/index"
              });
    }
  }
};
</script>
<style scoped>
/*  */
.list-item {
  padding: 30upx 30upx;
  display: flex;
  align-items: item;
  border-bottom: 1px solid #eeee;
}
.bbox-bbew {
  width: 75%;
  float: left;
}
.item-title {
  font-size: 32upx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item-time {
  float: right;
  width: 50px;
  height: 40px;
  padding-top: 10px;
}
.edit-cll,
.delete-cll {
  overflow: hidden;
  width: 50%;
  float: left;
}
/* .icon-name1{
  font-size: 20px!important;
}
.icon-name2{
  font-size: 18px!important;
      padding-top: 2px;
} */
/*  */

.xz-address {
  width: 100%;
  padding-top: 20rpx;
  padding-bottom: 160rpx;
}
.xz-address-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.xz-address-main {
  width: 600rpx;
  height: 70rpx;
  display: flex;
  font-size: 30rpx;
  line-height: 86rpx;
  padding-left: 30rpx;
}

.xz-address-name {
  width: 120rpx;
  height: 60rpx;
}

.xz-address-tel {
  margin-left: 10rpx;
}

.xz-address-detail {
  font-size: 24rpx;
  word-break: break-all;
  padding-bottom: 25rpx;
  padding-left: 25rpx;
  padding-right: 120rpx;
}

.xz-address-label {
  padding: 5rpx 8rpx;
  flex-shrink: 0;
  background: #e41f19;
  border-radius: 6rpx;
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 25rpx;
  line-height: 25rpx;
  transform: scale(0.8);
  transform-origin: center center;
  margin-right: 6rpx;
}

.xz-address-imgbox {
  width: 80rpx;
  height: 100rpx;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 10rpx;
}

.xz-address-img {
  width: 36rpx;
  height: 36rpx;
}

.xz-address-new {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 999;
  padding: 20rpx 25rpx 30rpx;
  box-sizing: border-box;
  background: #fafafa;
}

.xz-safe-area {
  padding-bottom: env(safe-area-inset-bottom);
}
.item-box {
  width: 100%;
}
.example-body{
  height: 73px;
}
</style>
