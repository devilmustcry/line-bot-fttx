const memoCron = require('./memoCron')
const deleteMemoCron = require('./deleteMemoCron')
const cron = {
  start () {
    memoCron.start()
    deleteMemoCron.start()
  }
}
module.exports = cron