<template>
  <view class="container">
    <view class="example-body">
      <iv-nav-bar
        color="white"
        background-color="#2ea8ab"
        title="案例中心"
        fixed="true"
      />
    </view>
    <!-- 底部菜单 -->
    <!-- 底部菜单 -->
    <tui-tabs
      :tabs="navbar"
      :currentTab="currentTab > 1 ? 0 : currentTab"
      @change="change"
      itemWidth="50%"
    ></tui-tabs>
    <view v-if="currentTab === 0">
      <view
        v-for="(item, index) in dataList"
        :key="index"
        hover-class="hover"
        :hover-stay-time="150"
        class="list-box"
        @tap="handlerButton(item.CaseCode,item.PatientCode,item.CaseDevOrderStatusName)"
      >
        <view class="list-item">
          <view class="cu-avatar">{{ item.oneName }}</view>
          <view class="item-box">
            <view class="item-title">
              <view class="item-one-flr fl">
                <span class="fl">{{ item.CaseCode }}</span>
              </view>
              <view class="item-tow-time fr">
                <span class="font-text" >{{
                  item.AddTime
                }}</span>
              </view>
            </view>
            <view class="item-title item-color item-diter">
              <span class="fl">{{ item.PatientName }}</span
              >&nbsp;<span style="padding-left: 20px;">{{ item.SexName }}</span
              ><span style="padding-left: 20px;">{{ item.Age }}岁</span>
              <span class="fr start_item">{{
                item.CaseDevOrderStatusName
              }}</span>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view v-if="currentTab === 1">
      <view
        v-for="(item, index) in repairList"
        :key="index"
        hover-class="hover"
        :hover-stay-time="150"
        class="list-box"
      >
        <view class="list-item">
          <view class="cu-avatar">{{ item.oneName }}</view>
          <view class="item-box">
            <view class="item-title">
              <view class="item-one-flr fl">
                <span class="fl">{{ item.PatientName }}</span>
              </view>
              <view class="item-tow-time fr">
                <span class="font-text" >{{
                  item.AddTime
                }}</span>
              </view>
            </view>
            <view class="item-title item-color item-diter"
              ><span>{{ item.CoopClinicName }}</span>
              <span class="fr start_item">{{
                item.PublishCheckStatusName
              }}</span>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!--加载loadding-->
    <iv-loadmore :visible="loadding"></iv-loadmore>
    <iv-nomore :visible="!pullUpOn"></iv-nomore>
    <!--加载loadding-->
    <!-- 暂无数据 -->
  </view>
</template>

