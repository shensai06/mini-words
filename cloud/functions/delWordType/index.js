// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    //  event.a + event.b
    return cloud.database().collection('word-public').where({
      id: event.id
    }).remove()
}