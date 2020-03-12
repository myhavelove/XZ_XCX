<template>
  <view class="container">
       <view
      v-for="(item, index) in confirmList"
      :key="index"
      hover-class="hover"
      :hover-stay-time="150"
      class="list-box"
      @tap="handlerButton(item.CaseCode)"
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
          <view class="item-title item-color item-diter"
            ><span class="fl">{{ item.PatientName }}</span><span class="font-text" style="padding-left: 20px;">{{ item.Sex==0?"男":'女' }}</span
            ><span class="font-text" style="padding-left: 20px;">{{ item.Age }}岁</span>
            <span class=" item-green fr" >{{ item.CaseDevOrderStatusName }}</span>
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
import ivLoadmore from "@/components/loadmore/loadmore";
import ivNomore from "@/components/nomore/nomore";
import ivLoading from "@/components/loading/loading.vue";
import ivTips from "@/components/extend/tips/tips"

const util = require("@/utils/util.js");
export default {
  components: { ivLoadmore, ivNomore,ivLoading,ivTips},
      data() {
    return {
      confirmList: [], //完善案例
      pageNum: 1,
      loadding: false,
      pullUpOn: true,
      oneName: "", //用户姓名第一个文字
      PageCount:'',//总页数
      noDataImg:false,//是否加载
      tipList:false,//暂无数据时展示
      inputVal:"",//查询参数

    };
  },
  mounted() {
    this.loadList();
  },
     //页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function() {
    //延时为了看效果
    setTimeout(() => {
      
      this.pendingList = this.pendingList;
      this.pageNum = 1;
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
    if (this.pageNum == this.PageCount) {
      this.loadding = false;

      this.pullUpOn = false;
    } else {
      this.confirmList = this.confirmList;
      this.pageNum = this.pageNum + 1;
      this.loadList();
    }
  },
  methods: {
    //   获取待确认案例
      loadList(){
           let _this = this;
             wx.showNavigationBarLoading();
      // #ifdef  APP-PLUS || H5

       uni.removeStorage({
        key: "casecode",
        success: function(res) {
        }
      });

      uni.request({
        url: _this.tui.interfaceUrl() + "/api/Case/GetCaseBooksInintList",
        data: { pageIndex:_this.pageNum},
        header: { "content-type": "application/x-www-form-urlencoded" },
        method: "POST",
        success: res => {
          let data = res.data;
          if(data.status == "Success"){
          _this.confirmList=[...data.data.Items[0]];
            for (let item of _this.confirmList) {
              item.AddTime = util.dateFormat(item.AddTime, "yyyy-MM-dd hh:mm");
              item.oneName = item.PatientName.charAt(0);
            }
             if (data.data.Items[0].length == 0) {
              return false;
            }
            _this.PageCount = data.data.TotalPages;
            return false;

          }else {
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
          _this.inputVal=wx.getStorageSync('inputVal');
      if (_token != "") {
        headconfig["token"] = _token;
         wx.request({
        url: _this.tui.interfaceUrl() + "/api/Case/GetCaseBooksInintList",
        data: { pageIndex: _this.pageNum,    searchName: _this.inputVal},
        header: headconfig,
        method: "POST",
        success: res => {
          let data = res.data;
          if(data.status == "Success"){
            _this.confirmList=[...data.data.Items[0]];
            for (let item of _this.confirmList) {
              item.AddTime = util.dateFormat(item.AddTime, "yyyy-MM-dd hh:mm");
              item.oneName = item.PatientName.charAt(0);
            }
             if (data.data.Items[0].length == 0) {
              _this.tipList=true;

              return false;
            }
            _this.PageCount = data.data.TotalPages;
            return false;
          }else {
            return false;
          }

        },
            complete(res) {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
      }
      })
      }else{
         _this.tui.toast("请登录查看~");
        return false;
      }
     
      // #endif

      },
          // 案例列表
    handlerButton(id) {
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
      wx.setStorageSync("casecode", id);
      uni.navigateTo({
        url: "/pages/caseBox/checkDei"
      });
      // #endif
    },
  }
}
</script>
<style scoped>
page {
  background-color: #f3f3f3 !important;
}
.background-bj {
  background-color: #fff !important;
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
.item-red {
  color: red;
  font-weight: 600;
}
.item-green {
  color: green;
  font-weight: 600;
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
.item-one-flr{
  font-size: 16px;

}
.font-text{
  font-size: 12px;

}
</style>