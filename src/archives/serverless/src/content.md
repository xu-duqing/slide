## Serverless 实践
Note: xx

- - -

### 解决问题
- 服务成本高 (服务器 / 网关 / 存储)
- 运维成本高
- 扩展能力差
- 开发体验差, 学习成本高
- ….

Note: 我觉得这都不是 FAAS 核心要解决的问题, 核心问题还是要从业务出发

- - -

### HTML + JQ -> NodeJS ->  FaaS

Note: 上期我们了解到前端到发展路径大概是这样的
为什么在 13 / 14 年左右 NodeJS 被大行其道, 一堆阿里做 Node 的晋升, 原因是业务变化了

- - -

### 业务三高

- 高迭代
- 高流量
- 高稳定

Note: 大中台 BFF 的提出解决了这个问题,  NodeJS 的高并发 / 开发敏捷等特点正好命中了业务这三高, 使得 NodeJS 的一堆业务 / 基建 / 系统都在这个时候起来了.
这简直就是一枚银弹, 前端开心 / 后端也开心. 但是业务变化太快了, 各自活动, 补贴 , 改版 , 新的 APP . 用户在沸腾, 流量在燃烧 . 中台越做越大服务越来越多. 谁不开心了?  运维不开心了. 
一个活动的生命周期才三天, 为此要持续维护一个服务. 大量的机器浪费才是痛点
当然还有人说能避免前后端联调, 减少开发周期. 我到不觉得, 微服务已经解决了这个问题
那么问题来了 FAAS 到底适合什么样的场景

- - -

### 适合场景
- 理论上所有的服务都可以跑在 FAAS 上

Note: 但是由于 FAAS 有着冷启动 / 即使回收 / 可观测能力差 等特点, 对于对相应速度高, 多进程业务的支持上可能会没有那么好.
FAAS 启动时间 = Runtime 加载时间 + 函数运行时间
但是以上所有的观点和结论都是我看的其他人的分享或者自己猜测. 真实情况是什么? 启动时间有影响, 到底有多大影响?  可观测能力差到底有多差? 
耳听为虚, 还得实操

- - -

### 实操

- 过程是痛苦的
- 结果是惊人的

Note: 不知道上次分享之后有谁尝试的用了 FAAS 没有?  我用了. 接下来我根据那痛苦的过程摸索出的一条最简单的入门方式给大家分享一下

- - -

### 比较成熟的产品
- AWS Lambda
- 微软云
- 腾讯云云函数
- 阿里云 Function
- Google  云
- IBM

Note: 市场上已经有的比较成熟的产品

- - -

### 基本要素
- 网关
- 运行时
- 日志

Note: 网关提供了外网访问能力负责建请求转发给对应的服务
运行时负责执行函数
日志负责采集执行过程中的日志, 用于函数调试
一般的运营商都会提供两种配置方式, 后台 / 配置文件

- - -

### 配置

```yaml
ROSTemplateFormatVersion: '2015-09-01'
Transform: 'Aliyun::Serverless-2018-04-03'
Resources:
  demo-service: # service name
    Type: 'Aliyun::Serverless::Service'
    Properties:
      Description: ''
    demo: # function name
      Type: 'Aliyun::Serverless::Function'
      Properties:
        Handler: index.handler
        Runtime: nodejs8
        CodeUri: './dist'
        Timeout: 60
      Events:
        httpTrigger:
          Type: HTTP
          Properties:
            AuthType: ANONYMOUS
            Methods: ['POST', 'GET']
  expressGroup:
     Type: 'Aliyun::Serverless::Api'
     Properties:
       StageName: RELEASE
       DefinitionBody:
         '/':
           get:
             x-aliyun-apigateway-api-name: expressApi
             x-aliyun-apigateway-fc:
               arn: acs:fc:::services/${ demo-service.Arn}/functions/${ demo.Arn}/
```


Note: 大家有没有被这么复杂的配置劝退了? 相信我如果你们用后台配置会更加崩溃

- - -

### 工具 serverless

```
npm install -g serverless

sls create -t aliyun-nodejs

sls deploy
```

Note: 好在这是一个哪里有痛点, 哪里就有工具的时代

- - -

### 简化配置
```yaml
service: demo
provider:
  name: aliyun
  runtime: nodejs8
  credentials: ~/.aliyuncli/credentials
plugins:
  - serverless-aliyun-function-compute
functions:
  main:
    handler: index.main
    events:
      - http:
          path: /
          method: get
```

- - -

### 案例1 Koa 应用

```js
exports.hello = (event, context, callback) => {
  callback(null, JSON.strinfy({message: 'Hello'}))
}
```

Note: 一个标准的函数是这样的, 这确实没法想象能干啥, 这感觉就有点像是上第一堂 C 语言课, 很奇妙感觉很厉害又不知道有啥厉害的.
但是如果能 run 一些 web 框架比如 Koa 可干的事情就多了. 但是这个上下文明显不一样啊.好在找到了一个能转换的库

- - -

### fc-express


`npm i -S @webserverless/fc-express`

Note: 虽然这个插件是给 express 写的, 但是由于这两个框架的上下文都是一致的, 所有居然可以直接用

- - -

```js
const proxy = require('@webserverless/fc-express')
const Koa = require('koa');
 
const app = new Koa()
app.user(ctx => {
 ctx.response.body = 'Hello world'
})
 
const server = new proxy.Server(app.callback())
 
module.exports.handler = function(event, context, callback) {
  server.proxy(event, context, callback)
}
```

- - -

### 路由

```js
app.use(route.get('/', main))
app.use(route.get('/about', about))
```

- - -

![](https://this-is-my-images.oss-cn-beijing.aliyuncs.com/img/20200807152500.png)


Note: FAAS 是通过 path 绑定函数的, 这样 koa 的路由能力就没法做了, 好在提供了匹配子路径的功能, 配合 koa router 完美实现函数内路由能力

- - -

### 技术总结
1. 3 个基础服务先要开通
2. 使用 serverless 解决复杂的配置问题
3. 使用 fc-express 加载 koa 框架
4. 使用匹配子路径解决路由问题

http://faas.jqgage.com/

- - -

### 案例2 RSSHub

![](https://this-is-my-images.oss-cn-beijing.aliyuncs.com/img/20200807153325.png)

http://rsshub.jqgage.com/xiaoyuzhou

Note: 既然能加载 koa 那么基于 koa 写的一些服务应该就能部署啊, RSSHub 就是这样的服务. 提供了爬虫 + rss 生成器. 能够将很多奇奇怪怪的内容生成 rss 并进行订阅

- - -

### 案例3 在线  PPT

![](https://this-is-my-images.oss-cn-beijing.aliyuncs.com/img/20200807154254.png)

- - -

### 更多
- 微信机器人
- 技术博客
- 家庭设备监控
- ….

- - -

### 关于费用

三个在线服务的价格是多少?

- 域名: 58 / 年
- 网关:  0.01 / 天
- 运行时: 免费
- 日志:  0.4 / 天

- - -

![](https://this-is-my-images.oss-cn-beijing.aliyuncs.com/img/20200807161004.png)

- - -

### 补充

- 程序运行阶段如果不需要日志服务可以关闭, 省下 0.4 / 天的日志服务. 真正做到 0 成本
- 如果服务启动很慢每次访问会报错, 可以加个定时器触发器 5 分钟访问一次
