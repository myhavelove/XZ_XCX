<template>
  <view class="container">
    <view class="example-body">
      <iv-nav-bar
        color="white"
        left-icon="back"
        background-color="#2ea8ab"
        title="案例信息"
        fixed="true"
        @clickLeft="backClick"
      />
    </view>
    <!-- 1 -->
    <view class="one_flr">
      <view class="one_heard">
        <view class="one_title">{{ caseList.CaseCode }}</view>
        <!-- <view
          class="one_type"
          :style="caseList.caseType == 1 ? 'color:red' : 'color:green'"
          >{{ caseList.caseType == 1 ? "方案待确认" : "方案已确认" }}</view
        > -->
      </view>
      <view class="one_footer">
        <view class="des_box">
          <view class="cu-avatar">{{ oneName }}</view>
          <view class="user_name">{{ caseList.PatientName }}</view>
          <view class="add_time">{{ caseList.AddTime }}</view>
        </view>
        <view class="dse_list">
          <view class="user_sex">
            <view class="aseF"
              >性别：{{ caseList.Sex == 0 ? "男" : "女" }}</view
            >
            <view class="aseF">年龄：{{ caseList.Age }}</view>
          </view>
          <view class="user_contact" @click="contactClick">联系患者</view>
        </view>
      </view>
    </view>
    <!-- 2 患者信息 -->
    <view class="tow_flr">
      <view class="title">
        <view class="title_01">病例资料</view>
      </view>
      <view class="content">
        <view class="icon_2" @tap="infoTap">
          <image
            src="../../static/images/index/case/icon_02.png"
            class="xz-icon"
          />
          <view class="icon_01">患者信息</view>
        </view>
        <view class="icon_2" @tap="radioTap">
          <image
            src="../../static/images/index/case/icon_03.png"
            class="xz-icon"
          />
          <view class="icon_01">诊断信息</view>
        </view>
        <view class="icon_2" @tap="imgTap">
          <image
            src="../../static/images/index/case/icon_04.png"
            class="xz-icon"
          />
          <view class="icon_01">患者图片</view>
        </view>
      </view>
    </view>
    <!-- 2-3初诊信息 -->
    <view class="five_flr" v-if="firstList.length > 0">
      <view class="one_heard">
        <view class="one_title four_title">初诊方案</view>
      </view>
      <view class="box clearfix five_footer">
        <view
          class="box-list01 font_conter"
          v-for="(item, index) in firstList"
          :key="index"
        >
          <view class="images">
            <image
              src="../../static/images/index/case/pic04.png"
              class="image01"
            ></image>
          </view>
          <text>方案{{ index + 1 }}</text>
          <view class="time">{{ item.AddTime }}</view>
        </view>
      </view>
    </view>
    <!-- 3 治疗类型-->
    <view class="three_flr" v-if="casescheme != ''">
      <view class="icon_3 plum" @tap="schemeTap">
        <image
          src="../../static/images/index/case/icon_05.png"
          class="xz-icon fl"
          style="padding-top: 15px;float: left;"
        />
        <view class="text_fo">
          <view class="text_color1">模型数据</view>
          <view class="text_fub">多种方案类型</view>
        </view>
      </view>
      <view class="icon_3 paleGreen" @tap="treatmentTap">
        <image
          src="../../static/images/index/case/icon_06.png"
          class="xz-icon fl"
          style="padding-top: 15px;float: left;"
        />
        <view class="text_fo">
          <view class="text_color2">治疗方案</view>
          <view class="text_fub">方案类型说明</view>
        </view>
      </view>
    </view>
    <!-- 4 复诊进度-->
    <view class="five_flr" v-if="reviewList.length > 0">
      <view class="one_heard">
        <view class="one_title four_title">复查记录</view>
        <!-- <view class="color_green">新建复查</view> -->
      </view>
      <view class="box clearfix five_footer">
        <view
          class="box-list01 font_conter"
          v-for="(item, index) in reviewList"
          :key="index"
        >
          <view class="images">
            <image
              src="../../static/images/index/case/pic07.png"
              class="image01"
            ></image>
          </view>
          <text>复查{{ index + 1 }}</text>
          <view class="time">{{ item.AddTime }}</view>
        </view>
      </view>
    </view>

    <!-- 5 牙套进度-->
    <view class="four_flr " v-if="heightBraces">
      <view class="one_heard">
        <view class="one_title four_title">牙套进度</view>
        <!-- <view class="color_green" @tap="bracesTap">补发牙套</view> -->
      </view>
      <view class="four_footer">
        <view class="box-list02">
          <view class="canvasBox">
            <view class="bigCircle"></view>
            <view class="littleCircle"></view>
            <canvas
              canvas-id="runUpCanvas"
              id="runUpCanvas"
              class="canvas"
            ></canvas>
          </view>
          <view class="bigCircle-text">上牙</view>
        </view>
        <view class="box-list02">
          <view class="canvasBox">
            <view class="bigCircle"></view>
            <view class="littleCircle"></view>
            <canvas
              canvas-id="runDownCanvas"
              id="runDownCanvas"
              class="canvas"
            ></canvas>
          </view>
          <view class="bigCircle-text">下牙</view>
        </view>
      </view>
    </view>
    <!-- 6 病例进度-->
    <view class="six_flr" v-if="options.length > 0">
      <view class="title">
        <view class="title_01">病例进度</view>
      </view>
      <view class="box mt-20 clearfix">
        <view
          v-for="(item, index) in options"
          :key="index"
          class="time-list"
          :class="
            index == 0 ? 'first' : flowindex == 0 && index > 2 ? 'tui-hide' : ''
          "
        >
          <view class="node-icon"></view>
          <view class="shijian">{{ item.AddTime }}</view>
          <view class="txt">{{ item.Content }}</view>
        </view>
        <view class="click" v-if="options.length > 3" :data-index="flowindex" @click="tap_showflow"
          >{{ flowshowinfo }}
          <image
            src="../../static/images/index/case/pic08.png"
            class="arrow"
          ></image>
        </view>
      </view>
    </view>
    <!-- 其它 -->
    <iv-modal :show="contactModal" @cancel="hideModal" :custom="true">
      <view class="tui-modal-custom">
        <view class="xz-custom-text">{{ contactPhone }}</view>
        <iv-button type="green" shape="circle" @click="dialClick(contactPhone)"
          >拨号</iv-button
        >
      </view>
    </iv-modal>
    <!-- 补发牙套提示 -->
    <iv-modal :show="bracesModal" @cancel="bracesHide" :custom="true">
      <view class="tui-modal-custom">
        <view class="xz-custom-text">请前往PC端修正正畸服务平台继续操作！</view>
      </view>
    </iv-modal>
  </view>
