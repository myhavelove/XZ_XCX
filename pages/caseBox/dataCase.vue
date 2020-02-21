<template>
  <view class="container background-box">
    <form @submit="formDetails">
      <view class="arr_box">
        <view class="tui-cell-class tui-list-cell tui-line-left margin">
          <view class="xz-title">治疗范围</view>
          <view class="box_f">
             
            <iv-checkbox ref="scopeList"  v-if="addCase==''" @change="scopeChange"></iv-checkbox>
          </view>
             <view class="name-bottom" v-if="addCase!=''">
            <text :class="form.zhiliaofanwei == '全口' ? 'check' : ''"
              >全口</text
            >
            <text :class="form.zhiliaofanwei == '仅上颌' ? 'check' : ''"
              >仅上颌</text
            >
            <text :class="form.zhiliaofanwei == '仅下颌' ? 'check' : ''"
              >仅下颌</text
            >
          </view>
        </view>
        <view class="tui-cell-class tui-list-cell tui-line-left">
          <view class="xz-head-title">磨牙关系</view>
        </view>
        <view class="tui-cell-class tui-list-cell tui-line-left">
          <view class="or_box">
            <view class="xz-title">左侧</view>
            <view class="box_f">
              <iv-checkbox
                ref="molarLeftList"
                v-if="addCase==''"
                @change="molarLeftChange"
              ></iv-checkbox>
            </view>
            <view class="name-bottom" v-if="addCase!=''">
              <text :class="form.moyaguanxileft == '正常' ? 'check' : ''"
                >正常</text
              >
              <text :class="form.moyaguanxileft == 'I类' ? 'check' : ''"
                >I类</text
              >
              <text :class="form.moyaguanxileft == 'II类' ? 'check' : ''"
                >II类</text
              >
              <text :class="form.moyaguanxileft == 'III类' ? 'check' : ''"
                >III类</text
              >
            </view>
            
            <view class="xz-title xz-fub">治疗方式</view>
            <view  class="box_f">
               <iv-checkbox
                ref="molarLeftRelationList"
              v-if="addCase==''"
                @change="molarLeftRelationChange"
              ></iv-checkbox>
            </view>
            <view class="name-bottom" v-if="addCase!=''">
              <text :class="form.zhiliaofangshileft == '保持磨牙关系' ? 'check' : ''"
                >保持磨牙关系</text
              >
              <text :class="form.zhiliaofangshileft == '纠正磨牙关系' ? 'check' : ''"
                >纠正磨牙关系</text
              >
            </view>
          </view>
        </view>
        <view class="tui-cell-class tui-list-cell tui-line-left margin">
          <view class="or_box">
            <view class="xz-title">右侧</view>
            <view class="box_f">
              <iv-checkbox
                ref="molarRightList"
                @change="molarRightChange"
              v-if="addCase==''"
              ></iv-checkbox>
            </view>
              <view class="name-bottom" v-if="addCase!=''">
              <text :class="form.moyaguanxiright == '正常' ? 'check' : ''"
                >正常</text
              >
              <text :class="form.moyaguanxiright == 'I类' ? 'check' : ''"
                >I类</text
              >
              <text :class="form.moyaguanxiright == 'II类' ? 'check' : ''"
                >II类</text
              >
              <text :class="form.moyaguanxiright == 'III类' ? 'check' : ''"
                >III类</text
              >
            </view>
            <view class="xz-title xz-fub">治疗方式</view>
            <view  class="box_f">
              <iv-checkbox
                ref="molarRightRelationList"
              v-if="addCase==''"
                @change="molarRightRelationChange"
              ></iv-checkbox>
            </view>
            <view class="name-bottom" v-if="addCase!=''">
              <text :class="form.zhiliaofangshiright == '保持磨牙关系' ? 'check' : ''"
                >保持磨牙关系</text
              >
              <text :class="form.zhiliaofangshiright == '纠正磨牙关系' ? 'check' : ''"
                >纠正磨牙关系</text
              >
            </view>
          </view>
        </view>
        <view class="tui-cell-class tui-list-cell tui-line-left">
          <view class="xz-head-title">面型</view>
        </view>
        <view class="tui-cell-class tui-list-cell tui-line-left">
          <view class="or_box">
            <view class="xz-title">左侧</view>
            <view class="box_f">
              <iv-checkbox
                ref="featureLeftList"
                @change="faceLeftChange"
              v-if="addCase==''"
              ></iv-checkbox>
            </view>
               <view class="name-bottom" v-if="addCase!=''">
              <text :class="form.mianxingtop == '正常' ? 'check' : ''"
                >正常</text
              >
              <text :class="form.mianxingtop == '上颌前突' ? 'check' : ''"
                >上颌前突</text
              >
              <text :class="form.mianxingtop == '上颌后缩' ? 'check' : ''"
                >上颌后缩</text
              >
            </view>
            <view class="xz-title xz-fub">治疗方式</view>
            <view  class="box_f">
              <iv-checkbox
                ref="faceLeftRelationList"
              v-if="addCase==''"
                @change="faceLeftRelationChange"
              ></iv-checkbox>
            </view>
             <view class="name-bottom" v-if="addCase!=''">
              <text :class="form.zhiliaotop == '维持' ? 'check' : ''">维持</text>
              <text :class="form.zhiliaotop == '改善' ? 'check' : ''">改善</text>
            </view>
          </view>
        </view>
        <view class="tui-cell-class tui-list-cell tui-line-left ">
          <view class="or_box">
            <view class="xz-title">右侧</view>
            <view class="box_f">
              <iv-checkbox
                ref="featureRightList"
              v-if="addCase==''"
                @change="faceRightChange"
              ></iv-checkbox>
            </view>
              <view class="name-bottom" v-if="addCase!=''">
              <text :class="form.mianxingdown == '正常' ? 'check' : ''"
                >正常</text
              >
              <text :class="form.mianxingdown == '下颌前突' ? 'check' : ''"
                >下颌前突</text
              >
              <text :class="form.mianxingdown == '下颌后缩' ? 'check' : ''"
                >下颌后缩</text
              >
            </view>
            <view class="xz-title xz-fub">治疗方式</view>
            <view  class="box_f">
              <iv-checkbox
              v-if="addCase==''"
                ref="faceRightRelationList"
                @change="faceRightRelationChange"
              ></iv-checkbox>
            </view>
              <view class="name-bottom" v-if="addCase!=''">
              <text :class="form.zhiliaodown == '维持' ? 'check' : ''">维持</text>
              <text :class="form.zhiliaodown == '改善' ? 'check' : ''">改善</text>
            </view>
          </view>
        </view>
        <view class="tui-cell-class tui-list-cell tui-line-left margin">
          <view class="uni-textarea">
            <textarea
              v-if="addCase == ''"
              placeholder-style="color:#988f8f"
              v-model="form.zhiliaoremark"
              placeholder="医生矫正计划\目标\备注说明"
            />
            <textarea
              v-if="addCase != ''"
              disabled
              placeholder-style="color:#988f8f"
              v-model="form.zhiliaoremark"
              placeholder="医生矫正计划\目标\备注说明"
            />
          </view>
        </view>
      </view>
      <view class="tui-btn-box" v-if="addCase == ''">
        <button
          class="btn-primary xz-green btn-class"
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
          @tap="nextSteps"
          :disabled="nextBtn"
        >
          下一步
        </button>
      </view>
    </form>
    <iv-modal
      :show="quitModal"
      @click="quitModal = false"
      @cancel="quitModal == false"
      content="详情请在PC端进行操作~"
      :button="button"
    ></iv-modal>
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
import ivModal from "@/components/modal/modal";
import ivNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
export default {
  components: {
    ivCheckbox,
    ivModal,
    ivNavBar
  },
  data() {
    return {
      // 表单信息
      form: {
        zhiliaofanwei: "", //治疗范围
        moyaguanxileft: "", //磨牙关系左
        moyaguanxiright: "", //磨牙关系右
        mianxingtop: "", //脸型左
        mianxingdown: "", //脸型右
        zhiliaofangshileft: "", //磨牙治疗左
        zhiliaofangshiright: "", //磨牙治疗右
        zhiliaotop: "", //脸型治疗左
        zhiliaodown: "", //脸型治疗右
        zhiliaoremark: "" //文本
      },
      patientCode: "", //code
      nextBtn: true, //按钮状态
      quitModal: false, //modal状态
      casecode: "", //code
      boubtModal: false,
      addCase: "",
      imglist: {
        MouthDataType: "",
        MouthDataPath: "",
        MouthDataNumbers: "",
        XaPath: "",
        XbPath: "",
        MouthUpPath: "",
        MouthDownPath: "",
        MouthLeftPath: "",
        MouthRightPath: "",
        MouthCenterPath: "",
        FacePath: "",
        FaceSmilePath: "",
        FaceLeftPath: "",
        FaceRightPath: ""
      },
      // 按钮
      button: [
        {
          text: "确定",
          type: "green"
        }
      ]
    };
  },
  mounted() {
    this.getCode();
    // 治疗范围
    this.$refs.scopeList.set({
      type: "radio", // 类型：单选框
      index: this.form.zhiliaofanwei, //获取选中的
      list: [
        // 列表数据
        { text: "全口" },
        { text: "仅上颌" },
        { text: "仅下颌" }
      ]
    });
    this.$refs.molarLeftRelationList.set({
      type:"radio",
       index: this.form.zhiliaofangshileft, //获取选中的
      list: [
        // 列表数据
        { text: "保持磨牙关系" },
        { text: "纠正磨牙关系" }
      ]
    })
      this.$refs.molarRightRelationList.set({
      type:"radio",
       index: this.form.zhiliaofangshiright, //获取选中的
      list: [
        // 列表数据
        { text: "保持磨牙关系" },
        { text: "纠正磨牙关系" }
      ]
    })
    // 磨牙关系
    this.$refs.molarLeftList.set({
      type: "radio", // 类型：单选框
      index: this.form.moyaguanxileft, //获取选中的
      list: [
        // 列表数据
        { text: "正常" },
        { text: "I类" },
        { text: "II类" },
        { text: "III类" }
      ]
    });
          this.$refs.faceLeftRelationList.set({
      type:"radio",
       index: this.form.zhiliaotop, //获取选中的
      list: [
        // 列表数据
        { text: "维持" },
        { text: "改善" }
      ]
    })
    this.$refs.molarRightList.set({
      type: "radio", // 类型：单选框
      index: this.form.moyaguanxiright, //获取选中的
      list: [
        // 列表数据
        { text: "正常" },
        { text: "I类" },
        { text: "II类" },
        { text: "III类" }
      ]
    });
    // 脸型
    this.$refs.featureLeftList.set({
      type: "radio", // 类型：单选框
      index: this.form.mianxingtop, //获取选中的
      list: [
        // 列表数据
        { text: "正常" },
        { text: "上颌前突" },
        { text: "上颌后缩" }
      ]
    });
              this.$refs.faceRightRelationList.set({
      type:"radio",
       index: this.form.zhiliaodown, //获取选中的
      list: [
        // 列表数据
        { text: "维持" },
        { text: "改善" }
      ]
    })
    this.$refs.featureRightList.set({
      type: "radio", // 类型：单选框
      index: this.form.mianxingdown, //获取选中的
      list: [
        // 列表数据
        { text: "正常" },
        { text: "下颌前突" },
        { text: "下颌收缩" }
      ]
    });
  },
  methods: {
    // 下一步
    nextSteps() {
      uni.navigateTo({
        url: "imageCase"
      });
    },
    // 获取数据
    // 治疗范围
    scopeChange() {
      let data = this.$refs.scopeList.get(); // 组件返回的数据
      this.form.zhiliaofanwei = data.text;
    },
    // 磨牙关系左
    molarLeftChange() {
      let data = this.$refs.molarLeftList.get(); // 组件返回的数据
      this.form.moyaguanxileft = data.text;
    },
    // 磨牙关系右
    molarRightChange() {
      let data = this.$refs.molarRightList.get(); // 组件返回的数据
      this.form.moyaguanxiright = data.text;
    },
    // 面型 左
    faceLeftChange() {
      let data = this.$refs.featureLeftList.get(); // 组件返回的数据
      this.form.mianxingtop = data.text;
    },
    // 面型 右
    faceRightChange() {
      let data = this.$refs.featureRightList.get(); // 组件返回的数据
      this.form.mianxingdown = data.text;
    },
    // 磨牙关系 治疗关系左
    molarLeftRelationChange() {
        let data = this.$refs.molarLeftRelationList.get();
      this.form.zhiliaofangshileft = data.text;
    },
    // 磨牙关系 治疗关系右
    molarRightRelationChange() {
        let data = this.$refs.molarRightRelationList.get();
      this.form.zhiliaofangshiright = data.text;
    },
    // 面型 治疗左
    faceLeftRelationChange() {
        let data = this.$refs.faceLeftRelationList.get();
      this.form.zhiliaotop =data.text;
    },
    // 面型 治疗右
    faceRightRelationChange() {
        let data = this.$refs.faceRightRelationList.get();
      this.form.zhiliaodown = data.text;
    },
    // 获取信息
    getCode() {
      // #ifdef   MP-WEIXIN

      this.addcase = wx.getStorageSync("addCase");
      // #endif
      this.getData();
    },
    // 点击加载
    loadClick() {
      this.quitModal = true;
    },
    // 保存数据
    formDetails() {
      let _this = this;
      let postData = JSON.stringify(_this.form);
      let postImg = JSON.stringify(_this.imglist);
      if(_this.form.zhiliaoremark==''){
        _this.tui.toast("医生矫正计划\目标\备注说明");
        return;
      }
      // #ifdef  APP-PLUS || H5

      uni.getStorage({
        key: "patientcode",
        success: function(res) {
          _this.patientCode = res.data.patientcode;
          console.log(_this.patientCode);
        }
      });
      uni.request({
        url: _this.tui.interfaceUrl() + "/api/Case/SaveCaseBook",
        data: {
          patientCode: _this.patientCode,
          jsonradio: postData,
          casecode: "",
          imglist: postImg
        },
        header: { "content-type": "application/x-www-form-urlencoded" },
        method: "POST",
        success: res => {
          let data = res.data;

          if (data.status == "Success") {
            _this.tui.toast("保存成功~");
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
      _this.patientCode = wx.getStorageSync("patientcode");
      _this.casecode = wx.getStorageSync("casecode");
      let _token = wx.getStorageSync("token");
      let headconfig = {
        "content-type": "application/x-www-form-urlencoded"
      };
      if (_token != "") {
        headconfig["token"] = _token;
      }
      wx.request({
        url: _this.tui.interfaceUrl() + "/api/Case/SaveCaseBook",
        data: {
          patientCode: _this.patientCode,
          jsonradio: postData,
          casecode: _this.casecode,
          imglist: postImg,
          zhiliaoremark:_this.form.zhiliaoremark
        },
        header: headconfig,
        method: "POST",
        success: res => {
          let data = res.data;

          if (data.status == "Success") {
            _this.tui.toast("保存成功~");
            wx.setStorageSync("casecode", data.data);
            wx.setStorageSync("imgPrtt", 2);
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
    // 获取信息
    getData() {
      let _this = this;
      // #ifdef  APP-PLUS || H5
      uni.getStorage({
        key: "casecode",
        success: function(res) {
          _this.casecode = res.data.CaseCode;
        }
      });
      if (_this.casecode != "" && _this.casecode != null) {
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
              _this.form = eval("(" + res.data.data.JsonRadio + ")");
            }
          }
        });
        return false;
      }
      // #endif
      // #ifdef   MP-WEIXIN

      _this.casecode = wx.getStorageSync("casecode");
      let twCase = wx.getStorageSync("twCase");
      let twer =wx.getStorageSync("erwq");
      let _token = wx.getStorageSync("token");
      let headconfig = {
        "content-type": "application/x-www-form-urlencoded"
      };
      if (_token != "") {
        headconfig["token"] = _token;
      }
      if (twCase != "") {
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
              if(data.data.JsonRadio!='' && twer!=''){
                _this.form = JSON.parse(data.data.JsonRadio);
                _this.addCase=1;
              }else{
                 _this.form = JSON.parse(data.data.JsonRadio);
                 _this.addCase='';
              }

            }
          }
        });
      }

      // #endif
    },
    // 返回
    backClick() {
      // this.boubtModal=true;
      let pagelist = wx.getStorageSync("parameter");
      if (pagelist == 1) {
        wx.navigateBack({
          url: "/pages/index/pending/index"
        });
      } else {
        wx.navigateBack({
          url: "/pages/index/index"
        });
      }
    },
    handleClick(e) {
      let index = e.index;
      let pagelist = wx.getStorageSync("parameter");
      if (index === 0) {
        this.boubtModal = false;
      } else if (pagelist == 1) {
        wx.navigateBack({
          url: "/pages/index/pending/index"
        });
      } else {
        wx.navigateBack({
          url: "/pages/index/index"
        });
      }
    },
    hide() {
      this.boubtModal = false;
    },
    backClick2() {
      wx.reLaunch({
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
.background-box {
  background: #ededed;
}
uni-button,
.btn-class {
  width: 46%;
  float: left;
  margin: 15px 5px;
}
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
  padding: 13px 15px;
  background: #fff;
}
.margin {
  margin-bottom: 10px;
}
.box_f {
  padding-top: 15px;
  padding-left: 10px;
}
.xz-head-title {
  padding-left: 10px;
  width: 100%;
}
.xz-head-title:before {
  content: "";
  position: absolute;
  left: 12px;
  top: 13px;
  bottom: auto;
  right: auto;
  height: 25px;
  width: 7px;
  background-color: #2ea8ab;
}
.or_box {
  width: 100%;
  color: #988f8f;
}
.xz-fub {
  padding-right: 10px;
  padding-bottom: 10px;
}
.radio-group {
  font-size: 14px;
}
.loading {
  text-align: center;
  width: 100%;
  color: #2ea8ab;
}
/* 按钮 */
.name-bottom {
  display: flex;
  margin-left: -20rpx;
  padding-bottom: 10px;
}

.name-bottom text {
  margin-left: 40rpx;
  padding: 8rpx 20rpx;
  border-radius: 10rpx;
  background: #dedede;
  color: #fff;
  font-size: 28rpx;
}
.check {
  background: #1dc98f !important;
}
.uni-textarea {
  border: 1px solid #ccc;
  width: 100%;
}
.tui-radio {
  margin-right: 10px;
  color: #333;
  font-size: 12px;
}
.xz-green {
  background: #2ea8ab !important;
  color: #fff;
}
.example-body {
  height: 73px;
}
</style>
