client 目录下
yarn dev:weapp

**在线参考**

- 小程序框架 [taro](https://taro.aotu.io/)
- [ui](https://taro-ui.jd.com/#/docs/quickstart)
- 小程序文档：[增删改查](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-sdk-api/database/document/Document.set.html)
- [b 站教程](https://www.bilibili.com/video/BV1pE411C7Ca?p=10)

```
1.package.json
+   "cloudfunctionRoot": "cloud",
2.app.tsx
+   import 'taro-ui/dist/style/index.scss' // 全局引入一次即可
```

为什么不用云开发而是用云函数？

> 前端不可以直接访问数据库，需要中间层去访问，可以把云函数认为后端 node-modal 层

- 云开发每次访问数据限制为最多 20 条
- 云函数获取数据库不收数据表的权限限制
- 云函数可以实现的功能很多
