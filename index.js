const serverless = require('@serverless-devs/fc-http');
const Koa = require('koa')
const route = require('koa-route')
const fs = require('fs')
const path = require('path');
const serve = require('koa-static')

const app = new Koa()

const main = ctx => {
  ctx.response.type = 'html'
  ctx.response.code = 200
  ctx.response.body = fs.readFileSync('/code/src/dist/index.html')
}

app.use(serve(path.join(__dirname, 'src')))
app.use(route.get('/'), main)

exports.handler = serverless(app)