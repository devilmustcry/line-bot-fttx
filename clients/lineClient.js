const line = require('@line/bot-sdk')

const config = {
  channelAccessToken: 'D6cw5dwtNXcxjhEEi1FuESEsqxyzcc0WgyADG5850re4Iu4E3wbkxkLKC4Sh19a1zD61mVb67W9ap315frqdzcNqJBdltEAWT9DB0ozP6zcxxYdiynYJGrTu+ZP9Sk+wMcT/79xfJPLbbAxc9THOOgdB04t89/1O/w1cDnyilFU=',
  channelSecret: '1d80d885eabef21974c85038a7845c6a'
}

const lineClient = new line.Client(config);
const middleware = line.middleware(config)
module.exports = {
  lineClient,
  middleware
}