const firebase = require('firebase')
const config = {
  apiKey: "AIzaSyB9WLEwMxsPdQDUJgC9IkSOsy9ENcsgj9w",
  authDomain: "personal-bot-3fd58.firebaseapp.com",
  databaseURL: "https://personal-bot-3fd58.firebaseio.com",
  projectId: "personal-bot-3fd58",
  storageBucket: "personal-bot-3fd58.appspot.com",
  messagingSenderId: "177515172575"
}

firebase.initializeApp(config)

module.exports = firebase