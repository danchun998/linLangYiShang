// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const movieDb = cloud.database();
const movieCollect = movieDb.collection("movie");

// 云函数入口函数
exports.main = async(event, context) => {
  try {
    return await movieCollect.where({
      _openid: "on59Y5EBgqBBmkiw9m2YVAZEQqyw"
      }).update({
        data: {
          year: "2020"
        },
      })
  } catch (e) {
    console.error(e)
  }
}