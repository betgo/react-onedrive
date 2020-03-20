
const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')
const Session = require('koa-session')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const Redis = require('ioredis')

const RedisSessionStore = require('./server/session-store')


// 创建redis client
const redis = new Redis()
const Auth = require('./server/auth')
const Api  =require('./server/api')
app.prepare()
  .then(() => {
    const server = new Koa()
    const router = new Router()
    server.keys = ['onedrive key']


    const SESSION_CONFIG = {
      key: 'jid',
      store: new RedisSessionStore(redis),
    }
    server.use(Session(SESSION_CONFIG, server))

    Auth(server)
    Api(server)


router.get('/api/user/info', async ctx => {
  // const id = ctx.params.id
  // await handle(ctx.req, ctx.res, {
  //   pathname: '/a',
  //   query: { id },
  // })
  // ctx.respond = false
  const user = ctx.session.userInfo
  if (!user) {
    ctx.status = 401
    ctx.body = 'Need Login'
  } else {
    ctx.body = user
    ctx.set('Content-Type', 'application/json')
  }
})
    // router.get('*', async ctx => {
    //   await handle(ctx.req, ctx.res)
    //   ctx.respond = false
    // })

    server.use(router.routes())
    server.use(async (ctx, next) => {
      // ctx.cookies.set('id', 'userid:xxxxx')
      ctx.req.session = ctx.session
      await handle(ctx.req, ctx.res)
      ctx.respond = false
    })

    server.use(async (ctx, next) => {

      ctx.res.statusCode = 200
      await next()
    })


    server.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`)
    })
  })