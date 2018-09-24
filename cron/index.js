const memoCron = require('./memoCron')

const cron = {
  start () {
    memoCron.start()
  }
}
module.exports = cron