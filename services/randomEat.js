const randomizer = require('../utils/randomizer')
const bestFood = ['กะเพราหมูกรอบไข่ดาว', 'หมูกะหรี่ไข่ดาว']

const randomEat = {
  randomEat () {
    const index = randomizer.randomIndex(bestFood.length)
    return `กูคิดว่าวันนี้มึงควรกิน "${bestFood[index]}"`
  }
}

module.exports = randomEat