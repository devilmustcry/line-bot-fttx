const moment = require('moment')
moment.locale('th')

const dateTime = {
  nowDate (date) {
    if (date) {
      return moment(date)
    }
    return moment()
  }
}

module.exports = dateTime