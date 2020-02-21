import Vue from 'vue'
import Vuex from 'vuex'
import fetch from '../common/request.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		login:false,//用户是否登录
		userInfo:{},//用于存放用户信息
	},
	mutations: {
		login(state, payload) {
				state.login =true;
				state.userInfo = payload;
				uni.setStorage({
					key:"userInfo",
					data:payload,
				})
				console.log(state.login)
		},
		logout(state) {
			state.login = false;
			state.userInfo = {};
			uni.removeStorage({
				key:"userInfo"
			})
		},
		setOpenid(state, openid) {
			state.openid = openid;
		},
	},
	
})

export default store
