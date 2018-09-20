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
      date: dateTime.nowDate(this.state.date).unix(),
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
    this.state.date = date
  }
}
module.exports = memoServices