<template>
  <view class="container">
     <tui-tabs
      :tabs="navbar"
      :currentTab="currentTab > 1 ? 0 : currentTab"
      @change="change"
      itemWidth="50%"
    ></tui-tabs>
       <view v-if="currentTab === 0">
    <view
      v-for="(item, index) in diagnoseList"
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
              <span class="" style="padding-left: 25px;">{{
                item.AddTime
              }}</span>
              <span
                class="fr"
                :class="
                  item.OrderStatusName == '新建' ? 'item-red' : 'item-green'
                "
                >{{ item.OrderStatusName }}</span
              >
            </view>
          </view>
          <view class="item-title item-color item-diter"
            ><span>性别&nbsp;{{ item.Sex == 0 ? "女" : "男" }}</span
            ><span style="padding-left: 20px;">年龄&nbsp;{{ item.Age }}岁</span>
          </view>
        </view>
      </view>
    </view>
       </view>
    <view v-if="currentTab === 1">
      <view
      v-for="(item, index) in formalList"
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
              <span class="" style="padding-left: 25px;">{{
                item.AddTime
              }}</span>
              <span
                class="fr"
                :class="
                  item.OrderStatusName == '新建' ? 'item-red' : 'item-green'
                "
                >{{ item.OrderStatusName }}</span
              >
            </view>
          </view>
          <view class="item-title item-color item-diter"
            ><span>性别&nbsp;{{ item.Sex == 0 ? "女" : "男" }}</span
            ><span style="padding-left: 20px;">年龄&nbsp;{{ item.Age }}岁</span>
          </view>
        </view>
      </view>
    </view>
    </view>
    <!--加载loadding-->
    <iv-loadmore :visible="loadding"></iv-loadmore>
    <iv-nomore :visible="!pullUpOn"></iv-nomore>
    <!--加载loadding-->
      <!-- 当页面没有数据时 -->
    	<iv-tips :fixed="false" v-if="tipList" imgUrl="/static/images/404/img_nodata.png">暂无数据</iv-tips>
    <!-- 当页面没有数据时 -->
  </view>
</template>
<script>
const util = require("@/utils/util.js");
import tuiTabs from "@/components/tui-tabs/tui-tabs";
import ivLoadmore from "@/components/loadmore/loadmore";
import ivNomore from "@/components/nomore/nomore";
import ivTips from "@/components/extend/tips/tips"
export default {
  components: {  ivLoadmore, ivNomore,ivTips,tuiTabs },
  data() {
    return {
      diagnoseList: [], //初诊数据
      formalList:[],//正式方案
      pageIndex: 1, //翻页次数
      oneName: "", //姓名第一个字
      loadding: false,
      pullUpOn: true,
      tipList:false,//暂无数据时展示
           //  tab参数
           currentTab: 0, //当前案例
      navbar: [
        {
          name: "初诊案例"
        },
        {
          name: "正式方案"
        }
      ]
    };
  },
  //页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function() {
    //延时为了看效果
    setTimeout(() => {
      this.diagnoseList = this.diagnoseList;
      this.pageIndex = 1;
      this.pullUpOn = true;
      this.loadding = false;
      uni.stopPullDownRefresh();
      this.tui.toast("刷新成功");
      this.loadList();
    }, 200);
  },
  // 页面上拉触底事件的处理函数
  onReachBottom: function() {
    if (!this.pullUpOn) return;
    this.loadding = true;
    if (this.pageIndex == this.PageCount) {
      this.loadding = false;

      this.pullUpOn = false;
    } else {
      this.diagnoseList = this.diagnoseList.concat(this.diagnoseList);
      this.pageIndex = this.pageIndex + 1;
      this.loadList();
    }
  },
  mounted() {
    this.loadList();
  },
  methods: {
        // tab切换
    change(e) {
      this.currentTab = e.index;
    },
    // 获取初诊列表
    loadList() {
      let _this = this;
      // #ifdef   MP-WEIXIN
      let _token = wx.getStorageSync("token");
      let headconfig = {
        "content-type": "application/x-www-form-urlencoded"
      };
      if (_token != "") {
        headconfig["token"] = _token;
                   wx.request({
        url: _this.tui.interfaceUrl() + "/api/Case/SearchFirstCaseBooksIngList",
        data: { pageIndex: _this.pageIndex,caseStatus:'WaitCheck' },
        header: headconfig,
        method: "POST",
        success: res => {
          let data = res.data;
          if (data.status == "Success") {
            _this.diagnoseList = [...data.data.Items[0]];
            _this.PageCount = data.data.TotalPages;
            for (let item of _this.diagnoseList) {
              item.AddTime = util.dateFormat(item.AddTime, "yyyy-MM-dd hh:mm");
              item.oneName = item.PatientName.charAt(0);
            }
            return false;
          } else {
            return false;
          }
        }
      });
                   wx.request({
        url: _this.tui.interfaceUrl() + "/api/Case/SearchFirstCaseBooksIngList",
        data: { pageIndex: _this.pageIndex,caseStatus:'PublishSchemed' },
        header: headconfig,
        method: "POST",
        success: res => {
          let data = res.data;
          if (data.status == "Success") {
            _this.formalList = [...data.data.Items[0]];
            _this.PageCount = data.data.TotalPages;
            for (let item of _this.formalList) {
              item.AddTime = util.dateFormat(item.AddTime, "yyyy-MM-dd hh:mm");
              item.oneName = item.PatientName.charAt(0);
            }
            return false;
          } else {
            return false;
          }
        }
      });
     
      }else{
         _this.tui.toast("请登录查看~");
        return false;
      }

      // #endif
    }
  }
};
</script>
<style scoped>
page {
  background-color: #f3f3f3 !important;
}
.container {
  background-color: #f3f3f3 !important;
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
</style>
