const firebase = require('../utils/firebase')
const dateTime = require('../utils/dateTime')
const database = firebase.database()
const memoServices = {
  state: {
    text: '',
    date: ''
  },
  write () {
    const memoRef = database.ref('memos/')
    memoRef.push({
      text: this.state.text,
      date: this.state.date,
      timestamp: dateTime.nowDate().format()
    })
  },
  getAllAvailable() {
    const todayUnix = dateTime.nowDate().startOf('day').unix()
    const memoRef = database.ref('memos/')
    memoRef.orderByChild('date').startAt(todayUnix).on('value', (snap) => {
      if (snap.val()) {
        const objectKeys = snap.val().keys()
        const allValue = objectKeys.map((key) => {
          return snap.val()[key]
        })
        const text = allValue.reduce((prev, curr, index) => {
          return prev + `มึงมีนัดวันที่ ${nowDate(curr.date)} นัดไป ${curr.text} \n`
        })
        return text
      }
    })
  },
  setText (text) {
    this.state.text = text
  },
  setDate (date) {
    console.log(date, 'Date get from message')
    console.log(dateTime.nowDate(date))
    this.state.date = dateTime.nowDate(date).unix()
  }
}
module.exports = memoServices