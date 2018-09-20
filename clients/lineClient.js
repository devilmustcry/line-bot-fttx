const line = require('@line/bot-sdk')

const config = {
  channelAccessToken: 'oCV3ANut0xcuUWbWtaOjid5IqBtkgcdY7GL6bEXL4aZMhFjXHKw2iQHzcLYbk9tgzD61mVb67W9ap315frqdzcNqJBdltEAWT9DB0ozP6zdM4zfRqKWYGk9BqeMkwENjwVhPY4b3knvBYnynr+yY5gdB04t89/1O/w1cDnyilFU=',
  channelSecret: '1d80d885eabef21974c85038a7845c6a'
}

const lineClient = new line.Client(config);
const middleware = line.middleware(config)
module.exports = {
  lineClient,
  middleware
}