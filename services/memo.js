const firebase = require('../utils/firebase')
const dateTime = require('../utils/dateTime')
const database = firebase.database()
const memoServices = {
  state: {
    text: '',
    date: ''
  },
  async write () {
    const memoRef = await database.ref('memos/')
    await memoRef.push({
      text: this.state.text,
      date: this.state.date,
      timestamp: dateTime.nowDate().format()
    })
  },
  async getAllAvailable() {
    const todayUnix = dateTime.nowDate().startOf('day').unix()
    const memos = await database.ref('memos/').startAt(todayUnix).once('value')
    console.log(memos)
    const allValue = Object.keys(memos).map((key) => {
      return memos[key]
    })
    const text = allValue.reduce((prev, curr, index) => {
      return prev + `มึงมีนัดวันที่ ${dateTime.nowDate(curr.date)} นัดไป ${curr.text} \n`
    }, '')
    console.log(text)
    return text
  },
  setText (text) {
    this.state.text = text
  },
  setDate (date) {
    this.state.date = dateTime.nowDate(date).unix()
  }
}
module.exports = memoServices