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
    memoRef.orderByChild('date').startOf(todayUnix).on('value', (snap) => {
      if (snap.val) {
        console.log(snap.val)
      }
    })
  },
  setText (text) {
    this.state.text = text
  },
  setDate (date) {
    console.log(dateTime.nowDate(date))
    this.state.date = dateTime.nowDate(date).unix()
  }
}
module.exports = memoServices