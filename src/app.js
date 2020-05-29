const path = require('path');
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koaStatic = require('koa-static');

// 新增
const session = require('koa-generic-session');
const redisStore = require('koa-redis');

const { REDIS_CONF } = require('./config/db');
const { isProd } = require('./utils/env');
const { SESSION_SRCRET_KEY } = require('./config/secretKeys');

// 路由
const profileAPIRouter = require('./routes/api/blog-profile');
const homeAPIRouter = require('./routes/api/blog-home');
const blogViewRouter = require('./routes/view/blog')
const utilsAPIRouter = require('./routes/api/utils');
const userViewRouter = require('./routes/view/user');
const userApiRouter = require('./routes/api/user');
const errorViewRouter = require('./routes/view/error');

// error handler
let onerrorConf = {};
if (isProd) {
  onerrorConf = {
    redirect: '/error'
  }
}

onerror(app, onerrorConf) // 页面上显示

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json()) // json变成对象形式
app.use(logger()) 
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// session 配置 (session没用的话，不会往redis存数据)
app.keys = [SESSION_SRCRET_KEY];
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
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
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
app.use(profileAPIRouter.routes(), profileAPIRouter.allowedMethods())
app.use(homeAPIRouter.routes(), homeAPIRouter.allowedMethods())
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(userApiRouter.routes(), userViewRouter.allowedMethods())
app.use(errorViewRouter.routes(),errorViewRouter.allowedMethods())
app.use(utilsAPIRouter.routes(), utilsAPIRouter.allowedMethods())


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
