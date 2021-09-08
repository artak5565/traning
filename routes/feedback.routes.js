const router  = require('express').Router()
const feedbackController = require('../controllers/feedback.controller')
const {check} = require('express-validator')
const passport = require('passport')

router.post('/add',
  [
    check('state', 'is required').notEmpty(),
    check('phone', 'is required').notEmpty(),
    check('email', 'is required').notEmpty(),
    check('message', 'is required').notEmpty(),
  ],
  feedbackController.add
)

router.post('/delete', passport.authenticate('jwt', {session: false}), feedbackController.delete)

router.post('/viewed', passport.authenticate('jwt', {session: false}), feedbackController.viewed)

router.get('/getAll', passport.authenticate('jwt', {session: false}), feedbackController.getFeedbacks)
module.exports = router
