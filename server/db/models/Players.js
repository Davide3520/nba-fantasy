const Sequelize = require('sequelize')
const db = require('../db')

const Player = db.define('players', {
  playerId: {
    type: Sequelize.INTEGER
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING
  },
  position: {
    type: Sequelize.STRING
  },
  team: {
    type: Sequelize.STRING
  }
})

module.exports = Player;
