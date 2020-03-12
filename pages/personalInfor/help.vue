<template>
  <div class="container">
    		<scroll-view scroll-y class="page">
			<view class="cu-card">
				<view class="cu-item bg-img shadow-blur" :style="[{backgroundImage:'url('+item.img+')'}]" @tap="toChild" :data-url="item.url"
				 v-for="(item,index) in list" :key="index">
					<view class="cardTitle">
						{{item.title}}
					</view>
				</view>
			</view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
  </div>
</template>
<script>
import ivCard from "@/components/card/card";
export default {
  components: { ivCard },
  data() {
    return {
      list:[
        {
						title: '关于平台',
						img: 'http://doc.xiujizhijia.com/Content/new/images/sylb2244.jpg',
						url: 'platformHelp'
					},
					{
						title: '关于口扫',
						img: 'http://doc.xiujizhijia.com/Content/new/images/wdh2236.jpg',
						url: 'mouthHelp'
					},
      ]
    };
  },
  methods: {
    	toChild(e) {
				uni.navigateTo({
					url: e.currentTarget.dataset.url
				})
			},
  }
};
</script>
<style scoped>
.page {
		height: 100vh;
	}
  .cu-card {
    display: block;
    overflow: hidden;
}
  .cu-card>.cu-item.shadow-blur {
    overflow: initial;
}
.cu-card>.cu-item {
    display: block;
    background-color: #ffffff;
    overflow: hidden;
    border-radius: 5px;
    margin: 15px;
}
.bg-img {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
.cardTitle {
    color: #fff;
    padding: 45px 30px;
    font-size: 20px;
    font-weight: 300;
    -webkit-transform: skew(-10deg, 0deg);
    transform: skew(-10deg, 0deg);
    position: relative;
    text-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
}
.cardTitle::after {
    content: "";
    position: absolute;
    width: 70px;
    border-radius: 3px;
    height: 12px;
    background-color: #fff;
    display: block;
    bottom: 38px;
    left: 45px;
    -webkit-transform: skew(10deg, 0deg);
    transform: skew(10deg, 0deg);
    opacity: 0.1;
}
.cardTitle::before {
    content: "";
    position: absolute;
    width: 30px;
    height: 3px;
    border-radius: 10px;
    background-color: #fff;
    display: block;
    top: 30px;
    left: 25px;
    -webkit-transform: skew(10deg, 0deg);
    transform: skew(10deg, 0deg);
}
</style>