// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init();

// 云函数入口函数
exports.main = async (event, context) => {
  const _ = cloud.database().command;
  const query = event.id
    ? {
        rootTypeId: _.eq(event.id),
      }
    : { rootTypeId: _.eq("0") };
  return cloud.database().collection("word-type").where(query).get();
};
