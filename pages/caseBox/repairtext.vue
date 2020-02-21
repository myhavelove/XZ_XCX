<template>
  <view class="container">
    <view class="inforBox">
      <view class="one_flr margin">
        <view class="tui-cell-class tui-list-cell tui-line-left">
          <view class="xz-title">患者姓名</view>
          <input
            placeholder-class="phcolor"
            class="xz-input"
            name="userName"
            maxlength="50"
            disabled
            type="text"
            v-model="form.PatientName"
          />
        </view>
           <view class="tui-cell-class tui-list-cell tui-line-left">
          <view class="xz-title">诊所名称</view>
          <input
            placeholder-class="phcolor"
            class="xz-input"
            name="userName"
            maxlength="50"
            disabled
            type="text"
            v-model="form.CoopClinicName"
          />
        </view>
          <view class="tui-cell-class tui-list-cell tui-line-left">
          <view class="xz-title">修复编号</view>
          <input
            placeholder-class="phcolor"
            class="xz-input"
            name="userName"
            maxlength="50"
            disabled
            type="text"
            v-model="form.ImpCaseCode"
          />
        </view>
        
      </view>
      <!-- <view class="tow_flr">
        <view class="tui-list-cell tui-line-left">
          <view class="xz-title box-title">模型数据</view>
        </view>
        <view class="tui-list-cell tui-line-left">
          <view class="box-list" @click="distClick(index)" v-for="(item,index) in scanList" :key="index" >
            <view class="title">
              {{ item.title }}
            </view>
            <view class="dist">
              <view class="dist-title">详情</view>
              <image
                src="../../static/images/caseBox/icon_01.png"
                class="dist-img" 
              ></image>
            </view>
          </view>
        </view>
      </view> -->
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      form: {},
      ImpCaseCode:"",//修复案例编号
      nexNum:"",
      scanList: [
        { id: 0, title: "左咬颌" },
        {
          id: 1,
          title: "右咬颌"
        },
        {
          id: 2,
          title: "上颌"
        },
        {
          id: 3,
          title: "下颌"
        }
      ]
    };
  },
  mounted(){
    this.getData();//获取详情信息
  },
  methods:{
    // 查看详情
    distClick(e){
        let index = e;
    },
    getData(){
      let _this = this;
          uni.getStorage({
        key: "ImpCaseCode",
        success: function(res) {
          _this.ImpCaseCode = res.data.ImpCaseCode;
        }
      });
            uni.request({
        url: _this.tui.interfaceUrl() + "/api/Case/GetImpCaseBooksInfo",
        data: { ImpCaseCode: _this.ImpCaseCode },
        header: { "content-type": "application/x-www-form-urlencoded" },
        method: "POST",
        success: res => {
          let data = res.data;
          if (data.status == "Success") {
            _this.form=data.data;
            return false;
        }
        }
      });
    }
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
}
.tui-list-cell::before{
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
.box-title {
  width: 100%;
}
.xz-title {
  line-height: 32rpx;
  flex-shrink: 0;
  padding-right: 15px;
  padding: 10px;
  font-size: 16px;
  font-size: 18px;
  color: #000;
  font-weight: 600;
}
.inforBox {
}
.one_flr,
.tow_flr {
  background: #fff;
}
.xz-input {
     color: #666666;
    font-size: 16px;
    text-align: right;
    width: 100%;
}
.margin {
  margin-bottom: 10px;
}
.sex-class {
  width: 61px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  background: #def3f4;
  color: #39adb0;
  border-radius: 8px;
}

.box-list {
  float: left;
  width: 23%;
  margin-right: 10px;
  -moz-box-shadow: -1px 4px 6px #c1bfbf;
  -webkit-box-shadow: -1px 4px 6px #c1bfbf;
  box-shadow: -1px 4px 6px #c1bfbf;
  border-radius: 12px;
      height: 56px;
    padding-top: 10px;
    padding-left: 10px;
}
.dist-title {
  float: left;
  font-size: 16px;
  color: #c2c2c2;
}
.dist-img {
  width: 20px;
  height: 20px;
  float: left;
  padding: 4px 0px 0px 1px;
}
.dist {
  overflow: hidden;
  margin: 0 auto;
}
</style>
