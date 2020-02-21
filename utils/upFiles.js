var chooseImage = (t, count) => {
  wx.chooseImage({
    count: count,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      let i_index = t.imageindex;
      let imgArr = t.imagelist || [];
      // let arr = res.tempFiles;
      imgArr[i_index].path = res.tempFiles[0].path;
      imgArr[i_index].upFilesBtn = false;
       t.imagelist= imgArr
    },
  });
}
/**
 * upFilesFun(this,object)
 * object:{
 *    url     ************   上传路径 (必传)
 *    filesPathsArr  ******  文件路径数组
 *    name           ******  wx.uploadFile name
 *    formData     ******    其他上传的参数
 *    startIndex     ******  开始上传位置 0
 *    successNumber  ******     成功个数
 *    failNumber     ******     失败个数
 *    completeNumber  ******    完成个数
 * }
 * progress:上传进度
 * success：上传完成之后
 */

var upFilesFun = (t, data, progress, success) => {
  let _this = t;
  let url = data.url;
  let filesPath = _this._data.imagelist ? _this._data.imagelist : [];
  let name = data.name || 'name';
  let formData = data.formData || {};
  let startIndex = data.imageindex ? data.imageindex : 0;
  let successNumber = data.successNumber ? data.successNumber : 0;
  let failNumber = data.failNumber ? data.failNumber : 0;
  if (filesPath.length == 0) {
    success([]);
    return;
  }
  let uploaded = [];
  filesPath.forEach(function(c, i) {
    if (c.path != '') {
      const uploadTask = wx.uploadFile({
        url: url,
        filePath: c.path,
        name: name,
        formData: {
          "imageindex": i
        },
        success: function(res) {
          var data = res.data
          successNumber++;
          // 把后台返回的地址链接存到一个数组
          var da = JSON.parse(res.data);
          if (da.status == 'Success') {
            // ### 此处可能需要修改 以获取图片路径
            let i_index = parseInt(da.data.imageindex);
            uploaded.push({
              'imageindex': i_index,
              'path': da.data.path
            });
          }
          console.log(uploaded);

          if (uploaded.length == filesPath.length) {
            success(uploaded);
          }
        },
        fail: function(res) {
          failNumber++;
        },
        complete: function(res) {}
      })
      uploadTask.onProgressUpdate((res) => {
        console.log('上传进度', res.progress)
        var _temp = "imagelist[" + i + "].upFilesProgress";
          // [_temp]=res.progress;
          console.log(_temp)
      })
    } else {
      uploaded.push({
        'imageindex': i,
        'path': ''
      });
      if (uploaded.length == filesPath.length) {
        success(uploaded);
      }
    }
  })
}


module.exports = {
  chooseImage,
  upFilesFun
}