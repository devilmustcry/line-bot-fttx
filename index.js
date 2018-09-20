require('dotenv').config()
const Koa = require('koa')
const cors = require('kcors')
const koaBody = require('koa-body')
const Router = require('koa-router')
const port = process.env.PORT || 5000
const { randomEat } = require('./services/randomEat')
const memo = require('./services/memo')
let state = 'idle'
const {lineClient, middleware} = require('./clients/lineClient')
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
routerObjects.post('/webhook', middleware, (ctx) => {
  // console.log(ctx.request.body)
  Promise.all(ctx.request.body.events.map(handleEvent))
  .then(result => res.json(result))
  .catch((error) => console.log(error))
})
app.use(routerObjects.routes())

// app.post('/webhook', middleware, (req, res) => {
//   Promise
//     .all(req.body.events.map(handleEvent))
//     .then((result) =>  {
//       res.json(result) 
//     })
//     .catch((error) => console.log(error));

// });
function handleEvent(event) {
  const userResponseText = event.message.text
  let text = 'มึงพูดเรื่องไรของมึงวะ....'
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null)
  }
  if (userResponseText === 'q') {
    text = 'ถอดกางเกงแล้วไม่เย็ดซะแล้วไง'
    state = 'idle'
  }
  else if (state === 'memo-text') {
    try {
      memo.setText(userResponseText)
      text = 'นัดมึงวันไหน?'
      state = 'memo-date'
    } catch (err) {
      console.log(err)
      text = 'เพราะมึงกาก กูเลยจดให้มึงไม่ได้'
      state = idle
    }
  } else if (state === 'memo-date') {
    try {
      memo.setDate(userResponseText)
      memo.write()
      text = 'นัดให้มึงแล้ว'
    } catch (err) {
      console.log(err)
      text = 'เพราะมึงกาก กูเลยจดให้มึงไม่ได้'
    }
    state = 'idle'
  } else {
    if (userResponseText === 'จด') {
      state = 'memo-text'
      text = 'มึงมีนัดอะไร?'
    } else if (userResponseText.includes('มีนัดอะไร')) {
      
      // text = memo.getAllAvailable()
      console.log(text, 'Text back from get all available')
    } else if (userResponseText.includes('กินอะไรดี')) {
      text = randomEat()
    }
  }
  return lineClient.replyMessage(event.replyToken, {
    type: 'text',
    text: text
  })
}
app.listen(port)
console.log('Sever is start at ', port)
