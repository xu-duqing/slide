# Serverless 从理论到实践
带大家如何利用云服务薅羊毛
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
> 原本只是想分离,没想到服务都要自己写了

Java <=> NodeJs(BFF) <=> HTML

<!-- .slide: data-background="https://this-is-my-images.oss-cn-beijing.aliyuncs.com/img/20211026162907.png" -->

- - -

# 永远热血的前端们
> 非不能为,但不想为啊

- 开始学 NodeJS?
- 学完 NodeJS 还要学 Koa / MySQL / Redis / KafKa / Flink / Docker ....
- 开始学习如何做好线上运维 Nginx / 监控 / 日志
- 开始追求三高(高并发, 高可用, 高性能)

<!-- .slide: data-background="https://this-is-my-images.oss-cn-beijing.aliyuncs.com/img/20211026170151.png" -->

Note: 当前端都做到这些之后为啥还要 Java 了,并且我们的专业性又是什么?

- - -

# 带着问题找答案
> 于此同时服务端也面临这相识的问题

![](https://this-is-my-images.oss-cn-beijing.aliyuncs.com/img/20211026173104.png)

Note: 随着通信技术的进步已经微服务概念, 当一个服务被拆分层无数个可独立运行的微服务很难想象运维同学的心情. 这个世界从来不缺少问题和解决问题的人,只要这个问题有价值.

- - -

# 无服务(Serverless)的诞生
> 无服务不是没有服务, 而是你感知不到服务

![](https://this-is-my-images.oss-cn-beijing.aliyuncs.com/img/20211026173805.png)

- - -

# Serverless 架构


- - -

# 服务生命周期托管

- 初始化
- 执行
- 回收

- - -
### Serverless 当前发展情况
- AWS Lambda
- 微软云
- 腾讯云 云函数
- 阿里云 Function
- Google  云
- IBM

- - -

### 话说千万,不如自己上
> 如何利用 Serverless 部署自己的幻灯片服务

- - -

# 基本要素
- 域名
- API 网关
- FaaS 运行时

### Serverless 其他应用场景

- - -

### 薅羊毛技术总结

- - -
### 我们在 Serverless 上有哪些规划

- - -

### 感谢大家的时间

- - -


