<template>
  <view class="container background-box">
    <!-- 影像信息 -->
    <view class="picture">
      <form @submit="formPicture">
        <view class="arr_box">
          <view class="tui-cell-class tui-list-cell tui-line-left margin type_name">
            <view class="xz-title">牙颌模型</view>
            <view class="box_f">
              <view class="text_div" @click="textClick">口扫数据</view>
              <iv-checkbox
                ref="modelList"
                v-if="addImg == ''"
                @change="valueChange"
              ></iv-checkbox>
            </view>
            <view class="name-bottom" v-if="addImg != ''">
              <text :class="form.MouthDataType == '0' ? 'check' : ''"
                >口扫数据</text
              >
              <text :class="form.MouthDataType == '1' ? 'check' : ''"
                >牙模寄送</text
              >
            </view>
          </view>
          <view class="tui-cell-class tui-list-cell tui-line-left margin img_box">
            <view class="box clearfix">
              <view
                class="box-list clearfix"
                v-for="(item, index) in imagelist"
                :key="index"
              >
                <view
                  class="content"
                  v-if="item.upFilesBtn"
                  
                  :data-index="item.index"
                >
                  <!-- <view class="bottom" :data-index="item.index">
                    <image
                      src="/static/images/caseBox/up.png"
                      class="up"
                      :data-index="item.index"
                    ></image>
                    <view :data-index="item.index">点击上传图片</view>
                  </view> -->
                  <iv-upload  @change="getImageInfo" :upimg_seat="item.index" :upimg_link='item.path==""|| item.path==imgUrl?item.imglink:item.path' :upload_auto="true"  ref="upimg1" :upload_count="1"></iv-upload >

                </view>

                <text class="name">{{ item.name }}</text>
              </view>
            </view>
          </view>
          <view class="tui-btn-box" v-if="addImg == ''">
            <button
              class="btn-primary xz-green btn-class "
              hover-class="btn-hover"
              formType="submit"
              type="primary"
            >
              保存
            </button>
            <button
              class="btn-primary xz-green btn-class "
              hover-class="btn-gray-hover"
              formType="reset"
              @tap="goCompany"
              :disabled="nextBtn"
            >
              提交到正畸中心
            </button>
          </view>
        </view>
      </form>
    </view>
    <iv-modal
      :show="quitModal"
      @click="butClick"
      :content="contentTitle"
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

    <iv-modal
      :show="expressModal"
      @cancel="expressHide"
      :custom="true"
      :fadein="true"
    >
      <view class="iv-modal-custom">
        <view class="express-title">快递单号</view>
        <input
          placeholder="请输入快递单号"
          class="tui-input"
          v-model="expressNumber"
        />
        <view class="express-address"
          >陕西省 西安市 雁塔区 电子城街道 科技路付6号 华凯大楼三楼 西三层<br />陈宇航
          18355159397</view
        >
        <iv-button
          class="express-btn"
          shape="circle"
          @click="saveSmall"
          size="small"
          >立即提交</iv-button
        >
      </view>
    </iv-modal>
  </view>
</template>
<script>
import ivCheckbox from "@/components/uni-checkbox/uni-checkbox.vue";
import ivModal from "@/components/modal/modal";
import ivNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
import ivButton from "@/components/button/button";
import ivIcon from "@/components/icon/icon";
import ivUpload from "@/components/tui-upload/sunui-upimg";
const upFiles = require("@/utils/upFiles.js");

