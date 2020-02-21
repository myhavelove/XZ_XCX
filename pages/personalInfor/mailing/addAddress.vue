<template>
  <view class="container">
    <form :report-submit="true">
      <iv-list-cell :hover="false" padding="0">
        <view class="xz-line-cell">
          <view class="xz-title">收货人</view>
          <input
            placeholder-class="xz-phcolor"
            class="xz-input"
            name="name"
            placeholder="请输入收货人姓名"
            maxlength="15"
            type="text"
            v-model="form.Name"
          />
        </view>
      </iv-list-cell>
      <iv-list-cell :hover="false" padding="0">
        <view class="xz-line-cell">
          <view class="xz-title">手机号码</view>
          <input
            placeholder-class="xz-phcolor"
            class="xz-input"
            name="mobile"
            placeholder="请输入收货人手机号码"
            maxlength="11"
            type="number"
            v-model="form.Phone"
          />
        </view>
      </iv-list-cell>
      <iv-list-cell :arrow="true" padding="0">
        <view class="xz-line-cell">
          <view class="xz-title"
            ><text class="xz-title-city-text">所在城市</text></view
          >
          <input
            placeholder-class="xz-phcolor"
            class="xz-input"
            disabled
            name="city"
            @tap="showPicker"
            placeholder="请选择城市"
            maxlength="50"
            type="text"
            v-model="form.locations"
          />
        </view>
      </iv-list-cell>
      <iv-list-cell :hover="false" padding="0">
        <view class="xz-line-cell">
          <view class="xz-title">收货地址</view>
          <input
            placeholder-class="xz-phcolor"
            class="xz-input"
            name="address"
            placeholder="请输入详细的收货地址"
            maxlength="50"
            type="text"
            v-model="form.Address"
          />
        </view>
      </iv-list-cell>

      <!-- 默认地址 -->
      <!-- <iv-list-cell :hover="false" padding="0">
        <view class="xz-swipe-cell">
          <view>设为默认地址</view>
          <switch checked color="#30CC67" class="xz-switch-small" />
        </view>
      </iv-list-cell> -->
      <!-- 保存地址 -->
      <view class="xz-addr-save">
        <iv-button type="green" height="88rpx" @click="preserve"
          >保存收货地址</iv-button
        >
      </view>
    </form>
    <!--picker-view start-->
    <view
      class="tui-mask-screen"
      :class="[showPickerStatus ? 'tui-mask-show' : '']"
      @tap="hidePicker"
    ></view>
    <view
      class="tui-picker-box"
      :class="[showPickerStatus ? 'tui-pickerbox-show' : '']"
    >
      <view class="picker-header list-item">
        <view
          class="btn-cancle"
          hover-class="opcity"
          :hover-stay-time="150"
          @tap.stop="hidePicker"
          >取消</view
        >
        <view
          class="btn-sure"
          hover-class="opcity"
          :hover-stay-time="150"
          @tap.stop="picker"
          >确定</view
        >
      </view>
      <picker-view
        indicator-style="height: 50px;"
        class="picker-view"
        :value="value"
        @change="columnPicker"
      >
        <picker-view-column>
          <view v-for="(item, index) in proviceArr" :key="index" class="item">{{
            item
          }}</view>
        </picker-view-column>
        <picker-view-column>
          <view v-for="(item, index) in cityArr" :key="index" class="item">{{
            item
          }}</view>
        </picker-view-column>
        <picker-view-column>
          <view
            v-for="(item, index) in districtArr"
            :key="index"
            class="item"
            >{{ item }}</view
          >
        </picker-view-column>
      </picker-view>
    </view>
    <!--picker-view end-->
  </view>
</template>
<script>
import ivButton from "@/components/extend/button/button";
import ivListView from "@/components/list-view/list-view";
import ivListCell from "@/components/list-cell/list-cell";
const cityData = require("@/utils/picker.city.js");
const util = require("@/utils/util.js");

