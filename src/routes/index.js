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

router.get('/', async (ctx, next) => {
  // debugger;
  // throw Error();
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    isMe: true,
    blogList: [
      {
        id: 1,
        title: 'aaa'
      },
      {
        id: 2,
        title: 'bbb'
      },
      {
        id: 3,
        title: 'ccc'
      },
      {
        id: 4,
        title: 'ddd'
      }
    ]
  })
})

// router.get('/string', async (ctx, next) => {
//   ctx.body = 'koa2 string'
// })

router.get('/json', async (ctx, next) => {
  // session 是会话，不同用户的session不同
  // const session = ctx.session;
  // if(session.viewNum == null) {
  //   session.viewNum = 0;
  // }
  // session.viewNum++;
  // throw Error();
  ctx.body = {
    title: 'koa2 json'
    // viewNum: session.viewNum
  }
})

module.exports = router
