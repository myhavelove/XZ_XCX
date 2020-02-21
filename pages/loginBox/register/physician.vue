<template>
  <view class="container">
    <form @submit="formSubmit" @reset="formReset">
      <view class="one_flr">
        <tui-list-cell :hover="false">
          <view class="tui-line-cell">
            <view class="tui-title">姓名</view>
            <input
              placeholder-class="phcolor"
              class="tui-input"
              name="name"
              placeholder="请输入姓名"
              maxlength="50"
              type="text"
              v-model="form.RealName"
            />
          </view>
        </tui-list-cell>
        <tui-list-cell :hover="false">
          <view class="tui-line-cell">
            <view class="tui-title">身份证号码</view>
            <input
              placeholder-class="phcolor"
              class="tui-input"
              name="idcard"
              placeholder="请输入身份证号码"
              maxlength="50"
              type="idcard"
              v-model="form.IdCard"
            />
          </view>
        </tui-list-cell>
        <tui-list-cell :hover="false">
          <view class="tui-line-cell">
            <view class="tui-title">密码</view>
            <input
              placeholder-class="phcolor"
              class="tui-input"
              name="password"
              placeholder="请输入密码"
              maxlength="50"
              type="password"
              v-model="form.Password"
            />
          </view>
        </tui-list-cell>
      </view>
      <view class="tow_flr">
        <tui-list-cell :hover="false">
          <view class="tui-line-cell">
            <view class="tui-title">邮政编码</view>
            <input
              placeholder-class="phcolor"
              class="tui-input"
              name="postal"
              placeholder="请输入邮政编码"
              maxlength="6"
              type="text"
              v-model="form.PostCode"
            />
          </view>
        </tui-list-cell>
        <tui-list-cell :hover="false">
          <view class="tui-line-cell">
            <view class="tui-title">资质上传</view>
            <iv-upload
              :serverUrl="serverUrl"
              v-if="imageData.length == 0"
              @complete="result"
              @remove="remove"
            ></iv-upload>
            <image
              :src="imgUrl + imageData[0]"
              class="img_box"
              v-if="imageData.length == 1"
            ></image>
            <em class="explain">说明： <br />上传小于2M，支持JPG、PNG、JPEG</em>
          </view>
        </tui-list-cell>
        <tui-list-cell :hover="false">
          <view class="tui-title">选择地址</view>
          <view class="s-input s-select" @tap="showPicker">
            <text class="text  wid27">{{ text[0] }}</text>
            <image
              src="../../../static/images/login/icon_right.png"
              class="img30 pdr20"
            ></image>
            <text class="text  wid27">{{ text[1] }}</text>
            <image
              src="../../../static/images/login/icon_right.png"
              class="img30 pdr20"
            ></image>
            <text class="text wid46">{{ text[2] }}</text>
            <image
              src="../../../static/images/login/icon_down.png"
              class="img32 flr"
            ></image>
          </view>
        </tui-list-cell>
        <tui-list-cell :hover="false">
          <view class="tui-line-cell">
            <view class="tui-title">诊所地址</view>
            <input
              placeholder-class="phcolor"
              class="tui-input"
              name="name"
              placeholder="请输入诊所地址"
              maxlength="50"
              type="text"
              v-model="form.Address"
            />
          </view>
        </tui-list-cell>
      </view>
      <view class="tui-btn-box">
        <button
          class="btn-primary tui-btn-submit tui-btn-green"
          hover-class="btn-hover"
          :disabled="disabled"
          form-type="submit"
        >
          提交注册信息
        </button>
      </view>
    </form>
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
  </view>
