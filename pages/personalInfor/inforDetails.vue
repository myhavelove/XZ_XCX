<template>
  <view class="container">
    <iv-list-view title="基本信息" class="xz-list-view">
      <iv-list-cell> <i> 登录账号：</i>{{ userDetails.Name==undefined?'':userDetails.Name }} </iv-list-cell>
      <iv-list-cell>
        <i> 医师姓名：</i><input type="text" disabled  v-model="userDetails.RealName" />
      </iv-list-cell>
      <iv-list-cell>
        <i>手机号：</i><input type="text" disabled v-model="userDetails.Name" />
      </iv-list-cell>
      <iv-list-cell v-if="RoleTag == 'CoopDr'">
        <i> 身份证号：</i>{{ userDetails.IDCard==undefined?'': userDetails.IDCard}}
      </iv-list-cell>
    </iv-list-view>
    <iv-list-view title="其它" class="xz-list-view">
      <iv-list-cell>
        <i>邮政编码：</i><input type="text" disabled  v-model="PostCode" />
      </iv-list-cell>
      <iv-list-cell>
        <i> 医师地址：</i
        ><input type="text" v-model="AddressList" disabled   />
        <!-- ><input type="text" v-model="AddressList" disabled  @tap="showPicker" /> -->

      </iv-list-cell>
      <iv-list-cell>
        <i> 资质：</i>
        <image :src="imgList" class="img_for_box"></image>
      </iv-list-cell>
    </iv-list-view>
    <!-- <button
      class="xz-btn xz-btn-block xz-green"
      @click="handleSubmit"
      hover-class="xz-green-hover"
    >
      保存
    </button> -->
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
const form = require("@/utils/formValidation.js");
const cityData = require("@/utils/picker.city.js");
import ivListView from "@/components/list-view/list-view";
import ivListCell from "@/components/list-cell/list-cell";
export default {
  components: {
    ivListCell,
    ivListView
  },
  data() {
    return {
      phone: "", //手机号
      userDetails: {}, // 用户基本信息
      AddressList: "", //地址信息
      PostCode:"",//邮编
      imgList: "", //图片地址
      showPickerStatus: false, //位置信息显示
      proviceArr: [], //省份
      RoleTag: "CoopDr", //
      cityArr: [], //城市
      districtArr: [], //区
      value: [0, 0, 0] //省市区默认初始化
    };
  },
  onLoad: function() {
    //初始化数据
    this.proviceArr = this.toArr(cityData);
    this.cityArr = this.toArr(cityData[0].city);
    this.districtArr = this.toArr(cityData[0].city[0].area);
  },
  mounted() {
    this.getData(); //获取用户基本信息
  },
  methods: {
    // 获取用户基本信息
    getData() {
      let _this = this;
      // #ifdef APP-PLUS || H5
      uni.getStorage({
        key: "phone",
        success: function(res) {
          _this.phone = res.data.phone;
          console.log(222);
        }
      });
        uni.request({
        url: _this.tui.interfaceUrl() + "/api/My/LookUserInfo",
        data: { phone: _this.phone },
        header: { "content-type": "application/x-www-form-urlencoded" },
        method: "POST",
        success: res => {
          let data = res.data;
          _this.userDetails = data.data;
          _this.AddressList =
            _this.userDetails.Province +
            _this.userDetails.City +
            _this.userDetails.Area +
            _this.userDetails.Address;
          _this.RoleTag = _this.userDetails.RoleTag;
          _this.PostCode=_this.userDetails.PostCode;
          _this.imgList = _this.tui.interfaceUrl() + _this.userDetails.IMG1;
          if (data.status === "200") {
          }
        }
      });
      // #endif
      // #ifdef MP-WEIXIN
      wx.showNavigationBarLoading();
       let _token = wx.getStorageSync("token");
      let headconfig = {
        "content-type": "application/x-www-form-urlencoded"
      };
      if (_token != "") {
        headconfig["token"] = _token;
      }
      wx.request({
        url: _this.tui.interfaceUrl() + "/api/My/LookUserInfo",
        header: headconfig,
        method: "POST",
        success: res => {
          let data = res.data;
          if(data.status==200){
                _this.userDetails = data.data;
          _this.AddressList =
            _this.userDetails.Province +
            _this.userDetails.City +
            _this.userDetails.Area +
            _this.userDetails.Address;
          _this.RoleTag = _this.userDetails.RoleTag;
          _this.PostCode=_this.userDetails.PostCode;
          _this.imgList = _this.tui.interfaceUrl() + _this.userDetails.IMG1;
          
          }
          
        },
            complete(res) {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
      }
      });
      // #endif
    
    },
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
        this.districtArr = this.toArr(
          cityData[value[0]].city[value[1]].area
        );
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
        let district =
          cityData[value[0]].city[value[1]].area[value[2]].name;
        this.text = [provice, city, district];
        this.proviceArr = provice;
        this.cityArr = city;
        this.districtArr = district;
        this.AddressList = this.proviceArr + this.cityArr + this.districtArr;
        debugger
        this.showPickerStatus = false;
      }
    },
    // 提交修改信息
    handleSubmit() {
      let _this = this;
      let postData = {
        RealName: _this.userDetails.RealName,
        PostCode:_this.PostCode,
        Name:_this.phone,
        Province:_this.userDetails.Province,
        City:_this.userDetails.City,
        Area:_this.userDetails.Area,
      };
      uni.request({
        url: _this.tui.interfaceUrl() + "/Mobile/SubmitUserInfo",
         data: postData,
        header: { "content-type": "application/x-www-form-urlencoded" },
        method: "POST",
        success: res => {
          let data = res.data;
            _this.tui.toast(data.message);

        }
      })

      
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
.xz-list-view {
}
.xz-list-view i {
  font-weight: 600;
  font-size: 16px;
  font-style: normal;
  width: 32%;
  text-align: right;
}
.xz-list-view em {
  overflow: hidden;
  /* text-overflow: ellipsis; */
  white-space: nowrap;
  font-style: normal;
  width: 90%;
}
.xz-green {
  background: #2ea8ab !important;
  color: #fff;
}
.xz-btn-block {
  font-size: 18px;
  height: 45px;
  line-height: 45px;
}
.xz-btn {
  width: 80%;
  position: relative;
  border: 0 !important;
  border-radius: 5px;
  display: inline-block;
  margin-top: 20px;
}
.xz-green-hover {
  background: #2ea8ab !important;
  color: #e5e5e5;
}
.img_for_box {
  width: 100px;
  height: 100px;
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
