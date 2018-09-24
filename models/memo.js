const firebase = require('../utils/firebase')

const memoModel = {
  async create (text, date, userId, timestamp) {
    const memoRef = firebase.database().ref('memos/')
    return await memoRef.push({
      text: text,
      date: date,
      userId: userId,
      timestamp: timestamp
    })
  },
  async getAllAvailable (todayUnix) {
    const memoRef = firebase.database().ref('memos/')
    return await memoRef.orderByChild('date').startAt(todayUnix).once('value')
  },
  async getAllInDate (todayUnix) {
    const memoRef = firebase.database().ref('memos/')
    return await memoRef.orderByChild('date').equalTo(todayUnix).once('value')
  },
  async getExpiredMemo (todayUnix) {
    const memoRef = firebase.database().ref('memos/')
    return await memoRef.orderByChild('date').endAt(todayUnix).once('value')
  },
  async update (updates) {
    console.log(updates)
    const memoRef = firebase.database().ref('memos/')
    return await memoRef.update(updates)
  }
}

module.exports = memoModel