</template>
<script>
// const form = require("../../../components/utils/formValidation.js")
const cityData = require("@/utils/picker.city.js");
import ivButton from "@/components/extend/button/button";
import tuiListCell from "@/components/list-cell/list-cell";
import ivUpload from "@/components/tui-upload/tui-upload";
export default {
  components: {
    tuiListCell,
    ivButton,
    ivUpload
  },
  data() {
    return {
      //上传地址
      serverUrl: this.tui.interfaceUrl() + "/api/Case/ImgUpload",
      proviceArr: [], //省份
      cityArr: [], //城市
      districtArr: [], //区
      value: [0, 0, 0], //省市区默认初始化
      text: ["请选择", "请选择", "请选择"],
      showPickerStatus: false, //是否展示下拉框地区信息
      imageData: "", //
      phone: "",
      imgUrl: this.tui.interfaceUrl(), //图片地址
      disabled: false, //按钮状态
      form: {
        Name: "", //登录号，后期根据提交的数据进行获取
        IdCard: "", //身份证号
        RealName: "", //真实姓名
        PostCode: "", //邮编
        Province: "", //省
        City: "", //市
        Area: "", //区
        Address: "", //地址
        DrCert: "", //上传图片路径
        Password: "" //密码
      }
    };
  },
  onLoad: function() {
    //初始化数据
    this.proviceArr = this.toArr(cityData);
    this.cityArr = this.toArr(cityData[0].city);
    this.districtArr = this.toArr(cityData[0].city[0].area);
  },
  mounted() {},
  methods: {
    //
    formSubmit: function(e) {
      let _this = this;
      //表单规则
      let rules = [
        {
          name: "RealName",
          rule: ["required", "isChinese", "minLength:2", "maxLength:6"], //可使用区间，此处主要测试功能
          msg: [
            "请输入姓名",
            "姓名必须全部为中文",
            "姓名必须2个或以上字符",
            "姓名不能超过6个字符"
          ]
        },
        {
          name: "idcard",
          rule: ["required", "isIdCard"],
          msg: ["请输入身份证号码", "请输入正确的身份证号码"]
        },
        {
          name: "password",
          rule: ["required", "isEnAndNo"],
          msg: ["请输入密码", "密码为8~20位数字和字母组合"]
        }
      ];
      // 获取本地存储的手机号
      uni.getStorage({
        key: "phone",
        success: function(res) {
          _this.phone = res.data.phone;
        }
      });
      //进行表单检查
      _this.form.Name = _this.phone;
      _this.form.DrCert = _this.imageData[0];
      let postData = _this.form;
      uni.request({
        url: this.tui.interfaceUrl() + "/api/Login/SubmitMaterial",
        data: postData,
        header: { "content-type": "application/x-www-form-urlencoded" },
        method: "POST",
        success: res => {
          let data = res.data;

          if (data.status == "Success") {
            _this.tui.toast(data.message);
            _this.disabled = true;
            uni.navigateTo({
              url: "../index"
            });
            return false;
          } else {
            uni.navigateTo({
              url: "../index"
            });
            return false;
          }
        }
      });
    },
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
        this.form.Province = provice;
        this.form.City = city;
        this.form.Area = district;
        this.showPickerStatus = false;
      }
    },
    // 显示picker-view
    showPicker: function() {
      this.showPickerStatus = true;
    },
    // 隐藏picker-view
    hidePicker: function() {
      this.showPickerStatus = false;
    },
    result: function(e) {
      this.imageData = e.imgArr;
      console.log(this.imageData);
    },
    remove: function(e) {
      //移除图片
      let index = e.index;
    }
  }
};
</script>

<style scoped>
.container {
  padding: 20rpx 0 50rpx 0;
}

.tui-line-cell {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}

.tui-title {
  line-height: 32rpx;
  flex-shrink: 0;
  padding-right: 15px;
  font-weight: 600;
  font-style: normal;
  width: 25%;
  text-align: right;
}

.tui-input {
  font-size: 32rpx;
  color: #333;
  padding-left: 20rpx;
  flex: 1;
}

.radio-group {
  margin-left: auto;
  transform: scale(0.8);
  transform-origin: 100% center;
  flex-shrink: 0;
}

.tui-radio {
  display: inline-block;
  padding-left: 28rpx;
  font-size: 36rpx;
  vertical-align: middle;
}

.tui-btn-box {
  padding: 40rpx 50rpx;
  box-sizing: border-box;
}

.btn-gray {
  margin-top: 30rpx;
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
.tui-tips {
  padding: 30rpx;
  color: #999;
  font-size: 24rpx;
}
.tui-pickerbox-show {
  transform: translate3d(0, 0, 0);
  visibility: visible;
}
.picker-view {
  width: 100%;
  height: 260px;
}
.img30 {
  height: 30upx;
  width: 30upx;
}
.img32 {
  height: 32upx;
  width: 32upx;
}
.btn-cancle {
  padding: 20upx;
  color: #888;
}

.btn-sure {
  padding: 20upx;
  color: #5677fc;
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
.tow_flr {
  border-top: 8px solid #f6f6f6;
}
.explain {
  color: #d1cccc;
  font-style: normal;
}
/* 按钮 */
.tui-btn-green {
  background: #35b06a !important;
  color: #ffff;
  border-radius: 12px;
}
.img_box {
  width: 120px;
  height: 110px;
  float: left;
}
</style>
