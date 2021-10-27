# Serverless 从理论到实践
带大家如何利用云服务薅羊毛

<!-- .slide: data-background="#FFF000" -->

Note: 从前端的角度出发, 给大家介绍 Serverless 及其应用场景

- - -

# 术业有专攻
> 故事从前后端分离开始

- 前端变化快 / 后端变化慢
- MVC 数据逻辑,表现逻辑混乱
- 服务端追求三高(高并发, 高可用, 高性能)
- 客户端追求页面流畅,用户体验
- 团队管理

<!-- .slide: data-background="#FFF000" -->

Note: 这一切决定了前后端必须要分离 BFF 层应运而生

- - -

# 这不是你想要的 BFF 

> Java <=> NodeJs(BFF) <=> HTML

原本只是想分离,没想到服务都要自己写了.怎么就全站了勒?

<!-- .slide: data-background="#FFF000" -->

- - -

# 永远热血的前端们
> 非不能为,但不想为之啊

- 开始学 NodeJS
- 学完 NodeJS 还要学 Koa / MySQL / Redis / KafKa / Flink / Docker ....
- 开始学习如何做好线上运维 Nginx / 监控 / 日志
- 开始追求三高(高并发, 高可用, 高性能)

<!-- .slide: data-background="#FFF000" -->

Note: 当前端都做到这些之后为啥还要 Java 了,并且我们的专业性又是什么?

- - -

![](https://this-is-my-images.oss-cn-beijing.aliyuncs.com/img/20211026205732.png)

> 于此同时服务端也面临这相识的问题

<!-- .slide: data-background="#FFF000" -->

Note: 随着通信技术的进步已经微服务概念, 当一个服务被拆分层无数个可独立运行的微服务很难想象运维同学的心情. 这个世界从来不缺少问题和解决问题的人,只要这个问题有价值.

- - -
## 无服务(Serverless)的诞生
<!-- .slide: data-background="#FFF000" -->

![](https://this-is-my-images.oss-cn-beijing.aliyuncs.com/img/20211026173805.png)

无服务不是没有服务, 而是你感知不到服务

- - -
<!-- .slide: data-background="#FFF000" -->

## Serverless 架构

![](https://this-is-my-images.oss-cn-beijing.aliyuncs.com/img/20211026205916.png)



- - -

## FaaS 生命周期托管

<!-- .slide: data-background="#FFF000" -->

<img src='https://this-is-my-images.oss-cn-beijing.aliyuncs.com/img/20211026210822.png' width=1200 />

- - -
## Serverless 当前发展情况
<!-- .slide: data-background="#FFF000" -->

- AWS Lambda
- 微软云
- 腾讯云 云函数
- 阿里云 Function
- Google  云
- IBM

- - -

## 话说千万,不如自己上
<!-- .slide: data-background="#FFF000" -->

![](https://this-is-my-images.oss-cn-beijing.aliyuncs.com/img/20200807154254.png)

> 如何利用 Serverless 部署自己的幻灯片服务

- - -

## 基本要素
<!-- .slide: data-background="#FFF000" -->
> 域名 => API 网关 => FaaS 运行时

- - -
<!-- .slide: data-background="#FFF000" -->

- 开通函数服务
- 安装 cli 
- 添加配置 
- 初始化项目 s init
- 部署项目 s deploy

```shell
npm install -g @serverless-devs/s

s config add --AccountID ${{secrets.ALIYUN_ACCOUNT_ID}} --AccessKeyID ${{secrets.ALIYUN_ACCESS_KEY_ID}} --AccessKeySecret ${{secrets.ALIYUN_ACCESS_KEY_SECRET}} -a default
```

- - -

## 引入 koa
<!-- .slide: data-background="#FFF000" -->

```js
const serverless = require('@serverless-devs/fc-http');
const Koa = require('koa')
const route = require('koa-route')

const app = new Koa()

const main = ctx => {
  ctx.response.code = 200
  ctx.response.body = "Hello Serverless"
}

app.use(route.get('/'), main)

exports.handler = serverless(app)
```

- - -

## 基于 Github Actions 的 CI / CD
<!-- .slide: data-background="#FFF000" -->

```yaml
name: Serverless Devs Project CI/CD
on:
  push:
    branches: [ main ]
jobs:
  serverless-devs-cd:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: 12
          registry-url: https://registry.npmjs.org/
      - run: npm install -g @serverless-devs/s
      - run: s config add --AccountID ${{secrets.ALIYUN_ACCOUNT_ID}} --AccessKeyID ${{secrets.ALIYUN_ACCESS_KEY_ID}} --AccessKeySecret ${{secrets.ALIYUN_ACCESS_KEY_SECRET}} -a default
      - run: s deploy all --use-local

```

- - -

## Serverless 其他应用场景
<!-- .slide: data-background="#FFF000" -->

- 各种 web 服务 rsshub / blog / 消息通知
- 流数据处理
- 图片 / 视频转码

- - -

### 薅羊毛技术总结
<!-- .slide: data-background="#FFF000" -->

- 默认生成的函数模版没有太大的实用价值
- 配合 `@serverless-devs/fc-http`支持 koa / express 等会有很大的价值
- 域名是最大的投资
- API 网关的配置稍微麻烦一点, 注意全路径匹配以及参数透传
- CI / CD 选择香港机房成功率高一点
- 域名: 58 / 年
- 网关:  0.01 / 天
- 运行时: 几乎免费 (100万 (次) / 40万 (GB-秒))

- - -
### 我们在 Serverless 上有哪些规划
<!-- .slide: data-background="#FFF000" -->

http://client.wacai.info/mozi/faas/service

- - -

### 感谢大家的时间
<!-- .slide: data-background="#FFF000" -->

<img src='https://this-is-my-images.oss-cn-beijing.aliyuncs.com/img/20211027100818.png' width=300 />