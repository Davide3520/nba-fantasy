const router = require('express').Router()
const { models: { User, Player }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const players = await Player.findAll();
    res.send(players);

  } catch (error) {
    next(error);
  }
})
