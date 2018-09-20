const moment = require('moment')

const dateTime = {
  nowDate (date) {
    if (date) {
      return moment(date)
    }
    return moment()
  }
}