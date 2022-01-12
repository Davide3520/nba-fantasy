//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Player = require('./models/Players')

User.belongsToMany(Player, {through: 'user-players'})
Player.belongsToMany(User, {through: 'user-players'});

module.exports = {
  db,
  models: {
    User,
    Player
  },
}
