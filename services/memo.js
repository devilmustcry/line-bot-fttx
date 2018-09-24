const dateTime = require('../utils/dateTime')
const memoFormatter = require('../formatter/memoFormatter')
const memoModel = require('../models/memo')
const memoServices = {
  state: {
    text: '',
    date: ''
  },
  async write (userId) {
    await memoModel.create(this.state.text, this.state.date, userId, dateTime.nowDate().format())
  },
  async getAllAvailable() {
    const todayUnix = dateTime.nowDate().startOf('day').valueOf()
    const memos = await memoModel.getAllAvailable(todayUnix)
    if (memos.val()){
      return memoFormatter.formatMemo(memos)
    }
    return 'ไม่มีนัดว้อย มึงว่าง!!!'
  },
  async checkForTodayMeeting () {
    const todayUnix = dateTime.nowDate().startOf('day').valueOf()
    const memos = await memoModel.getAllInDate(todayUnix)
    if (memos.val()) {
      return memoFormatter.formatCronMemo(memos)
    }
    console.log('WTF')
    return null
  },
  async deleteOutOfDateMeeting () {
    const todayUnix = dateTime.nowDate().subtract(1,'day').startOf('day').valueOf()
    const memos = await memoModel.getExpiredMemo(todayUnix)
    if (memos.val()) {
      const keys = Object.keys(memos)
      let updates = {}
      for(key of keys) {
        updates[key] = null
      }
     await memoModel.update(updates)
    }
  },
  setText (text) {
    this.state.text = text
  },
  setDate (date) {
    this.state.date = dateTime.nowDate(date).valueOf()
  }
}
module.exports = memoServices