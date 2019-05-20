import Toast from '../../vant/toast/toast';
const App = getApp();

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
    },
    resetModel: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      resetModel: JSON.parse(JSON.stringify(this.data.model))
    })
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

  // 上架信息
  upperShelfInfo: function() {
    if (!this.vailForm()) {
      return;
    }

    wx.showLoading({
      title: '上传中...'
    })

    wx.cloud.callFunction({
      name: 'upperShelf',
      data: {
        model: this.data.model
      }
    }).then(res => {
      if (res.result.err && res.result.errMsg) {
        wx.hideLoading()
        Toast.fail(res.result.errMsg)
      } else {
        // 上架图片
        this.upperShelfImgs();
      }
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    })
  },

  // 上架图片
  upperShelfImgs: function() {
    let _imgs = this.data.model.imgs;
    Promise.all(_imgs.map((item) => {
        let itemCloudPath = App.globalData.upperShelfImgsBasePath + Date.now()  // 文件名称 
        return wx.cloud.uploadFile({
          cloudPath: itemCloudPath,
          filePath: item,
        })
      }))
      .then((uploadRes) => {
        wx.hideLoading()
        Toast.success("上传成功")
        this.resetForm()
      })
      .catch((uploadErr) => {
        wx.hideLoading()
        console.log(uploadErr)
      })
  },

  // 校验表单
  vailForm: function(e) {
    let _mode = this.data.model
    if (_mode.name.trim() == '') {
      Toast.fail("名称不能为空")
      return false
    }
    if (_mode.code.trim() == '') {
      Toast.fail("代号不能为空")
      return false
    }
    if (_mode.imgs.length <= 0) {
      Toast.fail("请至少上传一张附件图片")
      return false
    }
    return true
  },

  // 重置表单
  resetForm: function() {
    this.setData({
      model: JSON.parse(JSON.stringify(this.data.resetModel))
    })
  }
})