const randomizer = require('../utils/randomizer')
const constant = require('../utils/const')

const randomEat = {
  randomEat () {
    const bestFood = constant.bestFood
    const index = randomizer.randomIndex(bestFood.length)
    return `กูคิดว่าวันนี้มึงควรกิน "${bestFood[index]}"`
  }
}

module.exports = randomEat