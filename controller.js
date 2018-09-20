const { randomEat } = require('./services/randomEat')
const memo = require('./services/memo')
let state = 'idle'
const {lineClient, middleware} = require('./clients/lineClient')

const controller = {
  async handleEvent(event) {
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
        
        text = await memo.getAllAvailable()
        // console.log(text, 'Text back from get all available')
      } else if (userResponseText.includes('กินอะไรดี')) {
        text = randomEat()
      }
    }
    return lineClient.replyMessage(event.replyToken, {
      type: 'text',
      text: text
    })
  }
}

module.exports = controller