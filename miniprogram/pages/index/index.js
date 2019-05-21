const movieDb = wx.cloud.database();
const movieCollect = movieDb.collection("movie");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [{
      code: "",
      bannerImg: "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?dw=640"
    }, {
      code: "",
      bannerImg: "https://images.unsplash.com/photo-1551214012-84f95e060dee?dw=640"
    }, {
      code: "",
      bannerImg: "https://images.unsplash.com/photo-1551446591-142875a901a1?dw=640"
    }],
    movieList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _this = this
    movieCollect.get()
      .then(res => {
        this.setData({
          movieList: res.data
        })
      })
      .catch(err => {
        console.error(err)
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

  // 详情页
  toDetails: function(e) {
    let toUrl = `../details/details?id=${e.currentTarget.dataset.id}`
    wx.navigateTo({
      url: toUrl
    })
  },

  // 批量更新数据库信息
  batchUpdate: function() {
    wx.cloud.callFunction({
      name: 'batchUpdate',
      data: {}
    }).then(res => {
      console.log("批量更新完成", res)
    })
  }
})