export default {
  components: {
    ivButton,
    ivListView,
    ivListCell
  },
  data() {
    return {
      showPickerStatus: false, //位置信息显示
      proviceArr: [], //省份
      cityArr: [], //城市
      districtArr: [], //区
      value: [0, 0, 0], //省市区默认初始化
      mobile: "", //手机号
      DbKey: "", //判断是否编辑
      form: {
        Name: "", //收货人名称
        Phone: "", //手机号
        locations: "", //所在城市
        Province: "", //省份
        City: "", //城市
        Area: "", //区县
        Address: "" //收货地址
      }
    };
  },
  onLoad: function() {
    //初始化数据
    this.proviceArr = this.toArr(cityData);
    this.cityArr = this.toArr(cityData[0].city);
    this.districtArr = this.toArr(cityData[0].city[0].area);
  },
  mounted() {
    this.getKey();
  },

  methods: {
    // 显示picker-view
    showPicker: function() {
      this.showPickerStatus = true;
    },
    // 隐藏picker-view
    hidePicker: function() {
      this.showPickerStatus = false;
    },
    // 地理位置
    toArr(object) {
      let arr = [];
      for (let i in object) {
        arr.push(object[i].name);
      }
      return arr;
    },
    //picker change切换事件
    columnPicker: function(e) {
      let value = e.detail.value;
      //如果两者下标不一致，表示滚动过
      if (this.value[0] !== value[0]) {
        this.proviceArr = this.proviceArr;
        this.cityArr = this.toArr(cityData[value[0]].city);
        this.districtArr = this.toArr(cityData[value[0]].city[0].area);
        this.value = [value[0], 0, 0];
      } else if (this.value[1] !== value[1]) {
        this.proviceArr = this.proviceArr;
        this.cityArr = this.cityArr;
        this.districtArr = this.toArr(cityData[value[0]].city[value[1]].area);
        this.value = [value[0], value[1], 0];
      } else {
        this.value = value;
      }
    },
    //确定按钮
    picker: function(e) {
      let value = this.value;
      if (cityData.length > 0) {
        let provice = cityData[value[0]].name;
        let city = cityData[value[0]].city[value[1]].name;
        let district = cityData[value[0]].city[value[1]].area[value[2]].name;
        this.text = [provice, city, district];
        this.proviceArr = provice;
        this.cityArr = city;
        this.districtArr = district;
        this.form.Province = this.proviceArr;
        this.form.City = this.cityArr;
        this.form.Area = this.districtArr;
        this.form.locations = this.proviceArr + this.cityArr + this.districtArr;
        this.showPickerStatus = false;
      }
      //初始化数据
      this.proviceArr = this.toArr(cityData);
      this.cityArr = this.toArr(cityData[0].city);
      this.districtArr = this.toArr(cityData[0].city[0].area);
    },
    // 提交保存数据
    preserve() {
      let _this = this;
      // #ifdef  APP-PLUS || H5
      uni.getStorage({
        key: "phone",
        success: function(res) {
          _this.mobile = res.data.phone;
        }
      });
      let address = {};
      if (_this.DbKey == "") {
        address = JSON.stringify({
          Name: _this.form.Name,
          Phone: _this.form.Phone,
          Province: _this.form.Province,
          City: _this.form.City,
          Area: _this.form.Area,
          Address: _this.form.Address
        });
      } else {
        address = JSON.stringify({
          Name: _this.form.Name,
          Phone: _this.form.Phone,
          Province: _this.form.Province,
          City: _this.form.City,
          Area: _this.form.Area,
          Address: _this.form.Address,
          DbKey: _this.DbKey
        });
      }
      uni.request({
        url: _this.tui.interfaceUrl() + "/api/My/EditAddress",
        data: { address, phone: _this.mobile },
        header: { "content-type": "application/x-www-form-urlencoded" },
        method: "POST",
        success: res => {
          let data = res.data;
          if (data.status == "Success") {
            _this.tui.toast("操作成功~");
            setTimeout(() => {
              uni.navigateTo({
                url: "mailing"
              });
            }, 500);
            return false;
          } else {
            _this.tui.toast("数据异常，请稍后再试~");
            return false;
          }
        }
      });
      // #endif
      // #ifdef   MP-WEIXIN
      _this.mobile = wx.getStorageSync("phone");
      if(_this.form.Name==''){
         _this.tui.toast("请填写收货人姓名");
        return false;
      }
      else       if (util.isNullOrEmpty(_this.form.Phone)) {
        _this.tui.toast("请输入手机号码");
        return;
      } else if (!util.isMobile(_this.form.Phone)) {
        _this.tui.toast("请输入正确的手机号码");
        return;
      }else if(_this.form.locations==''){
        _this.tui.toast("请选择收货人地址信息");
        return false;
      }else if(_this.form.Address==''){
         _this.tui.toast("请填写收货人地址信息");
        return false;
      }
      let address = {};
      if (_this.DbKey == "") {
        address = JSON.stringify({
          Name: _this.form.Name,
          Phone: _this.form.Phone,
          Province: _this.form.Province,
          City: _this.form.City,
          Area: _this.form.Area,
          Address: _this.form.Address
        });
      } else {
        address = JSON.stringify({
          Name: _this.form.Name,
          Phone: _this.form.Phone,
          Province: _this.form.Province,
          City: _this.form.City,
          Area: _this.form.Area,
          Address: _this.form.Address,
          DbKey: _this.DbKey
        });
      }
      let _token = wx.getStorageSync("token");
      let headconfig = {
        "content-type": "application/x-www-form-urlencoded"
      };
      if (_token != "") {
        headconfig["token"] = _token;
      }
      wx.request({
        url: _this.tui.interfaceUrl() + "/api/My/EditAddress",
        data: { address, phone: _this.mobile },
        header: headconfig,
        method: "POST",
        success: res => {
          let data = res.data;
          if (data.status == "Success") {
            _this.tui.toast("操作成功~");
            setTimeout(() => {
              wx.reLaunch({
                url: "mailing"
              });
            }, 500);
            return false;
          } else {
            _this.tui.toast("数据异常，请稍后再试~");
            return false;
          }
        }
      });
      // #endif
    },
    // 获取信息
    getKey() {
      uni.getStorage({
        key: "casecode",
        success: function(res) {
          this.casecode = res.data.CaseCode;
        }
      });
      this.getData();
    },
    // 获取详细信息
    getData() {
      let _this = this;
      // #ifdef  APP-PLUS || H5

      // 获取keyid
      uni.getStorage({
        key: "keyId",
        success: function(res) {
          _this.keyId = res.data.keyId;
        }
      });
      if (_this.keyId != undefined && _this.keyId != "") {
        uni.request({
          url: _this.tui.interfaceUrl() + "/api/My/GetAddressInfo",
          data: { key: _this.keyId },
          header: { "content-type": "application/x-www-form-urlencoded" },
          method: "POST",
          success: res => {
            let data = res.data;
            if (data.Message) {
              return false;
            } else {
              _this.form = data.data;
              _this.form.locations =
                data.data.Province + data.data.City + data.data.Area;
              if (data.data.DbKey != "") {
                _this.DbKey = data.data.DbKey;
                return false;
              }
              return false;
            }
          }
        });
        return false;
      } else {
        return false;
      }
      // #endif
      // #ifdef   MP-WEIXIN
      _this.keyId = wx.getStorageSync("keyId");
      if (_this.keyId != undefined && _this.keyId != "") {
        let _token = wx.getStorageSync("token");
        let headconfig = {
          "content-type": "application/x-www-form-urlencoded"
        };
        if (_token != "") {
          headconfig["token"] = _token;
        }
        wx.request({
          url: _this.tui.interfaceUrl() + "/api/My/GetAddressInfo",
          data: { key: _this.keyId },
          header: { "content-type": "application/x-www-form-urlencoded" },
          method: "POST",
          success: res => {
            let data = res.data;
            if (data.Message) {
              return false;
            } else {
              _this.form = data.data;
              _this.form.locations =
                data.data.Province + data.data.City + data.data.Area;
              if (data.data.DbKey != "") {
                _this.DbKey = data.data.DbKey;
                return false;
              }
              return false;
            }
          }
        });
        return false;
      } else {
        return false;
      }
      // #endif
    }
  }
};
</script>
<style scoped>
.xz-addr-box {
  padding: 20rpx 0;
}

