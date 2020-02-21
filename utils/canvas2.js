export default{ 
  data: {
    percentage1: '', //百分比
    animTime1: '', // 动画执行时间
  },
  options:{
    // 绘制圆形进度条方法
    run1(c, w, h, sumscale1, allscale1) { 
      let that = this;
      var num = (2 * Math.PI / 100 * c) - 0.5 * Math.PI;
      that.ctx3.arc(w, h, w - 8, -0.5 * Math.PI, num); //每个间隔绘制的弧度
      that.ctx3.setStrokeStyle("#1dc98f");
      that.ctx3.setLineWidth("4");
      that.ctx3.setLineCap("butt");
      that.ctx3.stroke();
      that.ctx3.beginPath();
      that.ctx3.setFontSize(14); //注意不要加引号
      that.ctx3.setFillStyle("#000");
      that.ctx3.setTextAlign("center");
      that.ctx3.setTextBaseline("middle");
      that.ctx3.fillText(sumscale1+"/"+ allscale1, w, h);
      that.ctx3.draw();        
    },
  /**
   * start 起始百分比
   * end 结束百分比
   * w,h 其实就是圆心横纵坐标
   */
  // 动画效果实现
    canvasTap1(start, end, time, w, h, sumscale1, allscale1) {
    var that = this;
    start++;
    if (start > end) {
      return false;
    }
      that.run1(start, w, h, sumscale1, allscale1);
    setTimeout(function () {
      that.canvasTap1(start, end, time, w, h, sumscale1, allscale1);
    }, time);
  },
  /**
   * id----------------canvas画板id
   * percent-----------进度条百分比
   * time--------------画图动画执行的时间  
   */
    draw1: function (id, sumscale1, allscale1, percent, animTime1) {
      var that = this;
      const ctx3 = wx.createCanvasContext(id);
      that.ctx3=ctx3;
      that.sumscale1= sumscale1;
      that.allscale1=allscale1;
      that.percentage1=percent;
      that.animTime1= animTime1;
      var time = that.animTime1 / that.percentage1;
      wx.createSelectorQuery().select('#'+id).boundingClientRect(function (rect) { //监听canvas的宽高
        var w = parseInt(rect.width / 2); //获取canvas宽的的一半
        var h = parseInt(rect.height / 2); //获取canvas高的一半，
        that.canvasTap1(0, that.percentage1, time, w, h, sumscale1, allscale1)  
      }).exec(); 
    }
  } 
}