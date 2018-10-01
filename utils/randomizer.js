const randomizer = {
  randomIndex (length) {
    return Math.round(Math.random() * (length - 1))
  },
  randomFromRange (min, max) {
    return min + Math.floor(Math.random() * (max - min + 1))
  },
}
module.exports = randomizer