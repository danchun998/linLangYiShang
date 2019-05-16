// miniprogram/pages/upperShelf/upperShelf.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    model: {
      name: '中国建设银行大厦',
      code: '11055',
      imgs: [
      ]
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

  // 选择图片
  chooseImg: function() {
    let _imgs = this.data.model.imgs;
    let _imgs_ = `model.imgs`;
    let maxImgNum = 6 - _imgs.length

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
  }
})