// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let qrParam = {
    scene: event.scene,
    page: event.page,
    width: event.width || 300
  }
  console.log('小程序码云函数参数：', event, ';qrParam:', qrParam);

  try {
    // 1、通过云调用生成二维码
    const result = await cloud.openapi.wxacode.getUnlimited(qrParam)
    return result
  } catch (err) {
    return err
  }
}