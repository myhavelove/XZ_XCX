<template>
  <view class="container">
     <view class="example-body" v-if="casecode == ''" >
			<iv-nav-bar   color="white"  background-color="#2ea8ab" left-icon="back" title="案例信息"  fixed="true" @clickLeft="backClick" />
		</view>
     <view class="example-body" v-if="casecode != ''" >
			<iv-nav-bar   color="white"  background-color="#2ea8ab" left-icon="back" title="案例信息"  fixed="true" @clickLeft="backClick2"/>
		</view>
    <!-- 基本信息 -->
    <view class="inforBox">
      <form @submit="formSubmit">
        <view class="arr_box">
          <view class="tui-cell-class tui-list-cell  tui-line-left">
            <view class="xz-title">专家级别</view>

            <view class="box_f" v-if="casecode == ''">
              <iv-checkbox
                ref="expertList"
                @change="expertChange"
              ></iv-checkbox>
            </view>
            <!-- <view
              v-if="casecode == ''"
              style="
    font-size: 12px;
height: 22px;
line-height: 22px;
width: 60px;
background: #fff;
margin-left: 3px;
text-align: center;
border: 1px solid #ddd;
margin-top: 2px;
">高级专家</view
            > -->

            <view v-if="casecode != ''" class="name-bottom">
              <input v-model="DoctorGrade" class="input-text" />
            </view>
          </view>
          <view class="tui-cell-class tui-list-cell  tui-line-left">
            <view class="xz-title">患者性别</view>
            <view class="box_f" v-if="casecode == ''">
              <iv-checkbox ref="sexList" @change="sexChange"></iv-checkbox>
            </view>
            <view v-if="casecode != ''" class="name-bottom">
              <input v-model="Sex" class="input-text" />
            </view>
          </view>
          <view class="tui-cell-class tui-list-cell  tui-line-left">
            <view class="xz-title">患者姓名</view>
            <view v-if="casecode != ''" class="name-bottom">
              <input v-model="PatientName" class="input-text" />
            </view>
            <input
              placeholder-class="phcolor"
              class="tui-input"
              name="userName"
              placeholder="请输入姓名"
              maxlength="50"
              type="text"
              v-model="PatientName"
              v-if="casecode == ''"
            />
          </view>
          <view class="tui-cell-class tui-list-cell  tui-line-left">
            <view class="xz-title">手机号</view>
            <input
              placeholder-class="phcolor"
              class="tui-input"
              name="phone"
              v-model="PatientPhone"
              placeholder="请输入手机号"
              maxlength="11"
              type="number"
              v-if="casecode == ''"
            />
            <view v-if="casecode != ''" class="name-bottom">
              <input v-model="PatientPhone" class="input-text" />
            </view>
          </view>
          <view
            class="tui-cell-class tui-list-cell  tui-line-left"
            v-if="casecode == ''"
          >
            <view class="xz-title">短信验证码</view>
            <input
              placeholder-class="phcolor"
              class="tui-input code-input"
              name="code"
              v-model="vercode"
              placeholder="验证码"
              maxlength="6"
              type="number"
            />
            <tui-button
              size="mini"
              :type="type"
              shape="circle"
              :plain="true"
              :disabled="disabled"
              @click="btnSend"
              >{{btnText}}</tui-button
            >
          </view>
          <view class="tui-cell-class tui-list-cell  tui-line-left">
            <view class="xz-title">年龄</view>
            <input
              placeholder-class="phcolor"
              class="tui-input"
              name="age"
              v-model="Age"
              placeholder="请输入年龄"
              maxlength="3"
              type="number"
              v-if="casecode == ''"
            />
            <view v-if="casecode != ''" class="name-bottom">
              <input v-model="Age" class="input-text" />
            </view>
          </view>
          <view class="tui-cell-class tui-list-cell  tui-line-left">
            <view class="xz-title">身份证号</view>
            <input
              placeholder-class="phcolor"
              class="tui-input input-card"
              placeholder-style="color: #ccc;font-size: 13px;"
              name="idcard"
              v-model="CardId"
              placeholder="(选填)为患者免费购买医疗保险"
              maxlength="18"
              type="text"
              v-if="casecode == ''"
            />
            <view v-if="casecode != ''" class="name-bottom">
              <input v-model="CardId" class="input-text" />
            </view>
          </view>
        </view>
        <view class="tui-btn-box" v-if="casecode == ''">
          <button
            class="btn-primary xz-green  btn-class"
            hover-class="btn-hover"
            formType="submit"
            type="primary"
          >
            保存
          </button>
          <button
            class="btn-primary btn-gray btn-class"
            hover-class="btn-gray-hover"
            formType="reset"
            @click="nextSteps"
            :disabled="nextBtn"
          >
            下一步
          </button>
        </view>
      </form>
    </view>
    <!-- 牙齿模型 -->
        <iv-modal
      :show="boubtModal"
      @click="handleClick"
      @cancel="hide"
      content="确定返回主页面吗？"
      color="#333"
      :size="32"
    ></iv-modal>
  </view>
