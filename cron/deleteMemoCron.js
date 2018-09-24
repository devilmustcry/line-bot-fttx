require('dotenv').config()
const cron = require('cron')
const memo = require('../services/memo')
const CronJob = cron.CronJob

module.exports = new CronJob({
  cronTime: '0 0 1 * * *',
  runOnInit: true,
  // run everyday time 23.30
  async onTick () {
    try {
      await memo.deleteOutOfDateMeeting()
    } catch (err) {
      console.log(err)
    }
  }
})