.xz-line-cell {
  width: 100%;
  padding: 24rpx 30rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}

.xz-title {
  width: 180rpx;
  font-size: 28rpx;
}

.xz-title-city-text {
  width: 180rpx;
  height: 40rpx;
  display: block;
  line-height: 46rpx;
}

.xz-input {
  width: 500rpx;
}

.xz-input-city {
  flex: 1;
  height: 40rpx;
  font-size: 28rpx;
  padding-right: 30rpx;
}

.xz-phcolor {
  color: #ccc;
  font-size: 28rpx;
}
.xz-cell-title {
  font-size: 28rpx;
}
.xz-addr-label {
  margin-left: 70rpx;
}

.xz-label-item {
  width: 76rpx;
  height: 40rpx;
  border: 1rpx solid rgb(136, 136, 136);
  border-radius: 6rpx;
  font-size: 26rpx;
  text-align: center;
  line-height: 40rpx;
  margin-right: 20rpx;
  display: inline-block;
  transform: scale(0.9);
}
.xz-label-active {
  background: #e41f19;
  border-color: #e41f19;
  color: #fff;
}
.xz-swipe-cell {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 10rpx 24rpx;
  border-radius: 6rpx;
  overflow: hidden;
  font-size: 28rpx;
}

.xz-switch-small {
  transform: scale(0.8);
  transform-origin: 100% center;
}

/* #ifndef H5 */
.xz-switch-small .wx-switch-input {
  margin: 0 !important;
}

/* #endif */

/* #ifdef H5 */
uni-switch .uni-switch-input {
  margin-right: 0 !important;
}

/* #endif */

.xz-addr-save {
  padding: 24rpx;
  margin-top: 100rpx;
}

.xz-del {
  padding: 24rpx;
}

/* picker start*/

.tui-mask-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 99996;
  transition: all 0.3s ease-in-out;
  opacity: 0;
  visibility: hidden;
}

.tui-mask-show {
  opacity: 1;
  visibility: visible;
}

.tui-picker-box {
  width: 100%;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  visibility: hidden;
  transform: translate3d(0, 100%, 0);
  transform-origin: center;
  transition: all 0.3s ease-in-out;
  min-height: 20rpx;
  background: #fff;
}

.tui-pickerbox-show {
  transform: translate3d(0, 0, 0);
  visibility: visible;
}

.picker-header {
  width: 100%;
  height: 90upx;
  padding: 0 46upx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  font-size: 32upx;
  background: #fff;
}

.list-item::after {
  left: 0;
}

.btn-cancle {
  padding: 20upx;
  color: #888;
}

.btn-sure {
  padding: 20upx;
  color: #5677fc;
}

.picker-view {
  width: 100%;
  height: 260px;
}

.item {
  line-height: 50px;
  text-align: center;
}

/* picker end*/
</style>
