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
  setText (text) {
    this.state.text = text
  },
  setDate (date) {
    this.state.date = date
  }
}
module.exports = memoServices