const express = require('express')
const port = process.env.PORT || 5000
const line = require('@line/bot-sdk');

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
    .then((result) => res.json(result));
});
const client = new line.Client(config);
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text
  });
}
app.listen(port, () => console.log(`app listening on port ${port}!`))


