const router  = require('express').Router()
const learnerController = require('../controllers/learner.controller')
const {check} = require('express-validator')
const passport = require('passport')

router.post('/add',
  [
    check('firstName', 'is required').notEmpty(),
    check('lastName', 'is required').notEmpty(),
    check('phone', 'is required').notEmpty(),
    check('email', 'is required').notEmpty(),
  ],
  learnerController.add
)

router.post('/delete', passport.authenticate('jwt', {session: false}), learnerController.delete)

router.post('/viewed', passport.authenticate('jwt', {session: false}), learnerController.viewed)

router.get('/getAll', passport.authenticate('jwt', {session: false}), learnerController.getLearners)
module.exports = router