<script>
import ivSwipeAction from "@/components/swipe-action/swipe-action";
import tuiTabs from "@/components/tui-tabs/tui-tabs";
import ivDrawer from "@/components/drawer/drawer";
import ivCheckBox from "@/components/uni-checkbox/axb-checkbox";
import ivLoadmore from "@/components/loadmore/loadmore";
import ivNomore from "@/components/nomore/nomore";
import ivNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
import ivTips from "@/components/extend/tips/tips";
const util = require("@/utils/util.js");
export default {
  components: {
    ivSwipeAction,
    tuiTabs,
    ivDrawer,
    ivCheckBox,
    ivLoadmore,
    ivNomore,
    ivNavBar,
    ivTips
  },
  data() {
    return {
      dataList: [], //案例列表
      AddTime: "", //创建时间
      oneName: "", //用户姓名第一个文字
      repairList: [],
      noDataImg: false,
      currentTab: 0, //当前案例
      inputVal: "",
      inputShowed: false, // 输入框是否显示
      pageNum: 1, //分页
      PageCountXF: "", //修复案例总页数
      PageCountZJ: "", //正畸案例总页数
      loadding: false,
      pullUpOn: true,
      // 加载更多
      loadingType: 0,

      //  tab参数
      navbar: [
        {
          name: "正畸案例"
        },
        {
          name: "修复案例"
        }
      ]
    };
  },
  onReady() {},
    onShow() {
    this.loadList(); //返回上一页刷新页面
  },
  mounted() {
    this.repairChange(); //修复案例
  },
  onBackPress() {
    return true;
  },
  //页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function() {
    //延时为了看效果
    setTimeout(() => {
      this.dataList = this.dataList;
      this.repairList = this.repairList;
      this.pageNum = 1;
      this.pullUpOn = true;
      this.loadding = false;
      uni.stopPullDownRefresh();
      this.tui.toast("刷新成功");
      if (this.currentTab == 1) {
        this.repairChange();
        return false;
      } else {
        uni.removeStorage({
          key: "inputVal",
          success: function(res) {}
        });
        this.inputVal = "";
        this.loadList();
        return false;
      }
    }, 200);
  },
  // 页面上拉触底事件的处理函数
  onReachBottom: function() {
    if (!this.pullUpOn) return;
    this.loadding = true;
    if (this.pageNum == this.PageCountZJ) {
      this.loadding = false;

      this.pullUpOn = false;
    } else {
      this.dataList = this.dataList.concat(this.dataList);
      this.repairList = this.repairList.concat(this.repairList);
      this.pageNum = this.pageNum + 1;
    }
  },
  methods: {
    //获取案例列表{}
    loadList() {
      let _this = this;
       wx.showNavigationBarLoading();
      let tabUni=wx.getStorageSync('currentTab');
        if(tabUni!=''){
          _this.currentTab=tabUni;
        }
      // #ifdef   MP-WEIXIN
             wx.removeStorage({
        key: "parameter",
        success(res) {}
      });
          wx.removeStorage({
        key: "imgPrtt",
        success(res) {
        }
      });
              wx.removeStorage({
        key: "twCase",
        success(res) {
        }
      });
         wx.removeStorage({
        key: "casecode",
        success(res) {
        }
      });
               wx.removeStorage({
        key: "patientcode",
        success(res) {
        }
      });
     
      let _token = wx.getStorageSync("token");
      let headconfig = {
        "content-type": "application/x-www-form-urlencoded"
      };
      if (_token != "") {
        headconfig["token"] = _token;
        wx.request({
        url: _this.tui.interfaceUrl() + "/api/Case/GetCaseBooksList",
        data: {
          pageIndex: _this.pageNum
        },
        header: headconfig,
        method: "POST",
        success: res => {
          let data = res.data;
          if (data.status == "Success") {
            _this.dataList = [...data.data.Items[0]];
            for (let item of _this.dataList) {
              item.AddTime = util.dateFormat(item.AddTime, "yyyy-MM-dd hh:mm");
              item.oneName = item.PatientName.charAt(0);
            }
            _this.PageCountZJ = data.data.TotalPages;
            return false;
          } else {
            return false;
          }
        },
         complete(res) {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
      }
      });
      }else{
         _this.tui.toast("请登录查看~");
        return false;
      }
      
      // #endif
    },
    // 获取修复案例
    repairChange() {
      let _this = this;
       wx.showNavigationBarLoading();
      // #ifdef  APP-PLUS || H5
      uni.request({
        url: _this.tui.interfaceUrl() + "/api/Case/GetImpCaseBookList",
        data: { pageIndex: _this.pageNum },
        header: { "content-type": "application/x-www-form-urlencoded" },
        method: "POST",
        success: res => {
          let data = res.data;

          if (data.status == "Success") {
            _this.repairList = [...data.data.Items[0]];
            for (let item of _this.repairList) {
              item.AddTime = util.dateFormat(item.AddTime, "yyyy-MM-dd hh:mm");
              item.oneName = item.PatientName.charAt(0);
              item.age = 24;
            }
            _this.PageCountXF = data.data.TotalPages;

            return false;
          } else {
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
            wx.request({
        url: _this.tui.interfaceUrl() + "/api/Case/GetImpCaseBookList",
        data: { pageIndex: _this.pageNum },
        header: headconfig,
        method: "POST",
        success: res => {
          let data = res.data;
          if (data.status == "Success") {
            _this.repairList = [...data.data.Items[0]];
            for (let item of _this.repairList) {
              item.AddTime = util.dateFormat(item.AddTime, "yyyy-MM-dd hh:mm");
              item.oneName = item.PatientName.charAt(0);
              item.age = 24;
            }
            _this.PageCountXF = data.data.TotalPages;

            return false;
          } else {
            return false;
          }
        },
         complete(res) {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
      }
      });
      }else{
         _this.tui.toast("请登录查看~");
        return false;
      }
  
      // #endif
    },
    // tab切换
    change(e) {
      this.currentTab = e.index;
    },
    // 案例列表
    handlerButton(id,pid,state) {
      // #ifdef  APP-PLUS || H5

      // 存储到本地
      uni.setStorage({
        key: "casecode",
        data: { casecode: id },
        success: function() {
          console.log("success");
        }
      });
      uni.navigateTo({
        url: "checkDei"
      });
      // #endif
      // #ifdef   MP-WEIXIN
      console.log(state);
      if(state=='新建'){
          wx.setStorageSync("casecode", id);
      wx.setStorageSync("patientcode", pid);
      wx.setStorageSync("twCase",  2);
      wx.setStorageSync("parameter", 1);
      if (id != null) {
        uni.navigateTo({
          url: "dataCase"
        });
        return false;
      }
      return false;
      }
      wx.setStorageSync("casecode", id);
      uni.navigateTo({
        url: "checkDei"
      });
      // #endif
    },
    // 修复案例
    repairButton(id) {
      // #ifdef  APP-PLUS || H5

      // 存储到本地
      wx.setStorageSync("ImpCaseCode", id);

      uni.navigateTo({
        url: "repairtext"
      });
      // #endif
      // #ifdef   MP-WEIXIN
      wx.setStorage({
        key: "ImpCaseCode",
        data: { ImpCaseCode: id },
        success: function() {
          console.log("success");
        }
      });
      uni.navigateTo({
        url: "repairtext"
      });
      // #endif
    }
  }
};
</script>

<style scoped>
page {
  background-color: #f3f3f3 !important;
}
.background-bj {
  background-color: #fff !important;
  position: absolute;
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: -50%;
  top: 25%;
}
.container {
  background-color: #f3f3f3 !important;
}
/* 底部菜单 */
.xz-mtop {
  padding-bottom: env(safe-area-inset-bottom);
  width: 100%;
}

.list-box {
  background: #fff;
  position: relative;
  overflow: hidden;
  margin-top: 10px;
}
.list-item {
  padding: 30upx 30upx;
  display: flex;
  align-items: item;
}

.item-img {
  height: 120upx;
  width: 120upx;
  margin-right: 20upx;
  display: block;
  border-radius: 50%;
}

.item-box {
  flex: 1;
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.item-title {
  font-size: 32upx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item-color {
  color: #707070;
}
.item-diter {
  font-size: 14px;
  padding-top: 10px;
}
.item-tow-time {
  color: #616e6e;
  font-size: 14px;
  width: 63%;
}
.item-time {
  color: #999;
  font-size: 24upx;
}
.start_item {
  display: block;
  width: 80px;
  border: 1px solid #1fc4d7;
  border-radius: 12px;
  text-align: center;
  background: #1fc4d7;
  color: #fff;
  font-weight: 600;
}
.item-red {
  color: green;
  font-weight: 600;
}
.item-green {
  color: green;
  font-weight: 600;
  font-size: 13px;

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
  margin-right: 10px;
}
.tui-swipeout-wrap {
  margin-top: 10px;
}
/* 加载更多 */
.loading-text {
  height: 80upx;
  line-height: 80upx;
  font-size: 30upx;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.example-body {
  height: 73px;
  position: relative;
z-index: 11;

}
.font-text{
  font-size: 12px;

}
</style>
