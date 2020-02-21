//公共js，主要做表单验证，以及基本方法封装
const utils = {
	
	isNullOrEmpty: function(value) {
		//是否为空
		return (value === null || value === '' || value === undefined) ? true : false;
	},
	trim: function(value) {
		//去空格
		return value.replace(/(^\s*)|(\s*$)/g, "");
	},
	isMobile: function(value) {
		//是否为手机号
		return /^1\d{10}$/.test(value);
	},
	isFloat: function(value) {
		//金额，只允许保留两位小数
		return /^([0-9]*[.]?[0-9])[0-9]{0,1}$/.test(value);
	},
	isNum: function(value) {
		//是否全为数字
		return /^[0-9]+$/.test(value);
	},
	checkPwd: function(value) {
		//密码为8~20位数字和字母组合
		return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/.test(value);
	},
	formatNum: function(num) {
		//格式化手机号码
		if (utils.isMobile(num)) {
			num = num.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
		}
		return num;
	},
	rmoney: function(money) {
		//金额格式化
		return parseFloat(money).toFixed(2).toString().split('').reverse().join('').replace(/(\d{3})/g, '$1,').replace(
			/\,$/, '').split('').reverse().join('');
	},
	  // 时间格式化
	
	dateFormat(date, fmt){
		if (/(y+)/.test(fmt)) {
			var date = new Date(date);
			fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
			
        }
         
        let o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        };
         
        for (let k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
                let str = o[k] + '';
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length));
            }
        }
        return fmt;
	},
	//计算两个整数之间的百分比
//curNum：当前数据，totalNum：总数据，isHasPercentStr：是否返回%字符
	getPercent(curNum, totalNum, isHasPercentStr){
		curNum = parseFloat(curNum);
  totalNum = parseFloat(totalNum);

  if (isNaN(curNum) || isNaN(totalNum)) {
    return '-';
  }

  return isHasPercentStr ?
    totalNum <= 0 ? '0%' : (Math.round(curNum / totalNum * 10000) / 100.00 + '%') :
    totalNum <= 0 ? 0 : (Math.round(curNum / totalNum * 10000) / 100.00);
	}
}

module.exports = {
	isNullOrEmpty: utils.isNullOrEmpty,
	trim: utils.trim,
	isMobile: utils.isMobile,
	isFloat: utils.isFloat,
	isNum: utils.isNum,
	checkPwd: utils.checkPwd,
	formatNum:utils.formatNum,
	rmoney: utils.rmoney,
	dateFormat: utils.dateFormat,
	getPercent:utils.getPercent
}
