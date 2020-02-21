<template>
	<view class="container">
        		<iv-tips :fixed="false" imgUrl="/static/images/404/img_nodata.png">暂无数据</iv-tips>
	</view>
</template>

<script>
	import ivTips from "@/components/extend/tips/tips"
export default {
    components:{
        ivTips
    },
    data(){
        return{

        }
    }
}
</script>

<style scoped>
.tui-tips-box{
    position: relative;
    top: 58%;
    transform: translateY(-0%);
    min-height: 600px;
}
</style>
