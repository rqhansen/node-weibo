const router = require('koa-router')()

router.get('/profile/:userName', async (ctx,next) => {
  const { userName } = ctx.params;
  ctx.body = {
    title: '哈',
    userName: userName
  }
})

router.get('/loadMore/:userName/:pageIndex', async (ctx,next) => {
  const { userName, pageIndex } = ctx.params;
  ctx.body = {
    title: 'this is loadMore api',
    userName,
    pageIndex
  }
})

// router.get('/', async (ctx, next) => {
//   await ctx.render('index', {
//     title: 'Hello Koa 2!'
//   })
// })

// router.get('/string', async (ctx, next) => {
//   ctx.body = 'koa2 string'
// })

// router.get('/json', async (ctx, next) => {
//   ctx.body = {
//     title: 'koa2 json'
//   }
// })

module.exports = router
