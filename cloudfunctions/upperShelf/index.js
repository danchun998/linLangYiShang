// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const rq = require('request-promise');
const llysgoodsDb = cloud.database();
const llysgoodsCollect = llysgoodsDb.collection("llys-goods");

// 云函数入口函数
exports.main = async(event, context) => new Promise((resolveMain, rejectMain) => {

  // 查询待插入的数据是否已经存在集合中
  llysgoodsCollect.where({
      code: event.model.code
    })
    .get().then(queryRes => {

      // 允许插入数据
      if (queryRes.data.length <= 0) {
        llysgoodsCollect.add({
            data: event.model
          })
          .then(addRes => {
            resolveMain(true)
          })
          .catch(addErr => {
            rejectMain(addErr)
          })
      }
      // 禁止插入数据
      else {
        resolveMain({
          err: true,
          errMsg: "禁止插入，使用此代号的数据已经存在"
        })
      }
    })
    .catch(queryErr => {
      rejectMain(queryErr)
    })
})