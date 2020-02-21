export default{ 
  data: {
    percentage: '', //百分比
    animTime: '', // 动画执行时间
  },
  options:{
    // 绘制圆形进度条方法
    run(c, w, h, sumscale, allscale) { 
      let that = this;
      var num = (2 * Math.PI / 100 * c) - 0.5 * Math.PI;
      that.ctx2.arc(w, h, w - 8, -0.5 * Math.PI, num); //每个间隔绘制的弧度
      that.ctx2.setStrokeStyle("#1dc98f");
      that.ctx2.setLineWidth("4");
      that.ctx2.setLineCap("butt");
      that.ctx2.stroke();
      that.ctx2.beginPath();
      that.ctx2.setFontSize(14); //注意不要加引号
      that.ctx2.setFillStyle("#000");
      that.ctx2.setTextAlign("center");
      that.ctx2.setTextBaseline("middle");
      that.ctx2.fillText(sumscale+"/"+ allscale, w, h);
      that.ctx2.draw();        
    },
  /**
   * start 起始百分比
   * end 结束百分比
   * w,h 其实就是圆心横纵坐标
   */
  // 动画效果实现
    canvasTap(start, end, time, w, h, sumscale, allscale) {
    var that = this;
    start++;
    if (start > end) {
      return function () {
        that.ctx2.draw();     
      };
    }
      that.run(start, w, h, sumscale, allscale);
    setTimeout(function () {
      that.canvasTap(start, end, time, w, h, sumscale, allscale);
    }, time);
  },
  /**
   * id----------------canvas画板id
   * percent-----------进度条百分比
   * time--------------画图动画执行的时间  
   */
    draw: function (id, sumscale, allscale, percent, animTime) {
      var that = this;
      const ctx2 = wx.createCanvasContext(id);
        that.ctx2=ctx2;
        that.sumscale= sumscale;
        that.allscale=allscale;
        that.percentage=percent;
        that.animTime= animTime;
      
      var time = that.animTime / that.percentage;
      wx.createSelectorQuery().select('#'+id).boundingClientRect(function (rect) { //监听canvas的宽高
        var w = parseInt(rect.width / 2); //获取canvas宽的的一半
        var h = parseInt(rect.height / 2); //获取canvas高的一半，
        that.canvasTap(0, that.percentage, time, w, h, sumscale, allscale)  
       
      }).exec(); 
    }
  } 
}