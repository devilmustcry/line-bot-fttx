const moment = require('moment')
moment.locale('th')

const dateTime = {
  nowDate (date) {
    if (date) {
      return moment(date).format('DD MMM YYYY')
    }
    return moment().format('DD MMM YYYY')
  }
}

module.exports = dateTime