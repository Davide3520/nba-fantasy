const router = require('express').Router()
const players = require('./Players')
module.exports = router

router.use('/users', require('./users'))
router.use('/players', players)

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
