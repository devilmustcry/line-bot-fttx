const express = require('express')
const port = process.env.PORT || 5000
const { randomEat } = require('./services/randomEat')
const memo = require('./services/memo')
let state = 'idle'
const {lineClient, middleware} = require('./clients/lineClient')

const app = express()
app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>')
})
app.post('/webhook', middleware, (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) =>  {
      res.json(result) 
    })
    .catch((error) => console.log(error));

});
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

    } else if (userResponseText.includes('กินอะไรดี')) {
      text = randomEat()
    }
  }
  return lineClient.replyMessage(event.replyToken, {
    type: 'text',
    text: text
  })
}
app.listen(port, () => console.log(`app listening on port ${port}!`))
