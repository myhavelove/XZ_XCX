<template>
	<view class="radio" :class="{'radio-width-default':widthDefault}" :style="checked?activeStyle :itemStyle" @click="handleChange">
		{{name}}
	</view>
</template>

<script>
	
	/**
 * 防抖
 * @param {*} fun 
 * @param {*} delay 
 * @param {*} immediate 
 */
const debounce = function (fun, delay, immediate) {
  var timer, lasttime, context, arg
  var later = function () {
    var now = new Date().getTime(),
      l = now - lasttime
    if (l < delay && l >= 0) {
      clearTimeout(timer)
      timer = setTimeout(later, delay - l)
    } else {
      clearTimeout(timer)
      timer = null
      if (!immediate) {
        fun.apply(context, arg)
        if (!timer) context = arg = null
      }
    }
  }
  return function () {
    context = this
    arg = arguments
    lasttime = new Date().getTime()
    var callNow = immediate && !timer
    if (!timer) timer=setTimeout(later, delay)
    if (callNow) {
      fun.apply(context, arg)
      context = arg = null
    }
  }
}
	export default {
		props: {
			name: {
				type: String,
				default: ''
			},
			value: {
				default: null,
			},
			checked: {
				type: [Boolean, Number],
				default: false
			},
		},
		computed: {
			widthDefault() {
				return this.name.length <= 3
			},
			activeStyle() {
				return `background: #def3f4;color: #2ea8ab;border: 0;margin-left: 5px;`
			},
			itemStyle() {
				return `background: #f7f7f7;color: #7d7d7d;border: 0;margin-left: 5px;`
			}
		},
		data() {
			return {

			};
		},
		methods: {
			handleChange: debounce(handleChange, 200,true)
		}
	}

	function handleChange() {
		this.$emit('change', this.value)
	}
</script>

<style>
	.radio {
		display: inline-block;
		height: 80upx;
		line-height: 80upx;
		padding: 0 22upx;
		border-radius: 10upx;
		font-size: 26upx;
		box-sizing: border-box;
		border: 1px solid #c3c3c3;
	}

	.radio:not(:last-child) {
		margin: 0 20upx 30upx 0;
	}


	.radio-width-default {
		width: 140upx;
		text-align: center;
		padding: 0;
	}
</style>
