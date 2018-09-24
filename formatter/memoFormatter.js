const dateTime = require('../utils/dateTime')
const memoFormatter = {
  formatMemo (memos) {
    const allValue = Object.values(memos.val()).map((memo) => {
      return memo
    })
    const text = allValue.reduce((prev, curr, index) => {
      return prev + `มึงมีนัดวันที่ ${dateTime.nowDateTH(curr.date).format('DD MMM YYYY')} นัดไป ${curr.text} \n`
    }, '')
    return text
  },
  formatCronMemo (memos) {
    const allValue = Object.values(memos.val()).map((memo) => memo)
    const formattedValue = allValue.map((memo) => {
      return {
        userId: memo.userId,
        text: `วันที่ ${dateTime.nowDateTH(memo.date)} : ${memo.text}`
      }
    })
    return formattedValue
  }
}
module.exports = memoFormatter