const moment = require('moment')
moment.locale('th')

const dateTime = {
  nowDate (date) {
    if (date) {
      return moment(date)
    }
    return moment()
  },
  nowDateTH (date) {
    if (date) {
      return moment(date).utc().utcOffset(7)
    }
    return moment().utc().utcOffset(7)
  }
}

module.exports = dateTime