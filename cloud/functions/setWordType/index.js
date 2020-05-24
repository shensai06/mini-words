// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init();

// 云函数入口函数
exports.main = async (event, context) => {
  //  event.a + event.b
  const rootTypeId = event.rootTypeId ? event.rootTypeId : "0";
  return cloud
    .database()
    .collection("word-type")
    .add({
      // data 字段表示需新增的 JSON 数据
      data: { ...event, rootTypeId: rootTypeId },
    });
};
