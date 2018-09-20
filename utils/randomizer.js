const randomizer = {
  randomIndex (length) {
    return Math.round(Math.random() * (length - 1))
  }
}
module.exports = randomizer