// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const rq = require('request-promise');
const llysgoodsDb = cloud.database();
const llysgoodsCollect = llysgoodsDb.collection("llys-goods");

// 云函数入口函数
exports.main = async(event, context) => new Promise((mainResolve, mainReject) => {

  // 保存商品信息
  function saveGoodInfo() {
    return new Promise((resolve, reject) => {
      llysgoodsCollect.add({
          data: event.model
        })
        .then(res => {
          resolve(true)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  // 保存商品图片
  function saveGoodImgs() {
    return new Promise((resolve, reject) => {
      // cloud.uploadFile({
      //   // 指定上传到的云路径
      //   cloudPath: 'my-photo.png',
      //   // 指定要上传的文件的小程序临时文件路径
      //   filePath: chooseResult.tempFilePaths[0],
      //   // 成功回调
      //   success: res => {
      //     console.log('上传成功', res)
      //   },
        setTimeout(()=>{
          resolve("10");
        },2000)
      })
  }

  let _saveGoodInfo = await saveGoodInfo();
  let _saveGoodImgs = await saveGoodImgs();

  Promise.all([_saveGoodInfo, _saveGoodImgs]).then((result) => {
    mainResolve(result)
  }).catch((error) => {
    mainReject(error)
  })
})