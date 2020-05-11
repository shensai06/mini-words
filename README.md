yarn dev:weapp   

在线参考
小程序框架 taro https://taro.aotu.io/
ui： https://taro-ui.jd.com/#/docs/quickstart
小程序文档：
增删改查：https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-sdk-api/database/document/Document.set.html

https://www.bilibili.com/video/BV1pE411C7Ca?p=10


1.package.json
+   "cloudfunctionRoot": "cloud",
2.app.tsx
+   import 'taro-ui/dist/style/index.scss' // 全局引入一次即可