require('dotenv').config()
const cron = require('cron')
const memo = require('../services/memo')
const {lineClient} = require('../clients/lineClient')
const CronJob = cron.CronJob

module.exports = new CronJob({
  cronTime: '0 0 1 * * *',
  // run everyday time 23.30
  async onTick () {
    try {
      const messages = await memo.checkForTodayMeeting()
      if (messages) {
        for (message of messages) {
          lineClient.pushMessage(message.userId, {
            type: 'text',
            text: message.text
          })
        }
      }
    } catch (err) {
      console.log(err)
    }
  }
})