</template>
<script>
import ivCheckbox from "@/components/uni-checkbox/uni-checkbox.vue";
import axbCheckBox from "../../components/uni-checkbox/axb-checkbox.vue";
import tuiButton from "@/components/button/button";
import ivNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
import ivModal from "@/components/modal/modal";
const form = require("@/utils/formValidation.js");
const util = require("@/utils/util.js");
export default {
  components: {
    tuiButton,
    ivCheckbox,
    axbCheckBox,ivNavBar,ivModal
  },
  data() {
    return {
      rankNum: 0, //第一个级别
      sexNum: 0, //第一个性别
      disabled: false,
      btnText: "获取验证码",
      nextBtn: true,
      boubtModal:false,
      type: "primary",
      vercode: "", //id参数值
      casecode: "", //code
      //   表单
      DoctorGrade: "", //医生信息
      Sex: "", //患者性别
      PatientName: "", //患者姓名
      Age: "", //患者年龄
      PatientPhone: "", //患者手机号
      CardId: "", //患者身份证
      doctorA: "" //主治医师
    };
  },
  mounted() {
    this.getCode();
    // 医师信息
    this.$refs.expertList.set({
      type: "radio", // 类型：单选框
      list: [
        // 列表数据
        { text: "技师",value:'0016' },
        { text: "医师",value:'0002'  },
        { text: "专家",value:'0003'  }
        // { text: "高级专家" }
      ]
    });
    // 患者性别
    this.$refs.sexList.set({
      type: "radio", // 类型：单选框
      list: [
        // 列表数据
        { text: "男",value :"1"},
        { text: "女",value:"0" }
      ]
    });
  },
  methods: {
    // 获取专家类型
    expertChange: function() {
      let _this = this;
      let data = _this.$refs.expertList.get(); // 组件返回的数据
      _this.DoctorGrade = data.value;
    },
    // 性别类型
    sexChange: function() {
      let _this = this;
      let data = _this.$refs.sexList.get(); // 组件返回的数据
      _this.Sex = data.value;
    },
    // 保存数据
    formSubmit(e) {
      let _this = this;
      let postData = JSON.stringify({
        DoctorGrade: _this.DoctorGrade,
        Sex: _this.Sex,
        PatientName: _this.PatientName,
        Age: _this.Age,
        PatientPhone: _this.PatientPhone,
        CardId:_this.CardId
      });
      // #ifdef  APP-PLUS || H5
      
      uni.request({
        url: _this.tui.interfaceUrl() + "/api/Case/SaveBasicPatients",
        data: { model: postData, vercode: _this.vercode },
        header: { "content-type": "application/x-www-form-urlencoded" },
        method: "POST",
        success: res => {
          let data = res.data;

          if (data.status == "Success") {
            _this.tui.toast("保存成功~");
            uni.setStorage({
              key: "patientcode",
              data: { patientcode: data.data.PatientCode },
              success: function() {}
            });
            _this.nextBtn = false;
            return false;
          } else {
            _this.tui.toast(data.message);
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
        url: _this.tui.interfaceUrl() + "/api/Case/SaveBasicPatients",
        data: { model: postData, vercode: _this.vercode },
        header: headconfig,
        method: "POST",
        success: res => {
          let data = res.data;

            if (data.status == "success") {
            _this.tui.toast("保存成功~");
            wx.setStorageSync("patientcode",  data.data.PatientCode);
            wx.setStorageSync("casecode",  data.message);
            wx.setStorageSync("addCase",  1);
            _this.nextBtn = false;
            return false;
          } else {
            _this.tui.toast(data.message);
            return false;
          }
        }
      });
      // #endif
    },
    nextSteps() {
      uni.navigateTo({
        url: "dataCase"
      });
    },
    // 获取验证码
    doLoop: function(seconds) {
      seconds = seconds ? seconds : 60;
      this.btnText = seconds + "s后获取";
         let _token = wx.getStorageSync("token");
      let headconfig = {
        "content-type": "application/x-www-form-urlencoded"
      };
      if (_token != "") {
        headconfig["token"] = _token;
      }
      uni.request({
        url: this.tui.interfaceUrl() + "/api/Case/SendSmsCode",
        data: { phone: this.PatientPhone },
        header: headconfig,
        method: "post",
        success: res => {
          let data = res.data;
          this.tui.toast(data.message);
        }
      });
      
      let countdown = setInterval(() => {
        if (seconds > 0) {
          this.btnText = seconds + "s后获取";
          --seconds;
        } else {
          this.btnText = "获取验证码";
          this.disabled = false;
          this.type = "primary";
          clearInterval(countdown);
        }
      }, 1000);
    },
    // 点击获取验证码按钮
    btnSend: function() {
      let _this = this;
      if (util.isNullOrEmpty(_this.PatientPhone)) {
        _this.tui.toast("请输入手机号码");
        return;
      } else if (!util.isMobile(_this.PatientPhone)) {
        _this.tui.toast("请输入正确的手机号码");
        return;
      }
      _this.disabled = true;
      _this.btnText = "请稍候...";
      _this.type = "gray";

      setTimeout(() => {
        _this.doLoop(60);
      }, 500);
    },
    // 获取信息
    getCode() {
      // #ifdef  APP-PLUS || H5

      uni.getStorage({
        key: "casecode",
        success: function(res) {
          this.casecode = res.data.CaseCode;
        }
      });
      // #endif
      // #ifdef   MP-WEIXIN
     this.casecode= wx.getStorageSync("casecode");
      // #endif

      this.getData();
    },
    // 获取用户信息
    getData() {
      let _this = this;
      // #ifdef  APP-PLUS || H5

      uni.getStorage({
        key: "casecode",
        success: function(res) {
          _this.casecode = res.data.CaseCode;
        }
      });
      if (_this.casecode != "") {
        uni.request({
          url: _this.tui.interfaceUrl() + "/api/Case/GetCaseBooks",
          data: { casecode: _this.casecode },
          header: { "content-type": "application/x-www-form-urlencoded" },
          method: "POST",
          success: res => {
            let data = res.data;
            if (data.status != "Success") {
              _this.tui.toast("数据获取失败~");
              return false;
            } else {
              _this.form = data.data.PatientsModel;
              if (_this.form != undefined) {
                _this.form.PatientPhone = data.data.PatientsModel.PatientPhone;

                _this.form.Sex = data.data.PatientsModel.Sex == 0 ? "女" : "男";
                _this.form.DoctorGrade =
                  data.data.PatientsModel.DoctorGrade == "3"
                    ? "高级专家"
                    : data.data.PatientsModel.DoctorGrade == "2"
                    ? "医师"
                    : data.data.PatientsModel.DoctorGrade == "1"
                    ? "专家"
                    : "技师";
                _this.doctorA = data.data.CoopDrName;
                return false;
              }
            }
          }
        });
        return false;
      }
      // #endif
      // #ifdef   MP-WEIXIN
      _this.casecode = wx.getStorageSync("casecode");
      let _token = wx.getStorageSync("token");
      let headconfig = {
        "content-type": "application/x-www-form-urlencoded"
      };
      if (_token != "") {
        headconfig["token"] = _token;
      }
      wx.request({
        url: _this.tui.interfaceUrl() + "/api/Case/GetCaseBooks",
        data: { casecode: _this.casecode },
        header: headconfig,
        method: "POST",
        success: res => {
          let data = res.data;
          if (data.status != "Success") {
            _this.tui.toast("数据获取失败~");
            return false;
          } else {
            _this.form = data.data.PatientsModel;
            if (_this.form != undefined) {

              _this.PatientPhone = data.data.PatientsModel.PatientPhone;
              _this.PatientName=data.data.PatientsModel.PatientName;
              _this.Sex = data.data.PatientsModel.Sex == 0 ? "女" : "男";
              _this.CardId=data.data.PatientsModel.CardId;
              _this.Age=data.data.PatientsModel.Age;
              _this.DoctorGrade =
                data.data.PatientsModel.DoctorGrade;
              _this.doctorA = data.data.CoopDrName;
              return false;
            }
          }
        }
      });
      // #endif
    },
     // 返回
    backClick(){
      this.boubtModal=true;
    },
    handleClick(e){
      let index = e.index;
      if (index === 0) {
        this.boubtModal = false;
      } else {
        wx.navigateBack({
                url: "/pages/index/index"
              });
      }
        
    },
    hide(){
      this.boubtModal=false;

    },
    backClick2(){
       wx.redirectTo({
                url: "checkDei"
              }); 
    }
  }
};
</script>
<style scoped>
page {
  background: #ededed;
}

/* form表单 */
.tui-list-cell {
  position: relative;
  width: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 10px 15px;
}
.tui-list-cell:after {
  content: "";
  position: absolute;
  left: 24px;
  top: auto;
  bottom: 0;
  right: auto;
  height: 1px;
  width: 90%;
  background-color: #f4f4f4;
}
.arr_box {
  background: #fff;
  padding-bottom: 20px;
}
.xz-title {
  line-height: 32rpx;
  flex-shrink: 0;
  padding-right: 15px;
  padding: 10px;
  font-size: 16px;
}
uni-button,
.btn-class {
  width: 46%;
  float: left;
  margin: 14px 5px;
}
.xz-green {
  background: #2ea8ab !important;
  color: #fff;
}
.tui-btn-mini {
  height: 20px;
  line-height: 20px;
}
.box_f {
  margin-bottom: -10px;
}
.code-input {
  width: 100px;
}
uni-input {
  width: 100%;
}
/* 按钮 */
.name-bottom {
  width: 100%;
}
.input-text {
  width: 100%;
  text-align: right;
  color: #999;
}
.example-body{
  height: 73px;
}
.tui-inpu{
  width: 100%;
  font-size: 14px;
}
.input-card{
  width: 100%;
}
</style>
