const firebase = require('../utils/firebase')
const dateTime = require('../utils/dateTime')
const database = firebase.database()
const memoServices = {
  write (text) {
    const memoRef = database.ref('memos/')
    memoRef.push({
      text: text,
      timestamp: dateTime.nowDate()
    })
  }
}
module.exports = memoServices