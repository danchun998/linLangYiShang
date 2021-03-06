// miniprogram/pages/scanCode/scanCode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  scanCode: function(event) {
    wx.scanCode({
      onlyFromCamera: false,
      // scanType: "CODABAR",     // 该参数没有生效
      success(res) {
       wx.cloud.callFunction({
          // 要调用的云函数名称
          name: 'movieInfo',
          // 传递给云函数的参数
          data: {
            movieId: res.result
          },
          success: res => {

            let movieString = res.result;
            let movieData = JSON.parse(movieString);

            const movieDb = wx.cloud.database();
            const movieCollect = movieDb.collection("movie");
            movieCollect.add({
                data: movieData
              })
              .then(res => {
                console.log(res)
              }).catch(err => {
                console.log(err)
              })

          },
          fail: err => {
            console.log(err);
          }
        })
      },
      fail(err) {
        console.log(err)
      }
    })
  }
})