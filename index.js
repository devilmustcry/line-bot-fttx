require('dotenv').config()
const Koa = require('koa')
const cors = require('kcors')
const koaBody = require('koa-body')
const Router = require('koa-router')
const crypto = require('crypto')
const { handleEvent } = require('./controller')
const port = process.env.PORT || 5000
let routerObjects = new Router()

const app = new Koa()
app.use(cors())
app.use(koaBody({
  formLimit: '5mb',
  multipart: true
}))
routerObjects.get('/', (ctx) => {
  ctx.body = 'Hello world'
})
routerObjects.post('/webhook', async (ctx) => {
  console.log(ctx.request.body)
  const result = await Promise.all(ctx.request.body.events.map(handleEvent))
  ctx.body = result
})
app.use(routerObjects.routes())
app.use((function *(ctx, next){
  const channelSecret = process.env.CHANNEL_SECRET
  const koaRequest = ctx.request;

  const hash = crypto.createHmac('sha256', channelSecret)
            .update(Buffer.from(JSON.stringify(koaRequest.body), 'utf8'))
            .digest('base64');
  if ( koaRequest.headers['x-line-signature'] === hash ) {
    ctx.status = 200;

  } else {
    ctx.body = 'Unauthorized! Channel Serect and Request header aren\'t the same.';
    ctx.status = 401;
  }
  yield next();
}))

// app.post('/webhook', middleware, (req, res) => {
//   Promise
//     .all(req.body.events.map(handleEvent))
//     .then((result) =>  {
//       res.json(result) 
//     })
//     .catch((error) => console.log(error));

// });

app.listen(port)
console.log('Sever is start at ', port)
