// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'shem-0631c'
})


// 云函数入口函数
exports.main = async (event, context) => {
  //  event.a + event.b
  return cloud.database().collection('word-public').add({
    // data 字段表示需新增的 JSON 数据
    data: {...event}
  })
}