</template>
<script>
import ivSteps from "@/components/uni-steps/uni-steps.vue";
import ivModal from "@/components/modal/modal";
import ivButton from "@/components/button/button";
import ivNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";

const util = require("@/utils/util.js");
const canvas = require("@/utils/canvas.js");
const canvas2 = require("@/utils/canvas2.js");
export default {
  components: { ivSteps, ivModal, ivButton, ivNavBar },
  data() {
    return {
      // 基本信息
      contactModal: false, //modal弹窗
      contactPhone: "", //患者电话
      casecode: "", //案例编号
      bracesModal: false, //消息提示框
      // 患者基本信息
      caseList: {},
      oneName: "", //第一个文字
      // 复诊信息
      reviewList: [],
      // 进度条
      percents: "68",
      // 牙套进度
      facingproduce: {
        upsum: "", //上牙已发
        upall: "", //上牙全部
        downsum: "", //下牙已发
        downall: "" //下牙全部
      },
      heightBraces:true,
      bracesNum: 0, //判断牙套数值
      // 病例进度
      options: [],
      flowindex: "",
      flowshowinfo: "",
      // 初诊方案
      firstList: [], //方案列表
      casescheme: "", //治疗方案
      // 按钮,
      button: [
        {
          text: "确定",
          type: "green"
        }
      ]
    };
  },

  mounted() {
    this.getData(); //获取数据
    this.bracesClick(); //获取 牙套进度
    this.caseProcess(); //获取病例进度
    this.reviewChange(); //复查进度
    this.firstChange(); //初诊方案
    this.treatmentChange(); //治疗方案
  },
  onShow() {
    uni.removeStorage({
      key: "currentTab",
      success: function(res) {
        console.log("currentTab");
      }
    });
  },
  methods: {
    tap_showflow(e) {
      let _this = this;
      ;
      _this.flowindex = e.currentTarget.dataset.index == 1 ? 0 : 1;
      _this.flowshowinfo =
        e.currentTarget.dataset.index == 1
          ? "点击查看更多进度详情"
          : "点击收起更多进度详情";
    },
    //获取数据
    getData() {
      let _this = this;
      wx.showNavigationBarLoading();
      // #ifdef  APP-PLUS || H5
      uni.getStorage({
        key: "casecode",
        success: function(res) {
          _this.casecode = res.data.casecode;
        }
      });

      uni.request({
        url: _this.tui.interfaceUrl() + "/api/Case/GetCaseBooks",
        data: { casecode: _this.casecode },
        header: { "content-type": "application/x-www-form-urlencoded" },
        method: "POST",
        success: res => {
          let data = res.data;
          if (data.status == "Success" && data != null && data != undefined) {
            _this.caseList = data.data.PatientsModel;
            _this.caseList.AddTime = util.dateFormat(
              _this.caseList.AddTime,
              "yyyy-MM-dd hh:mm"
            );
            _this.oneName = _this.caseList.PatientName.charAt(0);
            _this.caseList.CaseCode = data.data.CaseCode;
            _this.contactPhone = data.data.PatientsModel.PatientPhone;
          } else {
            _this.tui.toast("数据获取失败~");
            return false;
          }
        }
      });
      // #endif
      // #ifdef   MP-WEIXIN
      _this.casecode = wx.getStorageSync("casecode");
      wx.removeStorage({
        key: "imgcaes",
        success(res) {}
      });
      wx.removeStorage({
        key: "erwq",
        success(res) {}
      });
      wx.removeStorage({
        key: "twCase",
        success(res) {}
      });
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
            _this.caseList = data.data.PatientsModel;
            _this.caseList.AddTime = util.dateFormat(
              _this.caseList.AddTime,
              "yyyy-MM-dd hh:mm"
            );
            _this.oneName = _this.caseList.PatientName.charAt(0);
            _this.caseList.CaseCode = data.data.CaseCode;
            _this.contactPhone = data.data.PatientsModel.PatientPhone;
          }
        },
        complete(res) {
          wx.hideLoading();
          wx.hideNavigationBarLoading();
        }
      });

      // #endif
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
    // 关闭modal
    hideModal() {
      this.contactModal = false;
    },
    // 打开modal
    contactClick() {
      this.contactModal = true;
    },

    // 牙模进度
    bracesClick() {
      let _this = this;
      uni.request({
        url: _this.tui.interfaceUrl() + "/api/Case/GetFacingProduceNum",
        data: { casecode: _this.casecode },
        header: { "content-type": "application/x-www-form-urlencoded" },
        method: "POST",
        success: res => {
          let data = res.data;
          if (data.status == "Success") {
            _this.facingproduce = JSON.parse(data.data);
            if (_this.facingproduce.upsum > 0) {
              _this.bracesNum = 1;
              canvas.default.options.draw(
                "runUpCanvas",
                _this.facingproduce.upsum,
                _this.facingproduce.upall,
                util.getPercent(
                  _this.facingproduce.upsum,
                  _this.facingproduce.upall,
                  false
                ),
                1000
              );
            }else{
              _this.heightBraces=false;

            }
            if (_this.facingproduce.downsum > 0) {
              _this.bracesNum = 1;
              canvas2.default.options.draw1(
                "runDownCanvas",
                _this.facingproduce.downsum,
                _this.facingproduce.downall,
                util.getPercent(
                  _this.facingproduce.downsum,
                  _this.facingproduce.downall,
                  false
                ),
                1000
              );
            }else{
              _this.heightBraces=false;

            }
          }
        }
      });
    },
    // 病例进度
    caseProcess() {
      let _this = this;
      uni.request({
        url: _this.tui.interfaceUrl() + "/api/Case/GetCaseFlow",
        data: { casecode: _this.casecode },
        header: { "content-type": "application/x-www-form-urlencoded" },
        method: "POST",
        success: res => {
          let data = res.data;
          if (data.status == "Success") {
            _this.options = [...data.data];
            for (let item of _this.options) {
              item.AddTime = util.dateFormat(item.AddTime, "yyyy-MM-dd hh:mm");
            }
          }
        }
      });
    },
    // 复查进度
    reviewChange() {
      let _this = this;
      uni.request({
        url: _this.tui.interfaceUrl() + "/api/Case/GetCaseBooksdetailList",
        data: { casecode: _this.casecode },
        header: { "content-type": "application/x-www-form-urlencoded" },
        method: "POST",
        success: res => {
          let data = res.data;
          if (data.status == "Success") {
            if ((data = {})) {
              return false;
            } else {
              _this.reviewList = [...data.data];
              for (let item of _this.reviewList) {
                item.AddTime = util.dateFormat(
                  item.AddTime,
                  "yyyy-MM-dd hh:mm"
                );
              }
            }
          }
        }
      });
    },
    // 初诊记录
    firstChange() {
      let _this = this;
      uni.request({
        url: _this.tui.interfaceUrl() + "/api/Case/GetFirstCaseBookList",
        data: { casecode: _this.casecode },
        header: { "content-type": "application/x-www-form-urlencoded" },
        method: "POST",
        success: res => {
          let data = res.data;
          if (data.status == "Success") {
            if ((data = {})) {
              return false;
            }
            _this.firstList = [...data.data];
            for (let item of _this.firstList) {
              item.AddTime = util.dateFormat(item.AddTime, "yyyy-MM-dd hh:mm");
            }
          }
        }
      });
    },
    // 获取治疗方案
    treatmentChange() {
      let _this = this;
      uni.getStorage({
        key: "casecode",
        success: function(res) {
          _this.casecode = res.data;
          console.log(res.data);
        }
      });
      uni.request({
        url: _this.tui.interfaceUrl() + "/api/Case/GetCaseScheme",   
        data: { casecode: _this.casecode },
        header: { "content-type": "application/x-www-form-urlencoded" },
        method: "POST",
        success: res => {
          let data = res.data;

          if (data.status == "Success" ) {
            _this.casescheme = data.message;
          }
        }
      });
    },
    // 用户基本信息
    infoTap() {
      uni.navigateTo({
        url: "addCase"
      });
    },
    // 用户牙齿修复信息
    radioTap() {
      wx.setStorageSync("twCase", 2);
      wx.setStorageSync("erwq", 1);
      uni.navigateTo({
        url: "dataCase"
      });
    },
    // 用户牙齿图片信息
    imgTap() {
      wx.setStorageSync("imgcaes", 1);
      uni.navigateTo({
        url: "imagesSee"
      });
    },
    schemeTap() {
      uni.setStorage({
        key: "currentTab",
        data: { currentTab: 0 },
        success: function() {}
      });
      uni.navigateTo({
        url: "treatment"
      });
    },
    treatmentTap() {
      uni.setStorage({
        key: "currentTab",
        data: { currentTab: 1 },
        success: function() {}
      });
      this.casecode = wx.getStorageSync("casecode");
       wx.setStorageSync("casecode", this.casecode);
      uni.navigateTo({
        url: "treatment"
      });
    },
    // 补发牙套
    bracesTap() {
      this.bracesModal = true;
      //   uni.navigateTo({
      //   url: "bracesList"
      // });
    },
    // 关闭消息提示
    bracesHide() {
      this.bracesModal = false;
    },
    //返回上一级
    backClick() {
      wx.reLaunch({
        url: "/pages/caseBox/index"
      });
    }
  }
};
</script>
<style scoped>
page {
  background: #f5fafc !important;
}
.braces-box{
  height: 0;
}
.container {
  background-color: #f5fafc !important;
}
.one_flr {
  background: #fff;
  width: 90%;
  overflow: hidden;
  padding: 10px;
  position: relative;
  margin: 7px;
  border-radius: 4px;
}
.one_title {
  padding-left: 14px;
  float: left;
}
.one_title:before {
  content: "";
  position: absolute;
  left: 0px;
  top: 12px;
  bottom: auto;
  right: auto;
  height: 25px;
  width: 7px;
  background-color: #2ea8ab;
}
.one_heard {
  height: 50px;
  line-height: 50px;
  position: relative;
}
.one_footer:before {
  content: "";
  position: absolute;
  top: 60px;
  bottom: auto;
  right: auto;
  height: 1px;
  width: 90%;
  background-color: #8796a9;
}
.one_type {
  float: right;
  width: 33%;
}
.one_footer {
  height: 80px;
  line-height: 50px;
}
.one_footer .user_name {
  font-size: 16px;
  font-family: cursive;
  font-weight: 600;
  float: left;
  width: 40%;
}
.one_footer .add_time {
  float: right;
  width: 40%;
  font-size: 12px;
}
.des_box {
  height: 40px;
  line-height: 40px;
}
.user_sex {
  float: left;
  width: 50%;
  color: #8c8c8c;
}
.aseF {
  width: 50%;
  float: left;
}
.dse_list {
  position: relative;
}
.user_contact {
  float: left;
  width: 26%;
  background: #2ea8ab;
  border-radius: 12px;
  text-align: center;
  color: #fff;
  position: absolute;
  right: 13px;
  height: 36px;
  top: 4px;
  line-height: 36px;
}
/* 2 */
.tow_flr {
  background: #fff;
  margin: 7px;
  border-radius: 4px;
  padding-top: 10px;
}
.tow_flr .title {
  text-align: center;
  width: 38%;
  margin: 0 auto;
  height: 20px;
  line-height: 20px;
}
.tow_flr .title_01 {
  float: left;
  color: #2ea8ab;
  font-size: 16px;
  font-weight: 600;
  padding: 0 24px;
}
.tow_flr .icon_01 {
  color: #a5babb;
}
.tow_flr .icon_2 {
  width: 33%;
  float: left;
  text-align: center;
}
.xz-icon {
  width: 26%;
  height: 25px;
  padding: 10px;
}
.tow_flr .content {
  overflow: hidden;
  padding: 5px 0;
}
/* 3 */
.three_flr {
  background: #fff;
  padding: 16px 14px;
  margin: 7px;
  border-radius: 4px;
}
.three_flr .icon_3 {
  float: left;
  width: 44%;
  padding: 5px;
  height: 70px;
}
.three_flr .plum {
  background: #e9f0fa;
  border-radius: 12px;
  margin-right: 5px;
}
.three_flr .paleGreen {
  background: #e9f6ef;
  border-radius: 12px;
  margin-left: 5px;
}
.three_flr .text_fo {
  float: left;
  width: 55%;
  padding: 10px 0;
}
.three_flr .text_color1 {
  color: #4d86d7;
  font-weight: 600;
}
.three_flr .text_color2 {
  color: #59b583;
  font-weight: 600;
}
.three_flr .text_fub {
  font-size: 13px;
}
/* 4 */
.four_flr {
  background: #fff;
  margin: 7px;
  border-radius: 4px;
  padding: 15px;
}
.four_flr .color_green {
  float: right;
  width: 86px;
  text-align: center;
  background: #55c1c6;
  color: #fff;
  border-radius: 12px;
  height: 30px;
  line-height: 30px;
  margin-top: 10px;
}
.four_footer .progress {
  width: 50%;
  text-align: center;
}
/* 5 */
.five_flr {
  background: #fff;
  padding: 15px;
  margin: 7px;
  border-radius: 4px;
}
.five_flr .color_green {
  float: right;
  width: 86px;
  text-align: center;
  background: #55c1c6;
  color: #fff;
  border-radius: 12px;
  height: 30px;
  line-height: 30px;
  margin-top: 10px;
}
.five_footer {
  height: 80px;
  display: flex;
  align-items: center;
  overflow-y: hidden;
  flex-wrap: nowrap;
  width: 100%;
}
.five_footer .font_conter {
  white-space: nowrap;
  float: left;
  text-align: center;
  white-space: nowrap;
  padding: 4px 10px;
}
.font_conter .title {
  font-size: 18px;
  font-weight: 600;
}
.font_conter .time {
  font-size: 12px;
}
/* 6 */
.six_flr {
  background: #fff;
  margin: 7px;
  border-radius: 4px;
}
.six_flr .title {
  text-align: center;
  width: 50%;
  margin: 0 auto;
  height: 20px;
  line-height: 20px;
  padding-top: 10px;
}
.six_flr .icon_01 {
  color: #a5babb;
}
.six_flr .title_01 {
  float: left;
  color: #2ea8ab;
  font-size: 20px;
  font-weight: 600;
  padding: 0 24px;
}
/* 名字首字符 */
.cu-avatar {
  font-variant: small-caps;
  margin: 0;
  padding: 0;
  display: -webkit-inline-box;
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
  text-align: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: #9cb4b5;
  color: #ffffff;
  white-space: nowrap;
  position: relative;
  width: 25px;
  height: 25px;
  background-size: cover;
  background-position: center;
  vertical-align: middle;
  font-size: 18px;
  border-radius: 50%;
  float: left;
  margin-top: 5px;
  margin-right: 5px;
}
/* 环形 */
/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
.qiun-charts3 {
  width: 750upx;
  height: 250upx;
  background-color: #ffffff;
  position: relative;
}

