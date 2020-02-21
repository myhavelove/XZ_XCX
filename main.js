import Vue from 'vue'
import App from './App'
import store from './store'

Vue.config.productionTip = false


const tui = {
	toast: function(text, duration, success) {
		uni.showToast({
			title: text,
			icon: success ? 'success' : 'none',
			duration: duration || 2000
		})
	},
	constNum: function() {
		const res = uni.getSystemInfoSync();
		return res.platform.toLocaleLowerCase() == "android" ? 300 : 0;
	},
	px:function(num){
		return uni.upx2px(num)+'px';
	},
	interfaceUrl: function() {
		//接口地址
		// return "http://192.168.0.120:8088";
		// 外网ip
		return "https://api.xiujizhijia.com";

	},
	imgUrl: function() {
		//接口地址
		// return "http://192.168.0.120";
		// 外网地址
		return "http://doc.xiujizhijia.com";
	},
	// 客服手机号
	serverPhone: function() {
		//接口地址
		return "4009696199";
	},
	
  /**
   * 显示成功提示框
   */
	showSuccess(msg, callback) {
		wx.showToast({
		  title: msg,
		  icon: 'loading',
		  success() {
			callback && (setTimeout(function() {
			  callback();
			}, 1500));
		  }
		});
	  },

}

Vue.prototype.tui = tui
Vue.prototype.$eventHub = Vue.prototype.$eventHub || new Vue()
Vue.prototype.$store = store
App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
