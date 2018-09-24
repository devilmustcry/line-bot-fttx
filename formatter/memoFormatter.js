const memoformatter = {
  formatMemo (memos) {
    const allValue = Object.values(memos.val()).map((memo) => {
      return memo
    })
    const text = allValue.reduce((prev, curr, index) => {
      return prev + `มึงมีนัดวันที่ ${dateTime.nowDateTH(curr.date).format('DD MMM YYYY')} นัดไป ${curr.text} \n`
    }, '')
    return text
  }
}