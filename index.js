const express = require('express')
const port = process.env.PORT || 5000
const line = require('@line/bot-sdk')
const { randomEat } = require('./services/randomEat')
const memo = require('./services/memo')
let state = 'idle'
const config = {
  channelAccessToken: 'oCV3ANut0xcuUWbWtaOjid5IqBtkgcdY7GL6bEXL4aZMhFjXHKw2iQHzcLYbk9tgzD61mVb67W9ap315frqdzcNqJBdltEAWT9DB0ozP6zdM4zfRqKWYGk9BqeMkwENjwVhPY4b3knvBYnynr+yY5gdB04t89/1O/w1cDnyilFU=',
  channelSecret: '1d80d885eabef21974c85038a7845c6a'
}

const app = express()
app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>')
})
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) =>  {
      res.json(result) 
    })
    .catch((error) => console.log(error));

});
const client = new line.Client(config);
function handleEvent(event) {
  let text = 'มึงพูดเรื่องไรของมึงวะ....'
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null)
  }
  if (event.message.text === 'q') {
    text = 'ถอดกางเกงแล้วไม่เย็ดซะแล้วไง'
    state = 'idle'
  }
  else if (state === 'memo-text') {
    try {
      memo.setText(event.message.text)
      text = 'นัดมึงวันไหน?'
      state = 'memo-date'
    } catch (err) {
      console.log(err)
      text = 'เพราะมึงกาก กูเลยจดให้มึงไม่ได้'
      state = idle
    }
  } else if (state === 'memo-date') {
    try {
      memo.setDate(event.message.text)
      memo.write()
      text = 'นัดให้มึงแล้ว'
    } catch (err) {
      console.log(err)
      text = 'เพราะมึงกาก กูเลยจดให้มึงไม่ได้'
    }
    state = 'idle'
  } else {
    if (event.message.text === 'จด') {
      state = 'memo-text'
      text = 'มึงมีนัดอะไร?'
    } else if (event.message.text.includes('มีนัดอะไร')) {

    } else if (event.message.text.includes('กินอะไรดี')) {
      text = randomEat()
    }
  }
  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: text,
    data : {  
      "type":"message",
      "label":"Yes",
      "text":"Yes"
    }
  })
}
app.listen(port, () => console.log(`app listening on port ${port}!`))