.charts3 {
  position: absolute;
  width: 250upx;
  height: 250upx;
  background-color: #ffffff;
}
/* 弹框modal */
.xz-custom-text {
  text-align: center;
  padding: 10px;
}
</style>
<style scoped>
/*加载进度*/

.canvasBox {
  width: 140rpx;
  height: 200rpx;
  border-radius: 80rpx;
  margin: 0 auto;
}
.bigCircle {
  width: 140rpx;
  height: 140rpx;
  border-radius: 50%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto auto;
  background-color: #e3e9f4;
}
.littleCircle {
  width: 134rpx;
  height: 134rpx;
  border-radius: 50%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 1rpx;
  right: 0;
  margin: auto auto;
  background-color: #fff;
}
.canvas {
  width: 160rpx;
  height: 160rpx;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto auto;
  z-index: 99;
}
.box-list02 {
  float: left;
  position: relative;
  margin-top: -20rpx;
  width: 50%;
}
.bigCircle-text {
  font-size: 16px;
  text-align: center;
}
/* 复查 */
.image01 {
  width: 60rpx;
  height: 60rpx;
  display: block;
  margin: 0 auto;
}

.box-list01 {
  width: 200rpx;
  float: left;
  margin-left: 26rpx;
  position: relative;
}

.box-list01 text {
  font-size: 28rpx;
  text-align: center;
  margin-top: 10rpx;
  display: block;
}

