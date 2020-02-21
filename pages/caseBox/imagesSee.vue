<template>
  <view class="container background-box">
    <view class="arr_box">
      <view class="tui-cell-class tui-list-cell tui-line-left margin">
        <view class="xz-title">牙颌模型</view>
        <view class="name-bottom" v-if="addImg != ''">
          <text :class="form.MouthDataType == '0' ? 'check' : ''"
            >口扫数据</text
          >
          <text :class="form.MouthDataType == '1' ? 'check' : ''"
            >牙模寄送</text
          >
        </view>
      </view>
      <view class="nav-third ">
        <view class="list">
          <view class="name">X光片</view>
          <view class="images">
            <view>
              <image src="../../static/images/caseBox/images.png" v-if="form.XaPath == ''"></image>
              <image
                :src="imgUrl + form.XaPath"
                wx:elif="casedetails.XaPath!=''"
                :data-presrc="imgUrl + form.XaPath"
                @tap="previewImg"
              ></image>
              <text class="title">全颌曲面断层X光片</text>
            </view>

            <view>
              <image src="../../static/images/caseBox/images.png" v-if="form.XbPath == ''"></image>
              <image
                :src="imgUrl + form.XbPath"
                wx:elif="casedetails.XbPath!=''"
                :data-presrc="imgUrl + form.XbPath"
                @tap="previewImg"
              ></image>
              <text class="title">头颅侧位X光片</text>
            </view>
          </view>
        </view>

        <view class="list">
          <view class="name">口内照片</view>
          <view class="images">
            <view>
              <image
                src="../../static/images/caseBox/images.png"
                v-if="form.MouthRightPath == ''"
              ></image>
              <image
                :src="imgUrl + form.MouthRightPath"
                v-elif="form.MouthRightPath != ''"
                :data-presrc="imgUrl + form.MouthRightPath"
                @tap="previewImg"
              ></image>
              <text class="title">前牙咬合</text>
            </view>
          </view>
          <view class="images">
            <view>
              <image
                src="../../static/images/caseBox/images.png"
                v-if="form.MouthUpPath == ''"
              ></image>
              <image
                :src="imgUrl + form.MouthUpPath"
                v-elif="form.MouthUpPath != ''"
                :data-presrc="imgUrl + form.MouthUpPath"
                @tap="previewImg"
              ></image>
              <text class="title">上牙列</text>
            </view>
            <view>
              <image
                src="../../static/images/caseBox/images.png"
                v-if="form.MouthDownPath == ''"
              ></image>
              <image
                :src="imgUrl + form.MouthDownPath"
                v-elif="form.MouthDownPath != ''"
                :data-presrc="imgUrl + form.MouthDownPath"
                @tap="previewImg"
              ></image>
              <text class="title">下牙列</text>
            </view>
          </view>
          <view class="images">
            <view>
              <image
                src="../../static/images/caseBox/images.png"
                v-if="form.MouthCenterPath == ''"
              ></image>
              <image
                :src="imgUrl + form.MouthCenterPath"
                v-elif="form.MouthCenterPath != ''"
                :data-presrc="imgUrl + form.MouthCenterPath"
                @tap="previewImg"
              ></image>
              <text class="title">左侧磨牙关系</text>
            </view>
            <view>
              <image
                src="../../static/images/caseBox/images.png"
                v-if="form.MouthLeftPath == ''"
              ></image>
              <image
                :src="imgUrl + form.MouthLeftPath"
                v-elif="form.MouthLeftPath != ''"
                :data-presrc="imgUrl + form.MouthLeftPath"
                @tap="previewImg"
              ></image>
              <text class="title">右侧磨牙关系</text>
            </view>
          </view>
        </view>

        <view class="list">
          <view class="name">面部照片</view>
          <view class="images">
            <view>
              <image
                src="../../static/images/caseBox/images.png"
                v-if="form.FacePath==''"
              ></image>
              <image
                :src="imgUrl + form.FacePath"
                 v-elif="form.FacePath!=''"
                :data-presrc="imgUrl + form.FacePath"
                @tap="previewImg"
              ></image>
              <text class="title">正面</text>
            </view>
            <view>
              <image
                src="../../static/images/caseBox/images.png"
                v-if="form.FaceSmilePath==''"
              ></image>
              <image
                :src="imgUrl + form.FaceSmilePath"
                v-elif="form.FaceSmilePath!=''"
                :data-presrc="imgUrl + form.FaceSmilePath"
                @tap="previewImg"
              ></image>
              <text class="title">正面微笑</text>
            </view>
          </view>
          <view class="images">
            <view>
              <image
                src="../../static/images/caseBox/images.png"
                v-if="form.FaceLeftPath==''"
              ></image>
              <image
                 :src="imgUrl + form.FaceLeftPath"
                v-elif="form.FaceLeftPath!=''"
                 :data-presrc="imgUrl + form.FaceLeftPath"
                @tap="previewImg"
              ></image>
              <text class="title">左侧面</text>
            </view>
            <view>
              <image
                src="../../static/images/caseBox/images.png"
                v-if="form.FaceRightPath==''"
              ></image>
              <image
                 :src="imgUrl + form.FaceRightPath"
                v-elif="form.FaceRightPath!=''"
                :data-presrc="imgUrl + form.FaceRightPath"
                @tap="previewImg"
              ></image>
              <text class="title">右侧面</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
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
      }
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
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
              _this.form.MouthDataType = data.data.MouthDataType;
              _this.form.MouthDataPath = data.data.MouthDataPath; //面右路径
              _this.form.MouthDataNumbers = data.data.MouthDataPath;
              _this.form.XaPath = data.data.XaPath;
              _this.form.XbPath = data.data.XbPath;
              _this.form.MouthUpPath = data.data.MouthUpPath;
              _this.form.MouthDownPath = data.data.MouthDownPath;
              _this.form.MouthLeftPath = data.data.MouthLeftPath;
              _this.form.MouthRightPath = data.data.MouthRightPath;
              _this.form.MouthCenterPath = data.data.MouthCenterPath;
              _this.form.FacePath = data.data.FacePath;
              _this.form.FaceSmilePath = data.data.FaceSmilePath;
              _this.form.FaceLeftPath = data.data.FaceLeftPath;
              _this.form.FaceRightPath = data.data.FaceRightPath;
            }
          }
        });
      }

      // #endif
    },
     // 预览图片
  previewImg(e) {
    let imgsrc = e.currentTarget.dataset.presrc;
    let _this = this;
    let preArr = [];
    preArr.push(imgsrc)
    wx.previewImage({
      current: imgsrc,
      urls: preArr
    })
  },
  }
};
</script>
<style scoped>
page {
  background: #ededed;
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
/*  */
.name-bottom {
  display: flex;
  margin-left: -20rpx;
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
.list {
  margin-bottom: 40rpx;
}

.name {
  font-size: 30rpx;
  margin-top: 10rpx;
  margin-left: 20rpx;
}
.images {
  display: flex;
  margin-top: 20rpx;
  margin-left: 25px;

}

.images image {
  display: block;
 width: 250rpx;
height: 180rpx;
  border-radius: 10rpx;
  margin: 0 auto;
}

.images view {
  margin-left: 40rpx;
}
.title {
  display: block;
  font-size: 24rpx;
  text-align: center;
  margin-top: 10rpx;
}
</style>
