//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Players = require('./models/Players')

User.belongsToMany(Players, {through: 'user-players'})
Players.belongsToMany(User, {through: 'user-players'});

module.exports = {
  db,
  models: {
    User,
    Players
  },
}
