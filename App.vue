<script>
export default {
  onLaunch: function() {
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        console.log('onCheckForUpdate====', res)
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          console.log('res.hasUpdate====')
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                console.log('success====', res)
                // res: {errMsg: "showModal: ok", cancel: false, confirm: true}
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
            })
          })
        }
      })
    }
    //  else {
    //   wx.showModal({
    //     title: '提示',
    //     content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
    //   })
    // }
  },
  onShow: function() {
    console.log("App Show");
    wx.login({
      success: function(res) {
        console.log(res.code);
           let _token = wx.getStorageSync("token");
             wx.setStorageSync('openid', res.code);
      let headconfig = {
        "content-type": "application/x-www-form-urlencoded"
      };
      if (_token != "") {
        headconfig["token"] = _token;
      }
    //  let api_url="http://192.168.0.120:8088";
        let api_url="https://api.xiujizhijia.com";
         wx.request({
        url:  api_url+ "/api/Login/AuthLogin",
         data: {  code: res.code },
        header: headconfig,
        method: "POST",
         success: res => {
            let opid=wx.getStorageSync('openid');
           if(opid==''){
             wx.navigateTo({
            url: '/pages/login/login'
          }) 
           }
         }
         })
      }
    })
  },
  onHide: function() {
    console.log("App Hide");
  },
  autoUpdate:function(){
    console.log(new Date())
    var self=this
    // 获取小程序更新机制兼容
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      //1. 检查小程序是否有新版本发布
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          //2. 小程序有新版本，则静默下载新版本，做好更新准备
          updateManager.onUpdateReady(function () {
            console.log(new Date())
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) {
                  //3. 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                } else if (res.cancel) {
                  //如果需要强制更新，则给出二次弹窗，如果不需要，则这里的代码都可以删掉了
                  wx.showModal({
                    title: '温馨提示~',
                    content: '本次版本更新涉及到新的功能添加，旧版本无法正常访问的哦~',
                    success: function (res) {     
                      self.autoUpdate()
                      return;                 
                      //第二次提示后，强制更新                      
                      if (res.confirm) {
                        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                        updateManager.applyUpdate()
                      } else if (res.cancel) {
                        //重新回到版本更新提示
                        self.autoUpdate()
                      }
                    }
                  })
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
            })
          })
        }
      })
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  }
};
</script>

<style>
/*每个页面公共css */

@import "common/common.css";
@import "common/icon.css";
</style>
