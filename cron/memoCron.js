require('dotenv').config()
const cron = require('cron')
const { nowDate } = require('../utils/dateTime')
const memo = require('../services/memo')
const {lineClient} = require('../clients/lineClient')
const CronJob = cron.CronJob

module.exports = new CronJob({
  cronTime: '0 0 1 * * *',
  // run everyday time 23.30
  async onTick () {
    try {
      const text = await memo.checkForTodayMeeting()
      lineClient.pushMessage('userId', {
        type: 'text',
        text: text
      })
    } catch (err) {
      console.log(err)
    }
  }
})