/* 案例进度 */

.time-list {
  position: relative;
  padding: 9px 0 0 15px;
  line-height: 20px;
  border-left: 1px solid #d9d9d9;
  color: #666;
  margin-left: 30rpx;
  padding-top: 0;
  height: auto;
  padding-bottom: 30rpx;
}

.shijian {
  margin-right: 20px;
  position: relative;
  top: -4px;
  display: inline-block;
  vertical-align: middle;
  font-size: 28rpx;
}

.txt {
  position: relative;
  top: -2px;
  font-size: 28rpx;
  margin-right: 20rpx;
}

.first {
  color: #1dc98f;
  padding-top: 0;
  border-left-color: #1dc98f;
}

.first .node-icon {
  position: absolute;
  left: -6px;
  /* top: 50%; */
  width: 11px;
  height: 11px;
  background: #1dc98f !important;
  border-radius: 50%;
}

.node-icon {
  position: absolute;
  left: -6px;
  /* top: 50%; */
  width: 11px;
  height: 11px;
  background: #d0d0d0;
  border-radius: 50%;
}

.mt-20 {
  margin-top: 20rpx !important;
}

.click {
  font-size: 24rpx;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.arrow {
  width: 34rpx;
  height: 34rpx;
  margin-left: 10rpx;
}

.tui-hide {
  display: none;
}
.example-body {
  height: 73px;
  position: relative;
  z-index: 11;
}
</style>
