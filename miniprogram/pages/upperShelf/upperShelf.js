// miniprogram/pages/upperShelf/upperShelf.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maxImgs: 3,
    model: {
      name: '',
      code: '',
      imgs: []
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  inputName(e) {
    this.setData({
      [`model.name`]: e.detail
    })
  },

  inputCode(e) {
    this.setData({
      [`model.code`]: e.detail
    })
  },

  // 选择图片
  chooseImg: function() {
    let _imgs = this.data.model.imgs;
    let _imgs_ = `model.imgs`;
    let maxImgNum = this.data.maxImgs - _imgs.length;

    wx.chooseImage({
      count: maxImgNum,
      success: res => {
        let chooseImgs = res.tempFilePaths.slice(0, maxImgNum)
        _imgs = [..._imgs, ...chooseImgs]
        this.setData({
          [_imgs_]: _imgs
        })
      }
    })
  },

  // 图片预览
  previewImage: function(e) {
    let _imgs = this.data.model.imgs
    let idx = e.currentTarget.dataset.index
    wx.previewImage({
      current: _imgs[idx],
      urls: _imgs
    })
  },

  // 移除图片
  removeImg: function(e) {
    let _imgs = this.data.model.imgs
    let _imgs_ = `model.imgs`;
    let idx = e.currentTarget.dataset.index
    _imgs.splice(idx, 1)
    this.setData({
      [_imgs_]: _imgs
    })
  },

  // 上架
  upperShelf: function() {
    if (!this.vailForm()) {
      return;
    }

    wx.showLoading({
      title: '上传中...',
    })

    wx.cloud.callFunction({
      name: 'upperShelf',
      data: {
        model: this.data.model
      }
    }).then(res => {
      console.log("上架结果", res)
      wx.hideLoading()
    })
  },

  // 校验表单
  vailForm: function(e) {
    let vailRes = true;
    let _mode = this.data.model;
    if (_mode.name.trim() == '') {
      vailRes = false;
    }
    if (_mode.code.trim() == '') {
      vailRes = false;
    }
    if (_mode.imgs.length <= 0) {
      vailRes = false;
    }
    return vailRes;
  }
})