export default {
  components: {
    ivCheckbox,
    ivModal,
    ivNavBar,
    ivButton,
    ivIcon,
    ivUpload
  },
  data() {
    return {
      imagelist: [
        {
          index: 0,
          name: "全颌曲面断层X光片",
          upFilesBtn: true,
          path: "",
          upFilesProgress: 0,
          imglink:'../../static/images/caseBox/a-01.jpg'
        },
        {
          index: 1,
          name: "头颅侧位X光片",
          upFilesBtn: true,
          path: "",
          upFilesProgress: 0,
            imglink:'../../static/images/caseBox/a-02.jpg'
        },
        {
          index: 2,
          name: "上牙列",
          upFilesBtn: true,
          path: "",
          upFilesProgress: 0,
            imglink:'../../static/images/caseBox/a-03.jpg'
        },
        {
          index: 3,
          name: "右侧磨牙关系",
          upFilesBtn: true,
          path: "",
          upFilesProgress: 0,
            imglink:'../../static/images/caseBox/a-04.jpg'
        },
        {
          index: 4,
          name: "前牙咬合",
          upFilesBtn: true,
          path: "",
          upFilesProgress: 0,
            imglink:'../../static/images/caseBox/a-05.jpg'
        },
        {
          index: 5,
          name: "左侧磨牙关系",
          upFilesBtn: true,
          path: "",
          upFilesProgress: 0,
            imglink:'../../static/images/caseBox/a-06.jpg'
        },
        {
          index: 6,
          name: "下牙列",
          upFilesBtn: true,
          path: "",
          upFilesProgress: 0,
            imglink:'../../static/images/caseBox/a-07.jpg'
        },
        {
          index: 7,
          name: "正面",
          upFilesBtn: true,
          path: "",
          upFilesProgress: 0,
            imglink:'../../static/images/caseBox/a-08.jpg'
        },
        {
          index: 8,
          name: "正面微笑",
          upFilesBtn: true,
          path: "",
          upFilesProgress: 0,
            imglink:'../../static/images/caseBox/a-09.jpg'
        },
        {
          index: 9,
          name: "左侧面",
          upFilesBtn: true,
          path: "",
          upFilesProgress: 0,
            imglink:'../../static/images/caseBox/a-10.jpg'
        },
        {
          index: 10,
          name: "右侧面",
          upFilesBtn: true,
          path: "",
          upFilesProgress: 0,
            imglink:'../../static/images/caseBox/a-11.jpg'
        }
      ],
      maxUploadLen: 1,
      imgUrl: this.tui.imgUrl(), //图片地址
      form: {
        MouthDataType: "", //面右路径
        MouthDataPath: "", //面右路径
        MouthDataNumbers: "", //口数据编号
        XaPath: "", //X光全颌图片
        XbPath: "", //X光头颅图片
        MouthUpPath: "", //上牙列
        MouthDownPath: "", //下牙列
        MouthLeftPath: "", //左侧磨牙关系
        MouthRightPath: "", //右侧磨牙关系
        MouthCenterPath: "", //前牙咬颌
        FacePath: "", //正面
        FaceSmilePath: "", //正面微笑
        FaceLeftPath: "", //面左路径
        FaceRightPath: "" //面右路径
      },
      expressModal: false, //寄送口扫数据
      expressNumber: "", //快递单号
      patientCode: "",
      casecode: "",
      quitModal: false,
      contentTitle: "", //消息内容
      nextBtn: true, //按钮状态
      addImg: "", //页面参数
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
    // 口扫数据
    this.$refs.modelList.set({
      type: "radio", // 类型：单选框
      list: [
        // 列表数据
       
        { text: "牙模寄送",value:1 }
      ]
    });
    this.getCode();
  },
  methods: {
    // 获取信息
    getCode() {
      // #ifdef  APP-PLUS || H5

      uni.getStorage({
        key: "casecode",
        success: function(res) {
          this.casecode = res.data.casecode;
        }
      });
      uni.getStorage({
        key: "PatientCode",
        success: function(res) {
          this.patientCode = res.data.PatientCode;
        }
      });
      // #endif
      // #ifdef   MP-WEIXIN
      this.casecode = wx.getStorageSync("casecode");
      this.patientCode = wx.getStorageSync("patientcode");
      // #endif

      this.getData();
    },
    // 获取数据
    getData() {
      let _this = this;
      // #ifdef   MP-WEIXIN
      _this.casecode = wx.getStorageSync("casecode");
      _this.addImg = wx.getStorageSync("imgcaes");
      let _token = wx.getStorageSync("token");
      let headconfig = {
        "content-type": "application/x-www-form-urlencoded"
      };
      if (_token != "") {
        headconfig["token"] = _token;
      }
      if (_this.casecode != undefined) {
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
              if(data.data.MouthDataType!=0){
                 _this.$refs.modelList.index= data.data.MouthDataType;
              }
                   


              _this.expressNumber=data.data.MouthDataNumbers;
              _this.imagelist[0].path =_this.imgUrl+ data.data.XaPath;
             _this.imagelist[1].path =_this.imgUrl+ data.data.XbPath;
             _this.imagelist[2].path = _this.imgUrl+data.data.MouthUpPath;
              _this.imagelist[3].path = _this.imgUrl+data.data.MouthDownPath;
              _this.imagelist[4].path = _this.imgUrl+data.data.MouthLeftPath;
              _this.imagelist[5].path = _this.imgUrl+data.data.MouthRightPath;
              _this.imagelist[6].path = _this.imgUrl+data.data.MouthCenterPath;
              _this.imagelist[7].path = _this.imgUrl+data.data.FacePath;
              _this.imagelist[8].path = _this.imgUrl+data.data.FaceSmilePath;
              _this.imagelist[9].path = _this.imgUrl+data.data.FaceLeftPath;
              _this.imagelist[10].path = _this.imgUrl+data.data.FaceRightPath;




               _this.form.XaPath = data.data.XaPath;
             _this.form.XbPath = data.data.XbPath;
             _this.form.MouthUpPath = data.data.MouthUpPath;
              _this.form.MouthDownPath= data.data.MouthDownPath;
              _this.form.MouthLeftPath =data.data.MouthLeftPath;
              _this.form.MouthRightPath = data.data.MouthRightPath;
              _this.form.MouthCenterPath =data.data.MouthCenterPath;
              _this.form.FacePath = data.data.FacePath;
              _this.form.FaceSmilePath = data.data.FaceSmilePath;
              _this.form.FaceLeftPath = data.data.FaceLeftPath;
              _this.form.FaceRightPath = data.data.FaceRightPath;
               _this.form.MouthDataType=data.data.MouthDataType;
            }
          }
        });
      }

      // #endif
    },
    // 提交到数据
    goCompany() {
      // this.quitModal = true;
      let _this = this;
      if(_this.form.XaPath==''){
           _this.tui.toast("请录入完患者图片再进行提交");
           return false;
      }else if(_this.form.XbPath==''){
           _this.tui.toast("请录入完患者图片再进行提交");
           return false;
      }else if(_this.form.MouthUpPath==''){
           _this.tui.toast("请录入完患者图片再进行提交");
           return false;
      }else if(_this.form.MouthDownPath==''){
           _this.tui.toast("请录入完患者图片再进行提交");
           return false;
      }else if(_this.form.MouthLeftPath==''){
           _this.tui.toast("请录入完患者图片再进行提交");
           return false;
      }else if(_this.form.MouthRightPath==''){
           _this.tui.toast("请录入完患者图片再进行提交");
           return false;
      }else if(_this.form.MouthCenterPath==''){
           _this.tui.toast("请录入完患者图片再进行提交");
           return false;
      }else if(_this.form.FacePath==''){
           _this.tui.toast("请录入完患者图片再进行提交");
           return false;
      }else if(_this.form.FaceSmilePath==''){
           _this.tui.toast("请录入完患者图片再进行提交");
           return false;
      }else if(_this.form.FaceLeftPath==''){
           _this.tui.toast("请录入完患者图片再进行提交");
           return false;
      }else if(_this.form.FaceRightPath==''){
           _this.tui.toast("请录入完患者图片再进行提交");
           return false;
      }
      let postData = JSON.stringify(_this.form);
      let MouthDataType=_this.form.MouthDataType;
      let _token = wx.getStorageSync("token");
      let headconfig = {
        "content-type": "application/x-www-form-urlencoded"
      };
      if (_token != "") {
        headconfig["token"] = _token;
      }
      wx.request({
        url: _this.tui.interfaceUrl() + "/api/Case/SubmitCaseBook",
        data: {
          patientCode: _this.patientcode,
          jsonradio: "",
          casecode: _this.casecode,
          imglist: postData,
          typeInt:3,
          MouthDataType:MouthDataType
        },
        header: headconfig,
        method: "POST",
        success: res => {
          let data = res.data;
          if (data.status == "Success") {
            _this.tui.toast(data);
            _this.contentTitle = data.data;
            _this.quitModal = true;
            return false;
          }else if(data.status == "Error"){
             _this.tui.toast(data.message);
             return false;
          }
        }
      });

      setTimeout(() => {
        uni.navigateTo({
          url: "../index/index"
        });
      }, 1500);
    },
    //牙合模型
    valueChange() {
      let data = this.$refs.modelList.get(); // 组件返回的数据
      this.form.MouthDataType = data.value;
      if (this.form.MouthDataType == 1) {
        this.expressModal = true;
        return false;
      }
    },
    //保存数据
    formPicture() {
      let _this = this;
          let postData = JSON.stringify(_this.form);
          // #ifdef   MP-WEIXIN
          _this.casecode = wx.getStorageSync("casecode");
          _this.patientcode = wx.getStorageSync("patientcode");
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
              patientCode: _this.patientcode,
              jsonradio: "",
              content: "",
              casecode: _this.casecode,
              imglist: postData,
              typeInt:3

            },
            header: headconfig,
            method: "POST",
            success: res => {
              let data = res.data;

              if (data.status == "Success") {
                _this.tui.toast("保存成功~");
                let data = _this.$refs.modelList.get(); // 组件返回的数据
                _this.form.MouthDataType = data.value;

                if (_this.form.MouthDataType == 1) {
                  _this.nextBtn = false;
                  return false;
                } else {
                  // _this.tui.toast("请前往PC端修正正畸服务平台继续操作! ");
                  _this.nextBtn = false;
                  return false;
                }

                return false;
              } else {
                _this.tui.toast("数据异常，稍后再试~");
                return false;
              }
            }
          });
          // #endif
    },

    // 返回
    backClick() {
      let imglist = wx.getStorageSync("imgPrtt");
      if (imglist == 2) {
        wx.reLaunch({
          url: "/pages/caseBox/dataCase"
        });
        return false;
      } else {
        wx.reLaunch({
          url: "checkDei"
        });
        return false;
      }
    },
    butClick() {
      wx.reLaunch({
        url: "/pages/index/index"
      });
    },
    // 牙模寄送
    saveSmall() {
      let _this = this;
     
      let _token = wx.getStorageSync("token");
      let headconfig = {
        "content-type": "application/x-www-form-urlencoded"
      };
      if (_token != "") {
        headconfig["token"] = _token;
      }
      if(_this.expressNumber==''){
        _this.tui.toast('请填写快递单号再进行提交~');
        return false;
      }
       _this.expressModal = false;
      wx.request({
        url: _this.tui.interfaceUrl() + "/api/Case/SaveCaseBookKouSao",
        data: {
          casecode: _this.casecode,
          mouthdatatype: 1,
          mouthdatanumbers: _this.expressNumber
        },
        header: headconfig,
        method: "POST",
        success: res => {
          let data = res.data;
          if ((data.status = "Success")) {
            _this.tui.toast(data.message);
          }
        }
      });
    },
    expressHide() {
      this.expressModal = false;
    },
    //验证上传图片
    validateimageupload: function() {
      //张图片必须全部上传
      let imageuploadcheck = true;
      this.imagelist.forEach(function(img, i) {
        console.log(this.imagelist);
        if (img.path == "") {
          imageuploadcheck = false;
        }
      });
      if (!imageuploadcheck) {
        wx.showToast({
          icon: "none",
          title: "图片上传不完整，请上传完整"
        });
        return imageuploadcheck;
      }
      return true;
    },
      //获取图片信息内容
    	getImageInfo(e) {
        let _this =this;
        let abc =e[0];
        if(abc!=undefined){
           let result =abc.split(",");
           if (result[1] == 0) {
              _this.form.XaPath = result[0];
            }
            if (result[1] == 1) {
              _this.form.XbPath =result[0];
            }

            if (result[1] == 2) {
              _this.form.MouthUpPath =result[0];
            }
            if (result[1] == 3) {
              _this.form.MouthRightPath = result[0];
            }
            if (result[1] == 4) {
              _this.form.MouthCenterPath =result[0];
            }
            if (result[1] == 5) {
              _this.form.MouthLeftPath = result[0];
            }
            if (result[1] == 6) {
              _this.form.MouthDownPath = result[0];
            }
            if (result[1] == 7) {
              _this.form.FacePath = result[0];
            }
            if (result[1] == 8) {
              _this.form.FaceSmilePath = result[0];
            }
            if (result[1] == 9) {
              _this.form.FaceLeftPath = result[0];
            }
            if (result[1] == 10) {
              _this.form.FaceRightPath =result[0];
            }
        }
       
       
			},
      // 点击口扫数据
      textClick(){
         this.tui.toast("手机端无法提交口扫数据");
      }


  }
};
</script>
<style scoped>
page {
  background: #ededed;
}
uni-button {
  width: 47%;
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
.text_div{
  float: left;
padding: 2px 5px;
border: 1px solid #dedede;
margin-right: 5px;

}
.box_f{
  margin-left: 20px;
margin-top: 10px;

}
/* 图片信息1 */
.type_name{
margin-left: 25px;
padding: 0 0 15px 0;
margin-bottom: -20px;

}
.img_box{
 margin-top: -22px;
 
}
.box {
  background: #fff;
  padding: 10rpx 0;
}
.box-list {
  width: 50%;
  float: left;
  margin-top: 30rpx;
}
.anli {
  width: 230rpx;
  height: 142rpx;
  display: block;
  margin: 0 auto;
}
.content {
  width: 260rpx;
  height: 260rpx;
  margin: 0 auto;
  display: flex;
  align-items: center;
  background: #f0f0f0;
  border-radius: 10rpx;
  position: relative;
}
.up {
  width: 120rpx;
  height: 120rpx;
  display: block;
  margin: 0 auto;
}
.anli01 {
  width: 168rpx;
  height: 182rpx;
  display: block;
  margin: 0 auto;
}
.bottom {
  width: 200rpx;
  text-align: center;
  position: absolute;
  top: 50rpx;
  left: 30rpx;
  font-size: 30rpx;
  color: #1dc98f;
}
.name {
  font-size: 30rpx;
  text-align: center;
  display: block;
  margin-top: 10rpx;
}
.bigbox {
  background: #fff;
}

/*  */
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
.xz-green {
  background: #2ea8ab !important;
  color: #fff;
}
uni-button,
.btn-class {
  width: 46%;
  float: left;
  margin: 15px 5px;
}
.example-body {
  height: 73px;
}
/* 寄送牙模 */
.iv-modal-custom {
  width: 100%;
  margin: 0 auto;
  text-align: center;
}
.express-title {
  text-align: center;
  font-size: 16px;
  padding: 5px 0;
}
.express-address {
  font-size: 14px;
  padding: 10px 0;
}
.delbtn {
  width: 50rpx;
  height: 50rpx;
  position: absolute;
  top: 10rpx;
  right: 10rpx;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 30rpx;
  text-align: center;
  line-height: 50rpx;
  z-index: 98;
}
</style>
