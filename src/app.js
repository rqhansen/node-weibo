const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

// 新增
const session = require('koa-generic-session');
const redisStore = require('koa-redis');

const { REDIS_CONFIG } = require('./config/db');

const index = require('./routes/index')
const userViewRouter = require('./routes/view/user');

// error handler
onerror(app) // 页面上显示

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json()) // json变成对象形式
app.use(logger()) 
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// session 配置 (session没用的话，不会往redis存数据)
app.keys = ['Uidien39*^&#'];
app.use(session({
  key: 'weibo.sid', // cookie name 默认是 koa.sid
  prefix: 'weibo:sess:', // redis key 的前缀，默认 koa:sess:
  cookie: {
    path: '/',
    httpOnly: true, // 不让客户端改cookie
    maxAge: 24 * 60 * 60 * 1000 //（// 默认） // ms
  },
  ttl: 24 * 60 * 60 * 1000, // redis 过期时间
  store: redisStore({
    all: `${REDIS_CONFIG.host}:${REDIS_CONFIG.port}`
  })
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(userViewRouter.routes(),userViewRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
