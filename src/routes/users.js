const router = require('koa-router')()

router.prefix('/users')

router.post('/login', async (ctx,next) => {
  const { userName,password } = ctx.request.body;
  ctx.body = {
    userName,
    password
  }
})

// router.get('/bar', function (ctx, next) {
//   ctx.body = 'this is a users/bar response'
// })

module.exports = router
