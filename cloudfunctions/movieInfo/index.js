// 云函数入口文件
const cloud = require('wx-server-sdk')
const rq = require('request-promise');
cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  // const wxContext = cloud.getWXContext()
  let url = `https://api.douban.com/v2/movie/subject/${event.movieId}`;
  var res = rq(url).then(result => {
    return result
  }).catch(err => {
    console.log(err)
  })
  return res
}