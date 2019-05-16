// miniprogram/pages/upperShelf/upperShelf.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    model: {
      name: '中国建设银行大厦',
      code: '11055',
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

  // 选择图片
  chooseImg: function() {
    let _this = this;
    wx.chooseImage({
      success: res => {
        let _imgs = this.data.model.imgs;
        const imagePaths = this.data.model.imgs.concat(res.tempFilePaths)
        let currMaxImgNum = 6 - this.data.model.imgs.length;
        let currimagePaths = imagePaths.slice(0, currMaxImgNum)
        for (let i = 0; i < currimagePaths.length; i++) {
          let obj = Object.create(null);
          obj.url = currimagePaths[i];
          this.data.model.imgs.push(obj);
        }
        let imgs = this.data.model.imgs
        this.setData({
          imgs: this.data.model.imgs
        });
      }
    })
  },

  // 上传
  upperShelf: function() {

  }
})