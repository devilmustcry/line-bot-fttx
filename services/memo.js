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
    const memos = await database.ref('memos/').orderByChild('date').startAt(todayUnix).once('value')
    if (memos.val()){
      const allValue = Object.values(memos.val()).map((memo) => {
        return memo
      })
      console.log(allValue)
      const text = allValue.reduce((prev, curr, index) => {
        return prev + `มึงมีนัดวันที่ ${dateTime.nowDateTH(curr.date).format('DD MMM YYYY')} นัดไป ${curr.text} \n`
      }, '')
      console.log(text)
      return text
    }
    return 'ไม่มีนัดว้อย มึงว่าง!!!'
  },
  setText (text) {
    this.state.text = text
  },
  setDate (date) {
    console.log(dateTime.nowDate(date).format('YYYY-MM-DD'))
    this.state.date = dateTime.nowDate(date).unix()
  }
}
module.exports = memoServices