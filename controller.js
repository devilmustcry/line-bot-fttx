const { randomEat, randomMenuByNumber } = require('./services/randomEat')
const memo = require('./services/memo')
let state = 'idle'
const {lineClient} = require('./clients/lineClient')

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
        state = 'idle'
      }
    } else if (state === 'memo-date') {
      try {
        memo.setDate(userResponseText)
        memo.write(event.source.userId)
        text = 'นัดให้มึงแล้ว'
        state = 'idle'
      } catch (err) {
        console.log(err)
        text = 'เพราะมึงกาก กูเลยจดให้มึงไม่ได้'
        state = 'idle'
      }
      state = 'idle'
    } else if (state === 'random-menu') {
      text = randomMenuByNumber(userResponseText)
      state = 'idle'
    } else {
      if (userResponseText === 'จด') {
        state = 'memo-text'
        text = 'มึงมีนัดอะไร?'
      } else if (userResponseText.includes('มีนัดอะไร')) {
        text = await memo.getAllAvailable()
      } else if (userResponseText.includes('กินอะไรดี')) {
        text = randomEat()
      } else if (userResponseText.includes('สุ่มเมนู')) {
        state = 'random-menu'
        text = 'มีกี่เมนูให้สุ่มวะ?'
      }
    }
    return lineClient.replyMessage(event.replyToken, {
      type: 'text',
      text: text
    })
  }
}

module.exports = controller