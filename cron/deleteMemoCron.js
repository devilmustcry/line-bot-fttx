require('dotenv').config()
const cron = require('cron')
const memo = require('../services/memo')
const CronJob = cron.CronJob

module.exports = new CronJob({
  cronTime: '0 30 0 * * *',
  // run everyday time 6:30
  async onTick () {
    try {
      await memo.deleteOutOfDateMeeting()
    } catch (err) {
      console.log(err)
    }
  }
})
