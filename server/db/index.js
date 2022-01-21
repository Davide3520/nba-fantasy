//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Player = require('./models/Players')

User.belongsToMany(Player, {through: 'my-team'})
Player.belongsToMany(User, {through: 'my-team'});

module.exports = {
  db,
  models: {
    User,
    Player
  },
}
